#!/usr/bin/env python3
"""Check archive integrity prior to deploy."""
from pathlib import Path
import json
import re
from ingest import normalize_doi

ROOT = Path(__file__).resolve().parents[1]
db = json.loads((ROOT / "data/papers.json").read_text("utf-8"))
rows = db["papers"]
assert isinstance(rows, list)
ids, aliases = set(), set()
for row in rows:
    assert row["id"] and row["id"] not in ids, "Duplicate / empty paper ID"
    ids.add(row["id"])
    assert row["title"] and row["source_url"].startswith("https://")
    for f in ["first_public_date", "discovered_at"]:
        assert (f == "first_public_date" and row.get(f) == "") or re.fullmatch(r"\d{4}(-\d{2}(-\d{2})?)?", row[f]), f"Invalid {f}: {row['id']}"
    for alias in row.get("aliases", []):
        assert alias not in aliases, f"Duplicate alias {alias}"
        aliases.add(alias)
    if row.get("doi"):
        assert "doi:" + normalize_doi(row["doi"]) in row.get("aliases", []), row["id"]
print(f"Validated {len(rows)} paper records")
