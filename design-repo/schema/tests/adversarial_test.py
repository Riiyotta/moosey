#!/usr/bin/env python3
"""Adversarial suite: proves every rule REJECTS a bad PageSpec for the RIGHT reason, and that controls pass.

Controls: the bundled example + one synthesized minimal PageSpec per template (generic loop: a new template needs
no new control code). Each mutation must produce an error (or, for warn rules, a warning) containing a needle that
names the specific rule/field it targets. A mutation that cannot be built is reported as SKIPPED, never dropped.
Usage: python3 adversarial_test.py"""
import copy, importlib.util, os, sys
sys.dont_write_bytecode = True

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA = os.path.dirname(HERE)
REPO = os.path.dirname(SCHEMA)
_s = importlib.util.spec_from_file_location("semantic_validate", os.path.join(SCHEMA, "semantic_validate.py"))
sv = importlib.util.module_from_spec(_s)
_s.loader.exec_module(sv)

SECS = sv.contracts()
TEMPLATES = sv.load("templates/templates.json")["templates"]
TBY = {t["id"]: t for t in TEMPLATES}
GRAPH = {r["id"]: r for r in sv.load("compatibility/graph.json")["rules"]}
G = sv.load("compatibility/graph.json")
VERSION = sv.load("schema/pagespec.schema.json")["properties"]["pageSpecVersion"]["const"]
REG = sv.load("assets/asset-roles.json")
PROTECTED = set(REG["protectedRoles"])
GENERIC = sorted(REG["genericDecorativeRoles"])
FALLBACK = {p: d["reducedMotionFallback"] for p, d in sv.load("motion/motion-contract.json")["patterns"].items()}


def motion_for(sid, pattern=None):
    p = pattern or SECS[sid]["motion"]["allowedPatterns"][0]
    return {"pattern": p, "reducedMotionFallback": FALLBACK[p]}


def sample(f):
    t = f["type"]
    if t == "text":
        return "Sample"
    if t == "enum":
        return f["enum"][0]
    if t == "text[]":
        return ["Sample"]
    if t == "cta[]":
        return [{"label": "Go", "href": "/"}]
    if t == "link[]":
        return [{"label": "Go", "href": "/"}]
    if t == "item[]":
        return [{"title": "Sample", **({"body": "Sample"} if f.get("bodyRequired") else {})}]
    if t == "image[]":
        r = f["assetRoles"][0]
        return [{"assetRole": r, "alt": "Sample", **({"source": "placeholder"} if r in PROTECTED else {})}]
    if t == "tab[]":
        return [{"label": "Tab", "entries": [{"title": "Sample", "body": "Sample"}]}]
    if t == "quote[]":
        return [{"quote": "Sample", "name": "Sample"}]
    if t == "plan[]":
        return [{"title": "Plan", "price": "$1"}]
    if t == "row[]":
        return [{"label": "Row", "values": [True]}]
    if t == "field[]":
        return [{"name": "email", "type": "email", "label": "Email", "required": True}]
    if t == "block[]":
        return [{"kind": "p", "text": "Sample"}]
    if t == "ctaCard[]":
        return [{"title": "Sample"}]
    raise SystemExit("no sample for " + t)


def minimal_node(sid, pattern=None):
    f = SECS[sid]["content"]["fields"]
    return {"type": sid, "content": {k: sample(v) for k, v in f.items() if v.get("required")}, "motion": motion_for(sid, pattern)}


def route_for(t):
    r = next((x for x in t["routes"] if x != "*"), None)
    return r or "/does-not-exist"


def control_for(t):
    return {"pageSpecVersion": VERSION, "template": t["id"], "route": route_for(t), "nodes": [minimal_node(n["section"]) for n in t["nodes"]]}


def main():
    ex = sv.load("schema/example.pagespec.json")
    tmpl = TBY[ex["template"]]
    tseq = [n["section"] for n in tmpl["nodes"]]
    types = [n["type"] for n in ex["nodes"]]
    cases, skipped = [], []
    cases.append(("control: bundled example", ex, "pass", None))
    for t in TEMPLATES:
        cases.append((f"control: minimal {t['id']}", control_for(t), "pass", None))
        for r in t["routes"][:3]:
            if r != "*":
                s = control_for(t); s["route"] = r
                cases.append((f"control: {t['id']} at {r}", s, "pass", None))

    def mut(label, fn, needle, expect="error", why_not=None):
        if why_not:
            skipped.append(f"{label}: {why_not}"); return
        s = copy.deepcopy(ex); fn(s); cases.append((label, s, expect, needle))

    def alt(label, tid, fn, needle, expect="error"):
        if tid not in TBY:
            skipped.append(f"{label}: no template {tid}"); return
        s = control_for(TBY[tid]); fn(s); cases.append((label, s, expect, needle))

    idx = lambda sid: types.index(sid) if sid in types else None
    first = lambda pred: next((i for i, n in enumerate(ex["nodes"]) if pred(n)), None)

    # ---- schema layer
    mut("wrong template enum", lambda s: s.__setitem__("template", "template.does-not-exist"), "schema: template")
    mut("missing required motion", lambda s: s["nodes"][1].pop("motion"), "'motion' is a required property")
    mut("invented section type", lambda s: s["nodes"][2].__setitem__("type", "hero.invented-type"), "schema: nodes/2/type")
    mut("missing reducedMotionFallback", lambda s: s["nodes"][1]["motion"].pop("reducedMotionFallback"), "reducedMotionFallback")
    mut("invented motion field", lambda s: s["nodes"][1]["motion"].__setitem__("inventedAnimation", True), "inventedAnimation")
    mut("invented motion pattern", lambda s: s["nodes"][1]["motion"].__setitem__("pattern", "parallax"), "schema: nodes/1/motion/pattern")
    mut("per-instance style override on a node", lambda s: s["nodes"][1].__setitem__("style", {"color": "#ff0000"}), "'style' was unexpected")
    mut("raw theme override at page level", lambda s: s.__setitem__("theme", {"text.primary": "#ff0000"}), "'theme' was unexpected")
    mut("wrong pageSpecVersion", lambda s: s.__setitem__("pageSpecVersion", "9.9.9"), "schema: pageSpecVersion")
    mut("unknown content field", lambda s: s["nodes"][2]["content"].__setitem__("inventedField", "x"), "'inventedField' was unexpected")
    mut("required content field missing", lambda s: s["nodes"][2]["content"].pop("heading"), "'heading' is a required property")
    mut("link to a live external URL", lambda s: s["nodes"][1]["content"]["ctas"].__setitem__(0, {"label": "Go", "href": "https://www.live-site.example/x"}), "does not match")
    hi = idx("hero.home-tabs")
    mut("invented assetRole", lambda s: s["nodes"][hi]["content"]["images"].__setitem__(0, {"assetRole": "invented-role"}), "invented-role")
    mut("alt text over its word budget", lambda s: s["nodes"][hi]["content"]["images"][0].__setitem__("alt", " ".join(["w"] * 17)), "alt has 17 words")
    mut("invented enum variant", lambda s: s["nodes"][hi].__setitem__("type", "hero.page") or s["nodes"][hi].__setitem__("content", {"variant": "fullscreen", "eyebrow": "x", "heading": "x", "subheading": "x", "images": [{"assetRole": "product-screenshot", "source": "placeholder"}]}),
        "is not one of")

    # ---- asset protection layer
    mi = idx("proof.logo-marquee")
    mut("customer logo filed as a generic decorative role", lambda s: s["nodes"][mi]["content"]["images"].__setitem__(0, {"assetRole": GENERIC[0], "alt": "x"}), "not used by this section")
    mut("protected logo role without a placeholder/supplied source", lambda s: s["nodes"][mi]["content"]["images"][0].pop("source"), "is protected (must-not-fabricate)")
    mut("protected source set to an invented value", lambda s: s["nodes"][mi]["content"]["images"][0].__setitem__("source", "generated"), "schema: nodes/")
    mut("person photo used where logos are expected", lambda s: s["nodes"][mi]["content"]["images"].__setitem__(0, {"assetRole": "avatar", "source": "placeholder"}), "not used by this section")
    mut("more logos than the marquee holds", lambda s: s["nodes"][mi]["content"]["images"].extend(copy.deepcopy(s["nodes"][mi]["content"]["images"][:1])), "is too long")
    mut("asset path not in the registry", lambda s: s["nodes"][mi]["content"]["images"][0].__setitem__("asset", "assets/art/logos/real-company.svg"), "is not in assets/asset-roles.json")
    mut("asset path with a different role (avatar file as customer logo)", lambda s: s["nodes"][mi]["content"]["images"][0].__setitem__("asset", "assets/art/avatars/avatar-1.svg"), "has role")
    ti = idx("proof.testimonials")
    mut("avatar without source", lambda s: s["nodes"][ti]["content"]["images"][-1].pop("source"), "is protected (must-not-fabricate)")
    alt("team photo on the about hero without source", "template.about", lambda s: s["nodes"][1]["content"]["images"][0].pop("source"), "is protected")
    alt("partner logo on ecosystem filed as icon", "template.platform-overview", lambda s: next(n for n in s["nodes"] if n["type"] == "proof.ecosystem")["content"].__setitem__("images", [{"assetRole": "icon"}]), "not used by this section")
    alt("author photo filed as editorial illustration on the post header", "template.blog-post",
        lambda s: s["nodes"][1]["content"].__setitem__("images", [{"assetRole": "editorial-illustration"}]), "not used by this section")

    # ---- retired / decomposition layer
    mut("retired composite section id", lambda s: s["nodes"][idx("pricing.plan-cards")].__setitem__("type", "pricing.section"), "retired:")
    mut("retired template id", lambda s: s.__setitem__("template", sorted(G["retiredTemplateIds"])[0]), "retired: template")

    # ---- motion layer
    mut("pattern not allowed by the section (scroll pin on the statement)", lambda s: s["nodes"][idx("intro.statement")].__setitem__("motion", {"pattern": "pinned-scrub", "reducedMotionFallback": "scroll-driven-retained"}), "not allowed")
    mut("wrong reduced-motion fallback for the pattern", lambda s: s["nodes"][idx("showcase.roadmap")]["motion"].__setitem__("reducedMotionFallback", "disable-animation"), "is wrong for pattern")
    mut("auto-advance without no-autoplay fallback", lambda s: s["nodes"][hi]["motion"].__setitem__("reducedMotionFallback", "instant-switch"), "is wrong for pattern")

    # ---- structural layer (template cross-reference)
    mut("removed mandatory section", lambda s: s["nodes"].pop(idx("intro.statement")), "missing")
    mut("first two content sections swapped", lambda s: s["nodes"].__setitem__(slice(2, 4), [s["nodes"][3], s["nodes"][2]]), "out of order")
    mut("section from outside the template", lambda s: s["nodes"].insert(3, minimal_node("listing.pagination")), "not part of template")
    mut("declared template contradicts the nodes", lambda s: s.__setitem__("template", "template.pricing") or s.__setitem__("route", "/pricing"), "template:")
    alt("repeatable section beyond maxCount", "template.platform-overview",
        lambda s: s["nodes"].__setitem__(slice(2, 3), [minimal_node("feature.accordion-story") for _ in range(4)]), "max 3")
    alt("optional nodes may be omitted (tax-compliance shape)", "template.platform-product",
        lambda s: s.__setitem__("nodes", [n for n in s["nodes"] if n["type"] not in ("steps.get-started", "faq.accordion")]), None, "pass")
    alt("form-only guide (newsletter shape) is valid", "template.guide-landing",
        lambda s: s.__setitem__("nodes", [n for n in s["nodes"] if n["type"] in ("shell.header", "conversion.guide-form", "shell.footer")]), None, "pass")
    alt("guide without its form", "template.guide-landing", lambda s: s.__setitem__("nodes", [n for n in s["nodes"] if n["type"] != "conversion.guide-form"]), "missing")
    alt("C1 + C2 shape on a partner-platform page is still ordered", "template.partner-platform",
        lambda s: s["nodes"].insert(1, s["nodes"].pop(3)), "out of order")

    # ---- graph layer: each rule fires by its own id
    mut("SECTION_PER_PAGE_LIMITS: one-per-page section duplicated", lambda s: s["nodes"].insert(idx("faq.accordion") + 1, copy.deepcopy(s["nodes"][idx("faq.accordion")])), "SECTION_PER_PAGE_LIMITS")
    mut("ONE_HERO_PER_PAGE: a second HERO section", lambda s: s["nodes"].insert(hi + 1, minimal_node("hero.static")), "ONE_HERO_PER_PAGE")
    mut("CHROME_OPENS_PAGE: content before the header", lambda s: s["nodes"].insert(0, s["nodes"].pop(hi)), "CHROME_OPENS_PAGE")
    mut("BANNER_MUST_BE_FIRST: banner after the header", lambda s: s["nodes"].__setitem__(slice(0, 2), [s["nodes"][1], s["nodes"][0]]), "BANNER_MUST_BE_FIRST")
    mut("FOOTER_MUST_BE_LAST: footer moved up", lambda s: s["nodes"].insert(5, s["nodes"].pop()), "FOOTER_MUST_BE_LAST")
    mut("MUST_FOLLOW_OBSERVED_PREDECESSOR: comparison table without its plan cards", lambda s: s["nodes"].pop(idx("pricing.plan-cards")), "MUST_FOLLOW_OBSERVED_PREDECESSOR")
    mut("ROUTE_MATCHES_TEMPLATE: home spec on an inner route (banner off home)", lambda s: s.__setitem__("route", "/pricing"), "ROUTE_MATCHES_TEMPLATE")
    alt("ROUTE_MATCHES_TEMPLATE: partner kit outside /partners/", "template.partner-static", lambda s: s.__setitem__("route", "/remote"), "ROUTE_MATCHES_TEMPLATE")
    alt("ROUTE_MATCHES_TEMPLATE: blog post route with two segments", "template.blog-post", lambda s: s.__setitem__("route", "/blog/a/b"), "ROUTE_MATCHES_TEMPLATE")
    nc = GRAPH["NO_CONSECUTIVE_SAME_SECTION"]["sections"]
    mut("NO_CONSECUTIVE_SAME_SECTION (warn)", lambda s: s["nodes"].insert(idx("intro.statement") + 1, copy.deepcopy(s["nodes"][idx("intro.statement")])), "NO_CONSECUTIVE_SAME_SECTION", "warn",
        why_not=None if "intro.statement" in nc else "intro.statement is repeatable")
    allowed = {tuple(p) for p in GRAPH["NO_ADJACENT_SAME_CATEGORY"]["exceptions"]}
    pair = ("proof.testimonials", "proof.ecosystem") if ("proof.testimonials", "proof.ecosystem") not in allowed else None
    mut("NO_ADJACENT_SAME_CATEGORY (warn)", lambda s: s["nodes"].insert(ti + 1, minimal_node("proof.ecosystem")), "NO_ADJACENT_SAME_CATEGORY", "warn",
        why_not=None if pair else "pair was observed")
    budget = GRAPH["MOTION_BUDGET"]["max"]
    mut("MOTION_BUDGET (warn)", lambda s: s["nodes"].extend(minimal_node("intro.statement") for _ in range(budget + 1)), "MOTION_BUDGET", "warn")
    pb = GRAPH["PINNED_SCRUB_BUDGET"]["max"]
    alt("PINNED_SCRUB_BUDGET (warn)", "template.platform-overview",
        lambda s: s["nodes"].__setitem__(slice(2, 3), [minimal_node("feature.accordion-story", "pinned-scrub") for _ in range(pb + 1)]), "PINNED_SCRUB_BUDGET", "warn")

    # ---- runtime budgets (instance word counts)
    mw = SECS["hero.home-tabs"]["content"]["fields"]["heading"]["maxWords"]
    mut("maxWords overflow on a heading", lambda s: s["nodes"][hi]["content"].__setitem__("heading", " ".join(["word"] * (mw + 1))), f"heading has {mw + 1} words")
    fi = idx("faq.accordion")
    bw = SECS["faq.accordion"]["content"]["fields"]["items"]["bodyMaxWords"]
    mut("maxWords overflow on an item body", lambda s: s["nodes"][fi]["content"]["items"][0].__setitem__("body", " ".join(["w"] * (bw + 1))), "body has")
    rt = idx("showcase.role-tabs")
    mut("maxWords overflow inside a tab entry", lambda s: s["nodes"][rt]["content"]["tabs"][0]["entries"][0].__setitem__("body", " ".join(["w"] * 200)), "entries[0].body has")
    mut("maxWords overflow on a testimonial quote", lambda s: s["nodes"][ti]["content"]["quotes"][0].__setitem__("quote", " ".join(["w"] * 200)), "quote has")
    pc = idx("pricing.comparison-table")
    mut("maxWords overflow on a comparison value", lambda s: s["nodes"][pc]["content"]["rows"][0]["values"].__setitem__(0, " ".join(["w"] * 200)), "values[0] has")
    mut("too many FAQ items", lambda s: s["nodes"][fi]["content"]["items"].extend(copy.deepcopy(s["nodes"][fi]["content"]["items"]) * 2), "is too long")
    alt("maxWords overflow on a prose block", "template.blog-post", lambda s: s["nodes"][2]["content"]["blocks"].__setitem__(0, {"kind": "p", "text": " ".join(["w"] * 500)}), "text has")

    ok = fail = 0
    for label, spec, expect, needle in cases:
        errors, warnings = sv.check(spec)
        if expect == "pass":
            good = not errors
        elif expect == "error":
            good = any(needle in e for e in errors)
        else:
            good = any(needle in w for w in warnings)
        if good:
            ok += 1
        else:
            fail += 1
            print(f"FAIL: {label}: expected {expect}" + (f" containing '{needle}'" if needle else "") + f"; errors={errors[:3]} warnings={warnings[:3]}")
    for s_ in skipped:
        print("SKIPPED:", s_)
    n_ctrl = sum(1 for c in cases if c[2] == "pass")
    print(f"adversarial: {ok} passed, {fail} failed ({n_ctrl} controls, {len(cases) - n_ctrl} mutations, {len(skipped)} skipped as not applicable)")
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
