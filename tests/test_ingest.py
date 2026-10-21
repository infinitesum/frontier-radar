import sys
from pathlib import Path
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from ingest import (normalize_title, normalize_doi, clean_html, is_chinese_title,
                    parse_rss, crossref_item, upsert, CROSSREF_SELECT_FIELDS)


class IngestTests(unittest.TestCase):
    def make(self, title="A Long Paper Title on Banking and Firm Productivity", alias=""):
        return {
            "title": title, "authors": ["Alice Smith", "Bob Lee"], "abstract": "",
            "source_url": "https://example.org/paper", "doi": "",
            "aliases": [alias] if alias else [], "first_public_date": "2026-10-01",
            "stage": "working-paper", "discipline": "finance",
            "sources": [{"id": "nber", "name": "NBER", "url": "https://example.org/paper"}],
        }

    def test_title_and_doi_normalization(self):
        self.assertEqual(normalize_title("  O\u2019Hara's Banking: Evidence  "), "o hara s banking evidence")
        self.assertEqual(normalize_doi("HTTPS://doi.org/10.1234/ABC"), "10.1234/abc")
        self.assertIn("Bank", clean_html("<p><b>Bank</b> loans</p>"))
        self.assertTrue(is_chinese_title("\u4e2d\u6587\u8bba\u6587"))

    def test_rss_parsing_and_chinese_exclusion(self):
        source = {"id": "nber", "name": "NBER"}
        rss = b'''<rss><channel><item><title>Corporate AI Adoption and Banks</title>
        <link>https://www.nber.org/papers/w35684</link><pubDate>Tue, 20 Oct 2026 09:00:00 GMT</pubDate>
        <description>&lt;p&gt;Corporate &amp;amp; innovation&lt;/p&gt;</description></item>
        <item><title>&#20013;&#25991;</title><link>https://example.org/zh</link></item>
        </channel></rss>'''
        out = parse_rss(rss, source)
        self.assertEqual(len(out), 1)
        self.assertIn("nber:w35684", out[0]["aliases"])
        self.assertEqual(out[0]["first_public_date"], "2026-10-20")
        self.assertEqual(out[0]["doi"], "10.3386/w35684")

    def test_crossref_select_fields(self):
        self.assertNotIn("language", CROSSREF_SELECT_FIELDS.split(","))
        self.assertIn("DOI", CROSSREF_SELECT_FIELDS.split(","))

    def test_essential_source_config(self):
        import json
        cfg = json.loads((Path(__file__).resolve().parents[1] / "config/sources.json").read_text("utf-8"))
        by_id = {row["id"]: row for row in cfg["journals"]}
        self.assertEqual(by_id["ectr"]["issn"], "1468-0262")
        self.assertGreater(by_id["ms"]["max_per_source"], 250)

    def test_crossref_parsing(self):
        source = {"id": "qje", "name": "QJE"}
        raw = {"type": "journal-article", "title": ["Labor Mobility and Policy"],
               "DOI": "10.9999/ABC", "author": [{"given": "Ann", "family": "Li"}],
               "published-online": {"date-parts": [[2026, 10, 2]]}}
        out = crossref_item(raw, source)
        self.assertEqual(out["first_public_date"], "2026-10-02")
        self.assertEqual(out["authors"], ["Ann Li"])
        raw["language"]="zh-CN"
        self.assertIsNone(crossref_item(raw, source))

    def test_version_merge_and_idempotence(self):
        items = []
        initial = self.make(alias="nber:w11111")
        self.assertEqual(upsert(items, initial, "2026-10-02"), "added")
        self.assertEqual(upsert(items, self.make(alias="nber:w11111"), "2026-10-02"), "unchanged")
        journal = self.make()
        journal["doi"] = "10.1234/xyz"
        journal["stage"] = "journal"
        journal["source_url"] = "https://doi.org/10.1234/xyz"
        journal["sources"] = [{"id": "jf", "name": "JF", "url": journal["source_url"]}]
        self.assertEqual(upsert(items, journal, "2026-10-03"), "updated")
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["stage"], "journal")
        self.assertEqual(len([x for x in items[0]["events"] if x["kind"] == "journal-publication"]), 1)
        self.assertEqual(upsert(items, journal, "2026-10-03"), "unchanged")

    def test_similar_titles_without_shared_author_never_merge(self):
        items = []
        upsert(items, self.make(), "2026-10-03")
        second = self.make()
        second["authors"] = ["Completely Different"]
        second["source_url"] = "https://example.org/other"
        second["aliases"] = ["cepr:9999"]
        self.assertEqual(upsert(items, second, "2026-10-03"), "added")
        self.assertEqual(len(items), 2)


if __name__ == "__main__":
    unittest.main()
