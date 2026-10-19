#!/usr/bin/env python3
"""Proves verify_all.py actually CATCHES drift.

Builds a scratch package in a temp folder (every sibling of design-repo/ is symlinked read-only, design-repo/ is
copied), requires the unmodified copy to be ADMITTED, then injects one defect per case into a fresh copy and
requires verify_all.py to fail with the matching message. Cases that touch the example or the validator run the
full suite (adversarial included); the rest run with DESIGN_REPO_SKIP_SUITE=1 for speed.
Without the evidence tree beside design-repo/, cases that need it are SKIPPED (reported, never silently dropped).
Usage: python3 prove_drift.py"""
import json, os, re, shutil, subprocess, sys, tempfile
sys.dont_write_bytecode = True

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PKG = os.path.dirname(REPO)
EVIDENCE = os.path.isfile(os.path.join(PKG, "CLONE_SPEC.md")) and os.path.isdir(os.path.join(PKG, "src"))


def jl(r, rel):
    with open(os.path.join(r, rel), encoding="utf-8") as f:
        return json.load(f)


def js(r, rel, d):
    with open(os.path.join(r, rel), "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)


def edit(r, rel, fn):
    d = jl(r, rel); fn(d); js(r, rel, d)


def text(r, rel, fn):
    p = os.path.join(r, rel)
    s = open(p, encoding="utf-8").read()
    open(p, "w", encoding="utf-8").write(fn(s))


def first_cite(r):
    d = jl(r, "sections/hero.home-tabs.json")
    return d, d["evidence"]["spec"][0]


def i_cite_range(r):
    edit(r, "sections/hero.home-tabs.json", lambda d: d["evidence"]["spec"][0].__setitem__("lines", [999999, 1000000]))
def i_cite_anchor(r):
    edit(r, "sections/hero.home-tabs.json", lambda d: d["evidence"]["spec"][0].__setitem__("anchor", "anchor-that-is-not-on-these-lines"))
def i_cite_file(r):
    edit(r, "sections/hero.home-tabs.json", lambda d: d["evidence"]["code"][0].__setitem__("path", "src/components/DoesNotExist.jsx"))
def i_cite_other(r):  # in range, but the range belongs to a different section (its anchor is not there)
    other = jl(r, "sections/faq.accordion.json")["evidence"]["spec"][0]["lines"]
    edit(r, "sections/hero.home-tabs.json", lambda d: d["evidence"]["spec"][0].__setitem__("lines", other))
def i_phantom(r):
    edit(r, "tokens/llm/component-allowlist.json", lambda d: d["sections"].append("content.phantom-section"))
def i_orphan(r):
    d = jl(r, "sections/faq.accordion.json"); d["id"] = "content.orphan-section"; js(r, "sections/content.orphan-section.json", d)
def i_count(r):
    edit(r, "registry.manifest.json", lambda d: d["counts"].__setitem__("sections", d["counts"]["sections"] + 1))
def i_readme(r):
    text(r, "README.md", lambda s: re.sub(r"^- Templates: (\d+)$", lambda m: f"- Templates: {int(m.group(1)) + 7}", s, flags=re.M))
def i_allow_version(r):
    edit(r, "tokens/llm/component-allowlist.json", lambda d: d.__setitem__("version", str(d["version"]) + "-drift"))
def i_pinned_avatar(r):
    edit(r, "assets/asset-roles.json", lambda d: d["roles"]["avatar"].__setitem__("generationPolicy", "may-generate-new"))
def i_pinned_logo(r):  # a different-but-valid policy
    edit(r, "assets/asset-roles.json", lambda d: d["roles"]["customer-logo"].__setitem__("generationPolicy", "must-reuse-exact"))
def i_protected_list(r):
    edit(r, "assets/asset-roles.json", lambda d: d["protectedRoles"].remove("team-photo"))
def i_abs(r):
    text(r, "README.md", lambda s: s + "\nSource: /" + "Users/someone/project\n")
def i_entry(r):
    edit(r, "registry.manifest.json", lambda d: d["entryPoints"].__setitem__("tokenCatalog", "../CLONE_SPEC.md"))
def i_policy(r):
    edit(r, "tokens/llm/token-policy.json", lambda d: d["rawValueRestrictions"].__setitem__("typography-human-label", "forbidden"))
def i_limit(r):
    edit(r, "compatibility/graph.json", lambda d: next(x for x in d["rules"] if x["id"] == "SECTION_PER_PAGE_LIMITS")["limits"].__setitem__("faq.accordion", 5))
def i_follow(r):
    edit(r, "compatibility/graph.json", lambda d: next(x for x in d["rules"] if x["id"] == "MUST_FOLLOW_OBSERVED_PREDECESSOR")["follows"]["pricing.comparison-table"].append("hero.static"))
def i_samecat(r):
    edit(r, "compatibility/graph.json", lambda d: next(x for x in d["rules"] if x["id"] == "NO_ADJACENT_SAME_CATEGORY")["exceptions"].append(["proof.testimonials", "proof.ecosystem"]))
def i_rule_kind(r):
    edit(r, "compatibility/graph.json", lambda d: d["rules"].append({"id": "INVENTED", "severity": "error", "kind": "inventedKind", "description": "x"}))
def i_budget_motion(r):
    edit(r, "compatibility/graph.json", lambda d: next(x for x in d["rules"] if x["id"] == "MOTION_BUDGET").__setitem__("max", 99))
def i_theme(r):
    edit(r, "tokens/themes/light.json", lambda d: d["resolves"].__setitem__("text.primary", "#010203"))
def i_schema_enum(r):
    edit(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["node"]["properties"]["type"]["enum"].append("hero.not-a-contract"))
def i_schema_words(r):
    edit(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["content.faq.accordion"]["properties"]["heading"].__setitem__("maxWords", 99))
def i_schema_motion(r):
    edit(r, "schema/pagespec.schema.json", lambda d: d["definitions"]["motion"]["properties"].__setitem__("delay", {"type": "number"}))
def i_parity_color(r):
    edit(r, "tokens/00-foundation/color.json", lambda d: d["tokens"]["color.green"].__setitem__("$value", "#285D61"))
def i_parity_orphan(r):
    edit(r, "tokens/00-foundation/color.json", lambda d: d["tokens"].pop("color.plan3"))
def i_parity_type(r):
    edit(r, "tokens/00-foundation/typography.json", lambda d: d["tokens"]["type.h3.desktop"]["$value"].__setitem__("fontSize", "40u"))
def i_parity_ease(r):
    edit(r, "tokens/00-foundation/motion.json", lambda d: d["tokens"]["ease.Eas17"].__setitem__("$value", [0.17, 0.17, 0.25, 1.0]))
def i_parity_var(r):
    edit(r, "tokens/00-foundation/color.json", lambda d: d["tokens"].pop("color.nw-check-green"))
def i_parity_unit(r):
    edit(r, "tokens/00-foundation/spacing.json", lambda d: d["tokens"]["space.unit.desktop"].__setitem__("$value", "calc(100vw / 1280)"))
def i_asset_bytes(r):
    edit(r, "assets/asset-roles.json", lambda d: d["assets"][0].__setitem__("bytes", d["assets"][0]["bytes"] + 1))
def i_asset_unreg(r):
    edit(r, "assets/asset-roles.json", lambda d: d["assets"].pop(5))
def i_asset_observed(r):
    edit(r, "assets/asset-roles.json", lambda d: d["roles"]["icon"].__setitem__("observed", d["roles"]["icon"]["observed"] + 3))
def i_asset_role(r):  # a fictional customer logo filed as a generic illustration
    edit(r, "assets/asset-roles.json", lambda d: next(a for a in d["assets"] if a["role"] == "customer-logo").__setitem__("role", "illustration"))
def i_kind(r):
    edit(r, "sections/faq.accordion.json", lambda d: d["retrieval"].__setitem__("kind", "video"))
def i_label(r):
    edit(r, "sections/faq.accordion.json", lambda d: d["retrieval"].__setitem__("semanticLabel", "hero/home-tabs"))
def i_granularity(r):
    edit(r, "sections/faq.accordion.json", lambda d: d["granularity"].__setitem__("copyCapacityWords", 1))
def i_exception(r):
    edit(r, "sections/editorial.post-body.json", lambda d: d["granularity"].pop("exception"))
def i_retired(r):
    d = jl(r, "sections/pricing.plan-cards.json"); d["id"] = "pricing.section"; d["retrieval"]["semanticLabel"] = "pricing/section"; js(r, "sections/pricing.section.json", d)
    edit(r, "tokens/llm/component-allowlist.json", lambda a: (a["sections"].append("pricing.section"), a["contentFields"].__setitem__("pricing.section", a["contentFields"]["pricing.plan-cards"])))
def i_retired_tpl(r):
    edit(r, "compatibility/graph.json", lambda d: d["retiredTemplateIds"].__setitem__("template.pricing", "x"))
def i_impl(r):
    edit(r, "sections/faq.accordion.json", lambda d: d.__setitem__("implementedBy", "src/components/Gone.jsx") or d["implementedByAll"].append("src/components/Gone.jsx"))
def i_route_dup(r):
    edit(r, "templates/templates.json", lambda d: next(t for t in d["templates"] if t["id"] == "template.pricing")["routes"].append("/about"))
def i_route_pattern(r):
    edit(r, "templates/templates.json", lambda d: next(t for t in d["templates"] if t["id"] == "template.security")["routes"].__setitem__(0, "/security/extra"))
def i_route_code(r):
    def f(d):
        t = next(t for t in d["templates"] if t["id"] == "template.mail"); t["routePatterns"] = ["/agency-mail"]; t["routes"] = ["/agency-mail"]
    edit(r, "templates/templates.json", f)
def i_route_count(r):
    def f(d):
        t = next(t for t in d["templates"] if t["id"] == "template.blog-post"); t["routes"].pop()
        t["routeCount"] -= 1
    edit(r, "templates/templates.json", f)
def i_tpl_node(r):
    edit(r, "templates/templates.json", lambda d: d["templates"][0]["nodes"].insert(3, {"section": "hero.invented", "required": True, "repeatable": False}))
def i_motion_section(r):
    edit(r, "sections/showcase.roadmap.json", lambda d: d["motion"]["reducedMotionFallbacks"].__setitem__("pinned-scrub", "disable-animation"))
def i_motion_contract(r):
    edit(r, "motion/motion-contract.json", lambda d: d["patterns"]["auto-advance"].__setitem__("reducedMotionFallback", "instant-switch"))
def i_hero_interval(r):
    edit(r, "motion/motion-contract.json", lambda d: d["autoAdvance"]["intervalsSeconds"].__setitem__("desktop", [16.4, 13.967, 3.5]))
def i_word_rule(r):
    edit(r, "sections/faq.accordion.json", lambda d: d["content"]["fields"]["heading"].__setitem__("maxWords", 30))
def i_compat(r):
    edit(r, "sections/faq.accordion.json", lambda d: d["compatibility"]["observedPredecessors"].append("hero.static"))
def i_family(r):
    edit(r, "sections/faq.accordion.json", lambda d: d["retrieval"]["pageFamilies"].append("template.mail"))
def i_protected(r):
    edit(r, "sections/proof.logo-marquee.json", lambda d: d.pop("protectedContent"))
def i_fields(r):
    edit(r, "tokens/llm/component-allowlist.json", lambda d: d["contentFields"]["faq.accordion"].append("subheading"))
def i_ledger(r):
    edit(r, "extraction/measured-values.json", lambda d: d["sections"].pop("faq.accordion"))
def i_ref(r):
    edit(r, "tokens/10-semantic/color.json", lambda d: d["tokens"]["text.primary"].__setitem__("$value", "{color.not-a-token}"))
def i_catalog(r):
    edit(r, "tokens/llm/token-catalog.json", lambda d: d["categories"]["color"].append("text.invented"))
def i_example(r):
    edit(r, "schema/example.pagespec.json", lambda d: d["nodes"][2]["content"].__setitem__("heading", " ".join(["word"] * 40)))
def i_validator(r):  # sabotage: the validator stops enforcing observed predecessors
    text(r, "schema/semantic_validate.py", lambda s: s.replace('if b in rule["follows"] and a not in rule["follows"][b]:', 'if False:'))
def i_status(r):
    edit(r, "registry.manifest.json", lambda d: d.__setitem__("productionApproved", True))

CASES = [  # (label, injector, expected needle, needs evidence tree, full suite)
    ("citation range past end of file", i_cite_range, "out of range", True, False),
    ("citation anchor not on the cited lines", i_cite_anchor, "not within", True, False),
    ("citation names a missing file", i_cite_file, "not found", True, False),
    ("citation range belongs to another section", i_cite_other, "not within", True, False),
    ("phantom allowlist section", i_phantom, "allowlist: phantom", False, False),
    ("orphan section contract", i_orphan, "allowlist: orphan", False, False),
    ("manifest count drift", i_count, "counts:", False, False),
    ("README count drift", i_readme, "README:", False, False),
    ("allowlistVersion drift", i_allow_version, "version:", False, False),
    ("avatar pin changed", i_pinned_avatar, "pinned role 'avatar'", False, False),
    ("customer-logo pin changed to a different valid policy", i_pinned_logo, "pinned role 'customer-logo'", False, False),
    ("protectedRoles list loses a role", i_protected_list, "protectedRoles", False, False),
    ("absolute machine path", i_abs, "absolute machine path", False, False),
    ("entry point outside the package", i_entry, "points outside", False, False),
    ("policy category is a human label", i_policy, "policy: rawValueRestrictions", False, False),
    ("per-page limit drift", i_limit, "SECTION_PER_PAGE_LIMITS.limits drifted", False, False),
    ("predecessor adjacency drift", i_follow, "MUST_FOLLOW_OBSERVED_PREDECESSOR", False, False),
    ("same-category exception drift", i_samecat, "NO_ADJACENT_SAME_CATEGORY", False, False),
    ("rule kind the validator does not implement", i_rule_kind, "is not implemented by semantic_validate.py", False, False),
    ("motion budget drift", i_budget_motion, "MOTION_BUDGET.max", False, False),
    ("theme resolution drift", i_theme, "theme: text.primary", False, False),
    ("schema enum gains a non-contract section", i_schema_enum, "schema: node type enum", False, False),
    ("schema maxWords drift", i_schema_words, "maxWords != contract", False, False),
    ("schema motion object gains a field", i_schema_motion, "motion properties", False, False),
    ("foundation colour != tailwind.config.cjs", i_parity_color, "parity: color.green", True, False),
    ("tailwind colour with no token", i_parity_orphan, "orphan tailwind colour 'plan3'", True, False),
    ("type token != tailwind type table", i_parity_type, "parity: type.h3.desktop", True, False),
    ("ease token != core.js CustomEase", i_parity_ease, "parity: ease.Eas17", True, False),
    ("CSS variable with no token", i_parity_var, "orphan CSS variable --nw-check-green", True, False),
    ("unit token != index.css --u", i_parity_unit, "parity: space.unit.desktop", True, False),
    ("asset bytes drift", i_asset_bytes, "bytes", True, False),
    ("asset file unregistered", i_asset_unreg, "is not registered", True, False),
    ("asset observed count drift", i_asset_observed, "roles[icon].observed", False, False),
    ("customer logo filed as illustration", i_asset_role, "observed", False, False),
    ("section kind the site does not contain", i_kind, "declared not present", False, False),
    ("duplicate semantic label", i_label, "duplicate semanticLabel", False, False),
    ("granularity capacity drift", i_granularity, "granularity: faq.accordion.copyCapacityWords", False, False),
    ("long-form section loses its exception", i_exception, "(no exception)", False, False),
    ("retired composite id reintroduced", i_retired, "retired: 'pricing.section'", False, False),
    ("retired template id still defined", i_retired_tpl, "retired: template", False, False),
    ("implementedBy points at a missing file", i_impl, "implementedBy", True, False),
    ("route assigned to two templates", i_route_dup, "assigned to both", False, False),
    ("route outside its template's patterns", i_route_pattern, "matches none", False, False),
    ("route patterns != src/routes.js", i_route_code, "differ from src/routes.js", True, False),
    ("route count != src/data records", i_route_count, "records in src/data/content/blogPosts.js", True, False),
    ("template node without a contract", i_tpl_node, "has no contract", False, False),
    ("section reduced-motion fallback drift", i_motion_section, "fallback for 'pinned-scrub'", False, False),
    ("motion contract fallback drift", i_motion_contract, "fallback for 'auto-advance'", False, False),
    ("hero interval != src/motion/visuals.js", i_hero_interval, "hero intervals", True, False),
    ("word budget breaks the derivation rule", i_word_rule, "budget: faq.accordion.heading", False, False),
    ("section compatibility drift", i_compat, "compatibility drifted", False, False),
    ("page family drift", i_family, "pageFamilies drifted", False, False),
    ("protected section without protectedContent", i_protected, "without protectedContent", False, False),
    ("allowlist contentFields drift", i_fields, "contentFields[faq.accordion]", False, False),
    ("ledger drift", i_ledger, "ledger:", False, False),
    ("semantic token references an unknown token", i_ref, "unknown token {color.not-a-token}", False, False),
    ("catalog lists an unknown token", i_catalog, "catalog: color lists unknown token", False, False),
    ("productionApproved flipped", i_status, "productionApproved", False, False),
    ("example PageSpec breaks a budget", i_example, "example (jsonschema)", False, True),
    ("validator stops enforcing a rule", i_validator, "adversarial (", False, True),
]


def scratch(tmp):
    pkg = os.path.join(tmp, "pkg")
    os.makedirs(pkg)
    for name in os.listdir(PKG):
        if name in ("design-repo", "node_modules", "dist") or name.startswith("."):
            continue
        os.symlink(os.path.join(PKG, name), os.path.join(pkg, name))
    shutil.copytree(REPO, os.path.join(pkg, "design-repo"), ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"))
    return os.path.join(pkg, "design-repo")


def run(r, full):
    env = {**os.environ}
    if not full:
        env["DESIGN_REPO_SKIP_SUITE"] = "1"
    p = subprocess.run([sys.executable, os.path.join(r, "extraction", "verify_all.py")], capture_output=True, text=True, env=env)
    return p.returncode, p.stdout + p.stderr


def main():
    ok = fail = skip = 0
    with tempfile.TemporaryDirectory() as tmp:
        os.makedirs(os.path.join(tmp, "base"))
        base = scratch(os.path.join(tmp, "base"))
        code, out = run(base, True)
        if code != 0:
            print("FAIL: the unmodified scratch copy is not admitted:\n" + out[-2000:])
            sys.exit(1)
        print("  ok    control: unmodified copy admitted (full suite)")
        for i, (label, fn, needle, needs_ev, full) in enumerate(CASES):
            if needs_ev and not EVIDENCE:
                print(f"  SKIP  {label}: evidence tree not beside design-repo/"); skip += 1; continue
            d = os.path.join(tmp, f"c{i}")
            os.makedirs(d)
            r = scratch(d)
            fn(r)
            code, out = run(r, full)
            if code != 0 and needle in out:
                print(f"  ok    caught: {label}"); ok += 1
            else:
                print(f"  FAIL  not caught: {label} (exit {code}, needle {needle!r})\n{out[-800:]}"); fail += 1
            shutil.rmtree(d, ignore_errors=True)
    print(f"drift-proof: {ok} passed, {fail} failed, {skip} skipped")
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
