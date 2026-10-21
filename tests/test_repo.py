from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class RepositoryPolicyTests(unittest.TestCase):
    def test_no_recurring_actions_schedule(self):
        files = list((ROOT / '.github/workflows').glob('*.yml'))
        self.assertTrue(files)
        for path in files:
            content = path.read_text(encoding='utf-8')
            # Ignore comment lines: the schedule must never be active.
            active = '\n'.join(x for x in content.splitlines() if not x.lstrip().startswith('#'))
            self.assertNotIn('  schedule:', active, path.name)
            self.assertNotIn('cron:', active, path.name)

    def test_public_site_contains_no_credentials(self):
        site = ROOT / 'site'
        for path in site.rglob('*'):
            if path.is_file():
                text = path.read_text(encoding='utf-8')
                for forbidden in ['sk-proj-', 'ghp_', 'github_pat_']:
                    self.assertNotIn(forbidden, text, path.name)


if __name__ == '__main__':
    unittest.main()
