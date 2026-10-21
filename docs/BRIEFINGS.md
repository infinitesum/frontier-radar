# Frontier Radar: daily discovery and research briefs

**Purpose:** A cross-field, English-language economics and finance paper radar. Coverage precedes user-specific ranking. Papers on China written in English are included. Chinese-language papers and Chinese-language journals are excluded. All database records are retained; only the featured picks are filtered.

## Live GitHub Actions schedules (Asia/Shanghai)

| Local time | Workflow | Result |
| --- | --- | --- |
| Every day 09:17 | `refresh-manual.yml` | Updates journal and working-paper metadata; checks official conference program links; publishes Pages |
| Every day 11:43 | `briefings.yml` daily | Creates a source-linked daily issue before the preferred 12:00 reading time and publishes it |
| Every Sunday 20:13 | `briefings.yml` weekly | Summarizes the week's discoveries, cross-field methods/data cues, and 8–12 reading priorities when available |
| Day 1 of every month 20:31 | `briefings.yml` monthly | Reviews the **previous completed calendar month** and generates research questions to investigate |

Schedules are **best effort**, not push notifications. GitHub Actions may be queued, delayed, or skipped. The website is the delivery channel; no ChatGPT task is used. GitHub may disable cron for a public repository after prolonged inactivity.

## Where the output appears

- [Live dashboard](https://infinitesum.github.io/frontier-radar/) → **学术简报**: daily / weekly / monthly, dated edition history, full archive index, stratified picks and signals.
- **研究灵感**: a cross-field reading list using the latest daily/weekly picks.
- **数据源与健康状态**: actual source health, coverage gaps, and conference landing-page link watches.
- `data/reports.json`: recent structured issues for fast client load.
- `data/editions/{daily,weekly,monthly}/YYYY-MM-DD.json`: one separately versioned, durable issue per edition; `data/reports.json` also includes a full `history` index.
- `data/conference_status.json`: link-level conference changes, **not** parsed paper lists.

The very first issues can include historical papers from the initial backfill. **First indexed is not first published.** Report metadata counts distinguish these and expose date precision.

## What the automatic pipeline actually knows

Without an inference key, it computes an evidence-constrained, deterministic **literature triage**, not paper reviews. It can:

1. Enumerate all papers returned by configured sources; distinguish first seen and first publication dates.
2. Recommend up to 5 daily and 12 weekly/monthly papers in three circles: core, adjacent, inspiration. The whole archive is never filtered by current research interests.
3. Detect *explicit textual signals* for methods, datasets, and topics. Transfer paths are hypotheses to examine, not demonstrated findings.
4. Summarize counts and overlapping terms by topic, method and data; formulate tentative research questions for monthly study, without inventing novelty.
5. Keep citation links, paper IDs, an immutable edition history, source failures and incomplete-source warnings.

It cannot infer regression results, data/sample definitions, institutions, or findings from a paper title. Many Crossref records have no abstract or only truncated abstracts. Blank evidence stays blank rather than being invented.

## Optional evidence-limited AI commentary

For richer Chinese question/finding/method/migration notes, add an **OpenAI API key** under **Repository → Settings → Secrets and variables → Actions → New repository secret**, name it `OPENAI_API_KEY`. This is a separately billed developer API key; a ChatGPT plan does not automatically cover usage. The default model is `gpt-4.1-mini`; to change it, create repository variable `RADAR_LLM_MODEL` with a model permitted for the key.

Only a small selection of public bibliographic titles, authors and <=350-character abstract excerpts is submitted. The secret is never embedded into the published site. The model receives a strict instruction to leave unsupported conclusions blank. Even with AI, these are **abstract-derived reviews**, not full-text paper reviews or proof of methodological soundness. Failures fall back to evidence-only heuristic triage.

**GitHub Models is not a fallback:** GitHub announced it was retired July 30, 2026. Do not enable obsolete `models: read` inference workflows.

## Source completeness

- Automated paper adapters currently cover NBER and CEPR RSS plus 18 configured English-language journals through Crossref.
- Conference monitoring watches official Program links; it **does not claim** to extract program PDF paper titles. Direct program-to-paper parsing remains a separate feature.
- SSRN, BFI, IZA, CESifo, university WP repositories, and additional conferences are **not** automatically collected until validated adapters are added.
- Crossref publisher metadata can lag and sometimes has publication dates precise only to the year. Conference HTML link scanning may encounter access blocks or noisy navigation; warnings remain visible.
- Do not claim worldwide 'all papers' from unmonitored series. The full index is **complete only for records actually returned by configured collectors**, with a per-source audit.

## Manual reruns

In repository **Actions**: choose **Generate academic daily weekly and monthly briefings → Run workflow → kind=all** to regenerate the three issue types. `kind=daily` / `weekly` / `monthly` runs one type. An idempotent issue ID prevents duplicate editions for the same day. Running again replaces that day's edition, retaining past dates.

To refresh the source paper archive instead, choose **Refresh papers (daily + manual) → Run workflow**. This is a different process from writing analytical report text.

## Security and quality

- GitHub Pages is public: never place unpublished papers, private research proposals, commercial datasets, interview contacts, API secrets, or personalized reading notes in source files or public reports.
- Browser bookmarks and reading-state flags remain in that browser's local storage; they are not synced between devices.
- Public source metadata is input, not instructions; all UI strings are escaped before HTML display.
- Reports are independently verified against the archived paper IDs and individual per-edition JSON.

