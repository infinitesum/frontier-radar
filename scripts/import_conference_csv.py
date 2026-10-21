#!/usr/bin/env python3
"""Import a VERIFIED conference program CSV to the durable paper registry.

The CSV is supplied and reviewed by a human. This script does not scrape PDFs,
search for paper titles, or infer acceptance from social media or abstracts.
Required CSV columns: title, authors, paper_url. Optional: presentation_date, session.
Use semicolons to separate authors. DOI may be included as an optional column.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
from hashlib import sha256
import csv
import json
from pathlib import Path
from urllib.parse import urlparse
from ingest import BASE, TODAY, atomic_json, ensure_url, is_chinese_title, known_tags, normalize_doi, normalize_title, upsert


def validate_conf_row(row):
    title = (row.get("title") or "").strip()
    authors = [part.strip() for part in (row.get("authors") or "").split(";") if part.strip()]
    paper_url = ensure_url(row.get("paper_url"))
    if not title or not authors or not paper_url:
        raise ValueError("Every row needs a title, at least one author, and a public HTTP(S) paper URL")
    if is_chinese_title(title):
        return None
    date = (row.get("presentation_date") or "").strip()
    if date:
        datetime.strptime(date, "%Y-%m-%d")
    return title, authors, paper_url, date


def import_csv(conference_id, csv_path, program_url=None):
    cfg=json.loads((BASE/'config/sources.json').read_text('utf-8'))
    conference=next((x for x in cfg.get('conference_watchlist',[]) if x['id']==conference_id), None)
    if not conference:
        raise ValueError('Unknown conference ID; add it to config/sources.json first')
    program_url=ensure_url(program_url or conference['url'])
    if not program_url:
        raise ValueError('An official program URL is required')
    db_path=BASE/'data/papers.json'
    events_path=BASE/'data/conferences.json'
    db=json.loads(db_path.read_text('utf-8'))
    db_events=json.loads(events_path.read_text('utf-8'))
    paper_records=db['papers']
    events=db_events.setdefault('events',[])
    seen={(e['conference_id'],e['paper_id'],e.get('presentation_date','')) for e in events}
    changes={'added':0,'updated':0,'unchanged':0,'ignored_language':0,'events_added':0}
    with Path(csv_path).open(newline='',encoding='utf-8-sig') as handle:
        reader=csv.DictReader(handle)
        if not {'title','authors','paper_url'}.issubset(reader.fieldnames or []):
            raise ValueError('Missing required CSV header(s): title, authors, paper_url')
        staged=[]
        for index,row in enumerate(reader, start=2):
            try:
                value=validate_conf_row(row)
            except (ValueError,TypeError) as exc:
                raise ValueError(f'CSV row {index}: {exc}') from exc
            if value is None:
                changes['ignored_language']+=1
                continue
            staged.append((value,row))
    for (title,authors,url,presented),row in staged:
        slug=normalize_title(title+' '+authors[0])
        alias='conference:'+conference_id+':'+sha256(slug.encode('utf-8')).hexdigest()[:16]
        paper={
            'title':title,'authors':authors,'abstract':'',
            'source_url':url,'doi':normalize_doi(row.get('doi')),
            'aliases':[alias],'first_public_date':'',
            'stage':'conference','discipline':known_tags(title),
            'sources':[{'id':conference_id,'name':conference['name'],'url':url}],
        }
        result=upsert(paper_records,paper,TODAY.isoformat())
        changes[result]+=1
        record=next(x for x in paper_records if alias in x['aliases'])
        key=(conference_id,record['id'],presented)
        if key not in seen:
            events.append({
                'conference_id':conference_id,'conference_name':conference['name'],
                'paper_id':record['id'],'presentation_date':presented,
                'session':(row.get('session') or '').strip(),
                'program_url':program_url,'paper_url':url,
                'recorded_at':TODAY.isoformat(),
            })
            if presented:
                record.setdefault('events',[]).append({'kind':'conference-presentation','date':presented,'source_id':conference_id})
            seen.add(key)
            changes['events_added']+=1
    db['updated_at']=datetime.now(timezone.utc).isoformat(timespec='seconds')
    paper_records.sort(key=lambda p:(p.get('discovered_at',''),p.get('first_public_date','')),reverse=True)
    atomic_json(db_path,db)
    atomic_json(events_path,db_events)
    return changes


def main():
    parser=argparse.ArgumentParser(description='Add curated English-language conference papers')
    parser.add_argument('--conference-id',required=True)
    parser.add_argument('--csv',type=Path,required=True)
    parser.add_argument('--program-url',default=None)
    args=parser.parse_args()
    print(import_csv(args.conference_id,args.csv,args.program_url))


if __name__=='__main__':
    main()
