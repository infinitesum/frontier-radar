#!/usr/bin/env python3
"""Extract papers and PDF links from official conference-program HTML.

Public metadata and source URLs are archived without claiming a manuscript is
redistributable. PDFs are stored publicly only if accompanied by an explicitly
recognized open license; everything else gets an access-status record.
"""
import hashlib
import json
import re
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin,urlparse
from urllib.request import Request,urlopen
from urllib.error import HTTPError,URLError
from zoneinfo import ZoneInfo

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data/conference_papers.json'
AGENT='FrontierRadar/0.4 (public scholarly link index; contact via GitHub repository)'
PROGRAMS=[
 ('cfrc-2026','China Financial Research Conference 2026','https://editorialexpress.com/conference/CFRC2026/program/CFRC2026.html'),
 ('cicf-2026','China International Conference in Finance 2026','https://editorialexpress.com/conference/CICF2026/program/CICF2026.html')
]
PDF_PAT=re.compile(r'\.pdf(?:$|[?#])|download\.php|download\.jsp|download\.cgi|/file/|/files/|getfile',re.I)
SESS_PAT=re.compile(r'^Session\s+\d+\s*:',re.I)
SKIP_PAT=re.compile(r'^(Session Chair|Discussant|Presented by|By |Conference Reception|Keynote|Welcome Speech)',re.I)
ALLOWED_LICENSES=('creativecommons.org/licenses/by/','creativecommons.org/licenses/by-sa/','creativecommons.org/publicdomain/zero/')

class ProgramParser(HTMLParser):
    def __init__(self,base):
        super().__init__();self.base=base;self.anchor=None;self.sections=[];self.current='';self.papers=[]
    def handle_starttag(self,tag,attrs):
        if tag=='a':
            a=dict(attrs);self.anchor={'url':urljoin(self.base,a.get('href','')),'text':[]}
    def handle_data(self,data):
        if self.anchor is not None:self.anchor['text'].append(data)
        elif SESS_PAT.search(data.strip()):self.current=data.strip()[:200]
    def handle_endtag(self,tag):
        if tag!='a' or self.anchor is None:return
        a=self.anchor;self.anchor=None
        title=' '.join(' '.join(a['text']).split())
        url=a['url']
        if not title or not urlparse(url).scheme.startswith('http'):return
        if SESS_PAT.search(title):self.current=title;return
        if SKIP_PAT.search(title) or len(title)<18:return
        # Conference programs mark paper titles as links, sometimes directly to attachments.
        if len(title)>22 and (self.current or ('editorialexpress.com' in urlparse(url).netloc and 'download.cgi' in url)):
            self.papers.append({'title':title[:320],'session':(self.current or 'Conference program')[:200],'url':url,'pdf_candidate':bool(PDF_PAT.search(url))})

def download(url,max_bytes=3_000_000):
    req=Request(url,headers={'User-Agent':AGENT})
    with urlopen(req,timeout=20) as response:
        content=response.read(max_bytes+1)
        if len(content)>max_bytes:raise ValueError('Program page too large')
        return content,response.headers.get('Content-Type','')

def status_for(url):
    if not PDF_PAT.search(url):return 'paper-link', '',0
    try:
        req=Request(url,headers={'User-Agent':AGENT,'Range':'bytes=0-1023'})
        with urlopen(req,timeout=5) as response:
            data=response.read(1024)
            ctype=response.headers.get('Content-Type','')
            ok=data.startswith(b'%PDF') or 'pdf' in ctype.lower()
            size=int(response.headers.get('Content-Length') or 0)
            return ('pdf-accessible' if ok else 'pdf-not-confirmed'),ctype[:80],size
    except (HTTPError,URLError,TimeoutError,ValueError) as e:
        return 'pdf-unavailable',type(e).__name__+': '+str(e)[:100],0

def scan():
    prev=json.loads(OUT.read_text('utf-8')) if OUT.exists() else {'schema_version':1,'papers':[],'checks':[]}
    by_id={p['id']:p for p in prev.get('papers',[])}
    checks=[]
    timestamp=datetime.now(ZoneInfo('Asia/Shanghai')).isoformat(timespec='seconds')
    for cid,cname,url in PROGRAMS:
        check={'conference_id':cid,'name':cname,'program_url':url,'checked_at':timestamp,'status':'error','papers_found':0}
        try:
            data,ctype=download(url)
            if data.startswith(b'%PDF') or 'pdf' in ctype.lower():
                raise ValueError('PDF program needs dedicated layout parsing')
            parser=ProgramParser(url);parser.feed(data.decode('utf-8','replace'))
            unique={}
            for p in parser.papers:
                ident=hashlib.sha256((cid+'|'+re.sub(r'\W+',' ',p['title']).lower()).encode()).hexdigest()[:16]
                old=by_id.get(ident,{})
                if ident not in unique:
                    unique[ident]={'id':ident,'conference_id':cid,'conference':cname,
                     'program_url':url,'title':p['title'],'session':p['session'],
                     'source_url':p['url'],'pdf_candidate':p['pdf_candidate'],
                     'access_status':old.get('access_status','pending'),
                     'archive_status':'not-redistributed-unverified-rights',
                     'discovered_at':old.get('discovered_at',timestamp),'checked_at':timestamp}
            # Rate-limit attachment probing, and only probe links pointing to apparent PDFs.
            for item in list(unique.values())[:10]:
                if item['pdf_candidate']:
                    status,ctype,size=status_for(item['source_url'])
                    item.update(access_status=status,media_type=ctype,remote_size=size)
                else:item['access_status']='paper-link'
            by_id.update(unique)
            check.update(status='ok',papers_found=len(unique))
        except (HTTPError,URLError,TimeoutError,ValueError,UnicodeError) as e:
            check['error']=type(e).__name__+': '+str(e)[:160]
        checks.append(check)
        print(cid,check['status'],check['papers_found'])
    output={'schema_version':1,'updated_at':timestamp,'papers':sorted(by_id.values(),key=lambda p:(p['conference_id'],p['session'],p['title'])),
      'checks':checks,'archive_policy':'Public program metadata and links archived. PDF redistribution requires explicit verified permission/license. Missing or gated files are not archived.'}
    OUT.parent.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Indexed',len(output['papers']),'conference-paper entries')

if __name__=='__main__':scan()
