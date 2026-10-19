"""Stdlib fallback: the JSON Schema draft-07 subset that schema/pagespec.schema.json uses.

Used only when the `jsonschema` package is not installed. Keywords: $ref (local #/definitions/...), type, enum,
const, required, properties, additionalProperties (bool), items (schema), minItems, maxItems, minLength, pattern,
allOf, anyOf, if/then. Error messages mirror jsonschema's wording so the adversarial suite's needles match.
Unknown keywords (e.g. the `maxWords` annotation) are ignored, as draft-07 requires.
"""
import json, re

_TYPES = {"object": dict, "array": list, "string": str, "boolean": bool, "null": type(None)}


class Err:
    def __init__(self, message, path):
        self.message = message
        self.absolute_path = list(path)


def _is_type(v, t):
    if isinstance(t, list):
        return any(_is_type(v, x) for x in t)
    if t == "integer":
        return isinstance(v, int) and not isinstance(v, bool)
    if t == "number":
        return isinstance(v, (int, float)) and not isinstance(v, bool)
    if t in ("object", "array", "string", "null"):
        return isinstance(v, _TYPES[t])
    if t == "boolean":
        return isinstance(v, bool)
    return True


class Draft7Subset:
    SUPPORTED = {"$schema", "$ref", "title", "description", "type", "enum", "const", "required", "properties", "additionalProperties", "items",
                 "minItems", "maxItems", "minLength", "pattern", "allOf", "anyOf", "if", "then", "definitions", "maxWords"}

    def __init__(self, schema):
        self.root = schema

    @staticmethod
    def check_schema(schema):
        """Minimal meta-check: every keyword used is one this subset implements (so nothing is silently skipped)."""
        bad = []
        def walk(s, path):
            if isinstance(s, dict):
                for k, v in s.items():
                    if path and path[-1] in ("properties", "definitions"):
                        walk(v, path + [k])
                        continue
                    if k not in Draft7Subset.SUPPORTED:
                        bad.append("/".join(path + [k]))
                    walk(v, path + [k])
            elif isinstance(s, list):
                for i, x in enumerate(s):
                    walk(x, path + [str(i)])
        walk(schema, [])
        return bad

    def _resolve(self, ref):
        node = self.root
        for part in ref.lstrip("#/").split("/"):
            node = node[part]
        return node

    def iter_errors(self, inst, schema=None, path=()):
        schema = self.root if schema is None else schema
        if "$ref" in schema:
            yield from self.iter_errors(inst, self._resolve(schema["$ref"]), path)
            return
        if "type" in schema and not _is_type(inst, schema["type"]):
            yield Err(f"{json.dumps(inst)} is not of type {json.dumps(schema['type'])}", path)
            return
        if "enum" in schema and inst not in schema["enum"]:
            yield Err(f"{json.dumps(inst)} is not one of {json.dumps(schema['enum'])}", path)
        if "const" in schema and inst != schema["const"]:
            yield Err(f"{json.dumps(schema['const'])} was expected", path)
        if isinstance(inst, str):
            if "minLength" in schema and len(inst) < schema["minLength"]:
                yield Err(f"{json.dumps(inst)} is too short", path)
            if "pattern" in schema and not re.search(schema["pattern"], inst):
                yield Err(f"{json.dumps(inst)} does not match {json.dumps(schema['pattern'])}", path)
        if isinstance(inst, list):
            if "minItems" in schema and len(inst) < schema["minItems"]:
                yield Err(f"{json.dumps(inst)[:80]} should be non-empty" if schema["minItems"] == 1 else "is too short", path)
            if "maxItems" in schema and len(inst) > schema["maxItems"]:
                yield Err(f"{json.dumps(inst)[:80]} is too long", path)
            if isinstance(schema.get("items"), dict):
                for i, x in enumerate(inst):
                    yield from self.iter_errors(x, schema["items"], path + (i,))
        if isinstance(inst, dict):
            for r in schema.get("required", []):
                if r not in inst:
                    yield Err(f"'{r}' is a required property", path)
            props = schema.get("properties", {})
            for k, v in inst.items():
                if k in props:
                    yield from self.iter_errors(v, props[k], path + (k,))
            if schema.get("additionalProperties") is False:
                extra = [k for k in inst if k not in props]
                if extra:
                    yield Err("Additional properties are not allowed (" + ", ".join(f"'{k}'" for k in extra) + (" was" if len(extra) == 1 else " were") + " unexpected)", path)
        for sub in schema.get("allOf", []):
            yield from self.iter_errors(inst, sub, path)
        if "anyOf" in schema and not any(not list(self.iter_errors(inst, s, path)) for s in schema["anyOf"]):
            yield Err(f"{json.dumps(inst)[:80]} is not valid under any of the given schemas", path)
        if "if" in schema and not list(self.iter_errors(inst, schema["if"], path)) and "then" in schema:
            yield from self.iter_errors(inst, schema["then"], path)
