import sys
import unittest
from datetime import date
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))

from radar_analysis import classify, paper_card, strict_publication_date, take_diverse
from generate_reports import day_bounds, make_issue
from conference_watch import select_program_links


def paper(n, title, published='2026-10-20', abstract=''):
    return {'id':'p'+str(n),'title':title,'authors':['A. Researcher'],'abstract':abstract,
            'stage':'working-paper','doi':'','first_public_date':published,'discovered_at':'2026-10-22',
            'source_url':'https://example.org/p'+str(n),
            'sources':[{'id':'nber','name':'NBER Working Papers','url':'https://example.org/p'+str(n)}]}


class Reports(unittest.TestCase):
    def test_three_circles_are_not_a_search_filter(self):
        ps=[paper(1,'Venture Capital and Firm Value'),
            paper(2,'Trade and Productivity'),
            paper(3,'A Theory of Household Preferences')]
        self.assertEqual([classify(x) for x in ps],['core','adjacent','inspiration'])
        chosen=take_diverse(ps,date(2026,10,22),cap=3,buckets={'core':1,'adjacent':1,'inspiration':1})
        self.assertEqual({p['id'] for p in chosen},{'p1','p2','p3'})

    def test_year_only_dates_are_not_misrepresented_as_daily_news(self):
        p=paper(4,'A New Theory of Markets','2026')
        self.assertIsNone(strict_publication_date(p))
        self.assertEqual(paper_card(p)['evidence_level'],'title-only')

    def test_abstract_lens_is_hypothesis_not_verified_finding(self):
        p=paper(5,'Economic Geography','2026-10-20',
                'We use administrative data and difference-in-differences to investigate jobs.')
        c=paper_card(p)
        self.assertIn('双重差分',','.join(c['method_signals']))
        self.assertIn('行政记录',','.join(c['data_signals']))
        self.assertIn('尚未通过全文核实',c['finding_zh'])

    def test_period_bounds_are_independent_of_conference_archive(self):
        from tempfile import TemporaryDirectory
        from unittest.mock import patch
        from generate_reports import ROOT
        with TemporaryDirectory() as folder:
            archive=Path(folder)/'data'/'conference_status.json'
            archive.parent.mkdir(parents=True)
            archive.write_text('{"events": [{"kind":"program-link-change","date":"2026-10-20"}]}', encoding='utf-8')
            with patch('generate_reports.ROOT', Path(folder)):
                self.assertEqual(day_bounds('weekly', date(2026,10,25)), (date(2026,10,19),date(2026,10,25)))
                self.assertEqual(day_bounds('monthly', date(2026,10,1)), (date(2026,9,1),date(2026,9,30)))

    def test_month_uses_previous_completed_month(self):
        self.assertEqual(day_bounds('monthly',date(2026,10,1)),(date(2026,9,1),date(2026,9,30)))
        self.assertEqual(day_bounds('monthly',date(2027,1,1)),(date(2026,12,1),date(2026,12,31)))

    def test_week_starts_on_monday(self):
        self.assertEqual(day_bounds('weekly',date(2026,10,25)),(date(2026,10,19),date(2026,10,25)))

    def test_no_invented_main_results(self):
        p=paper(6,'Financial Markets and Climate Change',abstract='')
        issue=make_issue('daily',date(2026,10,22),[p],[])
        self.assertEqual(issue['analysis_level'],'metadata-triage')
        self.assertEqual(issue['picks'][0]['evidence_level'],'title-only')
        self.assertEqual(len(issue['picks']),1)

    def test_schedule_and_git_push_deployment_contract(self):
        root=Path(__file__).resolve().parents[1]
        workflow=(root/'.github/workflows/briefings.yml').read_text('utf-8')
        self.assertIn("cron: '43 11 * * *'", workflow)
        self.assertIn("cron: '13 20 * * 0'", workflow)
        self.assertIn("cron: '31 20 1 * *'", workflow)
        self.assertIn("timezone: 'Asia/Shanghai'", workflow)
        self.assertIn('uses: actions/deploy-pages@v4', workflow)
        self.assertIn('data/editions/', workflow)

    def test_official_conference_link_detection(self):
        html='<a href="/program-2027.pdf">2027 Program</a><a href="/sponsors">Sponsors</a>'
        links=select_program_links(html,'https://example.org/conference/')
        self.assertEqual(len(links),1)
        self.assertEqual(links[0]['url'],'https://example.org/program-2027.pdf')


if __name__=='__main__': unittest.main()
