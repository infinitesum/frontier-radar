
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

    def test_frontend_backdrop_and_curated_render(self):
        js=(ROOT / "site/app.js").read_text("utf-8")
        self.assertIn("function renderReviews()",js)
        self.assertIn("event.target!==event.currentTarget",js)
        self.assertIn("event.currentTarget.close()",js)
        self.assertIn("curated_reviews.json",js)
        self.assertIn("editorial_summaries.json",js)

if __name__=="__main__":
    unittest.main()
