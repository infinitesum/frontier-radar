import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class TransferCasesContract(unittest.TestCase):
    def test_source_claim_and_transfer_are_separate(self):
        data=json.loads((ROOT/"data/transfer_cases.json").read_text(encoding="utf-8"))
        self.assertEqual(data["schema_version"], 1)
        self.assertGreaterEqual(len(data["cases"]),1)
        ids=set()
        for item in data["cases"]:
            self.assertNotIn(item["id"],ids)
            ids.add(item["id"])
            self.assertTrue(item["source_fact"])
            self.assertTrue(item["theory_mechanism"])
            self.assertTrue(item["crucial_distinction"])
            self.assertTrue(item["new_question"])
            self.assertTrue(item["alternative"])
            self.assertGreaterEqual(len(item["bridge_operations"]),3)
            self.assertGreaterEqual(len(item["discriminating_tests"]),2)
            self.assertTrue(all(x["url"].startswith("https://") for x in item["sources"]))
            self.assertTrue(item["scope"])

    def test_grigoris_segal_example_does_not_conflate_variable_levels(self):
        data=json.loads((ROOT/"data/transfer_cases.json").read_text(encoding="utf-8"))
        case=next(x for x in data["cases"] if "grigoris-segal" in x["id"])
        self.assertEqual(case["doi"], "10.1111/jofi.70010")
        self.assertEqual(case["dates"]["first_journal_online"], "2025-12-22")
        self.assertIn("上游不确定性",case["crucial_distinction"])
        self.assertIn("上游度",case["crucial_distinction"])
        self.assertIn("不是原论文结论",case["scope"])

    def test_site_build_and_idea_radar_render(self):
        app=(ROOT/"site/app.js").read_text(encoding="utf-8")
        builder=(ROOT/"scripts/build_site.py").read_text(encoding="utf-8")
        self.assertIn("function renderTransferCases()",app)
        self.assertIn("${renderTransferCases()}",app)
        self.assertIn("transfer_cases.json",app)
        self.assertIn('"transfer_cases.json"',builder)


if __name__=="__main__":
    unittest.main()
