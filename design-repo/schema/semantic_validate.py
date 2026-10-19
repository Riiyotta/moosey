#!/usr/bin/env python3
"""Semantic validator for a PageSpec against this design repo.

Enforces, in order:
  1. JSON Schema draft-07 (schema/pagespec.schema.json): structural closure. Uses `jsonschema` when installed,
     otherwise the bundled stdlib draft-07 subset in schema/_draft7.py (same keywords this schema uses).
  2. retired ids: composite/renamed ids are rejected by name with their replacement.
  3. template cross-reference: the node sequence must follow the DECLARED template's own node list
     (order, required nodes present, repeatable/maxCount respected, no foreign sections).
  4. every rule in compatibility/graph.json, respecting severity (error fails, warn is reported),
     including ROUTE_MATCHES_TEMPLATE (spec.route vs the template's routePatterns).
  5. per-field maxWords budgets from sections/<id>.json, on this instance (all field types).
  6. motion: pattern allowed for that section; reducedMotionFallback must be the one pinned to that pattern.
  7. images: assetRole allowed by that section; protected roles must declare source placeholder|supplied;
     an `asset` path must exist in assets/asset-roles.json with a compatible role.

Usage:  python3 semantic_validate.py <pagespec.json>
Import: check(spec) -> (errors, warnings)
"""
import json, os, re, sys
sys.dont_write_bytecode = True

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
RULE_KINDS = {"maxCategoryPerPage", "perPageLimits", "firstNodeIn", "mustBeFirst", "mustBeLast", "mustFollow", "routeMatchesTemplate",
              "noConsecutive", "noAdjacentSameCategory", "maxAnimatedSections", "maxPatternPerPage"}
_CACHE = {}


def load(rel):
    if rel not in _CACHE:
        with open(os.path.join(REPO, rel), encoding="utf-8") as f:
            _CACHE[rel] = json.load(f)
    return _CACHE[rel]


def words(s):
    return len(str(s).split())


def contracts():
    if "__sections__" not in _CACHE:
        out = {}
        d = os.path.join(REPO, "sections")
        for f in sorted(os.listdir(d)):
            if f.endswith(".json"):
                with open(os.path.join(d, f), encoding="utf-8") as fh:
                    c = json.load(fh)
                out[c["id"]] = c
        _CACHE["__sections__"] = out
    return _CACHE["__sections__"]


def validator():
    if "__validator__" not in _CACHE:
        schema = load("schema/pagespec.schema.json")
        try:
            if os.environ.get("DESIGN_REPO_FORCE_STDLIB"):
                raise ImportError("forced stdlib draft-07 subset")
            from jsonschema import Draft7Validator
            v = Draft7Validator(schema)
        except ImportError:
            sys.path.insert(0, HERE)
            from _draft7 import Draft7Subset
            v = Draft7Subset(schema)
        _CACHE["__validator__"] = v
    return _CACHE["__validator__"]


def route_ok(route, patterns):
    for p in patterns:
        if p == "*":
            return True
        rx = "^" + re.sub(r":[a-zA-Z]+", "[^/]+", p) + "/?$"
        if re.match(rx, route or ""):
            return True
    return False


def budget_errors(where, f, val, errs):
    """maxWords on one field value according to its contract field type."""
    t = f["type"]
    over = lambda path, s, mx: words(s) > mx and errs.append(f"maxWords: {where}{path} has {words(s)} words (max {mx})")
    L = val if isinstance(val, list) else []
    if t == "text" and isinstance(val, str):
        over("", val, f["maxWords"])
    elif t == "text[]":
        for j, s in enumerate(L):
            over(f"[{j}]", s, f["maxWords"])
    elif t in ("cta[]", "link[]"):
        for j, x in enumerate(L):
            if isinstance(x, dict):
                over(f"[{j}].label", x.get("label", ""), f["maxWords"])
    elif t == "item[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                over(f"[{j}].title", x.get("title", ""), f["titleMaxWords"])
                if "body" in x:
                    over(f"[{j}].body", x["body"], f.get("bodyMaxWords", 0))
    elif t == "tab[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                over(f"[{j}].label", x.get("label", ""), f["labelMaxWords"])
                for k, e in enumerate(x.get("entries", []) if isinstance(x.get("entries"), list) else []):
                    if isinstance(e, dict):
                        over(f"[{j}].entries[{k}].title", e.get("title", ""), f["titleMaxWords"])
                        over(f"[{j}].entries[{k}].body", e.get("body", ""), f["bodyMaxWords"])
    elif t == "quote[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                over(f"[{j}].quote", x.get("quote", ""), f["quoteMaxWords"])
                over(f"[{j}].name", x.get("name", ""), f["nameMaxWords"])
                if "role" in x:
                    over(f"[{j}].role", x["role"], f["roleMaxWords"])
                if "support" in x:
                    over(f"[{j}].support", x["support"], f.get("supportMaxWords", 0))
    elif t == "plan[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                for k in ("label", "title", "body", "price", "unit", "fee", "feeLabel"):
                    if k in x:
                        over(f"[{j}].{k}", x[k], f["maxWords"])
    elif t == "row[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                over(f"[{j}].label", x.get("label", ""), f["labelMaxWords"])
                for k, v in enumerate(x.get("values", []) if isinstance(x.get("values"), list) else []):
                    if isinstance(v, str):
                        over(f"[{j}].values[{k}]", v, f["valueMaxWords"])
    elif t == "field[]":
        for j, x in enumerate(L):
            if isinstance(x, dict) and "label" in x:
                over(f"[{j}].label", x["label"], f["labelMaxWords"])
    elif t == "block[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                if "text" in x:
                    over(f"[{j}].text", x["text"], f["maxWords"])
                for k, it in enumerate(x.get("items", []) if isinstance(x.get("items"), list) else []):
                    over(f"[{j}].items[{k}]", it, f["maxWords"])
    elif t == "ctaCard[]":
        for j, x in enumerate(L):
            if isinstance(x, dict):
                over(f"[{j}].title", x.get("title", ""), f["titleMaxWords"])
                if "body" in x:
                    over(f"[{j}].body", x["body"], f["bodyMaxWords"])
                if "buttonLabel" in x:
                    over(f"[{j}].buttonLabel", x["buttonLabel"], f["buttonMaxWords"])
    elif t == "image[]":
        for j, x in enumerate(L):
            if isinstance(x, dict) and "alt" in x:
                over(f"[{j}].alt", x["alt"], 16)


def check(spec):
    errors, warnings = [], []
    v = validator()
    for e in sorted(v.iter_errors(spec), key=lambda e: [str(p) for p in e.absolute_path]):
        loc = "/".join(str(p) for p in e.absolute_path) or "(root)"
        errors.append(f"schema: {loc}: {e.message}")
    if not isinstance(spec, dict) or not isinstance(spec.get("nodes"), list):
        return errors or ["schema: nodes must be a list"], warnings
    graph = load("compatibility/graph.json")
    nodes = [n for n in spec["nodes"] if isinstance(n, dict)]
    types = [n.get("type") for n in nodes]
    tid = spec.get("template")
    # ---- 2. retired ids
    for k, ty in enumerate(types):
        if ty in graph.get("retiredSectionIds", {}):
            errors.append(f"retired: node {k + 1} uses '{ty}' -- {graph['retiredSectionIds'][ty]}")
    if tid in graph.get("retiredTemplateIds", {}):
        errors.append(f"retired: template '{tid}' -- {graph['retiredTemplateIds'][tid]}")
    secs = contracts()
    templates = {t["id"]: t for t in load("templates/templates.json")["templates"]}

    # ---- 3. declared template cross-reference
    t = templates.get(tid)
    if t:
        i = 0
        tsecs = [tn["section"] for tn in t["nodes"]]
        for k, tn in enumerate(t["nodes"]):
            cnt = 0
            while i < len(types) and types[i] == tn["section"] and (cnt == 0 or tn.get("repeatable")):
                cnt += 1
                i += 1
            if cnt == 0 and tn.get("required"):
                if tn["section"] in types[i:]:
                    errors.append(f"template: section '{tn['section']}' is out of order for {tid} (expected as node {k + 1})")
                else:
                    errors.append(f"template: required section '{tn['section']}' missing (node {k + 1} of {tid})")
            if tn.get("repeatable") and cnt > tn.get("maxCount", cnt):
                errors.append(f"template: section '{tn['section']}' repeated {cnt}x, max {tn['maxCount']} at node {k + 1} of {tid}")
        if i < len(types):
            extra = types[i]
            if extra in tsecs:
                errors.append(f"template: section '{extra}' is out of order or repeated beyond the template at node {i + 1} of {tid}")
            else:
                errors.append(f"template: section '{extra}' is not part of template {tid}")

    # ---- 4. compatibility graph (severity-aware)
    cat = {sid: c["category"] for sid, c in secs.items()}
    for rule in graph["rules"]:
        kind, rid = rule.get("kind"), rule.get("id")
        sink = errors if rule.get("severity") == "error" else warnings
        tag = f"{rid} ({rule.get('severity')})"
        if kind not in RULE_KINDS:
            errors.append(f"graph: rule {rid} has kind '{kind}' that this validator does not implement")
            continue
        if kind == "maxCategoryPerPage":
            n = sum(1 for s in types if cat.get(s) == rule["category"])
            if n > rule["max"] and tid not in rule.get("exceptions", []):
                sink.append(f"{tag}: {n} {rule['category']} sections on one page (max {rule['max']})")
        elif kind == "perPageLimits":
            for s, lim in rule["limits"].items():
                if types.count(s) > lim:
                    sink.append(f"{tag}: '{s}' appears {types.count(s)}x (limit {lim})")
        elif kind == "firstNodeIn":
            if types and types[0] not in rule["sections"]:
                sink.append(f"{tag}: first node is '{types[0]}', expected one of {', '.join(rule['sections'])}")
        elif kind == "mustBeFirst":
            for s in rule["sections"]:
                if s in types and types[0] != s:
                    sink.append(f"{tag}: '{s}' must be the first node")
        elif kind == "mustBeLast":
            for s in rule["sections"]:
                if s in types and types[-1] != s:
                    sink.append(f"{tag}: '{s}' must be the last node")
        elif kind == "mustFollow":
            for a, b in zip(["^"] + types, types):
                if b in rule["follows"] and a not in rule["follows"][b]:
                    sink.append(f"{tag}: '{b}' follows {a!r}, observed only after {', '.join(rule['follows'][b])}")
        elif kind == "routeMatchesTemplate":
            if t and not route_ok(spec.get("route"), t.get("routePatterns", [])):
                sink.append(f"{tag}: route {spec.get('route')!r} does not match {tid} routePatterns {t.get('routePatterns')}")
        elif kind == "noConsecutive":
            for a, b in zip(types, types[1:]):
                if a == b and a in rule["sections"]:
                    sink.append(f"{tag}: '{a}' appears twice in a row")
        elif kind == "noAdjacentSameCategory":
            allowed = {tuple(p) for p in rule.get("exceptions", [])}
            for a, b in zip(types, types[1:]):
                if a != b and a in cat and cat.get(a) == cat.get(b) and (a, b) not in allowed:
                    sink.append(f"{tag}: '{a}' and '{b}' are both {cat[a]} and adjacent")
        elif kind == "maxAnimatedSections":
            n = sum(1 for nd in nodes if isinstance(nd.get("motion"), dict) and nd["motion"].get("pattern") not in (None, "none"))
            if n > rule["max"]:
                sink.append(f"{tag}: {n} animated sections (max {rule['max']})")
        elif kind == "maxPatternPerPage":
            n = sum(1 for nd in nodes if isinstance(nd.get("motion"), dict) and nd["motion"].get("pattern") == rule["pattern"])
            if n > rule["max"]:
                sink.append(f"{tag}: {n} '{rule['pattern']}' sections (max {rule['max']})")

    # ---- 5-7. budgets, motion, assets
    reg = load("assets/asset-roles.json")
    protected = set(reg.get("protectedRoles", []))
    asset_role = {a["path"]: {a["role"], *a.get("alsoServes", [])} for a in reg.get("assets", [])}
    fallback = {p: d["reducedMotionFallback"] for p, d in load("motion/motion-contract.json")["patterns"].items()}
    for k, nd in enumerate(nodes):
        c = secs.get(nd.get("type"))
        if not c:
            continue
        f = c["content"]["fields"]
        content = nd.get("content") if isinstance(nd.get("content"), dict) else {}
        where = f"node {k + 1} ({nd.get('type')})"
        for name, val in content.items():
            if name in f:
                budget_errors(f"{where}.{name}", f[name], val, errors)
        m = nd.get("motion")
        if not isinstance(m, dict) or not m.get("reducedMotionFallback"):
            errors.append(f"motion: {where} has no reducedMotionFallback")
        elif m.get("pattern") not in c["motion"]["allowedPatterns"]:
            errors.append(f"motion: {where} pattern '{m.get('pattern')}' not allowed (allowed: {', '.join(c['motion']['allowedPatterns'])})")
        elif fallback.get(m.get("pattern")) != m.get("reducedMotionFallback"):
            errors.append(f"motion: {where} reducedMotionFallback '{m.get('reducedMotionFallback')}' is wrong for pattern '{m.get('pattern')}' (pinned: {fallback.get(m.get('pattern'))})")
        imgs = content.get("images") if isinstance(content.get("images"), list) else []
        roles = f.get("images", {}).get("assetRoles", [])
        for j, im in enumerate(imgs):
            if not isinstance(im, dict):
                continue
            r = im.get("assetRole")
            if not roles:
                errors.append(f"assetRole: {where}.images[{j}] role '{r}' rejected: this section's image field declares no assetRoles")
            elif r not in roles:
                errors.append(f"assetRole: {where}.images[{j}] role '{r}' not used by this section (allowed: {', '.join(roles)})")
            if r in protected and im.get("source") not in ("placeholder", "supplied"):
                errors.append(f"assetRole: {where}.images[{j}] role '{r}' is protected (must-not-fabricate): it needs source 'placeholder' or 'supplied'")
            if "asset" in im:
                if im["asset"] not in asset_role:
                    errors.append(f"asset: {where}.images[{j}] asset '{im['asset']}' is not in assets/asset-roles.json")
                elif r not in asset_role[im["asset"]]:
                    errors.append(f"asset: {where}.images[{j}] asset '{im['asset']}' has role {sorted(asset_role[im['asset']])}, not '{r}'")
    return errors, warnings


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: semantic_validate.py <pagespec.json>")
    with open(sys.argv[1], encoding="utf-8") as f:
        errors, warnings = check(json.load(f))
    for w in warnings:
        print("WARN:", w)
    if errors:
        print("INVALID:")
        for e in errors:
            print("  -", e)
        sys.exit(1)
    print("VALID")
    sys.exit(0)


if __name__ == "__main__":
    main()
