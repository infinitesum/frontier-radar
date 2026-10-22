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
  noReports: '暂无可查证的报告',
  noReportsBody: '尚无该周期生成的研究简报。报告以可追溯的论文元数据为基础，不代表全文评审。',
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
  refreshManual: '论文库每天北京时间09:17自动更新；日报、周报和月报由独立的 GitHub Actions 工作流生成。',
  notAutomated: '尚无成功采集记录',
  limitations: '\u8986\u76d6\u8303\u56f4\u8bf4\u660e',
  metadataOnly: '\u76ee\u524d\u53ea\u81ea\u52a8\u91c7\u96c6 NBER / CEPR RSS \u548c\u914d\u7f6e\u7684 Crossref \u671f\u520a\u5143\u6570\u636e\u3002\u9876\u4f1a\u3001SSRN \u7b49\u5c06\u9010\u6b65\u589e\u52a0\uff0c\u4e0d\u5c06\u672a\u5b9e\u73b0\u7684\u6765\u6e90\u7b97\u4f5c\u5df2\u8986\u76d6\u3002',
};
const LABELS = {
  finance:'Finance', banking:'Banking', labor:'Labor', trade:'Trade',
  'ai-technology':'AI & technology', 'public-econ':'Public economics',
  methods:'Econometrics', macro:'Macroeconomics', other:'Other',
  economics:'Economics', 'cross-field':'Cross-field',
};
const PAGES = {overview:T.overview,reviews:'论文精读',papers:T.papers,insights:T.insights,reports:T.reports,sources:T.sources,saved:T.saved};
const storeKey = 'frontier-radar-library-v1';
const textScaleKey='frontier-radar-text-scale';
let textScale=Math.max(1,Math.min(1.4,Number(localStorage.getItem(textScaleKey)||1)));
function setTextScale(scale){
  textScale=Math.max(1,Math.min(1.4,Math.round(scale*10)/10));
  document.documentElement.style.setProperty('--reader-scale',String(textScale));
  const label=document.querySelector('#font-size-indicator');if(label)label.textContent=Math.round(textScale*100)+'%';
  try{localStorage.setItem(textScaleKey,String(textScale))}catch(_){}
}
document.documentElement.style.setProperty('--reader-scale',String(textScale));
const initialLibrary = (()=>{try{return JSON.parse(localStorage.getItem(storeKey)||'{}')}catch{return {}}})();
const state = {
  page:'overview', papers:[], runs:[], reports:{}, curatedReviews:[],editorialSummaries:{weekly:[],monthly:[]}, config:{rss:[],journals:[],conference_watchlist:[],planned_connectors:[]},
  snapshot:'', loaded:false, library:initialLibrary, countLimit:30, activeReportKind:'daily',activeReportId:'',reportIndexLimit:40,conferenceStatus:{items:{},events:[]},conferencePapers:{papers:[],checks:[]},
  filter:{q:'',source:'all',discipline:'all',stage:'all',period:'all',onlySaved:false},
};
const escapeHtml = input => String(input ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = input => {try{const u=new URL(String(input));return ['https:','http:'].includes(u.protocol)?u.href:'#'}catch{return '#'}};
const fmtDate = input => {if(!input)return '日期未标注';if(/^\d{4}$/.test(input))return input+'（仅年份）';if(/^\d{4}-\d{2}$/.test(input))return input.slice(0,4)+' / '+input.slice(5,7)+' (month only)';return new Date(`${input.slice(0,10)}T12:00:00Z`).toLocaleDateString('zh-CN',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});};
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
  const realNew=state.papers.filter(p=>!isBootstrap(p)&&countDays(p.discovered_at,7)&&countDays(p.first_public_date,30)).length;
  const run=latestRun(),succeeded=run?`${run.successful_sources}/${run.source_count}`:'--';
  const recent=state.papers.slice().sort((a,b)=>b.first_public_date.localeCompare(a.first_public_date)).slice(0,5);
  const inspirations=(latestIssue('daily')?.picks||[]).slice(0,3);
  return `
    ${heading(T.overview,'A live-ready discovery workspace. Verified sources, honest coverage, durable paper identities.')}

    ${renderCuratedSection(2)}
    <div class="stat-grid">${stat(T.tracked,paperCount,'Unique paper records','&#9636;')}${stat(T.newSeven,realNew,'Excludes older backfills / manual seeds','&#8599;')}${stat(T.fields,disciplines,'Heuristic classification','&#9707;')}${stat(T.sourceSuccess,succeeded,run?'Latest automated scan':T.noRun,'&#9673;')}</div>
    <div class="section-grid"><div>
      <section class="section">${sectionHead('最近公开的论文',T.latestInfo,`<button class="text-link" data-page="papers">${T.seeAll} &#8594;</button>`)}<div class="panel">${recent.length?recent.map(articleMarkup).join(''):`<div class="empty">No papers yet</div>`}</div></section>
      <section class="section">${sectionHead('Field distribution','Current archive, including starter records')}<div class="panel padded">${renderFieldBars()}</div></section>
    </div><div class="side-column">
      <section class="section">${sectionHead('每日重点与跨界灵感','来自最新一期学术简报')}${inspirations.length?inspirations.map(p=>`<div class="report-card" style="margin-bottom:11px"><div class="report-tag">${escapeHtml(CIRCLE_LABELS[p.circle]||'RESEARCH IDEA')}</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.migration_zh||'跨领域研究线索')}</p><button class="text-link" style="margin-top:10px" data-page="reports">阅读最新学术简报 &#8594;</button></div>`).join(''):emptyPanel(T.noReports,T.noReportsBody)}</section>
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
const CIRCLE_LABELS = {core:'核心圈 · 研究直接相关',adjacent:'邻近圈 · 机制相通',inspiration:'灵感圈 · 跨界发现'};
const CIRCLE_EXPLAIN = {core:'主题相关性用于排序，不限制扫描来源。',adjacent:'政策、贸易、创新、劳动等邻近经济机制。',inspiration:'重要的异领域问题、方法或数据线索。'};

function reportCard(p){
  const circle=CIRCLE_LABELS[p.circle] || '综合研究';
  const note=p.analysis_mode?.startsWith('AI-')?'AI 摘要辅助':'规则筛选／人工待复核';
  const signals=[...(p.method_signals||[]).map(s=>'方法：'+s),...(p.data_signals||[]).map(s=>'数据：'+s)];
  return `<article class="digest-paper">
    <div class="digest-overline"><span class="digest-circle ${escapeHtml(p.circle)}">${escapeHtml(circle)}</span><span class="paper-date">${fmtDate(p.first_public_date)}</span></div>
    <h3>${escapeHtml(p.title)}</h3>
    <p class="digest-authors">${escapeHtml((p.authors||[]).join(', ')||'作者信息待核验')} · ${escapeHtml(p.source_name||'来源待核验')}</p>
    <p class="digest-lead">${escapeHtml(p.question_zh||'请以原文确认研究问题。')}</p>
    ${p.analysis_mode?.startsWith('AI-') && p.finding_zh?`<p class="digest-evidence"><b>摘要所述发现：</b>${escapeHtml(p.finding_zh)}</p>`:''}
    ${p.method_note_zh?`<p class="digest-evidence"><b>数据与方法：</b>${escapeHtml(p.method_note_zh)}</p>`:''}
    ${signals.length?`<div class="digest-signals">${signals.map(s=>chip(s,'grey')).join('')}</div>`:''}
    ${p.abstract_excerpt?`<details class="digest-abstract"><summary>阅读摘要证据 · 英文原文摘录</summary><p>${escapeHtml(p.abstract_excerpt)}</p></details>`:''}
    <div class="digest-transfer"><b>→ 迁移线索</b><span>${escapeHtml(p.migration_zh||'尚无可核查的迁移路径。')}</span></div>
    <div class="digest-bottom"><span>${escapeHtml(note)} · ${p.evidence_level==='title-only'?'仅标题':'摘要摘录'}</span>
      <a href="${escapeHtml(safeUrl(p.source_url))}" target="_blank" rel="noopener noreferrer">论文原始链接 ↗</a>
      <button class="text-link" data-action="open" data-id="${escapeHtml(p.paper_id)}">查看入库信息 →</button>
    </div>
  </article>`;
}
function miniPicks(picks){
  return Object.entries(CIRCLE_LABELS).map(([key,label])=>{
    const group=picks.filter(p=>p.circle===key);
    return `<section class="digest-circle-group"><div class="digest-group-heading"><h3>${label}</h3><p>${CIRCLE_EXPLAIN[key]}</p></div>
      ${group.length?group.map(reportCard).join(''):'<div class="digest-muted">本期未选出该圈层的可靠条目，不为凑数补充。</div>'}
    </section>`;
  }).join('');
}
function latestIssue(kind){return (state.reports?.[kind]||[])[0]||null}
function resolveReport(){
  const list=state.reports?.[state.activeReportKind]||[];
  return list.find(r=>r.id===state.activeReportId)||list[0]||null;
}
function renderTagCloud(stats){
  if(!stats || !Object.keys(stats).length)return '<span class="digest-muted">暂无足够元数据</span>';
  return Object.entries(stats).slice(0,8).map(([label,num])=>`<span class="signal-pill">${escapeHtml(label)} <b>${num}</b></span>`).join('');
}
function reportArchive(issue){
  const ids=issue.archive_index||[];
  const pubs=issue.recent_publication_index||[];
  const chosen=ids.length?ids:pubs;
  const byId=new Map(state.papers.map(p=>[p.id,p]));
  const visible=chosen.slice(0,state.reportIndexLimit);
  const list=visible.map((id,i)=>{
    const p=byId.get(id);if(!p)return '';
    const fresh=pubs.includes(id);
    return `<div class="digest-index-row"><span class="digest-index-no">${i+1}</span><div><button class="text-link digest-index-title" data-action="open" data-id="${escapeHtml(id)}">${escapeHtml(p.title)}</button><div class="digest-index-meta">${escapeHtml((p.sources||[])[0]?.name||'原始来源')} · ${fmtDate(p.first_public_date)} · ${fresh?'近期首次公开':'可能为历史补录／日期精度不足'}</div></div><a class="digest-index-link" href="${escapeHtml(safeUrl(p.source_url))}" target="_blank" rel="noopener noreferrer" aria-label="打开原文">↗</a></div>`;
  }).join('');
  return `<section class="digest-section"><div class="section-header"><div><div class="section-heading">本期新增入库目录</div><div class="section-kicker">${ids.length} 篇 · 首次入库不等于首次公开；完整记录永久保留在论文主库</div></div><button class="text-link" data-page="papers">浏览论文总库 →</button></div>
    ${chosen.length?`<div class="digest-index">${list}${chosen.length>state.reportIndexLimit?`<button class="btn small" data-action="report-more">加载更多 (${visible.length}/${chosen.length})</button>`:''}</div>`:'<div class="panel padded"><p>本期没有新的入库记录。可查看上面的近期公开论文精选或历史报告。</p></div>'}
  </section>`;
}
function renderEdition(issue){
  const src=issue.source_health||{};
  const issues=[...(src.failed||[]).map(id=>id+'：接口失败'),...(src.capped||[]).map(id=>id+'：达到采集上限'),...(src.zero||[]).map(id=>id+'：返回0条待核验')];
  const signal=issue.signals||{};
  return `<section class="edition">
    <div class="edition-head"><div><div class="report-tag">${escapeHtml(issue.kind.toUpperCase())} · ${escapeHtml(issue.period_start)} — ${escapeHtml(issue.period_end)}</div>
      <h2>${escapeHtml(issue.title)}</h2><p>${escapeHtml(issue.summary_zh)}</p></div><div class="edition-meta"><b>${issue.picks?.length||0}</b><small>篇重点推荐</small></div></div>
    <div class="edition-metrics"><div><strong>${issue.new_archive_count??0}</strong><span>新增入库（含补录）</span></div><div><strong>${issue.recent_publication_count??0}</strong><span>近期可核对公开日期</span></div><div><strong>${src.success||0}/${src.attempted||0}</strong><span>采集来源成功</span></div><div><strong>${issue.analysis_level==='ai-abstract-triage'?'AI 摘要辅助':'元数据初筛'}</strong><span>分析证据层级</span></div></div>
    <div class="digest-disclosure">${escapeHtml(issue.evidence_note||'研究初筛尚未验证全文。')}</div>
    <section class="digest-section">${sectionHead('自动入库的候选论文（元数据初筛）','以下尚未经逐篇原文核查，优先阅读上方已核查精读卡片')}${miniPicks(issue.picks||[])}</section>
    <section class="digest-section">${sectionHead(issue.kind==='monthly'?'本月跨领域研究线索':'本期跨领域线索','基于标题／摘要关键词的扫描分布，不代表因果结论或学科整体趋势')}
      <div class="digest-signal-grid"><div class="report-card"><h3>研究议题</h3><div class="signal-cloud">${renderTagCloud(signal.topics)}</div></div><div class="report-card"><h3>识别／方法线索</h3><div class="signal-cloud">${renderTagCloud(signal.methods)}</div></div><div class="report-card"><h3>数据与测量线索</h3><div class="signal-cloud">${renderTagCloud(signal.datasets)}</div></div></div>
      ${(issue.synthesis||[]).length?`<div class="digest-observations">${issue.synthesis.map(x=>`<p>${escapeHtml(x)}</p>`).join('')}</div>`:''}
    </section>
    ${(issue.conference_updates||[]).length?`<section class="digest-section">${sectionHead('顶会官网新议程链接','仅验证链接变化；论文名单需单独解析')}
      <div class="report-stack">${issue.conference_updates.map(ev=>`<div class="report-card"><div class="report-tag">${escapeHtml(ev.conference_id)} · ${fmtDate(ev.date)}</div><h3>官网出现新的会议议程资源</h3><p>${escapeHtml(ev.note||'')}</p>${(ev.new_links||[]).map(l=>`<p><a class="text-link" href="${escapeHtml(safeUrl(l.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.title)} ↗</a></p>`).join('')}</div>`).join('')}</div></section>`:''}
    ${(issue.questions||[]).length?`<section class="digest-section">${sectionHead('值得进一步检验的研究问题','研究设想 ≠ 已确认的文献缺口')}
      <div class="digest-signal-grid">${issue.questions.map(q=>`<div class="report-card"><h3>${escapeHtml(q.title)}</h3><p>${escapeHtml(q.test)}</p><p class="digest-caveat">${escapeHtml(q.status)}</p></div>`).join('')}</div></section>`:''}
    ${reportArchive(issue)}
    <section class="digest-section">${sectionHead('采集证据与未完成事项','不把成功访问误认为全面覆盖')}<div class="panel padded"><p>最近入库扫描：${escapeHtml(src.scan_time||'未知')} · ${src.success||0}/${src.attempted||0} 个来源成功。</p><p>${issues.length?escapeHtml('需要核验：'+issues.join('；')):'已配置来源本轮未见接口失败、截断或零条警示。未接入的会议／工作论文来源不计入成功数。'}</p><p>首发日期可能只有年份或月份；任何历史补录均不冒充当日新论文。SSRＮ及未解析的会议 Program 不在自动收录范围内。</p></div></section>
  </section>`;
}

const REVIEW_CIRCLE = {core:'核心圈',adjacent:'邻近圈',inspiration:'灵感圈'};
function reviewedCard(r){
  const esc=escapeHtml;
  const links=(r.sources||[]).map(s=>'<a class="text-link" href="'+esc(safeUrl(s.url))+'" target="_blank" rel="noopener noreferrer">'+esc(s.label)+' ↗</a>').join(' · ');
  const topics=(r.topics||[]).map(t=>chip(t,'grey')).join('');
  const related=(r.related_projects||[]).map(t=>chip(t,'signal')).join('');
  const scope=r.read_scope||r.evidence_level||'待核查';
  return '<article class="curated-review-card" id="review-'+esc(r.paper_id)+'">'
    +'<div class="curated-overline"><span class="digest-circle '+esc(r.circle)+'">'+esc(REVIEW_CIRCLE[r.circle]||'综合')+' · '+esc((r.topics||[])[0]||'研究')+'</span>'
    +'<span class="curated-status">'+esc(r.signal||'待核查')+'</span>'
    +'<span class="curated-priority">'+esc(r.priority||'加入阅读清单')+'</span></div>'
    +'<div class="curated-venue">'+esc(r.venue||'')+' · '+esc(r.publication_date||'日期待核验')+'</div>'
    +'<h3 class="curated-title">'+esc(r.title)+'</h3>'
    +'<div class="curated-zh">'+esc(r.title_zh||'')+'</div>'
    +'<div class="curated-author">'+esc((r.authors||[]).join(', '))+'</div>'
    +'<div class="curated-result">'+esc(r.finding_zh||'尚无原文核实结论')+'</div>'
    +'<div class="curated-transfer"><strong>与你研究的连接 · 可检验假说</strong><p>'+esc(r.transfer_zh||'尚无证据充分的迁移路径')+'</p></div>'
    +'<div class="curated-topics">'+related+'</div>'
    +'<details class="curated-details"><summary>查看数据与方法、判别检验、证据范围</summary>'
    +'<p><b>数据／研究设计：</b>'+esc(r.data_method_zh||'待核查')+'</p>'
    +'<p><b>具体可做的检验：</b>'+esc(r.test_zh||'待设计')+'</p>'
    +'<p><b>重要限制：</b>'+esc(r.limitation_zh||'待核查')+'</p>'
    +'<p><b>版本与首发区别：</b>'+esc(r.version_note||'')+'</p>'
    +'<p class="curated-evidence"><b>证据级别：</b>'+esc(r.confidence||'待核查')+' · '+esc(scope)+'</p></details>'
    +'<div class="curated-footer"><div>'+topics+'</div><div class="curated-links">'+links
    +'</div></div>'
    +'</article>';
}
function renderCuratedSection(limit=0){
  const all=state.curatedReviews||[];
  if(!all.length)return '';
  const chosen=limit?all.slice(0,limit):all;
  return '<section class="section curated-section">'+sectionHead('已核查论文精读','优先读论文结论与数据，再判断对研究有何具体作用；不是关键词自动拼接',
    limit?'<button class="text-link" data-page="reviews">查看全部已核查精读 ↗</button>':'')
    +'<div class="curated-list">'+chosen.map(reviewedCard).join('')+'</div></section>';
}
function renderReviews(){
  return heading('论文精读','具体研究发现、方法与可执行行动')
    +''
    +renderCuratedSection();
}
function renderEditorialSection(kind){
  const items=state.editorialSummaries?.[kind]||[];
  if(!items.length)return '';
  const e=items[0], headingText=kind==='weekly'?'已核查周度研究综述':'已核查月度研究综述';
  const synopsis=e.synthesis_zh||e.summary_zh||e.analysis_zh||'';
  const actions=(e.actions||[]).map(a=>'<li>'+escapeHtml(typeof a==='string'?a:(a.text||a.title||''))+'</li>').join('');
  const papers=(e.papers||e.picks||[]).map(p=>{
    if(typeof p==='string')return '';
    return '<li><a class="text-link" href="'+escapeHtml(safeUrl(p.source_url||p.url))+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(p.title||p.paper_id||'论文')+' ↗</a></li>';
  }).join('');
  return '<section class="section"><div class="report-card editorial-feature"><div class="report-tag">'+escapeHtml(headingText)+' · '+escapeHtml(e.date||'')+'</div>'
    +'<h3>'+escapeHtml(e.title||headingText)+'</h3><p>'+escapeHtml(synopsis)+'</p>'
    +(papers?'<h4>本期重点论文</h4><ul>'+papers+'</ul>':'')
    +(actions?'<h4>本周/本月可执行行动</h4><ul>'+actions+'</ul>':'')
    +'</div></section>';
}

function renderInsights(){
  const latest=[...((latestIssue('daily')||{}).picks||[]),...((latestIssue('weekly')||{}).picks||[])];
  const seen=new Set();const uniquePicks=latest.filter(p=>{if(seen.has(p.paper_id))return false;seen.add(p.paper_id);return true});
  return `${heading(T.insights,'跨领域研究方法与数据灵感')}
    ${renderCuratedSection(5)}
    <div class="digest-disclosure">以下是仅基于标题和摘要的自动扫描候选，尚未核查全文。</div>
    ${uniquePicks.length?miniPicks(uniquePicks):emptyPanel(T.noReports,T.noReportsBody)}
    <div class="report-card" style="margin-top:17px"><h3>检验迁移可能性的四个问题</h3><p>（1）研究的是同一种真实经济机制吗？（2）原方法的识别假设能否迁移？（3）数据能否获取与有效测量？（4）新场景会改变经济学结论吗？</p></div>`;
}
function renderReports(){
  const counts={daily:(state.reports?.daily||[]).length,weekly:(state.reports?.weekly||[]).length,monthly:(state.reports?.monthly||[]).length};
  const labels={daily:'每日增量',weekly:'每周精读与跨界',monthly:'每月研究机会'};
  const issue=resolveReport();
  const editions=(state.reports?.[state.activeReportKind]||[]).slice(0,12);
  return `${heading(T.reports,'日报、周报与月度研究整理')}
    <div class="report-tabs" role="tablist" aria-label="简报周期">${Object.entries(labels).map(([kind,label])=>`<button class="report-tab ${state.activeReportKind===kind?'active':''}" data-action="report-kind" data-report-kind="${kind}" role="tab" aria-selected="${state.activeReportKind===kind}">${label}<span>${counts[kind]}</span></button>`).join('')}</div>
    <div class="report-history">${editions.map((r,i)=>`<button class="report-history-btn ${issue?.id===r.id?'active':''}" data-action="report-edition" data-report-id="${escapeHtml(r.id)}">${escapeHtml(r.date)}${i===0?' · 最新':''}</button>`).join('')}</div>
    ${renderEditorialSection(state.activeReportKind)}
    ${renderCuratedSection(3)}
    ${issue?renderEdition(issue):emptyPanel(T.noReports,T.noReportsBody)}
    <div class="preference-note">更新机制：GitHub Actions 定期采集并生成研究线索；没有接入 LLM 时只输出带证据标注的元数据初筛，不编造论文发现。本站是网页归档而非 ChatGPT 主动消息推送。</div>`;
}
function renderSourceTable(records,runSources){
  return `<div class="panel table-wrap"><table class="coverage-table"><thead><tr><th>Source</th><th>Type</th><th>Status</th><th>Items fetched</th><th>Result</th></tr></thead><tbody>${records.map(s=>{
    const latest=runSources.find(x=>x.id===s.id),status=latest?.status||'not-run';
    const statusName=status==='ok'?'OK':status==='error'?'ERROR':T.never;
    return `<tr><td>${escapeHtml(s.name)}</td><td>${s.issn?'Journal':'Working paper'}</td><td><span class="status-dot ${status}"></span>${statusName}</td><td class="mono">${latest?latest.fetched:'--'}</td><td>${latest?.error?`<span title="${escapeHtml(latest.error)}">${escapeHtml(latest.error.slice(0,56))}</span>`:(latest?.truncated?'Partial (cap reached)':(latest?.added||0)+' new / '+(latest?.updated||0)+' updated')}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function renderSources(){
  const run=latestRun(),sources=[...(state.config.rss||[]),...(state.config.journals||[])].filter(s=>s.enabled);
  const checks=state.conferencePapers?.checks||[],papers=state.conferencePapers?.papers||[];
  const readableStatus={ 'paper-link':'论文链接','pdf-accessible':'PDF 可访问','pdf-unavailable':'PDF 已失效／需权限','pdf-not-confirmed':'未确认为 PDF','pending':'待检测'};
  return `${heading(T.sources,'覆盖范围、采集路径与异常记录')}
    <div class="stat-grid">${stat('期刊与工作论文源',sources.length,'配置中的自动抓取来源','&#9711;')}${stat('本次成功来源',run?run.successful_sources:'—',run?`${run.source_count} 个源已尝试`:'尚无扫描','&#10003;')}${stat('会议论文索引',papers.length,'逐篇发现，非全文存档数','&#9636;')}${stat('会议项目检测',checks.filter(x=>x.status==='ok').length,checks.length+' 个正式 Program','&#9783;')}</div>
    <details class="panel pipeline-details" open><summary>数据从哪里来？如何处理？</summary>
      <ol>
        <li><b>采集：</b>NBER、CEPR 的公开 RSS；18 种英文期刊的 Crossref DOI 元数据；会议官方 Program 页面。</li>
        <li><b>整理：</b>保留来源地址、首次发现时间、论文版本与 DOI；通过 DOI／题名与作者合并重复记录，不能把旧稿重新收录当成新论文。</li>
        <li><b>筛选：</b>日报按增量和主题分层；“论文精读”另由阅读任务核查原文或官方摘要、明确结论／识别／迁移假说。</li>
        <li><b>会议附件：</b>解析正式议程中的论文条目，检测公开 PDF 是否仍可访问；没有明确转载许可的全文不上传到公开 GitHub，保留来源和失效状态。</li>
        <li><b>发布：</b>GitHub Actions 自动采集、运行测试、保存 JSON 历史并更新 GitHub Pages；异常源不会伪装为没有新增。</li>
      </ol>
      <p>当前会议采集只覆盖已接入的正式 HTML 议程，不代表所有会议／历史年份均已完整收录。期刊页面也可能存在 Crossref 登记延迟。</p>
    </details>
    <section class="section">${sectionHead('期刊与工作论文来源','最近一轮运行结果')}${renderSourceTable(sources,run?.sources||[])}</section>
    <section class="section">${sectionHead('会议 Program 与附件','可用性和归档权限分开记录')}
      <div class="panel table-wrap"><table class="coverage-table"><thead><tr><th>会议</th><th>状态</th><th>发现论文</th><th>正式议程</th></tr></thead><tbody>${checks.map(x=>`<tr><td>${escapeHtml(x.name)}</td><td>${escapeHtml(x.status==='ok'?'已扫描':x.error||'失败')}</td><td>${x.papers_found||0}</td><td><a class="text-link" href="${escapeHtml(safeUrl(x.program_url))}" target="_blank" rel="noopener noreferrer">Program ↗</a></td></tr>`).join('')||'<tr><td colspan="4">尚未执行正式议程逐篇提取</td></tr>'}</tbody></table></div>
      <details class="panel pipeline-details"><summary>查看论文附件目录（${papers.length}条）</summary>
        <div class="table-wrap"><table class="coverage-table"><thead><tr><th>论文</th><th>会议／Session</th><th>附件状态</th><th>原文</th></tr></thead><tbody>
        ${papers.slice(0,250).map(p=>`<tr><td>${escapeHtml(p.title)}</td><td>${escapeHtml(p.conference||'')}<div class="paper-author">${escapeHtml(p.session||'')}</div></td><td>${escapeHtml(readableStatus[p.access_status]||p.access_status||'待检测')}</td><td><a class="text-link" href="${escapeHtml(safeUrl(p.source_url))}" target="_blank" rel="noopener noreferrer">原始链接 ↗</a></td></tr>`).join('')||'<tr><td colspan="4">尚无论文附件记录</td></tr>'}
        </tbody></table></div><p>只列已核实的公开链接；“可访问”不等于“获得公开再分发许可”。</p>
      </details>
    </section>`;
}
function render(){
  if(!state.loaded)return;
  const main=document.querySelector('#app-main');
  const renderers={overview:renderOverview,reviews:renderReviews,papers:renderPapers,insights:renderInsights,reports:renderReports,sources:renderSources,saved:renderPapers};
  main.innerHTML=renderers[state.page]();
  if(state.page==='papers'||state.page==='saved')renderPaperFeed();
}
function openPaper(id,keepOpen=false){
  const p=state.papers.find(x=>x.id===id);if(!p)return;
  const dialog=document.querySelector('#paper-dialog');
  const pref=getPreference(id);
  const review=(state.curatedReviews||[]).find(r=>r.paper_id===id);
  const reviewed=review?`<section class="verified-dialog"><div>${chip(review.signal||'已核查','signal')} ${chip(review.priority||'阅读优先','gold')}</div>
  <h3>主要发现</h3><p>${escapeHtml(review.finding_zh||'')}</p>
  <h3>数据与识别</h3><p>${escapeHtml(review.data_method_zh||'')}</p>
  <h3>与你研究的关系 · 待检验假说</h3><p>${escapeHtml(review.transfer_zh||'')}</p>
  <h3>可操作检验</h3><p>${escapeHtml(review.test_zh||'')}</p>
  <details class="detail-extra"><summary>限制、证据和版本说明</summary><p>${escapeHtml(review.limitation_zh||'')}</p><p>${escapeHtml(review.version_note||'')}</p><p>证据：${escapeHtml(review.read_scope||review.evidence_level||'')}</p></details></section>`:'';
  const sources=(p.sources||[]).map(s=>`<a class="paper-external" href="${escapeHtml(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)} &#8599;</a>`).join(' &nbsp; ');
  dialog.querySelector('#dialog-content').innerHTML=`<div class="detail-header"><div class="detail-top"><div class="badge-list">${chip(T[p.stage==='journal'?'journal':p.stage==='working-paper'?'workingPaper':'conference'],'indigo')}${chip(sourceName(p))}${isBootstrap(p)?chip('Bootstrap record','grey'):''}</div><button class="dialog-close" data-action="close" aria-label="Close">&times;</button></div>
      <h2 class="detail-title" id="dialog-title">${listTitle(p.title)}</h2><div class="paper-author">${escapeHtml((p.authors||[]).join(', ') || 'Authors not verified')}</div>
      <div class="paper-author" style="margin-top:7px">${T.dates}: ${fmtDate(p.first_public_date)} &nbsp; &middot; &nbsp; ${T.discovered}: ${fmtDate(p.discovered_at)}</div></div>
      <div class="detail-body">${reviewed}${!review&&p.insight?.summary_zh?`<h3>${T.summary}</h3><p>${escapeHtml(p.insight.summary_zh)}</p>`:''}
        ${review?`<details class="detail-extra"><summary>原文摘要</summary><p>${escapeHtml(p.abstract||T.noAbstract)}</p></details>`:`<h3>${T.abstract}</h3><p>${escapeHtml(p.abstract||T.noAbstract)}</p>`}
        ${!review&&p.insight?.migration_zh?`<h3>${T.migration}</h3><div class="insight-quote">${escapeHtml(p.insight.migration_zh)}</div><p style="margin-top:9px;font-size:11px">Evidence scope: ${escapeHtml(p.insight.evidence||'not marked')}. This is a research hypothesis, not a demonstrated paper result.</p>`:''}
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
    try {const r=await fetch('./data/curated_reviews.json',{cache:'no-store'});if(r.ok){const j=await r.json();state.curatedReviews=Array.isArray(j.reviews)?j.reviews:[]}}catch(_){/* optional curated archive */}
    try {const r=await fetch('./data/editorial_summaries.json',{cache:'no-store'});if(r.ok){const j=await r.json();state.editorialSummaries=j||{weekly:[],monthly:[]}}}catch(_){/* optional editorial archive */}
    try {const cp=await fetch('./data/conference_papers.json',{cache:'no-store'});if(cp.ok)state.conferencePapers=await cp.json()}catch(_) { /* optional */ }
    try{
      const statusRes=await fetch('./data/conference_status.json',{cache:'no-store'});
      if(statusRes.ok)state.conferenceStatus=await statusRes.json();
    }catch(_){/* Conference monitoring is optional and cannot break papers. */}
    state.loaded=true;
    document.querySelector('#sync-pill-text').textContent=latestRun()?`最近扫描 ${fmtDate(latestRun().run_at)}`:'启动样本';
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
document.querySelector('#paper-dialog').addEventListener('click', event=>{
  if(event.target!==event.currentTarget)return;
  const box=event.currentTarget.getBoundingClientRect();
  if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom){event.currentTarget.close()}
});
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
  if(action==='report-kind'){state.activeReportKind=btn.dataset.reportKind;state.activeReportId='';state.reportIndexLimit=40;render()}
  if(action==='report-edition'){state.activeReportId=btn.dataset.reportId;state.reportIndexLimit=40;render()}
  if(action==='report-more'){state.reportIndexLimit+=80;render()}
});
document.querySelector('#export-btn').addEventListener('click',exportCsv);
document.querySelector('#font-smaller').addEventListener('click',()=>setTextScale(textScale-.1));
document.querySelector('#font-larger').addEventListener('click',()=>setTextScale(textScale+.1));
setTextScale(textScale);
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
