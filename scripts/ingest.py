#!/usr/bin/env python3
"""Incremental public-metadata ingestion. Python standard library only.

No automated schedules are installed in this repository. To run manually:
  python scripts/ingest.py --since-days 21
"""
from __future__ import annotations

import argparse
from datetime import datetime, timedelta, timezone
from difflib import SequenceMatcher
from email.utils import parsedate_to_datetime
from hashlib import sha256
from html import unescape
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
import time
import unicodedata
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parents[1]
TODAY = datetime.now(timezone.utc).date()
USER_AGENT = "FrontierRadar/0.1 (+https://github.com; public bibliographic metadata)"
CROSSREF_SELECT_FIELDS = "DOI,title,author,abstract,published-online,published,published-print,issued,type"


class TextParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []

    def handle_data(self, data):
        self.parts.append(data)


def clean_html(value):
    parser = TextParser()
    parser.feed(unescape(str(value or "")))
    return re.sub(r"\s+", " ", " ".join(parser.parts)).strip()


def normalize_title(title):
    ascii_fold = unicodedata.normalize("NFKD", title or "")
    ascii_fold = "".join(c for c in ascii_fold if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", ascii_fold.lower()).strip()


def normalize_doi(doi):
    doi = (doi or "").strip().lower()
    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi)
    return doi.replace("doi:", "").strip()


def is_chinese_title(title):
    return bool(re.search(r"[\u3400-\u9fff]", title or ""))


def parse_date(value):
    if not value:
        return ""
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(value)):
        return str(value)
    try:
        return parsedate_to_datetime(str(value)).date().isoformat()
    except (ValueError, TypeError, IndexError):
        return ""


def parse_date_parts(item):
    parts = (item or {}).get("date-parts", [])
    if not parts or not parts[0]:
        return ""
    chunk = list(parts[0])
    try:
        year = int(chunk[0])
        if len(chunk) == 1:
            return f"{year:04d}"
        month = int(chunk[1])
        if len(chunk) == 2:
            return f"{year:04d}-{month:02d}"
        return datetime(year, month, int(chunk[2])).date().isoformat()
    except (ValueError, TypeError, IndexError):
        return ""


def known_tags(title, abstract=""):
    words = (title + " " + abstract[:600]).lower()
    rules = [
        ("ai-technology", ["artificial intelligence", "machine learning", "chatgpt", "generative ai", "automation", "patent", "innovation", "technology"]),
        ("banking", ["bank", "credit supply", "lending", "intermediation"]),
        ("finance", ["asset pric", "stock market", "venture capital", "private equity", "equity", "capital structure", "investment"]),
        ("labor", ["worker", "employment", "wage", "labor", "job ", "migration"]),
        ("trade", ["trade", "tariff", "supply chain", "global value chain", "export"]),
        ("public-econ", ["tax", "regulation", "fiscal", "public finance", "government", "industrial policy"]),
        ("methods", ["causal inference", "instrumental variable", "estimation", "randomized experiment"]),
        ("macro", ["monetary policy", "inflation", "business cycle", "macroeconomic"]),
    ]
    for category, terms in rules:
        if any(term in words for term in terms):
            return category
    return "other"


def stable_key(item):
    raw = normalize_doi(item.get("doi")) or normalize_title(item.get("title", ""))
    return "p_" + sha256(raw.encode("utf-8")).hexdigest()[:14]


def ensure_url(candidate):
    candidate = (candidate or "").strip()
    return candidate if candidate.startswith("https://") or candidate.startswith("http://") else ""


def dedupe_aliases(item):
    aliases = list(item.get("aliases") or [])
    doi = normalize_doi(item.get("doi"))
    if doi:
        aliases.append("doi:" + doi)
    return sorted(set(a.strip().lower() for a in aliases if a))


def find_match(papers, incoming):
    incoming_aliases = set(dedupe_aliases(incoming))
    for entry in papers:
        if incoming_aliases.intersection(dedupe_aliases(entry)):
            return entry
    wanted = normalize_title(incoming.get("title", ""))
    if len(wanted) < 22:
        return None
    incoming_authors = [normalize_title(s).split(" ")[-1] for s in incoming.get("authors", []) if s.strip()]
    for entry in papers:
        existing = normalize_title(entry.get("title", ""))
        if len(existing) < 22 or SequenceMatcher(None, wanted, existing).ratio() < 0.96:
            continue
        existing_authors = [normalize_title(s).split(" ")[-1] for s in entry.get("authors", []) if s.strip()]
        if incoming_authors and existing_authors and set(incoming_authors) & set(existing_authors):
            return entry
    return None


def upsert(papers, incoming, today=None):
    today = today or TODAY.isoformat()
    incoming["aliases"] = dedupe_aliases(incoming)
    existing = find_match(papers, incoming)
    if existing is None:
        incoming["id"] = stable_key(incoming)
        incoming["discovered_at"] = today
        incoming["first_public_date"] = incoming.get("first_public_date", "")
        incoming["sources"] = list(incoming.get("sources", []))
        incoming["events"] = [{"kind": "discovered", "date": today, "source_id": incoming["sources"][0]["id"]}] if incoming["sources"] else []
        papers.append(incoming)
        return "added"

    altered = False
    previous_stage = existing.get("stage", "")
    for alias in incoming["aliases"]:
        if alias not in existing.setdefault("aliases", []):
            existing["aliases"].append(alias)
            altered = True
    existing["aliases"].sort()
    for candidate in incoming.get("sources", []):
        if not any(s.get("id") == candidate.get("id") and s.get("url") == candidate.get("url") for s in existing.setdefault("sources", [])):
            existing["sources"].append(candidate)
            altered = True
            existing.setdefault("events", []).append({"kind": "source-added", "date": today, "source_id": candidate.get("id")})
    if not existing.get("abstract") and incoming.get("abstract"):
        existing["abstract"] = incoming["abstract"]
        altered = True
    if len(incoming.get("authors", [])) > len(existing.get("authors", [])):
        existing["authors"] = incoming["authors"]
        altered = True
    if incoming.get("doi") and not existing.get("doi"):
        existing["doi"] = incoming["doi"]
        altered = True
    if incoming.get("stage") == "journal" and previous_stage != "journal":
        existing["stage"] = "journal"
        existing["source_url"] = incoming.get("source_url", existing.get("source_url"))
        existing.setdefault("events", []).append({"kind": "journal-publication", "date": today, "source_id": incoming.get("sources", [{}])[0].get("id")})
        altered = True
    if not existing.get("first_public_date") or (incoming.get("first_public_date") and incoming["first_public_date"] < existing["first_public_date"]):
        existing["first_public_date"] = incoming.get("first_public_date", existing.get("first_public_date"))
        altered = True
    return "updated" if altered else "unchanged"


def get_json(url):
    data = get_bytes(url)
    return json.loads(data.decode("utf-8", "replace"))


def get_bytes(url, tries=3):
    last = None
    for attempt in range(tries):
        request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json, application/xml, text/xml, */*"})
        try:
            with urlopen(request, timeout=24) as response:
                return response.read(5_000_000)
        except HTTPError as exc:
            last = exc
            if exc.code not in (429, 500, 502, 503, 504):
                break
        except (URLError, TimeoutError) as exc:
            last = exc
        if attempt + 1 < tries:
            time.sleep(2 ** attempt)
    raise RuntimeError(f"Source unavailable ({type(last).__name__}): {str(last)[:160]}")


def get_xml_text(item, names):
    for name in names:
        value = item.findtext(name)
        if value:
            return value.strip()
    return ""


def parse_rss(xml_data, source):
    root = ET.fromstring(xml_data)
    entries = root.findall(".//item")
    atom_mode = False
    if not entries:
        entries = root.findall("{http://www.w3.org/2005/Atom}entry")
        atom_mode = True
    found = []
    for item in entries:
        if atom_mode:
            title = get_xml_text(item, ["{http://www.w3.org/2005/Atom}title"])
            raw_abstract = get_xml_text(item, ["{http://www.w3.org/2005/Atom}summary", "{http://www.w3.org/2005/Atom}content"])
            link_node = item.find("{http://www.w3.org/2005/Atom}link")
            link = (link_node.attrib.get("href", "") if link_node is not None else "")
            issued = get_xml_text(item, ["{http://www.w3.org/2005/Atom}published", "{http://www.w3.org/2005/Atom}updated"])
            date = issued[:10]
        else:
            title = get_xml_text(item, ["title"])
            raw_abstract = get_xml_text(item, ["description", "{http://purl.org/rss/1.0/modules/content/}encoded"])
            link = get_xml_text(item, ["link"])
            issued = get_xml_text(item, ["pubDate", "{http://purl.org/dc/elements/1.1/}date"])
            date = parse_date(issued)
        if not title or is_chinese_title(title):
            continue
        author = get_xml_text(item, ["{http://purl.org/dc/elements/1.1/}creator", "author", "{http://www.w3.org/2005/Atom}author/{http://www.w3.org/2005/Atom}name"])
        authors = [a.strip() for a in re.split(r"\s+;\s+|\s+and\s+", author) if a.strip()]
        link = ensure_url(link)
        if not link:
            continue
        aliases = []
        doi_match = re.search(r"10\.\d{4,9}/[^\s?#]+", link, flags=re.I)
        doi = normalize_doi(doi_match.group(0)) if doi_match else ""
        if source["id"] == "nber":
            num = re.search(r"/papers/(w\d+)", link, re.I)
            if num:
                aliases.append("nber:" + num.group(1).lower())
                doi = doi or "10.3386/" + num.group(1).lower()
        elif source["id"] == "cepr":
            num = re.search(r"(?:dp|discussion-paper[/_-]?)(\d{3,7})", title + " " + link, re.I)
            if num:
                aliases.append("cepr:" + num.group(1))
        abstract = clean_html(raw_abstract)[:600]
        found.append({
            "title": title, "authors": authors, "abstract": abstract,
            "source_url": link, "doi": doi, "aliases": aliases,
            "first_public_date": date,
            "stage": "working-paper", "discipline": known_tags(title, abstract),
            "sources": [{"id": source["id"], "name": source["name"], "url": link}],
        })
    return found


def crossref_item(item, source):
    if item.get("type") != "journal-article" or str(item.get("language", "")).lower().startswith("zh"):
        return None
    title = clean_html((item.get("title") or [""])[0])
    if not title or is_chinese_title(title):
        return None
    doi = normalize_doi(item.get("DOI", ""))
    if not doi:
        return None
    authors = []
    for a in item.get("author", []):
        person = " ".join([a.get("given", ""), a.get("family", "")]).strip()
        if person:
            authors.append(person)
    published = (parse_date_parts(item.get("published-online"))
                 or parse_date_parts(item.get("published"))
                 or parse_date_parts(item.get("published-print"))
                 or parse_date_parts(item.get("issued")))
    abstract = clean_html(item.get("abstract", ""))[:600]
    url = "https://doi.org/" + doi
    return {
        "title": title, "authors": authors, "abstract": abstract,
        "source_url": url, "doi": doi, "aliases": [],
        "first_public_date": published,
        "stage": "journal", "discipline": known_tags(title, abstract),
        "sources": [{"id": source["id"], "name": source["name"], "url": url}],
    }


def load(path, fallback):
    return json.loads(path.read_text("utf-8")) if path.exists() else fallback


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    target = path.with_suffix(path.suffix + ".tmp")
    target.write_text(json.dumps(value, ensure_ascii=False, indent=2, sort_keys=False) + "\n", encoding="utf-8")
    os.replace(target, path)


def ingest(since_days=14, max_per_source=250, backfill_days=0):
    cfg = load(BASE / "config/sources.json", {})
    paper_path = BASE / "data/papers.json"
    runs_path = BASE / "data/runs.json"
    db = load(paper_path, {"schema_version": 1, "papers": []})
    run_db = load(runs_path, {"schema_version": 1, "runs": []})
    papers = db["papers"]
    today = TODAY.isoformat()
    lookback = (TODAY - timedelta(days=since_days)).isoformat()
    # A newly encountered old work is not automatically a new publication.
    publication_floor = (TODAY - timedelta(days=max(120, since_days * 3, backfill_days))).isoformat()
    counters = {"added": 0, "updated": 0, "unchanged": 0, "errors": 0}
    collector_results = []

    def collect(source, records_fn):
        result = {"id": source["id"], "name": source["name"], "status": "ok", "fetched": 0, "added": 0, "updated": 0, "error": "", "truncated": False}
        try:
            rows, truncated = records_fn()
            result["fetched"] = len(rows)
            result["truncated"] = truncated
            for item in rows:
                event = upsert(papers, item, today)
                counters[event] += 1
                if event in ("added", "updated"):
                    result[event] += 1
        except Exception as exc:
            result["status"] = "error"
            result["error"] = str(exc)[:250]
            counters["errors"] += 1
        collector_results.append(result)
        print(f"[{result['status']}] {source['name']}: {result['fetched']} fetched, {result['added']} new, {result['updated']} merged")

    for source in cfg.get("rss", []):
        if not source.get("enabled"):
            continue
        def rss_loader(source=source):
            rows = parse_rss(get_bytes(source["url"]), source)
            return rows[:max_per_source], len(rows) > max_per_source
        collect(source, rss_loader)

    for source in cfg.get("journals", []):
        if not source.get("enabled"):
            continue
        def crossref_loader(source=source):
            # Query by index date for changes, AND recent publication date to
            # prevent ancient correction records dominating the discovery feed.
            filters = f"from-pub-date:{publication_floor}"
            # Some publishers register publication years without month/day.
            # A date filter after January 1 would silently exclude those works.
            # Recheck the prior year too to catch revisions around New Year.
            if source.get("crossref_pub_precision") == "year":
                filters = f"from-pub-date:{TODAY.year - 1}-01-01"
            if backfill_days == 0:
                filters += f",from-index-date:{lookback}"
            query = {
                "filter": filters, "rows": min(1000, int(source.get("max_per_source", max_per_source))), "sort": "published", "order": "desc",
                "select": CROSSREF_SELECT_FIELDS,
            }
            if os.environ.get("RADAR_CONTACT_EMAIL"):
                query["mailto"] = os.environ["RADAR_CONTACT_EMAIL"]
            params = urlencode(query)
            url = f"https://api.crossref.org/journals/{quote(source['issn'])}/works?{params}"
            payload = get_json(url)
            items = payload.get("message", {}).get("items", [])
            parsed = [crossref_item(raw, source) for raw in items]
            return [p for p in parsed if p is not None], len(items) >= query["rows"]
        collect(source, crossref_loader)

    papers.sort(key=lambda p: (p.get("discovered_at", ""), p.get("first_public_date", "")), reverse=True)
    db["updated_at"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    db["snapshot"] = "incremental-ingestion"
    run = {
        "run_at": db["updated_at"], "mode": "manual", "since_days": since_days, "backfill_days": backfill_days,
        "source_count": len(collector_results), "successful_sources": sum(r["status"] == "ok" for r in collector_results),
        "counts": counters, "sources": collector_results,
    }
    run_db.setdefault("runs", []).append(run)
    run_db["runs"] = run_db["runs"][-180:]
    atomic_json(paper_path, db)
    atomic_json(runs_path, run_db)
    print("Saved", len(papers), "total papers;", counters)
    return run


def main():
    parser = argparse.ArgumentParser(description="Manually collect research metadata")
    parser.add_argument("--since-days", type=int, default=21)
    parser.add_argument("--max-per-source", type=int, default=250)
    parser.add_argument("--backfill-days", type=int, default=0, help="Ignore Crossref index-date filter to scan recent publications; use only for initial historical bootstrap")
    args = parser.parse_args()
    if not 1 <= args.since_days <= 730 or not 1 <= args.max_per_source <= 1000 or not 0 <= args.backfill_days <= 730:
        parser.error("Arguments out of range")
    run = ingest(args.since_days, args.max_per_source, args.backfill_days)
    # A failed source must be visible; it should not silently pass as complete.
    if run["successful_sources"] == 0:
        sys.exit(2)


if __name__ == "__main__":
    main()
