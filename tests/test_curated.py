
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class CuratedReviewContract(unittest.TestCase):
    def test_review_archive_and_links(self):
        paper_data = json.loads((ROOT / "data/papers.json").read_text("utf-8"))
        ids = {x["id"] for x in paper_data["papers"]}
        data = json.loads((ROOT / "data/curated_reviews.json").read_text("utf-8"))
        self.assertEqual(data["schema_version"], 1)
        self.assertGreaterEqual(len(data["reviews"]), 2)
        self.assertEqual(len({x["paper_id"] for x in data["reviews"]}), len(data["reviews"]))
        for review in data["reviews"]:
            self.assertIn(review["paper_id"], ids)
            self.assertIn(review["evidence_level"], ("official-abstract","working-paper-sections-reviewed","full-text-verified"))
            self.assertGreater(len(review["finding_zh"]), 100)
            self.assertGreater(len(review["transfer_zh"]), 80)
            self.assertGreater(len(review["test_zh"]), 55)
            self.assertTrue(review["sources"])
            self.assertTrue(all(x["url"].startswith("https://") for x in review["sources"]))
            self.assertTrue(review["priority"])
            self.assertTrue(review["version_note"])

    def test_editorial_archive_schema(self):
        editorial = json.loads((ROOT / "data/editorial_summaries.json").read_text("utf-8"))
        self.assertEqual(editorial["schema_version"],1)
        for key in ("weekly", "monthly"):
            self.assertIsInstance(editorial[key], list)

    def test_all_three_circles_have_source_scoped_analysis(self):
        candidates=json.loads((ROOT/"data/candidate_analysis.json").read_text("utf-8"))
        self.assertEqual(candidates["schema_version"],1)
        notes=candidates["notes"]
        self.assertEqual(len({n["paper_id"] for n in notes}),len(notes))
        for n in notes:
            self.assertGreater(len(n["evidence_summary_zh"]),35)
            self.assertGreater(len(n["connection_zh"]),35)
            self.assertGreater(len(n["test_zh"]),35)
            self.assertEqual(n["evidence_level"],"abstract-excerpt")
        js=(ROOT/"site/app.js").read_text("utf-8")
        for name in ("candidate_analysis.json","function researchAnalysis","function readingActions","function abstractDisclosure"):
            self.assertIn(name,js)
        builder=(ROOT/"scripts/build_site.py").read_text("utf-8")
        self.assertIn("candidate_analysis.json",builder)

    def test_conference_watchlist_is_not_limited_to_parsed_programs(self):
        config=json.loads((ROOT/"config/sources.json").read_text("utf-8"))
        self.assertGreaterEqual(len(config["conference_watchlist"]),9)
        js=(ROOT/"site/app.js").read_text("utf-8")
        self.assertIn("完整顶会监测清单",js)
        self.assertIn("state.config.conference_watchlist",js)

    def test_frontend_backdrop_and_curated_render(self):
        js=(ROOT / "site/app.js").read_text("utf-8")
        self.assertIn("function renderReviews()",js)
        self.assertIn("event.target!==event.currentTarget",js)
        self.assertIn("event.currentTarget.close()",js)
        self.assertIn("curated_reviews.json",js)
        self.assertIn("editorial_summaries.json",js)

if __name__=="__main__":
    unittest.main()
