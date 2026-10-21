/* Frontier Radar: no external frontend dependencies or tracking. */
const T = {
  overview: '\u603b\u89c8', papers: '\u5168\u90e8\u8bba\u6587',
  insights: '\u7814\u7a76\u7075\u611f', reports: '\u5b66\u672f\u7b80\u62a5',
  sources: '\u6570\u636e\u6e90\u4e0e\u5065\u5eb7\u72b6\u6001', saved: '\u6211\u7684\u6536\u85cf',
  hello: '\u4e0d\u88ab\u7814\u7a76\u65b9\u5411\u9650\u5236\u7684\u5b66\u672f\u53d1\u73b0',
  intro: '\u8ffd\u8e2a\u56fd\u9645\u7ecf\u6d4e\u91d1\u878d\u9876\u520a\u3001\u5de5\u4f5c\u8bba\u6587\u548c\u9876\u4f1a\u3002\u4f18\u5148\u4fdd\u7559\u5e7f\u5ea6\uff0c\u518d\u8bc6\u522b\u65b9\u6cd5\u3001\u6570\u636e\u548c\u673a\u5236\u7684\u8fc1\u79fb\u4ef7\u503c\u3002',
  bootstrap: '\u542f\u52a8\u6837\u672c\uff1a\u5c1a\u672a\u8fdb\u884c\u5168\u91cf\u91c7\u96c6',
  noRun: '\u5c1a\u672a\u6267\u884c\u91c7\u96c6', lastRun: '\u4e0a\u6b21\u91c7\u96c6',
  tracked: '\u5df2\u6536\u5f55\u8bba\u6587', newSeven: '\u8fd1 7 \u5929\u65b0\u53d1\u73b0',
  fields: '\u8986\u76d6\u5b66\u79d1', sourceSuccess: '\u6210\u529f\u91c7\u96c6\u6765\u6e90',
  latest: '\u6700\u65b0\u8bba\u6587', latestInfo: '\u9ed8\u8ba4\u6309\u9996\u6b21\u516c\u5f00\u65e5\u671f\u6392\u5e8f',
  seeAll: '\u67e5\u770b\u5168\u90e8', curated: '\u8de8\u9886\u57df\u8fc1\u79fb\u7075\u611f',
  curatedInfo: '\u53ea\u663e\u793a\u6709\u660e\u786e\u8bc1\u636e\u7684\u7f16\u8f91\u89c2\u5bdf',
  discover: '\u672a\u6765\u7684\u65b0\u65b9\u5411\uff0c\u53ef\u80fd\u51fa\u73b0\u5728\u65e0\u5173\u7684\u8bba\u6587\u4e2d\u3002',
  noReports: '\u5c1a\u65e0\u5df2\u9a8c\u8bc1\u7684\u603b\u7ed3',
  noReportsBody: '\u6bcf\u65e5\u3001\u6bcf\u5468\u548c\u6bcf\u6708\u7684\u6df1\u5ea6\u89e3\u8bfb\u9700\u8981\u72ec\u7acb\u751f\u6210\u548c\u5ba1\u6838\u3002\u8be5\u770b\u677f\u4e0d\u4f1a\u4f2a\u9020\u672a\u8fd0\u884c\u7684 AI \u5206\u6790\u3002',
  monitoring: '\u76d1\u6d4b\u6765\u6e90', recentRuns: '\u6700\u8fd1\u6267\u884c',
  sourcesIntro: '\u663e\u793a\u771f\u6b63\u6210\u529f\u68c0\u7d22\u7684\u6765\u6e90\uff0c\u672a\u6267\u884c\u7684\u76d1\u63a7\u4e0d\u4f1a\u663e\u793a\u4e3a\u6210\u529f\u3002',
  search: '\u641c\u7d22\u6807\u9898\u3001\u4f5c\u8005\u3001\u6458\u8981\u548c\u8fc1\u79fb\u7b14\u8bb0',
  allSources: '\u5168\u90e8\u6765\u6e90', allFields: '\u5168\u90e8\u9886\u57df',
  allStages: '\u5168\u90e8\u9636\u6bb5', periodAll: '\u5168\u90e8\u65e5\u671f',
  workingPaper: '\u5de5\u4f5c\u8bba\u6587', journal: '\u671f\u520a\u8bba\u6587', conference: '\u4f1a\u8bae\u8bba\u6587',
  all: '\u5168\u90e8', noAbstract: '\u5c1a\u65e0\u53ef\u9a8c\u8bc1\u7684\u6458\u8981\u3002',
  read: '\u5df2\u8bfb', unread: '\u672a\u8bfb', save: '\u6536\u85cf', unsave: '\u53d6\u6d88\u6536\u85cf',
  detail: '\u8be6\u60c5', original: '\u8bbf\u95ee\u539f\u6587', clear: '\u6e05\u9664\u7b5b\u9009',
  more: '\u52a0\u8f7d\u66f4\u591a', records: '\u7bc7\u8bba\u6587',
  noMatches: '\u672a\u627e\u5230\u5339\u914d\u7684\u8bba\u6587',
  noMatchesDetail: '\u8bf7\u653e\u5bbd\u6765\u6e90\u3001\u65f6\u95f4\u6216\u5173\u952e\u8bcd\u7b5b\u9009\u3002',
  summary: '\u7814\u7a76\u6982\u8981', migration: '\u8de8\u9886\u57df\u8fc1\u79fb',
  abstract: '\u539f\u59cb\u6458\u8981', lifecycle: '\u7248\u672c\u4e0e\u8bb0\u5f55',
  dates: '\u9996\u6b21\u516c\u5f00', discovered: '\u7cfb\u7edf\u53d1\u73b0',
  sample: '\u624b\u5de5\u542f\u52a8\u6761\u76ee\uff08\u4e0d\u4ee3\u8868\u672c\u5468\u65b0\u589e\uff09',
  cover: '\u91c7\u96c6\u8986\u76d6', never: '\u672a\u626b\u63cf',
  sourceList: '\u6765\u6e90\u7ba1\u7406', updateDate: '\u53d1\u5e03\u65e5\u671f',
  close: '\u5173\u95ed', go: '\u67e5\u770b',
  privateSaved: '\u6536\u85cf\u548c\u5df2\u8bfb\u6807\u8bb0\u4ec5\u4fdd\u5b58\u5728\u5f53\u524d\u6d4f\u89c8\u5668\uff0c\u6362\u8bbe\u5907\u4e0d\u4f1a\u81ea\u52a8\u540c\u6b65\u3002',
  refreshManual: '\u6570\u636e\u5237\u65b0\u6682\u4ec5\u652f\u6301\u624b\u52a8\u8fd0\u884c\uff1b\u5c1a\u672a\u521b\u5efa\u5b9a\u65f6\u4efb\u52a1\u3002',
  notAutomated: '\u5c1a\u672a\u8bbe\u7f6e\u81ea\u52a8\u8fd0\u884c',
  limitations: '\u8986\u76d6\u8303\u56f4\u8bf4\u660e',
  metadataOnly: '\u76ee\u524d\u53ea\u81ea\u52a8\u91c7\u96c6 NBER / CEPR RSS \u548c\u914d\u7f6e\u7684 Crossref \u671f\u520a\u5143\u6570\u636e\u3002\u9876\u4f1a\u3001SSRN \u7b49\u5c06\u9010\u6b65\u589e\u52a0\uff0c\u4e0d\u5c06\u672a\u5b9e\u73b0\u7684\u6765\u6e90\u7b97\u4f5c\u5df2\u8986\u76d6\u3002',
};
const LABELS = {
  finance:'Finance', banking:'Banking', labor:'Labor', trade:'Trade',
  'ai-technology':'AI & technology', 'public-econ':'Public economics',
  methods:'Econometrics', macro:'Macroeconomics', other:'Other',
  economics:'Economics', 'cross-field':'Cross-field',
};
const PAGES = {overview:T.overview,papers:T.papers,insights:T.insights,reports:T.reports,sources:T.sources,saved:T.saved};
const storeKey = 'frontier-radar-library-v1';
const initialLibrary = (()=>{try{return JSON.parse(localStorage.getItem(storeKey)||'{}')}catch{return {}}})();
const state = {
  page:'overview', papers:[], runs:[], reports:{}, config:{rss:[],journals:[],conference_watchlist:[],planned_connectors:[]},
  snapshot:'', loaded:false, library:initialLibrary, countLimit:30,
  filter:{q:'',source:'all',discipline:'all',stage:'all',period:'all',onlySaved:false},
};
const escapeHtml = input => String(input ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = input => {try{const u=new URL(String(input));return ['https:','http:'].includes(u.protocol)?u.href:'#'}catch{return '#'}};
const fmtDate = input => {if(!input)return 'Date unavailable';if(/^\d{4}-\d{2}$/.test(input))return input.slice(0,4)+' / '+input.slice(5,7)+' (month only)';return new Date(`${input.slice(0,10)}T12:00:00Z`).toLocaleDateString('zh-CN',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});};
const countDays = (iso,days) => /^\d{4}-\d{2}-\d{2}$/.test(iso||'') && new Date(`${iso}T00:00:00Z`).getTime() >= (Date.now() - days*86400000);
const latestRun = () => state.runs.at(-1) || null;
const sourceName = p => p.sources?.[0]?.name || 'Other source';
const isBootstrap = p => p.events?.some(e=>e.kind==='manual-bootstrap');
const unique = values => [...new Set(values)];
const listTitle = text => escapeHtml(text || 'Untitled');
const getPreference = id => state.library[id] || {};

let toastTimer;
function notify(message){
  const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2300);
}
function savePreference(id,flag){
  const current={...getPreference(id),[flag]:!getPreference(id)[flag]};
  if(!current.saved && !current.read){delete state.library[id]}else{state.library[id]=current}
  try{localStorage.setItem(storeKey,JSON.stringify(state.library))}catch{notify('Browser storage unavailable')}
  document.querySelector('#saved-counter').textContent=Object.values(state.library).filter(x=>x.saved).length;
  render();
  const dialog=document.querySelector('#paper-dialog');
  if(dialog.open)openPaper(id,true);
}
function changePage(page){
  if(!PAGES[page])return;
  state.page=page;state.countLimit=30;
  for(const btn of document.querySelectorAll('[data-page]'))btn.classList.toggle('selected',btn.dataset.page===page);
  document.querySelector('#page-breadcrumb').textContent=PAGES[page];
  render();window.scrollTo({top:0,behavior:'smooth'});
}
function heading(title,desc,extra=''){
  return `<div class="page-heading"><div><div class="eyebrow">GLOBAL ECONOMICS & FINANCE</div><h1>${escapeHtml(title)}</h1>${desc?`<p class="heading-desc">${escapeHtml(desc)}</p>`:''}</div>${extra?`<div class="heading-tools">${extra}</div>`:''}</div>`;
}
function stat(label,value,foot,icon){
  return `<div class="stat-card"><div class="stat-icon" aria-hidden="true">${icon}</div><div class="stat-label">${escapeHtml(label)}</div><div class="stat-value">${escapeHtml(value)}</div><div class="stat-foot">${escapeHtml(foot)}</div></div>`;
}
function sectionHead(title,subtitle,button=''){
  return `<div class="section-header"><div><div class="section-heading">${escapeHtml(title)}</div>${subtitle?`<div class="section-kicker">${escapeHtml(subtitle)}</div>`:''}</div>${button}</div>`;
}
function emptyPanel(title,desc){return `<div class="panel"><div class="empty"><div class="empty-glyph">&#9678;</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p></div></div>`}
function chip(text,style=''){return `<span class="pill ${style}">${escapeHtml(text)}</span>`}
function articleMarkup(p){
  const saved=Boolean(getPreference(p.id).saved),read=Boolean(getPreference(p.id).read);
  const snippet=p.insight?.summary_zh || p.abstract || '';
  return `<article class="paper-row">
    <div class="paper-topline"><div class="badge-list">${chip(sourceName(p))}${chip(T[p.stage==='journal'?'journal':p.stage==='working-paper'?'workingPaper':'conference'],'indigo')}${p.insight?.migration_zh?chip('\u2726 '+T.curated,'signal'):''}${isBootstrap(p)?chip('Bootstrap','grey'):''}</div><span class="paper-date">${fmtDate(p.first_public_date)}</span></div>
    <button class="paper-title" data-action="open" data-id="${escapeHtml(p.id)}">${listTitle(p.title)}</button>
    <div class="paper-author">${escapeHtml((p.authors||[]).join(', ') || 'Authors not verified')} &nbsp; &middot; &nbsp; ${escapeHtml(LABELS[p.discipline]||'Other')}</div>
    ${snippet?`<div class="paper-snippet">${escapeHtml(snippet)}</div>`:''}
    <div class="paper-actions"><div class="paper-actions-left"><button class="paper-btn ${saved?'active':''}" data-action="save" data-id="${escapeHtml(p.id)}" aria-pressed="${saved}">${saved?'&#9733;':'&#9734;'} ${saved?T.unsave:T.save}</button><button class="paper-btn ${read?'active':''}" data-action="read" data-id="${escapeHtml(p.id)}" aria-pressed="${read}">${read?'&#10003;':''} ${read?T.read:T.unread}</button></div><a href="${escapeHtml(safeUrl(p.source_url))}" target="_blank" rel="noopener noreferrer" class="paper-external">${T.original} &#8599;</a></div>
  </article>`;
}
function papersFiltered(){
  const f=state.filter,q=f.q.trim().toLocaleLowerCase();
  return state.papers.filter(p=>{
    if(state.page==='saved' && !getPreference(p.id).saved)return false;
    if(f.onlySaved && !getPreference(p.id).saved)return false;
    if(f.source!=='all' && !(p.sources||[]).some(s=>s.id===f.source))return false;
    if(f.discipline!=='all' && p.discipline!==f.discipline)return false;
    if(f.stage!=='all' && p.stage!==f.stage)return false;
    if(f.period!=='all' && !countDays(p.first_public_date,Number(f.period)))return false;
    if(q){const blob=[p.title,(p.authors||[]).join(' '),p.abstract,p.insight?.summary_zh,p.insight?.migration_zh].join(' ').toLocaleLowerCase();if(!blob.includes(q))return false}
    return true;
  }).sort((a,b)=>((b.first_public_date||'').localeCompare(a.first_public_date||'')||(b.discovered_at||'').localeCompare(a.discovered_at||'')));
}
function getSourceOptions(){
  return unique(state.papers.flatMap(p=>(p.sources||[]).map(s=>s.id))).sort().map(id=>{
    const item=[...(state.config.rss||[]),...(state.config.journals||[])].find(s=>s.id===id);
    return {value:id,label:item?.name||id};
  });
}
function filterSelect(name,options){
  return `<select class="filter-select" data-filter="${name}" aria-label="${escapeHtml(name)}">${options.map(o=>`<option value="${escapeHtml(o.value)}" ${state.filter[name]===o.value?'selected':''}>${escapeHtml(o.label)}</option>`).join('')}</select>`;
}
function filterBar(){
  const fields=unique(state.papers.map(p=>p.discipline)).sort().map(x=>({value:x,label:LABELS[x]||x}));
  return `<div class="filterbar">
    <div class="search-wrapper"><input id="paper-search" class="input" data-filter="q" type="search" autocomplete="off" aria-label="${T.search}" placeholder="${T.search}" value="${escapeHtml(state.filter.q)}"></div>
    ${filterSelect('source',[{value:'all',label:T.allSources},...getSourceOptions()])}
    ${filterSelect('discipline',[{value:'all',label:T.allFields},...fields])}
    ${filterSelect('stage',[{value:'all',label:T.allStages},{value:'working-paper',label:T.workingPaper},{value:'journal',label:T.journal},{value:'conference',label:T.conference}])}
    ${filterSelect('period',[{value:'all',label:T.periodAll},{value:'7',label:'Last 7 days'},{value:'30',label:'Last 30 days'},{value:'90',label:'Last 90 days'},{value:'365',label:'Last year'}])}
  </div><div class="filter-meta"><span id="results-count"></span><div style="display:flex;align-items:center;gap:14px"><label class="check-inline"><input type="checkbox" data-filter="onlySaved" ${state.filter.onlySaved?'checked':''}>${T.saved}</label><button class="text-link" data-action="clear">${T.clear}</button></div></div>`;
}
function renderPaperFeed(){
  const filtered=papersFiltered(),el=document.querySelector('#paper-feed'),total=document.querySelector('#results-count');
  if(total)total.textContent=`${filtered.length} ${T.records}`;
  if(!el)return;
  const visible=filtered.slice(0,state.countLimit);
  el.innerHTML=visible.length?`<div class="panel">${visible.map(articleMarkup).join('')}${filtered.length>visible.length?`<div class="pager"><button class="btn small" data-action="more">${T.more} (${visible.length}/${filtered.length})</button></div>`:''}</div>`:emptyPanel(T.noMatches,T.noMatchesDetail);
}
function healthOverview(){
  const run=latestRun(),all=run?.source_count||0,success=run?.successful_sources||0;
  if(!run)return `<div class="callout"><h3>${T.notAutomated}</h3><p>${T.refreshManual}</p></div>`;
  return `<div class="callout"><h3>${success===all?'All configured collectors succeeded':'Coverage is incomplete'}</h3><p>${success}/${all} sources succeeded. ${T.lastRun}: ${fmtDate(run.run_at)}. Failed sources remain visible in health status.</p></div>`;
}
function renderOverview(){
  const paperCount=state.papers.length,disciplines=unique(state.papers.map(p=>p.discipline)).length;
  const realNew=state.papers.filter(p=>!isBootstrap(p)&&countDays(p.discovered_at,7)).length;
  const run=latestRun(),succeeded=run?`${run.successful_sources}/${run.source_count}`:'--';
  const recent=state.papers.slice().sort((a,b)=>b.first_public_date.localeCompare(a.first_public_date)).slice(0,5);
  const inspirations=state.papers.filter(p=>p.insight?.migration_zh).slice(0,2);
  return `
    ${heading(T.overview,'A live-ready discovery workspace. Verified sources, honest coverage, durable paper identities.')}
    <section class="hero"><div class="hero-copy"><div class="eyebrow">THE DISCOVERY PRINCIPLE</div><h2>${T.hello}</h2><p>${T.intro}</p><div class="hero-note">${run?`Last scan ${fmtDate(run.run_at)}`:T.bootstrap}</div></div><div class="hero-art" aria-hidden="true">&#10022;</div></section>
    <div class="stat-grid">${stat(T.tracked,paperCount,'Unique paper records','&#9636;')}${stat(T.newSeven,realNew,'Excludes manually seeded papers','&#8599;')}${stat(T.fields,disciplines,'Heuristic classification','&#9707;')}${stat(T.sourceSuccess,succeeded,run?'Latest manual refresh':T.noRun,'&#9673;')}</div>
    <div class="section-grid"><div>
      <section class="section">${sectionHead(T.latest,T.latestInfo,`<button class="text-link" data-page="papers">${T.seeAll} &#8594;</button>`)}<div class="panel">${recent.length?recent.map(articleMarkup).join(''):`<div class="empty">No papers yet</div>`}</div></section>
      <section class="section">${sectionHead('Field distribution','Current archive, including starter records')}<div class="panel padded">${renderFieldBars()}</div></section>
    </div><div class="side-column">
      <section class="section">${sectionHead(T.curated,T.curatedInfo)}${inspirations.length?inspirations.map(p=>`<div class="report-card" style="margin-bottom:11px"><div class="report-tag">TRANSFERABLE IDEA</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.insight.migration_zh)}</p><button class="text-link" style="margin-top:10px" data-action="open" data-id="${escapeHtml(p.id)}">${T.detail} &#8594;</button></div>`).join(''):emptyPanel(T.noReports,T.noReportsBody)}</section>
      <section class="section">${sectionHead(T.cover,'RSS + journal metadata')}${healthOverview()}<div class="panel padded"><div class="side-list"><div class="side-line"><span>Configured journal feeds</span><strong>${(state.config.journals||[]).filter(x=>x.enabled).length}</strong></div><div class="side-line"><span>Configured working-paper feeds</span><strong>${(state.config.rss||[]).filter(x=>x.enabled).length}</strong></div><div class="side-line"><span>Conference watchlist (manual)</span><strong>${(state.config.conference_watchlist||[]).length}</strong></div></div><button class="text-link" data-page="sources">${T.sources} &#8594;</button></div></section>
    </div></div>
    <div class="preference-note">${T.privateSaved}</div>`;
}
function renderFieldBars(){
  const counts={};for(const p of state.papers){counts[p.discipline||'other']=(counts[p.discipline||'other']||0)+1}
  const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8),max=Math.max(1,...top.map(x=>x[1]));
  if(!top.length)return '<p>No data</p>';
  return `<div class="chart-bars">${top.map(([k,n])=>`<div><div class="chart-item-head"><span>${escapeHtml(LABELS[k]||k)}</span><b>${n}</b></div><div class="meter"><div style="width:${100*n/max}%"></div></div></div>`).join('')}</div>`;
}
function renderPapers(){
  return `${heading(state.page==='saved'?T.saved:T.papers, state.page==='saved'?T.privateSaved:'Browse all verified records from configured sources.',`<button class="btn small" data-action="export">Export CSV &#8681;</button>`)}
   ${filterBar()}<div id="paper-feed"></div>`;
}
function renderInsights(){
  const items=state.papers.filter(p=>p.insight?.migration_zh);
  return `${heading(T.insights,T.curatedInfo)}<div class="preference-note" style="margin-bottom:20px">${T.discover} Verified insights are written separately, not fabricated from missing abstracts.</div>
    <div class="section-grid"><div>${items.length?`<div class="panel">${items.map(articleMarkup).join('')}</div>`:emptyPanel(T.noReports,T.noReportsBody)}</div><div><div class="panel padded">${sectionHead('Research transfer framework','Useful lenses for any field')}<div class="side-list"><div class="side-line"><span>New dataset</span><strong>&#8594; Measurement</strong></div><div class="side-line"><span>Identification</span><strong>&#8594; Design</strong></div><div class="side-line"><span>New mechanism</span><strong>&#8594; Hypothesis</strong></div><div class="side-line"><span>New institution</span><strong>&#8594; Variation</strong></div></div></div></div></div>`;
}
function renderReports(){
  const labels={daily:'Daily / 12:00 Beijing',weekly:'Weekly / Sunday evening',monthly:'Monthly / Day 1'};
  return `${heading(T.reports,'Daily discovery, weekly synthesis and monthly research opportunity review.')}
    <div class="report-stack" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr));display:grid">${Object.entries(labels).map(([key,label])=>{
      const entries=state.reports[key]||[];
      return `<div class="report-card"><div class="report-meta"><span class="report-tag">${key.toUpperCase()}</span><span>${entries.length} editions</span></div><h3>${label}</h3><p>${entries.length?escapeHtml(entries[0].title || 'Research digest'):T.noReportsBody}</p></div>`;
    }).join('')}</div><div style="margin-top:22px" class="preference-note">${T.refreshManual} Automatic narrative generation, journal alerts and push notifications are not enabled.</div>`;
}
function renderSourceTable(records,runSources){
  return `<div class="panel table-wrap"><table class="coverage-table"><thead><tr><th>Source</th><th>Type</th><th>Status</th><th>Items fetched</th><th>Result</th></tr></thead><tbody>${records.map(s=>{
    const latest=runSources.find(x=>x.id===s.id),status=latest?.status||'not-run';
    const statusName=status==='ok'?'OK':status==='error'?'ERROR':T.never;
    return `<tr><td>${escapeHtml(s.name)}</td><td>${s.issn?'Journal':'Working paper'}</td><td><span class="status-dot ${status}"></span>${statusName}</td><td class="mono">${latest?latest.fetched:'--'}</td><td>${latest?.error?`<span title="${escapeHtml(latest.error)}">${escapeHtml(latest.error.slice(0,56))}</span>`:(latest?.truncated?'Partial (cap reached)':(latest?.added||0)+' new / '+(latest?.updated||0)+' updated')}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function renderSources(){
  const run=latestRun(),result=run?.sources||[],sources=[...(state.config.rss||[]),...(state.config.journals||[])].filter(s=>s.enabled);
  return `${heading(T.sources,T.sourcesIntro)}
    <div class="stat-grid">${stat('Configured feeds',sources.length,'Active collection definitions','&#9711;')}${stat('Latest source success',run?run.successful_sources:'--',run?`${run.source_count} attempted`:T.never,'&#10003;')}${stat('Latest source errors',run?run.counts.errors:'--','Never hidden','!')}${stat('Conference watchlist',(state.config.conference_watchlist||[]).length,'Program checks still manual','&#9783;')}</div>
    <section class="section">${sectionHead(T.monitoring,'Source-by-source accountability')}${renderSourceTable(sources,result)}</section>
    <div class="section-grid"><section class="section">${sectionHead('Conferences to verify','Program URLs are leads, not automated coverage')}<div class="panel"><div class="side-list" style="padding:4px 21px">${(state.config.conference_watchlist||[]).map(s=>`<div class="side-line"><span>${escapeHtml(s.name)}</span><a class="text-link" href="${escapeHtml(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">Official site &#8599;</a></div>`).join('')}</div></div></section>
    <section class="section">${sectionHead(T.limitations,'Transparent current capabilities')}<div class="panel padded"><p style="line-height:1.9;font-size:12px;color:#637886">${T.metadataOnly}</p><div class="preference-note">Planned: ${escapeHtml((state.config.planned_connectors||[]).join(' / '))}</div></div></section></div>`;
}
function render(){
  if(!state.loaded)return;
  const main=document.querySelector('#app-main');
  const renderers={overview:renderOverview,papers:renderPapers,insights:renderInsights,reports:renderReports,sources:renderSources,saved:renderPapers};
  main.innerHTML=renderers[state.page]();
  if(state.page==='papers'||state.page==='saved')renderPaperFeed();
}
function openPaper(id,keepOpen=false){
  const p=state.papers.find(x=>x.id===id);if(!p)return;
  const dialog=document.querySelector('#paper-dialog');
  const pref=getPreference(id);
  const sources=(p.sources||[]).map(s=>`<a class="paper-external" href="${escapeHtml(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)} &#8599;</a>`).join(' &nbsp; ');
  dialog.querySelector('#dialog-content').innerHTML=`<div class="detail-header"><div class="detail-top"><div class="badge-list">${chip(T[p.stage==='journal'?'journal':p.stage==='working-paper'?'workingPaper':'conference'],'indigo')}${chip(sourceName(p))}${isBootstrap(p)?chip('Bootstrap record','grey'):''}</div><button class="dialog-close" data-action="close" aria-label="Close">&times;</button></div>
      <h2 class="detail-title" id="dialog-title">${listTitle(p.title)}</h2><div class="paper-author">${escapeHtml((p.authors||[]).join(', ') || 'Authors not verified')}</div>
      <div class="paper-author" style="margin-top:7px">${T.dates}: ${fmtDate(p.first_public_date)} &nbsp; &middot; &nbsp; ${T.discovered}: ${fmtDate(p.discovered_at)}</div></div>
      <div class="detail-body">${p.insight?.summary_zh?`<h3>${T.summary}</h3><p>${escapeHtml(p.insight.summary_zh)}</p>`:''}
        <h3>${T.abstract}</h3><p>${escapeHtml(p.abstract||T.noAbstract)}</p>
        ${p.insight?.migration_zh?`<h3>${T.migration}</h3><div class="insight-quote">${escapeHtml(p.insight.migration_zh)}</div><p style="margin-top:9px;font-size:11px">Evidence scope: ${escapeHtml(p.insight.evidence||'not marked')}. This is a research hypothesis, not a demonstrated paper result.</p>`:''}
        <h3>${T.lifecycle}</h3><div class="detail-events">${(p.events||[]).map(e=>`<div class="detail-event"><span>${fmtDate(e.date)} &mdash; ${escapeHtml(e.kind)} ${e.note?`&middot; ${escapeHtml(e.note)}`:''}</span></div>`).join('')||'<p>No recorded events</p>'}</div>
        <h3>${T.original}</h3><p>${sources}</p><div class="detail-btns"><button class="btn primary" data-action="save" data-id="${escapeHtml(id)}">${pref.saved?'&#9733; '+T.unsave:'&#9734; '+T.save}</button><button class="btn" data-action="read" data-id="${escapeHtml(id)}">${pref.read?'&#10003; '+T.read:T.unread}</button><a class="btn" href="${escapeHtml(safeUrl(p.source_url))}" target="_blank" rel="noopener noreferrer">${T.original} &#8599;</a></div></div>`;
  if(!keepOpen && !dialog.open)dialog.showModal();
}
function resetFilters(){state.filter={q:'',source:'all',discipline:'all',stage:'all',period:'all',onlySaved:false};state.countLimit=30;render()}
function csvCell(value){let s=String(value??'');if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function exportCsv(){
  const rows=(state.page==='papers'||state.page==='saved')?papersFiltered():state.papers;
  const output=[['ID','Title','Authors','Source','First public date','Discovered at','Stage','DOI','URL','Saved','Read']];
  for(const p of rows){const pref=getPreference(p.id);output.push([p.id,p.title,(p.authors||[]).join('; '),sourceName(p),p.first_public_date,p.discovered_at,p.stage,p.doi,p.source_url,pref.saved?'yes':'no',pref.read?'yes':'no'])}
  const csv='\ufeff'+output.map(row=>row.map(csvCell).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='frontier-radar-'+new Date().toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);notify('CSV ready');
}
async function loadData(){
  try{
    const fileNames=['papers','runs','reports','sources'];
    const [papers,runs,reports,sources]=await Promise.all(fileNames.map(async name=>{
      const res=await fetch('./data/'+name+'.json',{cache:'no-store'});
      if(!res.ok)throw new Error('HTTP '+res.status+' for '+name+'.json');
      return res.json();
    }));
    state.papers=Array.isArray(papers.papers)?papers.papers:[];
    state.snapshot=papers.snapshot||'';
    state.runs=Array.isArray(runs.runs)?runs.runs:[];
    state.reports=reports;
    state.config=sources;
    state.loaded=true;
    document.querySelector('#sync-pill-text').textContent=latestRun()?`Last scan ${fmtDate(latestRun().run_at)}`:'Bootstrap / Manual';
    document.querySelector('#sidebar-status').textContent=latestRun()?`${latestRun().successful_sources}/${latestRun().source_count} active sources`:T.noRun;
    if(latestRun()&&latestRun().successful_sources===latestRun().source_count){document.querySelector('#sync-led').classList.add('healthy');document.querySelector('.mini-indicator i').classList.add('healthy')}
    document.querySelector('#saved-counter').textContent=Object.values(state.library).filter(x=>x.saved).length;
    document.querySelectorAll('[data-page]').forEach(btn=>{
      const pg=btn.dataset.page;
      if(PAGES[pg]){const label=btn.querySelector('span:nth-child(2)');if(label)label.textContent=PAGES[pg]}
    });
    render();
  }catch(error){
    console.error(error);
    document.querySelector('#app-main').innerHTML=`<div class="empty"><h3>Archive unavailable</h3><p>${escapeHtml(error.message)}. Serve the built dist/ directory over HTTP (not file://).</p></div>`;
  }
}
document.addEventListener('click',event=>{
  const page=event.target.closest('[data-page]');if(page){changePage(page.dataset.page);return}
  const btn=event.target.closest('[data-action]');if(!btn)return;
  const action=btn.dataset.action,id=btn.dataset.id;
  if(action==='open')openPaper(id);
  if(action==='save'||action==='read')savePreference(id,action==='save'?'saved':'read');
  if(action==='close')document.querySelector('#paper-dialog').close();
  if(action==='more'){state.countLimit+=30;renderPaperFeed()}
  if(action==='clear')resetFilters();
  if(action==='export')exportCsv();
});
document.querySelector('#export-btn').addEventListener('click',exportCsv);
document.querySelector('#app-main').addEventListener('input',event=>{
  if(event.target.dataset.filter==='q'){
    state.filter.q=event.target.value;state.countLimit=30;renderPaperFeed();
  }
});
document.querySelector('#app-main').addEventListener('change',event=>{
  const key=event.target.dataset.filter;if(!key||key==='q')return;
  state.filter[key]=key==='onlySaved'?event.target.checked:event.target.value;
  state.countLimit=30;renderPaperFeed();
});
loadData();
