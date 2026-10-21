#!/usr/bin/env python3
"""Check source completeness without discarding a partial bibliography."""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]


def evaluate(config, run):
    enabled = {x["id"] for x in config.get("journals", []) if x.get("enabled")}
    observed = {x["id"]: x for x in run.get("sources", [])}
    ok = sum(observed.get(name, {}).get("status") == "ok" for name in enabled)
    missing = sorted(name for name in enabled if observed.get(name, {}).get("status") != "ok")
    zero = sorted(name for name in enabled if observed.get(name, {}).get("status") == "ok" and not observed[name].get("fetched"))
    capped = sorted(name for name in enabled if observed.get(name, {}).get("truncated"))
    return len(enabled), ok, missing, zero, capped


def main():
    cfg = json.loads((ROOT / "config/sources.json").read_text(encoding="utf-8"))
    runs = json.loads((ROOT / "data/runs.json").read_text(encoding="utf-8")).get("runs", [])
    if not runs:
        print("::error::No recorded ingestion run")
        return 1
    total, ok, missing, zero, capped = evaluate(cfg, runs[-1])
    print(f"Journal sources queried successfully: {ok}/{total}")
    if missing:
        print("::warning title=Journal source failures::" + ", ".join(missing))
    if zero:
        print("::warning title=Zero-result journals (verify manually)::" + ", ".join(zero))
    if capped:
        print("::warning title=Incomplete source window::" + ", ".join(capped))
    if total and ok * 4 < total * 3:
        print("::error::Less than 75% of configured journals were retrieved")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
