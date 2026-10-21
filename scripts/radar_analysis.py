"""Evidence-aware, cross-field literature triage without a mandatory LLM.

The rules rank *reading opportunities* from metadata. They MUST NOT be treated
as verified findings, causal designs, or original contributions of a paper.
"""
from __future__ import annotations

from collections import Counter
from datetime import date, datetime, timedelta
import re

CORE = (
    'corporate finance', 'venture capital', 'private equity', 'startup', 'start-up',
    'entrepreneur', 'government guidance fund', 'government investment fund',
    'industrial policy', 'innovation finance', 'firm financing', 'credit allocation',
    'ai investment', 'artificial intelligence adoption', 'compute voucher',
    'computing power', 'bank lending', 'financial intermediation', 'capital structure',
)
ADJACENT = (
    'innovation', 'technology diffusion', 'industrial organization', 'market power',
    'patent', 'supply chain', 'trade', 'export control', 'labor', 'employment',
    'productivity', 'tax', 'political economy', 'procurement', 'subsidy',
    'climate', 'platform', 'regulation', 'firm dynamics', 'monetary policy',
)
METHODS = [
    ('difference-in-differences', r'\bdifference[s]?[- ]in[- ]difference[s]?\b|\bdi[d] estimation\b|\bevent[- ]study\b', '双重差分／事件研究', '可评估是否存在可比的分组政策冲击、处理时点和动态效应。'),
    ('randomization', r'\brandomi[sz]ed\b|\bfield experiment\b|\brandom assignment\b|\brct\b', '随机实验', '可借鉴干预设计或随机分配产生的可识别变异，但需核查原文实验单位。'),
    ('instrumental variables', r'\binstrumental variable[s]?\b|\biv estimate\b|\b2sls\b', '工具变量', '可比较该研究排除限制的论证结构，不可直接复用其工具变量。'),
    ('regression discontinuity', r'\bregression discontinuity\b|\brd design\b|\bdiscontinuity design\b', '断点设计', '可检视其他制度是否具有真实的门槛及是否存在操纵。'),
    ('natural experiment', r'\bnatural experiment\b|\bquasi[- ]experiment\b', '自然／准实验', '可检索对应制度变化是否能够转化为可信识别设计。'),
    ('text-as-data', r'\btextual analysis\b|\btext[- ]as[- ]data\b|\blanguage model\b|\bnatural language processing\b|\bllm\b|\btext embedding[s]?\b', '文本／语言模型测量', '可把文本测量思路迁移到政策文件、招投标或企业披露；应先验证测量效度。'),
    ('network', r'\bnetwork[s]?\b|\bspillover[s]?\b|\bconnected firm[s]?\b|\binput[- ]output\b', '网络与溢出', '可研究关系网络上的影响传播，需注意网络形成的内生性。'),
    ('structural', r'\bstructural estimat\w*\b|\bgeneral equilibrium\b|\bstructural model\b', '结构模型／一般均衡', '可借鉴福利或均衡效应分解，但需重审模型假设的适用性。'),
    ('synthetic control', r'\bsynthetic control\b|\bmatrix completion\b', '合成控制／矩阵补全', '可思考少量处理地区或机构的反事实构造。'),
]
DATA_LENSES = [
    ('patents', r'\bpatent[s]?\b|\bcitation network\b', '专利／技术谱系', '可将技术关联测量用于企业技术组合或产业链知识传播。'),
    ('administrative', r'\badministrative data\b|\btax record[s]?\b|\bregistry data\b', '行政记录', '可检视是否存在更直接的微观行政记录及数据使用许可。'),
    ('transactions', r'\btransaction[- ]level\b|\bpayment data\b|\bcredit bureau\b|\binvoice data\b', '交易／支付记录', '可利用高频交易流量度量资金或需求冲击，需注意样本覆盖。'),
    ('satellite', r'\bsatellite\b|\bremote sensing\b|\bnight[- ]time light[s]?\b', '卫星／遥感数据', '可借鉴非传统地理测量，并与官方统计进行校准。'),
    ('web-platform', r'\bweb scrap\w*\b|\bonline platform\b|\bapp usage\b|\bjob posting[s]?\b', '网站／平台行为数据', '可从岗位、平台活动或公开网页构造新指标，并审查代表性。'),
    ('survey', r'\bsurvey[s]?\b|\bexpectation[s]?\b|\bbelief[s]?\b', '调查／预期测量', '可借鉴主观预期的测量方案，避免仅用事后行为代替信念。'),
    ('firm-network', r'\bsupply[- ]chain data\b|\bfirm[- ]to[- ]firm\b|\bownership network\b', '企业间关系数据', '可检验融资或政策效应是否沿企业关系网络扩散。'),
]
TOPICS = [
    ('AI／数字技术', r'\bartificial intelligence\b|\bgenerative ai\b|\blarge language model\b|\bmachine learning\b|\bautomation\b|\bcomputing power\b|\bgpu\b'),
    ('公司金融／创业资本', r'\bventure capital\b|\bprivate equity\b|\bentrepreneur\w*\b|\bstartup[s]?\b|\bcapital structure\b|\bmerger[s]?\b|\bfirm finance\b'),
    ('银行与信贷', r'\bbank[s]?\b|\bcredit\b|\blending\b|\bliquidity\b'),
    ('创新／技术扩散', r'\bpatent[s]?\b|\binnovation\b|\btechnology diffusion\b|\br&d\b'),
    ('政策／公共经济学', r'\bgovernment\b|\bsubsid\w*\b|\bindustrial policy\b|\btax\b|\bregulation\b'),
    ('劳动与教育', r'\blabor\b|\bemployment\b|\bwage[s]?\b|\beducation\b|\bworker[s]?\b'),
    ('贸易与产业组织', r'\btrade\b|\bexport\b|\bimport\b|\bmarket power\b|\bsupply chain\b'),
    ('宏观与货币', r'\binflation\b|\bmonetary\b|\bmacroeconomic\b|\brecession\b'),
    ('政治经济学', r'\bpolitic\w*\b|\belection[s]?\b|\bdemocracy\b'),
    ('环境与能源', r'\bclimate\b|\bcarbon\b|\benergy\b|\bdecarboni\w*\b'),
]


def text_of(p):
    return (str(p.get('title', '')) + ' ' + str(p.get('abstract', ''))).lower()


def match_lenses(p):
    text = text_of(p)
    return ([{'id': k, 'name': zh, 'transfer': tip} for k,pattern,zh,tip in METHODS if re.search(pattern,text)],
            [{'id': k, 'name': zh, 'transfer': tip} for k,pattern,zh,tip in DATA_LENSES if re.search(pattern,text)])


def classify(p):
    text = text_of(p)
    if any(term in text for term in CORE):
        return 'core'
    if any(term in text for term in ADJACENT):
        return 'adjacent'
    # This circle intentionally includes all remaining fields; never exclude
    # papers from the archive merely because they do not match current topics.
    return 'inspiration'


def topics(p):
    text = text_of(p)
    matched = [label for label, pattern in TOPICS if re.search(pattern,text)]
    return matched[:4] or ['其他经济金融领域']


def strict_publication_date(p):
    raw = p.get('first_public_date') or ''
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}',raw):
        return None
    try:
        return date.fromisoformat(raw)
    except ValueError:
        return None


def parsed_day(raw):
    try:
        return date.fromisoformat(str(raw or '')[:10])
    except ValueError:
        return None


def read_score(p, on):
    when = strict_publication_date(p)
    days = (on - when).days if when else 9999
    meth,data = match_lenses(p)
    abstract = (p.get('abstract') or '')
    score = 1 + min(len(abstract), 600)/230 + min(len(meth),3) + min(len(data),3)
    if 0 <= days <= 7: score += 5
    elif 0 <= days <= 30: score += 3
    elif 0 <= days <= 90: score += 1
    if p.get('stage') == 'working-paper': score += .5
    if (p.get('sources') or [{}])[0].get('id') in {'nber','cepr','jf','jfe','rfs','aer','qje','jpe','ectr','restud'}: score += .5
    return score


def take_diverse(papers, on, cap=5, buckets=None):
    buckets = buckets or {'core': 2, 'adjacent': 1, 'inspiration': 2}
    papers = sorted(papers,key=lambda p:(-read_score(p,on),p.get('id','')))
    selected=[]; used=set(); per_source=Counter()

    def add_from(seq, n, maxsource=2):
        for p in seq:
            if n<=0: break
            if p['id'] in used:continue
            key=(p.get('sources') or [{}])[0].get('id','unknown')
            if per_source[key]>=maxsource:continue
            selected.append(p);used.add(p['id']);per_source[key]+=1;n-=1

    for circle,n in buckets.items():
        add_from([p for p in papers if classify(p)==circle],n, max(2, cap//4))
    add_from(papers,cap-len(selected),max(3,cap//3))
    return selected[:cap]


def paper_card(p):
    methods,data=match_lenses(p)
    circle=classify(p)
    topic=topics(p)
    transfer = (data[0]['transfer'] if data else methods[0]['transfer'] if methods else
                '可从该论文的研究问题、样本选择或制度背景寻找迁移可能；目前只有标题／摘要线索，不能预设可行性。')
    return {
        'paper_id':p['id'], 'title':p.get('title',''), 'authors':p.get('authors') or [],
        'source_url':p.get('source_url',''), 'stage':p.get('stage',''),
        'first_public_date':p.get('first_public_date',''),
        'source_name':(p.get('sources') or [{}])[0].get('name',''),
        'circle':circle, 'topics':topic,
        'question_zh':'研究主题线索：'+'、'.join(topic)+'；准确研究问题请以论文原文为准。',
        'finding_zh':'尚未通过全文核实主要结论，不据标题推断研究发现。',
        'method_signals':[x['name'] for x in methods[:3]],
        'data_signals':[x['name'] for x in data[:3]],
        'migration_zh':'可探索的迁移路径：'+transfer,
        'abstract_excerpt':(p.get('abstract') or '')[:350],
        'evidence_level':'abstract-excerpt' if p.get('abstract') else 'title-only',
        'analysis_mode':'heuristic-triage',
    }


def counts_by(items, fn):
    return dict(Counter(fn(p) for p in items).most_common())


def summary_signals(items):
    methods = Counter();data=Counter();topic=Counter()
    for p in items:
        m,d=match_lenses(p)
        methods.update(x['name'] for x in m)
        data.update(x['name'] for x in d)
        topic.update(topics(p))
    return {
        'topics':dict(topic.most_common(8)),
        'methods':dict(methods.most_common(8)),
        'datasets':dict(data.most_common(8)),
        'circles':counts_by(items,classify),
    }


def research_prompts(cards):
    """Hypothesis prompts, explicitly NOT novelty / identification claims."""
    available={t for card in cards for t in card.get('topics',[])}
    prompts=[]
    if '创新／技术扩散' in available:
        prompts.append({'title':'新型技术测量能否改变我们对知识传播的理解？',
                        'test':'先比较传统代理变量和文本、网络或专利等直接测量，验证信号和测量误差。',
                        'status':'仅为开放问题，未执行文献查新或数据可行性测试'})
    if 'AI／数字技术' in available:
        prompts.append({'title':'AI投入、真实采用与组织调整是否是三种不同的企业行为？',
                        'test':'寻找明确区分资本支出、员工使用和产出改进的微观指标，再讨论识别。',
                        'status':'仅为跨领域启发，不是已确认的文献缺口'})
    if '政策／公共经济学' in available:
        prompts.append({'title':'政策分配规则与政策实际执行之间是否存在系统差距？',
                        'test':'比较政策文本、拨款／许可明细与企业行为，检验测量偏差。',
                        'status':'需要额外核实制度变异及已有文献'})
    if '贸易与产业组织' in available:
        prompts.append({'title':'企业间关系会怎样改变冲击的实际承受者？',
                        'test':'构建供需或所有权网络，并识别网络形成和共同冲击的内生性。',
                        'status':'尚未核实数据可得性和识别方案'})
    if len(prompts)<2:
        prompts.append({'title':'哪些学科正在复用相同的识别策略，却研究不同的问题？',
                        'test':'按方法标签并读异领域论文，核查其核心识别假设能否真正转用。',
                        'status':'方法迁移线索，不是因果结论'})
    return prompts[:3]
