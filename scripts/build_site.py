#!/usr/bin/env python3
"""Build a static deployable directory without Node packages."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "dist"
if TARGET.exists():
    shutil.rmtree(TARGET)
shutil.copytree(ROOT / "site", TARGET)
(TARGET / "data").mkdir(parents=True, exist_ok=True)
for name in ["papers.json", "runs.json", "reports.json", "conferences.json"]:
    shutil.copy2(ROOT / "data" / name, TARGET / "data" / name)
shutil.copy2(ROOT / "config/sources.json", TARGET / "data/sources.json")
(TARGET / ".nojekyll").write_text("", encoding="utf-8")
print("Built", TARGET)
