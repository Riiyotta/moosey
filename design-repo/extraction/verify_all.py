#!/usr/bin/env python3
"""Admission check for this design repo. Exit 0 = admitted. Python stdlib only (jsonschema used when installed).

  1  required files exist and parse; required folders exist
  2  manifest: status/productionApproved; entryPoints relative, inside design-repo/ (no ../), present
  3  version fields: allowlistVersion == allowlist.version; pageSpecVersion == schema const
  4  counts recomputed from disk (manifest AND README)
  5  allowlist parity: sections/components/primitives files <-> allowlist; contentFields <-> contracts; nodeProperties <-> schema
  6  schema parity: template/section/assetRole/motion enums and per-section content definitions match the contracts
  7  templates: node sections have contracts; concrete routes assigned exactly once and match their own patterns;
     route patterns == src/routes.js (+ '/' + '*'); collection sizes == src/data/** incl. the 1,736 resource leaves
     re-derived from resourceSlugs.js + states.js (when src/ is present)
  8  graph recomputed from templates + contracts (limits, predecessors, consecutive, same-category exceptions, budgets, kinds)
  9  citations: every {path, lines, anchor} object anywhere in the repo resolves (file exists, range in bounds, anchor inside
     the range). Evidence root = the package root (folder containing design-repo/). Missing evidence tree -> warnings.
 10  tokens: references resolve; theme == recomputed resolution; catalog ids exist; policy categories == catalog keys;
     foundation <-> code VALUE parity against tailwind.config.cjs (colors, type table, fontFamily, spacing rule, screens,
     WGHT, borderRadius, boxShadow, backgroundImage, transitionDuration, transitionTimingFunction), CSS variables
     (index.css --u, blocks.css, misc.css), src/motion/core.js (CustomEases, constants, f()) and carousel.js, in both
     directions for colours, type, CSS vars, eases, radius, shadows, gradients, durations, timing functions (a code value
     with no token is an orphan); every foundation token without a code mapping carries a valueCheck whose CURRENT
     value must be found in its cited source range (spec-only tokens are checked against the spec text); component and
     layout tokens with a valueCheck are checked the same way
 11  assets: closed role vocabulary; PINNED policies (kept here, independent of the registry); protected roles also pinned
     by FOLDER (PATH_PINS) and cross-checked against public/assets/art/ART_MANIFEST.md; protected/generic lists;
     section top-level assetRoles == union of its image fields' roles, and every image field declares roles;
     every public/ file registered with matching bytes and vice versa; observed counts recomputed
 12  implementation: implementedBy / implementedByAll / template implementedBy files exist (when src/ is present)
 13  granularity: stored capacities == recomputed; thresholds unless a named policy exception; labels unique; no generic ids;
     retired ids have no contract
 14  motion: section patterns/fallbacks == motion contract; observed counts; eases == foundation; hero intervals (desktop
     and tablet/mobile) == src/motion/visuals.js
 15  no absolute machine paths in any file
 16  schema is valid draft-07; example validates with zero errors; adversarial suite passes (jsonschema AND stdlib engines)
 17  ledger: measured-values sections/templates keys == contracts

Drift-proofing lives in extraction/prove_drift.py. Set DESIGN_REPO_SKIP_SUITE=1 to skip step 16's subprocess runs.
"""
import json, math, os, re, subprocess, sys
sys.dont_write_bytecode = True

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PKG = os.path.dirname(REPO)
errs, warns = [], []
EVIDENCE = os.path.isfile(os.path.join(PKG, "CLONE_SPEC.md"))
SRC = os.path.isdir(os.path.join(PKG, "src"))

PINNED = {"logo": "must-reuse-exact", "customer-logo": "must-not-fabricate", "partner-logo": "must-not-fabricate", "avatar": "must-not-fabricate",
          "author-photo": "must-not-fabricate", "team-photo": "must-not-fabricate", "product-screenshot": "must-not-fabricate", "font": "must-reuse-exact"}
PROTECTED = {"logo", "customer-logo", "partner-logo", "avatar", "author-photo", "team-photo", "product-screenshot"}
REQUIRED = ["registry.manifest.json", "README.md", "CHANGELOG.md", "tokens/themes/light.json", "tokens/llm/token-catalog.json", "tokens/llm/token-policy.json",
            "tokens/llm/component-allowlist.json", "templates/templates.json", "compatibility/graph.json", "assets/asset-roles.json", "motion/motion-contract.json",
            "schema/pagespec.schema.json", "schema/example.pagespec.json", "schema/semantic_validate.py", "schema/_draft7.py", "schema/tests/adversarial_test.py",
            "extraction/measured-values.json", "extraction/prove_drift.py", "extraction/verify_all.py"]
ENTRY_KEYS = ["tokenCatalog", "tokenPolicy", "componentAllowlist", "compatibilityGraph", "assetContract", "motionContract", "templates", "pagespecSchema",
              "examplePageSpec", "semanticValidate", "draft7Fallback", "adversarialSuite", "admission", "driftProof", "measuredValues", "defaultTheme"]


def J(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


def P(rel):
    with open(os.path.join(PKG, rel), encoding="utf-8") as f:
        return f.read()


def files_in(d, ext=".json"):
    p = os.path.join(REPO, d)
    return sorted(f for f in os.listdir(p) if f.endswith(ext)) if os.path.isdir(p) else []


def tier(t):
    out = {}
    for f in files_in(f"tokens/{t}"):
        out.update(J(f"tokens/{t}/{f}").get("tokens", {}))
    return out


def W(chars):
    return int(math.ceil(chars * 1.25 / 4.5))


def walk(o, fn, path=""):
    if isinstance(o, dict):
        fn(o, path)
        for k, v in o.items():
            walk(v, fn, f"{path}/{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, fn, f"{path}[{i}]")


def copy_capacity(f):
    t = f["type"]
    if t == "text": return f["maxWords"]
    if t in ("text[]", "cta[]", "link[]", "block[]"): return f["maxItems"] * f["maxWords"]
    if t == "item[]": return f["maxItems"] * (f["titleMaxWords"] + f.get("bodyMaxWords", 0))
    if t == "tab[]": return f["maxItems"] * (f["labelMaxWords"] + f["maxEntries"] * (f["titleMaxWords"] + f["bodyMaxWords"]))
    if t == "quote[]": return f["maxItems"] * (f["quoteMaxWords"] + f.get("supportMaxWords", 0) + f["nameMaxWords"] + f["roleMaxWords"])
    if t == "plan[]": return f["maxItems"] * (7 * f["maxWords"] + f.get("maxFeatures", 0) * 20)
    if t == "row[]": return f["maxItems"] * (f["labelMaxWords"] + f["maxValues"] * f["valueMaxWords"])
    if t == "field[]": return f["maxItems"] * f["labelMaxWords"]
    if t == "ctaCard[]": return f["maxItems"] * (f["titleMaxWords"] + f["bodyMaxWords"] + f["buttonMaxWords"])
    return 0


def main():
    # ------------------------------------------------------------ 1
    for rel in REQUIRED:
        p = os.path.join(REPO, rel)
        if not os.path.exists(p):
            errs.append(f"missing: {rel}")
        elif rel.endswith(".json"):
            try: J(rel)
            except Exception as e: errs.append(f"bad json {rel}: {e}")
    for d in ("tokens/00-foundation", "tokens/10-semantic", "tokens/20-component", "tokens/30-layout", "sections", "primitives", "components"):
        if not files_in(d): errs.append(f"missing or empty folder: {d}/")
    if errs: return finish()
    if not EVIDENCE:
        warns.append("evidence tree (CLONE_SPEC.md, specs/, src/) not beside design-repo/: citation and code-parity checks degrade to warnings")
    man, allow, schema, graph = J("registry.manifest.json"), J("tokens/llm/component-allowlist.json"), J("schema/pagespec.schema.json"), J("compatibility/graph.json")
    templates, reg, motion, ledger = J("templates/templates.json")["templates"], J("assets/asset-roles.json"), J("motion/motion-contract.json"), J("extraction/measured-values.json")
    secs = {}
    for f in files_in("sections"):
        c = J(f"sections/{f}")
        if f != c.get("id", "") + ".json": errs.append(f"sections/{f}: id '{c.get('id')}' does not match the file name")
        secs[c["id"]] = c
    # ------------------------------------------------------------ 2
    if man.get("status") != "design-review-pending": errs.append("manifest: status must be design-review-pending")
    if man.get("productionApproved") is not False: errs.append("manifest: productionApproved must be false")
    ep = man.get("entryPoints", {})
    for k in ENTRY_KEYS:
        v = ep.get(k)
        if not v: errs.append(f"manifest: entryPoints.{k} missing"); continue
        if v.startswith("/") or ".." in v.split("/"): errs.append(f"manifest: entryPoints.{k} = {v!r} points outside design-repo/")
        elif not os.path.exists(os.path.join(REPO, v)): errs.append(f"manifest: entryPoints.{k} = {v!r} does not exist")
    # ------------------------------------------------------------ 3
    if str(man.get("allowlistVersion")) != str(allow.get("version")): errs.append(f"version: manifest allowlistVersion {man.get('allowlistVersion')} != allowlist {allow.get('version')}")
    if man.get("pageSpecVersion") != schema["properties"]["pageSpecVersion"].get("const"): errs.append("version: manifest pageSpecVersion != schema const")
    # ------------------------------------------------------------ 4
    F, S, L = tier("00-foundation"), tier("10-semantic"), tier("30-layout")
    C = {f: J(f"tokens/20-component/{f}") for f in files_in("tokens/20-component")}
    pats = sorted({p for t in templates for p in t["routePatterns"]})
    counts = {"sections": len(secs), "templates": len(templates), "routes": sum(t["routeCount"] for t in templates if "*" not in t["routes"]), "routePatterns": len(pats),
              "primitives": len(files_in("primitives")), "components": len(files_in("components")), "assets": len(reg["assets"]),
              "tokens": {"foundation": len(F), "semantic": len(S), "component": sum(len(d["tokens"]) for d in C.values()), "layout": len(L)},
              "themes": len(files_in("tokens/themes")), "rules": len(graph["rules"])}
    if man.get("counts") != counts: errs.append(f"counts: manifest {man.get('counts')} != recomputed {counts}")
    readme = open(os.path.join(REPO, "README.md"), encoding="utf-8").read()
    for label, val in [("Sections", counts["sections"]), ("Templates", counts["templates"]), ("Routes", counts["routes"]), ("Route patterns", counts["routePatterns"]),
                       ("Primitives", counts["primitives"]), ("Components", counts["components"]), ("Assets", counts["assets"]), ("Foundation tokens", counts["tokens"]["foundation"]),
                       ("Semantic tokens", counts["tokens"]["semantic"]), ("Component tokens", counts["tokens"]["component"]), ("Layout tokens", counts["tokens"]["layout"]), ("Rules", counts["rules"])]:
        m = re.search(rf"^- {label}: (\d+)$", readme, re.M)
        if not m or int(m.group(1)) != val: errs.append(f"README: '- {label}: ...' does not state the recomputed {val}")
    for t in templates:
        if t["id"] not in readme: errs.append(f"README: template table is missing {t['id']}")
    # ------------------------------------------------------------ 5
    for key, folder in [("sections", "sections"), ("components", "components"), ("primitives", "primitives")]:
        on_disk = {f[:-5] for f in files_in(folder)}
        listed = set(allow.get(key, []))
        for x in sorted(listed - on_disk): errs.append(f"allowlist: phantom {key[:-1]} '{x}' has no {folder}/{x}.json")
        for x in sorted(on_disk - listed): errs.append(f"allowlist: orphan {folder}/{x}.json is not in the allowlist")
    for sid, c in secs.items():
        if sorted(allow.get("contentFields", {}).get(sid, [])) != sorted(c["content"]["fields"]): errs.append(f"allowlist: contentFields[{sid}] != contract fields")
    if set(allow.get("contentFields", {})) != set(secs): errs.append("allowlist: contentFields keys != section ids")
    if sorted(allow.get("nodeProperties", [])) != sorted(schema["definitions"]["node"]["properties"]): errs.append("allowlist: nodeProperties != schema node properties")
    for f in files_in("components"):
        c = J(f"components/{f}")
        for p in c.get("composedOf", []):
            if p not in allow.get("primitives", []): errs.append(f"components/{f}: composedOf '{p}' is not a primitive")
    # ------------------------------------------------------------ 6
    d = schema["definitions"]
    if schema["properties"]["template"]["enum"] != [t["id"] for t in templates]: errs.append("schema: template enum != templates.json ids")
    if sorted(d["node"]["properties"]["type"]["enum"]) != sorted(secs): errs.append("schema: node type enum != section contracts")
    if sorted(d["assetRole"]["enum"]) != sorted(reg["roles"]): errs.append("schema: assetRole enum != asset-roles.json roles")
    if sorted(d["motion"]["properties"]["pattern"]["enum"]) != sorted(motion["patterns"]): errs.append("schema: motion pattern enum != motion contract patterns")
    if sorted(d["motion"]["properties"]["reducedMotionFallback"]["enum"]) != sorted({p["reducedMotionFallback"] for p in motion["patterns"].values()}):
        errs.append("schema: reducedMotionFallback enum != motion contract fallbacks")
    if d["motion"].get("additionalProperties") is not False: errs.append("schema: motion object must be closed (additionalProperties false)")
    if sorted(d["motion"]["properties"]) != sorted(motion.get("closedFields", [])): errs.append("schema: motion properties != motion contract closedFields")
    branch = {b["if"]["properties"]["type"]["const"] for b in d["node"].get("allOf", [])}
    if branch != set(secs): errs.append("schema: node allOf branches != section contracts")
    for sid, c in secs.items():
        cd = d.get(f"content.{sid}")
        if not cd: errs.append(f"schema: no definitions.content.{sid}"); continue
        f = c["content"]["fields"]
        if sorted(cd["properties"]) != sorted(f): errs.append(f"schema: content.{sid} properties != contract fields")
        if sorted(cd.get("required", [])) != sorted(k for k, v in f.items() if v.get("required")): errs.append(f"schema: content.{sid} required != contract required fields")
        if cd.get("additionalProperties") is not False: errs.append(f"schema: content.{sid} is not closed")
        for k, v in f.items():
            if v["type"] == "text" and cd["properties"].get(k, {}).get("maxWords") != v["maxWords"]: errs.append(f"schema: content.{sid}.{k} maxWords != contract")
            if v["type"].endswith("[]") and cd["properties"].get(k, {}).get("maxItems") != v["maxItems"]: errs.append(f"schema: content.{sid}.{k} maxItems != contract")
    # ------------------------------------------------------------ 7
    seen = {}
    for t in templates:
        for nd in t["nodes"]:
            if nd["section"] not in secs: errs.append(f"templates: {t['id']} node '{nd['section']}' has no contract")
            for k in ("required", "repeatable"):
                if not isinstance(nd.get(k), bool): errs.append(f"templates: {t['id']} node '{nd['section']}' lacks boolean {k}")
            if nd.get("repeatable") and not nd.get("maxCount"): errs.append(f"templates: {t['id']} repeatable '{nd['section']}' lacks maxCount")
        if t["routeCount"] != len(t["routes"]) and not t.get("routesAreSample"): errs.append(f"templates: {t['id']} routeCount {t['routeCount']} != {len(t['routes'])} listed routes")
        for r in t["routes"]:
            if r in seen: errs.append(f"templates: route {r} assigned to both {seen[r]} and {t['id']}")
            seen[r] = t["id"]
            rx = [("^" + re.sub(r":[a-zA-Z]+", "[^/]+", p) + "$") if p != "*" else ".*" for p in t["routePatterns"]]
            if not any(re.match(x, r) for x in rx): errs.append(f"templates: {t['id']} route {r} matches none of its routePatterns")
    if SRC:
        rjs = P("src/routes.js")
        code_pats = {"/" + p for p in re.findall(r"path: '([^']+)'", rjs)} | {"/", "*"}
        if set(pats) != code_pats: errs.append(f"templates: routePatterns {sorted(set(pats) ^ code_pats)} differ from src/routes.js")
        tby = {t["id"]: t for t in templates}
        def cnt(rel, rx): return len(re.findall(rx, P(rel), re.M))
        for tid, rel, rx in [("template.blog-post", "src/data/content/blogPosts.js", r"^\s+slug: '"), ("template.author-detail", "src/data/content/authors.js", r"^\s+slug: '"),
                             ("template.guide-landing", "src/data/content/guides.js", r"^\s+slug: '")]:
            n = cnt(rel, rx)
            if tby[tid]["routeCount"] != n: errs.append(f"templates: {tid} routeCount {tby[tid]['routeCount']} != {n} records in {rel}")
        parts = P("src/data/misc/partners.js")
        for tid, letter in [("template.partner-legacy", "A"), ("template.partner-static", "B"), ("template.partner-platform", "C")]:
            n = len(re.findall(rf"template: '{letter}',", parts))
            if tby[tid]["routeCount"] != n: errs.append(f"templates: {tid} routeCount {tby[tid]['routeCount']} != {n} partner records with template {letter}")
        n = resource_leaf_count()
        if tby["template.resource-guide"]["routeCount"] != n: errs.append(f"templates: resource-guide routeCount {tby['template.resource-guide']['routeCount']} != {n} leaves derived from src/data/content/resourceSlugs.js")
        legal = re.findall(r"^  '?([a-z-]+)'?: \{", P("src/data/misc/legal.js"), re.M)
        if tby["template.legal-prose"]["routeCount"] != len(legal): errs.append(f"templates: legal-prose routeCount != {len(legal)} docs in src/data/misc/legal.js")
    if any("has no contract" in e for e in errs):
        return finish()  # graph/motion recomputation below needs every node to have a contract
    # ------------------------------------------------------------ 8
    cat = {s: c["category"] for s, c in secs.items()}
    limits, P_, pairs = {}, {}, set()
    for t in templates:
        cc = {}
        nodes = t["nodes"]
        for i, nd in enumerate(nodes):
            cc[nd["section"]] = cc.get(nd["section"], 0) + (nd.get("maxCount", 1) if nd.get("repeatable") else 1)
            cands, j = set(), i - 1
            while True:
                if j < 0: cands.add("^"); break
                cands.add(nodes[j]["section"])
                if nodes[j]["required"]: break
                j -= 1
            if nd.get("repeatable"): cands.add(nd["section"])
            P_.setdefault(nd["section"], set()).update(cands)
            pairs |= {(c_, nd["section"]) for c_ in cands if c_ != "^"}
        for k, v in cc.items(): limits[k] = max(limits.get(k, 0), v)
    R = {r["id"]: r for r in graph["rules"]}
    vk = set(re.findall(r'"(\w+)"', re.search(r"RULE_KINDS = \{([^}]*)\}", open(os.path.join(REPO, "schema/semantic_validate.py"), encoding="utf-8").read()).group(1)))
    for r in graph["rules"]:
        if r.get("severity") not in ("error", "warn"): errs.append(f"graph: rule {r['id']} severity must be error|warn")
        if r.get("kind") not in vk: errs.append(f"graph: rule {r['id']} kind '{r.get('kind')}' is not implemented by semantic_validate.py")
    exp = {"SECTION_PER_PAGE_LIMITS": ("limits", dict(sorted(limits.items()))), "MUST_FOLLOW_OBSERVED_PREDECESSOR": ("follows", {k: sorted(v) for k, v in P_.items()}),
           "NO_CONSECUTIVE_SAME_SECTION": ("sections", sorted(s for s in secs if s not in {nd["section"] for t in templates for nd in t["nodes"] if nd.get("repeatable")})),
           "NO_ADJACENT_SAME_CATEGORY": ("exceptions", sorted([list(p) for p in pairs if p[0] != p[1] and cat.get(p[0]) == cat.get(p[1])]))}
    for rid, (key, val) in exp.items():
        if rid not in R: errs.append(f"graph: rule {rid} missing"); continue
        if R[rid].get(key) != val: errs.append(f"graph: {rid}.{key} drifted from the value recomputed from templates")
    def pat0(s): return secs[s]["motion"]["allowedPatterns"][0]
    animated = max(sum((nd.get("maxCount", 1) if nd.get("repeatable") else 1) for nd in t["nodes"] if pat0(nd["section"]) != "none") for t in templates)
    pinned = max(sum((nd.get("maxCount", 1) if nd.get("repeatable") else 1) for nd in t["nodes"] if "pinned-scrub" in secs[nd["section"]]["motion"]["allowedPatterns"]) for t in templates)
    if R.get("MOTION_BUDGET", {}).get("max") != animated: errs.append(f"graph: MOTION_BUDGET.max != recomputed {animated}")
    if R.get("PINNED_SCRUB_BUDGET", {}).get("max") != pinned: errs.append(f"graph: PINNED_SCRUB_BUDGET.max != recomputed {pinned}")
    if motion.get("budget", {}).get("maxAnimatedSectionsPerPage") != animated: errs.append("motion: budget.maxAnimatedSectionsPerPage != graph MOTION_BUDGET")
    heroes = max(sum(1 for nd in t["nodes"] if cat.get(nd["section"]) == "HERO") for t in templates)
    if heroes > R.get("ONE_HERO_PER_PAGE", {}).get("max", 1) and not R["ONE_HERO_PER_PAGE"].get("exceptions"): errs.append("graph: a template exceeds ONE_HERO_PER_PAGE")
    if R.get("FOOTER_MUST_BE_LAST", {}).get("sections") and any(t["nodes"][-1]["section"] not in R["FOOTER_MUST_BE_LAST"]["sections"] for t in templates):
        errs.append("graph: FOOTER_MUST_BE_LAST contradicts a template's last node")
    if any(t["nodes"][0]["section"] not in R.get("CHROME_OPENS_PAGE", {}).get("sections", []) for t in templates): errs.append("graph: CHROME_OPENS_PAGE contradicts a template's first node")
    for sid in secs:
        g = graph.get("compatibility", {}).get(sid)
        if not g or g.get("observedPredecessors") != sorted(P_.get(sid, [])): errs.append(f"graph: compatibility[{sid}] drifted from templates")
        if secs[sid].get("compatibility", {}).get("observedPredecessors") != sorted(P_.get(sid, [])): errs.append(f"sections/{sid}: compatibility drifted from templates")
        fam = sorted({t["id"] for t in templates if any(nd["section"] == sid for nd in t["nodes"])})
        if secs[sid]["retrieval"]["pageFamilies"] != fam or (g and g.get("templates") != fam): errs.append(f"sections/{sid}: pageFamilies drifted from templates")
    kinds = graph.get("sectionKinds", {})
    for sid, c in secs.items():
        if c["retrieval"]["kind"] not in kinds: errs.append(f"sections/{sid}: kind '{c['retrieval']['kind']}' not in graph sectionKinds")
        elif kinds[c["retrieval"]["kind"]].get("observedSections", 0) == 0: errs.append(f"sections/{sid}: kind '{c['retrieval']['kind']}' is declared not present on the site")
    for k, v in kinds.items():
        n = sum(1 for c in secs.values() if c["retrieval"]["kind"] == k)
        if v.get("observedSections") != n: errs.append(f"graph: sectionKinds[{k}].observedSections {v.get('observedSections')} != {n}")
    # ------------------------------------------------------------ 9
    cites = []
    for root, _, fs in os.walk(REPO):
        for f in fs:
            if f.endswith(".json"):
                rel = os.path.relpath(os.path.join(root, f), REPO)
                walk(json.load(open(os.path.join(root, f), encoding="utf-8")), lambda o, p, rel=rel: cites.append((rel, p, o)) if {"path", "lines", "anchor"} <= set(o) else None)
    if not cites: errs.append("citations: none found")
    nbad = 0
    for rel, p, c in cites:
        fp = os.path.join(PKG, c["path"])
        sink = errs if EVIDENCE else warns
        if ".." in c["path"].split("/") or c["path"].startswith("/"): errs.append(f"citation {rel}{p}: path {c['path']} must be package-relative"); continue
        if not os.path.isfile(fp):
            if EVIDENCE: errs.append(f"citation {rel}{p}: {c['path']} not found")
            nbad += 1; continue
        lines = open(fp, encoding="utf-8").read().split("\n")
        a, b = c["lines"]
        if not (1 <= a <= b <= len(lines)): errs.append(f"citation {rel}{p}: {c['path']}:{a}-{b} out of range (file has {len(lines)} lines)"); continue
        if not any(c["anchor"] in lines[i - 1] for i in range(a, b + 1)): errs.append(f"citation {rel}{p}: anchor {c['anchor']!r} not within {c['path']}:{a}-{b}")
    if EVIDENCE:
        m = re.search(r"https?://(?:www\.)?([a-z0-9-]+)\.", open(os.path.join(PKG, "CLONE_SPEC.md"), encoding="utf-8").readline())
        brand = m.group(1).lower() if m else None
        for rel, p, c in cites:
            if brand and brand in c["anchor"].lower(): errs.append(f"citation {rel}{p}: anchor quotes the measured site's name; use a neutral anchor")
    if nbad and not EVIDENCE:
        missing_files = sorted({c["path"] for _, _, c in cites if not os.path.isfile(os.path.join(PKG, c["path"]))})
        warns.append(f"citations: {nbad} of {len(cites)} citations unresolved (evidence tree absent; {len(missing_files)} distinct source files, e.g. {', '.join(missing_files[:4])})")
    for sid, c in secs.items():
        if not c.get("evidence", {}).get("spec") or not c["evidence"].get("code"): errs.append(f"sections/{sid}: needs spec and code citations")
    # ------------------------------------------------------------ 10
    allf = {**F}
    refs = {**F, **S, **L}
    for f, dd in C.items():
        for k in dd["tokens"]: refs[f"{dd['component']}.{k}"] = 1
    def chk_ref(o, path):
        for k, v in o.items():
            if isinstance(v, str):
                for r in re.findall(r"\{([a-zA-Z0-9_.-]+)\}", v):
                    if r not in refs and not any(x.startswith(r + ".") for x in F): errs.append(f"tokens: {path}.{k} references unknown token {{{r}}}")
    for rel in [f"tokens/{t}/{f}" for t in ("10-semantic", "20-component", "30-layout") for f in files_in(f"tokens/{t}")] + ["motion/motion-contract.json"]:
        walk(J(rel), chk_ref, rel)
    theme = J("tokens/themes/light.json")["resolves"]
    def hex8(h, a): return h.upper() + f"{int(a * 255 + 0.5):02X}"
    for k, v in S.items():
        if k not in theme: errs.append(f"theme: semantic {k} unresolved"); continue
        ref = v["$value"].strip("{}") if isinstance(v["$value"], str) else None
        if v.get("$type") == "color":
            want = hex8(allf[ref]["$value"], v["alpha"]) if "alpha" in v else allf.get(ref, {}).get("$value")
            if theme[k] != want: errs.append(f"theme: {k} resolves to {theme[k]}, recomputed {want}")
        elif v.get("$type") == "typography":
            for bp in ("mobile", "tablet", "desktop"):
                if f"{ref}.{bp}" in allf and theme[k].get(bp) != allf[f"{ref}.{bp}"]["$value"]: errs.append(f"theme: {k}.{bp} != {ref}.{bp}")
        elif ref and ref in allf and theme[k] != allf[ref]["$value"]:
            errs.append(f"theme: {k} != {ref}")
    for k in theme:
        if k not in S: errs.append(f"theme: resolves unknown token {k}")
    cat_ = J("tokens/llm/token-catalog.json")["categories"]
    pol = J("tokens/llm/token-policy.json")
    comp_ids = {f"{dd['component']}.{k}" for dd in C.values() for k in dd["tokens"]}
    for c_, ids in cat_.items():
        for i in ids:
            if i not in S and i not in L and i not in comp_ids: errs.append(f"catalog: {c_} lists unknown token {i}")
    if sorted(pol.get("rawValueRestrictions", {})) != sorted(cat_): errs.append(f"policy: rawValueRestrictions categories {sorted(pol.get('rawValueRestrictions', {}))} != catalog {sorted(cat_)}")
    if pol.get("rawValuesAllowed") is not False: errs.append("policy: rawValuesAllowed must be false")
    for k, t in F.items():
        if "code" not in t and "valueCheck" not in t: errs.append(f"tokens: foundation {k} has neither a code parity mapping nor a valueCheck (unchecked value)")
    if SRC:
        code_parity(F)
    if True:  # frames checks need no evidence tree; file-based checks return early when their source is absent
        vtokens = dict(F)
        for f_, dd in C.items():
            vtokens.update({f"{dd['component']}.{k}": v for k, v in dd["tokens"].items()})
        vtokens.update(L)
        for k, t in vtokens.items():
            for chk in t.get("valueCheck", []):
                value_check(k, t, chk)
    # ------------------------------------------------------------ 11
    roles = reg["roles"]
    for r, pol_ in PINNED.items():
        if roles.get(r, {}).get("generationPolicy") != pol_: errs.append(f"assets: pinned role '{r}' must be {pol_}, registry says {roles.get(r, {}).get('generationPolicy')}")
    if set(reg.get("protectedRoles", [])) != PROTECTED: errs.append(f"assets: protectedRoles {sorted(reg.get('protectedRoles', []))} != pinned {sorted(PROTECTED)}")
    if set(reg.get("genericDecorativeRoles", [])) != {r for r, v in roles.items() if v.get("generationPolicy") == "may-generate-new"}:
        errs.append("assets: genericDecorativeRoles != roles with may-generate-new")
    for r in PROTECTED:
        if roles.get(r, {}).get("genericRetrieval") is not False: errs.append(f"assets: protected role {r} must have genericRetrieval false")
    for a in reg["assets"]:
        if a["role"] not in roles: errs.append(f"assets: {a['path']} role '{a['role']}' is not in the role vocabulary")
        elif a.get("generationPolicy") != roles[a["role"]]["generationPolicy"]: errs.append(f"assets: {a['path']} policy != its role policy")
    for r, v in roles.items():
        n = sum(1 for a in reg["assets"] if a["role"] == r)
        if v.get("observed") != n: errs.append(f"assets: roles[{r}].observed {v.get('observed')} != {n}")
    pub = os.path.join(PKG, "public")
    if os.path.isdir(pub):
        disk = {}
        for root, _, fs in os.walk(pub):
            for f in fs:
                if not f.endswith(".md") and not f.startswith("."):
                    disk[os.path.relpath(os.path.join(root, f), pub)] = os.path.getsize(os.path.join(root, f))
        regp = {a["path"]: a for a in reg["assets"]}
        for pth in sorted(set(disk) - set(regp)): errs.append(f"assets: public/{pth} is not registered")
        for pth in sorted(set(regp) - set(disk)): errs.append(f"assets: registered {pth} does not exist in public/")
        for pth in set(disk) & set(regp):
            if disk[pth] != regp[pth]["bytes"]: errs.append(f"assets: {pth} bytes {regp[pth]['bytes']} != {disk[pth]} on disk")
    else:
        warns.append("assets: public/ not present beside design-repo/; file existence not checked")
    if os.path.isdir(pub):
        asset_pins(reg)
        if SRC:
            asset_refs(reg)
    for sid, c in secs.items():
        img_fields = {k: v for k, v in c["content"]["fields"].items() if v["type"] == "image[]"}
        declared = sorted({r for v in img_fields.values() for r in v.get("assetRoles", [])})
        if sorted(c.get("assetRoles", [])) != declared: errs.append(f"sections/{sid}: top-level assetRoles {sorted(c.get('assetRoles', []))} != image field roles {declared}")
        for k, v in img_fields.items():
            if not v.get("assetRoles"): errs.append(f"sections/{sid}: image field '{k}' declares no assetRoles")
        for r in c.get("assetRoles", []):
            if r not in roles: errs.append(f"sections/{sid}: assetRole '{r}' not in the vocabulary")
        prot = [r for r in c.get("assetRoles", []) if r in PROTECTED]
        if prot and not c.get("protectedContent", {}).get("must-not-fabricate"): errs.append(f"sections/{sid}: carries protected roles {prot} without protectedContent")
    # ------------------------------------------------------------ 12
    if SRC:
        for sid, c in secs.items():
            for p in set(c.get("implementedByAll", [])) | {c.get("implementedBy")}:
                if not p or not os.path.isfile(os.path.join(PKG, p)): errs.append(f"sections/{sid}: implementedBy {p} does not exist")
            if c.get("implementedBy") not in c.get("implementedByAll", []): errs.append(f"sections/{sid}: implementedBy not in implementedByAll")
        for t in templates:
            if not os.path.isfile(os.path.join(PKG, t["implementedBy"])): errs.append(f"templates: {t['id']} implementedBy {t['implementedBy']} does not exist")
    # ------------------------------------------------------------ 13
    gp = graph.get("granularityPolicy", {})
    labels = {}
    for sid, c in secs.items():
        f = c["content"]["fields"]
        g = c.get("granularity", {})
        rec = {"contentFields": len(f), "copyCapacityWords": sum(copy_capacity(x) for x in f.values()),
               "imageCapacity": sum(x["maxItems"] for x in f.values() if x["type"] == "image[]"),
               "itemCapacity": max([x["maxItems"] for x in f.values() if x["type"] in ("item[]", "tab[]", "quote[]", "plan[]", "row[]", "block[]", "link[]")] or [0])}
        for k, v in rec.items():
            if g.get(k) != v: errs.append(f"granularity: {sid}.{k} = {g.get(k)}, recomputed {v}")
        exc = g.get("exception")
        if exc and exc not in gp.get("exceptions", {}): errs.append(f"granularity: {sid} names unknown exception '{exc}'")
        if rec["contentFields"] > gp.get("maxContentFields", 0): errs.append(f"granularity: {sid} has {rec['contentFields']} content fields (max {gp.get('maxContentFields')})")
        if rec["imageCapacity"] > gp.get("maxImageCapacity", 0): errs.append(f"granularity: {sid} image capacity {rec['imageCapacity']} > {gp.get('maxImageCapacity')}")
        if not exc:
            if rec["copyCapacityWords"] > gp.get("maxCopyCapacityWords", 0): errs.append(f"granularity: {sid} copy capacity {rec['copyCapacityWords']} > {gp.get('maxCopyCapacityWords')} (no exception)")
            if rec["itemCapacity"] > gp.get("maxItemCapacity", 0): errs.append(f"granularity: {sid} item capacity {rec['itemCapacity']} > {gp.get('maxItemCapacity')} (no exception)")
        if sid.split(".")[-1] in gp.get("genericIdLeaves", []): errs.append(f"granularity: {sid} has a generic id")
        lab = c["retrieval"]["semanticLabel"]
        if lab in labels: errs.append(f"retrieval: duplicate semanticLabel {lab} ({labels[lab]}, {sid})")
        labels[lab] = sid
        for fn, fv in f.items():
            if fv["type"] == "text" and fv.get("budgetBasis", "").startswith("spec ~"):
                m = re.match(r"spec ~(\d+)c", fv["budgetBasis"])
                if m and fv["maxWords"] != W(int(m.group(1))): errs.append(f"budget: {sid}.{fn} maxWords {fv['maxWords']} != rule W({m.group(1)}) = {W(int(m.group(1)))}")
    for r in graph.get("retiredSectionIds", {}):
        if r in secs: errs.append(f"retired: '{r}' is retired but has a contract")
    for r in graph.get("retiredTemplateIds", {}):
        if r in {t["id"] for t in templates}: errs.append(f"retired: template '{r}' is retired but still defined")
    # ------------------------------------------------------------ 14
    mp = motion["patterns"]
    for sid, c in secs.items():
        for p_ in c["motion"]["allowedPatterns"]:
            if p_ not in mp: errs.append(f"motion: {sid} pattern '{p_}' not in the motion contract")
            elif c["motion"].get("reducedMotionFallbacks", {}).get(p_) != mp[p_]["reducedMotionFallback"]: errs.append(f"motion: {sid} fallback for '{p_}' != pinned {mp[p_]['reducedMotionFallback']}")
    for p_, v in mp.items():
        n = sum(1 for c in secs.values() if p_ in c["motion"]["allowedPatterns"])
        if v.get("observedSections") != n: errs.append(f"motion: patterns[{p_}].observedSections {v.get('observedSections')} != {n}")
        if v.get("reducedMotionFallback") not in motion.get("reducedMotionFallbacks", {}): errs.append(f"motion: fallback '{v.get('reducedMotionFallback')}' is not described")
    for k, v in F.items():
        if k.startswith("ease.") and motion.get("eases", {}).get(k[5:]) != v["$value"]: errs.append(f"motion: eases[{k[5:]}] != foundation {k}")
    for pin in motion.get("pins", []):
        if pin["section"] not in secs or "pinned-scrub" not in secs[pin["section"]]["motion"]["allowedPatterns"]: errs.append(f"motion: pin for {pin['section']} has no pinned-scrub contract")
    if SRC:
        vis = P("src/motion/visuals.js")
        m = re.search(r"heroDesktop: \[(\d+) / (\d+), (\d+) / (\d+), (\d+) / (\d+)\]", vis)
        if m:
            got = [round(int(m.group(i)) / int(m.group(i + 1)), 3) for i in (1, 3, 5)]
            want = [round(x, 3) for x in motion["autoAdvance"]["intervalsSeconds"]["desktop"]]
            if got != want: errs.append(f"motion: hero intervals {want} != code {got}")
        else:
            errs.append("motion: could not read heroDesktop durations from src/motion/visuals.js")
        m = re.search(r"heroMobile: \[(\d+) / (\d+), (\d+) / (\d+), (\d+) / (\d+)\]", vis)
        if m:
            got = [round(int(m.group(i)) / int(m.group(i + 1)), 3) for i in (1, 3, 5)]
            want = [round(x, 3) for x in motion["autoAdvance"]["intervalsSeconds"]["tabletMobile"]]
            if got != want: errs.append(f"motion: hero tabletMobile intervals {want} != code {got}")
        else:
            errs.append("motion: could not read heroMobile durations from src/motion/visuals.js")
    # ------------------------------------------------------------ 15
    for root, _, fs in os.walk(REPO):
        for f in fs:
            if f.endswith((".json", ".md", ".py")):
                s = open(os.path.join(root, f), encoding="utf-8").read()
                if re.search("/" + "Users/|/" + r"home/[a-z]|[A-Z]:\\\\", s): errs.append(f"paths: absolute machine path in {os.path.relpath(os.path.join(root, f), REPO)}")
    # ------------------------------------------------------------ 17
    if sorted(ledger.get("sections", {})) != sorted(secs): errs.append("ledger: measured-values sections != contracts")
    if sorted(ledger.get("templates", {})) != sorted(t["id"] for t in templates): errs.append("ledger: measured-values templates != templates.json")
    # ------------------------------------------------------------ 16
    sys.path.insert(0, os.path.join(REPO, "schema"))
    from _draft7 import Draft7Subset
    bad = Draft7Subset.check_schema(schema)
    if bad: errs.append(f"schema: keywords the stdlib engine does not implement: {bad[:5]}")
    try:
        from jsonschema import Draft7Validator
        Draft7Validator.check_schema(schema)
        n = len(list(Draft7Validator(schema).iter_errors(J("schema/example.pagespec.json"))))
        if n: errs.append(f"schema: example has {n} jsonschema errors")
    except ImportError:
        warns.append("jsonschema not installed: schema checked with the stdlib draft-07 subset only")
    except Exception as e:
        errs.append(f"schema: not valid draft-07: {e}")
    if list(Draft7Subset(schema).iter_errors(J("schema/example.pagespec.json"))): errs.append("schema: example fails the stdlib draft-07 engine")
    if not os.environ.get("DESIGN_REPO_SKIP_SUITE"):
        for label, env in [("jsonschema", {}), ("stdlib", {"DESIGN_REPO_FORCE_STDLIB": "1"})]:
            e = {**os.environ, **env}
            r = subprocess.run([sys.executable, os.path.join(REPO, "schema/semantic_validate.py"), os.path.join(REPO, "schema/example.pagespec.json")], capture_output=True, text=True, env=e)
            if r.returncode != 0 or "WARN" in r.stdout: errs.append(f"example ({label}): not VALID or has warnings: {r.stdout.strip()[-300:]}")
            r = subprocess.run([sys.executable, os.path.join(REPO, "schema/tests/adversarial_test.py")], capture_output=True, text=True, env=e)
            last = (r.stdout.strip().splitlines() or ["(no output)"])[-1]
            print(f"  adversarial ({label}): {last}")
            if r.returncode != 0: errs.append(f"adversarial ({label}) failed: {r.stdout.strip()[-400:]}")
    return finish()


def tw_block(tw, name):
    """Text of the `name: { ... }` object in tailwind.config.cjs (brace-matched)."""
    i = tw.index(name + ": {")
    j = tw.index("{", i)
    depth = 0
    for k in range(j, len(tw)):
        depth += {"{": 1, "}": -1}.get(tw[k], 0)
        if depth == 0:
            return tw[j:k + 1]
    raise ValueError(name)


def floats(s):
    return [float(x) for x in re.findall(r"-?\d*\.?\d+", s)]


def code_parity(F):
    """Foundation tokens vs code VALUES, both directions (a code value with no token is an orphan)."""
    tw = P("tailwind.config.cjs")
    tw_colors = {k: v.upper() for k, v in re.findall(r"'?([\w-]+)'?:\s*'(#[0-9A-Fa-f]{3,8})'", tw_block(tw, "colors"))}
    tw_type = {}
    for line in tw.split("\n"):
        m = re.match(r"\s*'?([\w-]+)'?: \{ (m|d): \[", line)
        if m:
            for bp, vals in re.findall(r"([mtd]): \[([^\]]+)\]", line):
                tw_type[(m.group(1), bp)] = [float(x) for x in vals.split(",")]
    tw_radius = {k: n for k, n in re.findall(r"'(\d+u)': u\((\d+)\)", tw_block(tw, "borderRadius"))}
    tw_shadow = {k: v for k, v in re.findall(r"(\w+):\s*'([^']+)'", tw_block(tw, "boxShadow"))}
    tw_bg = {k: v for k, v in re.findall(r"'([\w-]+)':\s*'([^']+)'", tw_block(tw, "backgroundImage"))}
    tw_dur = {k: v for k, v in re.findall(r"(\d+): '(\d+ms)'", tw_block(tw, "transitionDuration"))}
    tw_ease = {k: floats(v) for k, v in re.findall(r"(\w+): '(cubic-bezier\([^)]*\))'", tw_block(tw, "transitionTimingFunction"))}
    tw_font = re.findall(r"'([^']+)'", re.search(r"sans: \[([^\]]*)\]", tw).group(1))
    screens = dict(re.findall(r"(md|lg): '(\d+px)'", re.search(r"screens: \{[^}]*\}", tw).group(0)))
    wght = {int(k): int(v) for k, v in re.findall(r"(\d+): (\d+)", re.search(r"const WGHT = \{[^}]*\}", tw).group(0))}
    m = re.search(r"for \(let i = 0; i <= (\d+); i\+\+\)", tw)
    spacing = {"integers": [0, int(m.group(1))] if m else None,
               "extra": sorted(floats(re.search(r";\[([^\]]*)\]\.forEach", tw).group(1)) + [float(x) for x in re.findall(r"uSpacing\['(\d+)u'\]", tw)])}
    css_vars = {}
    for rel in ("src/styles/blocks.css", "src/styles/misc.css"):
        for k, v in re.findall(r"--((?:nw|lg)-[\w-]+):\s*([^;]+);", P(rel)):
            css_vars[k] = v.strip()
    idx = P("src/index.css")
    u = {"mobile": re.search(r"--u: (0\.3125vw);", idx), "tablet": re.search(r"--u: (calc\(100vw / 768\));", idx), "desktop": re.search(r"--u: (calc\(100vw / 1440\));", idx)}
    core = P("src/motion/core.js")
    eases = {k: floats(v) for k, v in re.findall(r"(\w+): CustomEase\.create\('\w+', '([^']+)'\)", core)}
    consts = {k: float(v) for k, v in re.findall(r"(duration550|duration567|delay60|delay66): ([\d.]+)", core)}
    fdiv = re.search(r"export const f = \(n\) => n / (\d+)", core)
    splide = re.search(r"SPLIDE_TRANSITION = '[^']*(cubic-bezier\([^)]*\))'", P("src/motion/carousel.js"))
    num = lambda s: float(str(s).rstrip("u"))
    seen = {x: set() for x in ("tw-color", "tw-type", "css-var", "gsap-ease", "tw-radius", "tw-shadow", "tw-bgimage", "tw-duration", "tw-ease")}
    for tid, t in F.items():
        code = t.get("code")
        if not code:
            continue
        k, key, v = code["kind"], code["key"], t["$value"]
        bad = None
        if k in seen:
            seen[k].add((key, code.get("bp")) if k == "tw-type" else key)
        if k == "tw-color":
            if tw_colors.get(key) != str(v).upper(): bad = tw_colors.get(key)
        elif k == "tw-type":
            got = tw_type.get((key, code["bp"]))
            if got != [num(v["fontSize"]), num(v["lineHeight"]), num(v["letterSpacing"]), float(v["fontWeight"])]: bad = got
        elif k == "tw-radius":
            if tw_radius.get(key) is None or f"{tw_radius[key]}u" != v: bad = tw_radius.get(key)
        elif k == "tw-shadow":
            if tw_shadow.get(key) != v: bad = tw_shadow.get(key)
        elif k == "tw-bgimage":
            if tw_bg.get(key) != v: bad = tw_bg.get(key)
        elif k == "tw-duration":
            if tw_dur.get(key) != v: bad = tw_dur.get(key)
        elif k == "tw-ease":
            if tw_ease.get(key) != [float(x) for x in v]: bad = tw_ease.get(key)
        elif k == "tw-font":
            if tw_font != v: bad = tw_font
        elif k == "tw-spacing":
            if spacing["integers"] != v.get("integers") or spacing["extra"] != sorted(float(x) for x in v.get("extra", [])): bad = spacing
        elif k == "tw-screen":
            if screens.get(key) != v: bad = screens.get(key)
        elif k == "tw-wght":
            if wght.get(int(key)) != t.get("axis") or (key != "400" and int(key) != v) or (key == "400" and v != 400): bad = wght.get(int(key))
        elif k == "css-var":
            got = css_vars.get(key)
            if got is None: bad = None if False else "absent"
            elif got.startswith("cubic"):
                if floats(got) != [float(x) for x in v]: bad = got
            elif got.upper() != str(v).upper(): bad = got
        elif k == "css-u":
            mm = u.get(key)
            if not mm or mm.group(1) != v: bad = mm.group(1) if mm else None
        elif k == "gsap-ease":
            if eases.get(key) != [float(x) for x in v]: bad = eases.get(key)
        elif k == "gsap-const":
            if consts.get(key) is None or f"{consts[key]}s" != v: bad = consts.get(key)
        elif k == "js-const" and key == "f":
            if not fdiv or [float(fdiv.group(1))] != floats(v.split("=")[1]): bad = fdiv.group(1) if fdiv else None
        elif k == "js-const" and key == "SPLIDE_TRANSITION":
            if not splide or floats(splide.group(1)) != [float(x) for x in v]: bad = splide.group(1) if splide else None
        else:
            bad = f"unknown parity kind {k}"
        if bad is not None:
            errs.append(f"parity: {tid} = {v!r} but code ({code['file']}:{key}) has {bad!r}")
    for name, codeset, label in [("tw-color", set(tw_colors), "tailwind colour"), ("tw-type", set(tw_type), "type entry"),
                                 ("css-var", set(css_vars), "CSS variable"), ("gsap-ease", set(eases), "CustomEase"),
                                 ("tw-radius", set(tw_radius), "tailwind borderRadius"), ("tw-shadow", set(tw_shadow), "tailwind boxShadow"),
                                 ("tw-bgimage", set(tw_bg), "tailwind backgroundImage"), ("tw-duration", set(tw_dur), "tailwind transitionDuration"),
                                 ("tw-ease", set(tw_ease), "tailwind transitionTimingFunction")]:
        for key in sorted(codeset - seen[name], key=str):
            errs.append(f"parity: orphan {label} '{key}' has no foundation token")


def value_check(tid, t, chk):
    """A token value must be FOUND in its cited source range (the range itself is validated as a citation)."""
    v = t["$value"]
    if chk.get("mode") == "frames":
        if round(t["frames"] / 60, 3) != float(str(v).rstrip("s")):
            errs.append(f"valueCheck: {tid} = {v!r} != f({t['frames']}) = {round(t['frames'] / 60, 3)}s")
        return
    fp = os.path.join(PKG, chk["path"])
    if not os.path.isfile(fp):
        return
    lines = open(fp, encoding="utf-8").read().split("\n")
    a, b = chk["lines"]
    text = "\n".join(lines[a - 1:b])
    v = t["$value"]
    raw = v if isinstance(v, str) else json.dumps(v)
    ns = re.findall(r"-?\d+(?:\.\d+)?", raw) if not isinstance(v, list) else [("%g" % x) for x in v]
    mode = chk.get("mode")
    if mode == "format":
        for e in chk["expect"]:
            want = e.replace("{v}", str(v))
            for i, n in enumerate(ns):
                want = want.replace("{n%d}" % i, n)
            if re.search(r"\{n\d+\}", want):
                errs.append(f"valueCheck: {tid} expects more numbers than its value has ({e!r})")
            elif not re.search(r"(?<![\w.])" + re.escape(want) if want[:1].isalnum() else re.escape(want), text):
                errs.append(f"valueCheck: {tid} = {v!r} not found in {chk['path']}:{a}-{b} (expected {want!r})")
    elif mode == "regex":
        m = re.search(chk["regex"], text)
        got = [round(x * chk.get("scale", 1), 6) for g in (m.groups() if m else []) for x in floats(g)]
        want = [round(float(x), 6) for x in ns]
        if not m or got != want:
            errs.append(f"valueCheck: {tid} = {v!r} but {chk['path']}:{a}-{b} gives {got}")
    elif mode == "numbers":
        for n in ns:
            if n.lstrip("-") not in text:
                errs.append(f"valueCheck: {tid} number {n} not in {chk['path']}:{a}-{b}")
    elif mode == "frames":
        if round(t["frames"] / 60, 3) != float(str(v).rstrip("s")):
            errs.append(f"valueCheck: {tid} = {v!r} != f({t['frames']}) = {round(t['frames'] / 60, 3)}s")
    else:
        errs.append(f"valueCheck: {tid} has unknown mode {mode!r}")


# Protected roles pinned by FOLDER, independent of the registry and of the ART_MANIFEST.
PATH_PINS = [("assets/art/logos/", {"customer-logo"}), ("assets/art/misc/logos/", {"customer-logo", "partner-logo"}), ("assets/art/avatars/", {"avatar"}),
             ("assets/art/brand/", {"logo"}), ("favicon.svg", {"logo"}), ("assets/art/hero/", {"product-screenshot"}), ("assets/art/compliance/", {"product-screenshot"}),
             ("assets/art/misc/screens/", {"product-screenshot"}), ("assets/art/marketing/partner-", {"partner-logo"}), ("assets/art/marketing-b/about", {"team-photo"}),
             ("assets/art/marketing/scrolltab-", {"product-screenshot"}), ("assets/art/marketing/platform-", {"product-screenshot"}), ("assets/art/marketing/feature-", {"product-screenshot"}),
             ("assets/art/marketing/engine-", {"product-screenshot"}), ("assets/art/marketing/hero-visual", {"product-screenshot"}), ("fonts/", {"font"})]
ART_SECTIONS = {"Brand": {"logo"}, "Logo marquee": {"customer-logo"}, "Testimonial avatars": {"avatar"}, "Hero": {"product-screenshot"}, "Compliance by role": {"product-screenshot"}}


def asset_pins(reg):
    by = {a["path"]: a for a in reg["assets"]}
    for a in reg["assets"]:
        for prefix, allowed in PATH_PINS:
            if a["path"].startswith(prefix) and a["role"] not in allowed:
                errs.append(f"assets: path pin: {a['path']} must be {'|'.join(sorted(allowed))} (folder {prefix}), registry says {a['role']}")
    for prefix, _ in PATH_PINS:
        if not any(p.startswith(prefix) for p in by):
            errs.append(f"assets: path pin {prefix} matches no registered asset (pin list is stale)")
    man = os.path.join(PKG, "public/assets/art/ART_MANIFEST.md")
    if not os.path.isfile(man):
        warns.append("assets: public/assets/art/ART_MANIFEST.md absent; manifest cross-check skipped")
        return
    head, n, heads = None, 0, set()
    for line in open(man, encoding="utf-8"):
        if line.startswith("## "):
            head = line[3:].strip()
            continue
        for f in re.findall(r"\| `([a-z0-9/_.-]+\.svg)` \|", line):
            want = next((v for k, v in ART_SECTIONS.items() if head and head.startswith(k)), None)
            if not want:
                continue
            n += 1
            heads.add(next(k for k in ART_SECTIONS if head.startswith(k)))
            a = by.get("assets/art/" + f)
            if not a:
                errs.append(f"assets: ART_MANIFEST ({head}) lists {f}, which is not registered")
            elif a["role"] not in want:
                errs.append(f"assets: ART_MANIFEST ({head}) says {f} is {'|'.join(sorted(want))}, registry says {a['role']}")
    if heads != set(ART_SECTIONS):
        errs.append(f"assets: ART_MANIFEST cross-check found no rows for {sorted(set(ART_SECTIONS) - heads)}")


def asset_refs(reg):
    """referencedBy evidence is recomputed: listed files must exist and mention the asset; an asset recorded as
    unreferenced must not be referenced by src/ or index.html."""
    texts = {"index.html": P("index.html")}
    for root, _, fs in os.walk(os.path.join(PKG, "src")):
        for f in fs:
            if f.endswith((".js", ".jsx", ".css")):
                texts[os.path.relpath(os.path.join(root, f), PKG)] = open(os.path.join(root, f), encoding="utf-8").read()
    for a in reg["assets"]:
        refs = a.get("evidence", {}).get("referencedBy", [])
        url = "/" + a["path"]
        for r in refs:
            if r not in texts: errs.append(f"assets: {a['path']} referencedBy {r}, which does not exist")
        if not refs:
            hit = sorted(k for k, t in texts.items() if f'"{url}"' in t or f"'{url}'" in t or (a["path"].startswith("assets/art/") and a["path"][len("assets/art/"):] in t))
            if hit: errs.append(f"assets: {a['path']} is recorded as unreferenced but is referenced by {', '.join(hit[:3])}")


def resource_leaf_count():
    """Leaf total re-derived with stdlib from src/data/content/resourceSlugs.js + states.js (mirrors resourceLeaves.js LEAVES)."""
    s = P("src/data/content/resourceSlugs.js")
    def vals(name):
        m = re.search(r"export const " + name + r" = (\{.*?\n\}|'[^']*')", s, re.S).group(1)
        if m.startswith("'"):
            return [x for x in m.strip("'").split("|") if x]
        return [x for v in re.findall(r":\s*'([^']*)'", m) for x in v.split("|") if x]
    states = len(re.findall(r"\['[a-z-]+', '", P("src/data/content/states.js")))
    return 4 * states + (states - len(vals("SALES_TAX_EXCLUDED"))) + sum(len(vals(n)) for n in ("AGENCIES_PREFIXED", "AGENCIES_INFERRED", "AGENCIES_UNPLACED", "LOCAL"))


def finish():
    for w in warns:
        print("WARN:", w)
    if errs:
        print(f"NOT ADMITTED: {len(errs)} error(s)")
        for e in errs[:80]:
            print("  -", e)
        sys.exit(1)
    print(f"ADMITTED: all checks passed ({len(warns)} warning(s))")
    sys.exit(0)


if __name__ == "__main__":
    main()
