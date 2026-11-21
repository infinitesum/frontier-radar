from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class RepositoryPolicyTests(unittest.TestCase):
    def test_refresh_schedule_and_manual_fallback(self):
        refresh = (ROOT / '.github/workflows/refresh-manual.yml').read_text('utf-8')
        deploy = (ROOT / '.github/workflows/deploy-pages.yml').read_text('utf-8')
        self.assertIn('  workflow_dispatch:', refresh)
        self.assertIn('  schedule:', refresh)
        # 01:17 UTC is 09:17 Asia/Shanghai; keep a UTC cron to avoid offset drift.
        self.assertIn("cron: '17 1 * * *'", refresh)
        self.assertNotIn("timezone: 'Asia/Shanghai'", refresh)
        self.assertIn('  actions: read', refresh)
        self.assertIn('Wait for Pages artifact metadata', refresh)
        self.assertIn('BACKFILL_DAYS:', refresh)
        self.assertNotIn('  schedule:', deploy)
        self.assertNotIn('cron:', deploy)

    def test_public_site_contains_no_credentials(self):
        site = ROOT / 'site'
        for path in site.rglob('*'):
            if path.is_file():
                text = path.read_text(encoding='utf-8')
                for forbidden in ['sk-proj-', 'ghp_', 'github_pat_']:
                    self.assertNotIn(forbidden, text, path.name)


if __name__ == '__main__':
    unittest.main()
