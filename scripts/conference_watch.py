#!/usr/bin/env python3
"""Lightweight official conference-program link watch.

Not a paper extraction engine. A program landing page might contain only a PDF;
we never treat a link to that PDF as a verified list of accepted papers.
"""
from __future__ import annotations
from datetime import datetime
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

BASE=Path(__file__).resolve().parents[1]
TZ=ZoneInfo('Asia/Shanghai')
PATTERN=re.compile(r'\bprogram(?:me)?\b|\bagenda\b|\bschedule\b|\baccepted[ -]papers?\b|\bpaper[s]?\b|\bsessions?\b|\b2026\b|\b2027\b',re.I)

class LinkParser(HTMLParser):
    def __init__(self,base):
        super().__init__(); self.base=base; self.anchor=None; self.links=[]
    def handle_starttag(self,tag,attrs):
        if tag=='a':self.anchor={'href':dict(attrs).get('href',''),'text':[]}
    def handle_data(self,data):
        if self.anchor is not None:self.anchor['text'].append(data)
    def handle_endtag(self,tag):
        if tag!='a' or self.anchor is None:return
        raw=self.anchor;self.anchor=None
        label=re.sub(r'\s+',' ',' '.join(raw['text'])).strip()[:160]
        url=urljoin(self.base,raw['href'])
        if urlparse(url).scheme not in {'https','http'}:return
        path=urlparse(url).path
        if PATTERN.search(label+' '+path):
            self.links.append({'title':label or 'Program resource','url':url})


def select_program_links(html,origin):
    parser=LinkParser(origin);parser.feed(html)
    seen=set();result=[]
    for item in parser.links:
        if item['url'] in seen:continue
        seen.add(item['url']);result.append(item)
        if len(result)>=80:break
    return result


def scan():
    cfg=json.loads((BASE/'config/sources.json').read_text('utf-8'))
    target=BASE/'data/conference_status.json'
    state=json.loads(target.read_text('utf-8')) if target.exists() else {'schema_version':1,'items':{},'events':[]}
    records=state.setdefault('items',{})
    now=datetime.now(TZ).isoformat(timespec='seconds')
    checks=[]
    for source in cfg.get('conference_watchlist',[]):
        old=records.get(source['id'],{})
        row={**old,'id':source['id'],'name':source['name'],'url':source['url'],'checked_at':now}
        try:
            req=Request(source['url'],headers={'User-Agent':'FrontierRadar/0.2 (+https://github.com; public academic metadata)'})
            with urlopen(req,timeout=18) as resp:
                content=resp.read(1_500_000)
                media=resp.headers.get('Content-Type','')
            if 'pdf' in media.lower() or content[:4]==b'%PDF':
                raise ValueError('Official page is a PDF; link monitoring alone cannot extract its papers')
            html=content.decode('utf-8','replace')
            links=select_program_links(html,source['url'])
            normalized=[(x['title'],x['url']) for x in links]
            digest=sha256(json.dumps(normalized,ensure_ascii=False).encode()).hexdigest()[:16]
            old_urls={x.get('url') for x in old.get('program_links',[])}
            new_urls=[x for x in links if x['url'] not in old_urls]
            row.update(status='ok',error='',fingerprint=digest,program_links=links)
            if old.get('fingerprint') and old['fingerprint']!=digest and new_urls:
                state['events'].append({'kind':'program-link-change','conference_id':source['id'],
                                        'date':now,'new_links':new_urls[:8],
                                        'note':'Official landing-page links changed; actual paper titles are not verified'})
                row['last_link_change']=now
            elif not old.get('fingerprint'):
                row['initial_snapshot_at']=now
        except (HTTPError,URLError,TimeoutError,ValueError,UnicodeError) as error:
            row.update(status='error',error=(type(error).__name__+': '+str(error))[:180])
        records[source['id']]=row
        checks.append({'id':source['id'],'status':row['status'],'links':len(row.get('program_links',[]))})
        print(source['id'],row['status'],'program links',len(row.get('program_links',[])))
    state['events']=state['events'][-150:]
    state['last_checked_at']=now
    tmp=target.with_suffix('.json.tmp')
    tmp.write_text(json.dumps(state,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    tmp.replace(target)
    print('Official conference landing pages checked',len(checks),'successful',sum(x['status']=='ok' for x in checks))

if __name__=='__main__':scan()
