import json
from pathlib import Path
import unittest

ROOT=Path(__file__).resolve().parents[1]

class MechanismProfilesTests(unittest.TestCase):
    def test_profiles_are_hypotheses_not_unverified_paper_results(self):
        data=json.loads((ROOT/"data/mechanism_profiles.json").read_text("utf-8"))
        self.assertEqual(data["schema_version"],1)
        self.assertEqual({p["id"] for p in data["projects"]},{"p1","p3"})
        allowed={"core","institutional","outcome","exploratory"}
        for project in data["projects"]:
            self.assertGreaterEqual(len(project["mechanisms"]),6)
            for item in project["mechanisms"]:
                self.assertIn(item["priority"],allowed)
                for key in ["primitive","prediction","counter","test","data","feasibility"]:
                    self.assertTrue(item[key],f"Missing {key} for {item['id']}")
        ai=next(p for p in data["projects"] if p["id"]=="p3")
        self.assertTrue(any(m["priority"]=="outcome" and "错配" in m["title"] for m in ai["mechanisms"]))

    def test_reanalysis_evidence_scope_and_data_access(self):
        data=json.loads((ROOT/"data/idea_reanalysis.json").read_text("utf-8"))
        self.assertEqual(data["schema_version"],1)
        self.assertGreaterEqual(len(data["entries"]),8)
        self.assertEqual(len({p["id"] for p in data["entries"]}),len(data["entries"]))
        for p in data["entries"]:
            self.assertTrue(p["source_url"].startswith("https://"))
            for field in ["original_claim","economic_primitive","actor_shift","research_question",
                          "bridge_assumption","alternative","discriminating_test","data_ideal",
                          "data_pilot","data_feasibility","scope"]:
                self.assertGreater(len(p[field]),12,f"Missing {field} for {p['id']}")
            self.assertNotEqual(p["original_claim"],p["research_question"])

    def test_frontend_publishes_dossiers(self):
        builder=(ROOT/"scripts/build_site.py").read_text("utf-8")
        app=(ROOT/"site/app.js").read_text("utf-8")
        for name in ["mechanism_profiles.json","idea_reanalysis.json"]:
            self.assertIn(name,builder)
            self.assertIn(name,app)
        for fn in ["function renderMechanismProfiles()","function renderReanalysis()"]:
            self.assertIn(fn,app)
        self.assertIn("renderTransferCases()",app)

if __name__=="__main__":
    unittest.main()
