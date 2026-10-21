#!/usr/bin/env python3
"""Verify that report editions are source-grounded and archive-consistent."""
from pathlib import Path
import json
import re

ROOT=Path(__file__).resolve().parents[1]
papers=json.loads((ROOT/'data/papers.json').read_text('utf-8'))['papers']
ids={x['id'] for x in papers}
r=json.loads((ROOT/'data/reports.json').read_text('utf-8'))
assert r.get('schema_version')==2, 'Expected current report schema'
for kind in ('daily','weekly','monthly'):
    issues=r.get(kind,[])
    assert isinstance(issues,list)
    assert len({i['id'] for i in issues})==len(issues),'Duplicate report edition'
    for issue in issues:
        assert issue['kind']==kind and re.fullmatch(r'\d{4}-\d{2}-\d{2}',issue['date'])
        assert issue.get('evidence_note') and issue.get('source_health')
        assert len(issue.get('picks',[]))<={'daily':5,'weekly':12,'monthly':12}[kind]
        for pick in issue.get('picks',[]):
            assert pick['paper_id'] in ids, 'Picked paper not in archive'
            assert pick.get('source_url','').startswith('https://')
            assert pick.get('analysis_mode') in ('heuristic-triage','AI-assisted abstract review, unverified full text')
            assert pick.get('evidence_level') in ('abstract-excerpt','title-only')
            if pick['evidence_level']=='title-only':
                assert pick['analysis_mode']=='heuristic-triage','Title-only must not be written as AI abstract review'
        for identifier in issue.get('archive_index',[]):
            assert identifier in ids, 'Missing archival reference'
        archive=ROOT/'data/editions'/kind/(issue['date']+'.json')
        assert archive.exists(), 'Missing standalone edition: '+str(archive)
        stored=json.loads(archive.read_text('utf-8'))
        assert stored['id']==issue['id']
print('Verified source-linked daily/weekly/monthly reports')
