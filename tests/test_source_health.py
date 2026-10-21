import sys
from pathlib import Path
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from source_health import evaluate


class HealthTests(unittest.TestCase):
    def test_distinguishes_failed_zero_and_capped(self):
        config = {"journals": [{"id": "a", "enabled": True}, {"id": "b", "enabled": True}, {"id": "c", "enabled": True}]}
        run = {"sources": [
            {"id": "a", "status": "ok", "fetched": 5, "truncated": True},
            {"id": "b", "status": "ok", "fetched": 0, "truncated": False},
            {"id": "c", "status": "error", "fetched": 0, "truncated": False},
        ]}
        self.assertEqual(evaluate(config, run), (3, 2, ["c"], ["b"], ["a"]))


if __name__ == "__main__":
    unittest.main()
