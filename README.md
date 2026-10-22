# Frontier Radar

A lightweight, source-backed literature-monitoring dashboard for economics and finance. It keeps the discovery universe broad, linking new journal articles, working papers, and (eventually) conference programs into durable paper histories.

**Status (2026-10-22):** Live GitHub Pages dashboard with **1,309** source-linked bibliographic records, daily metadata collection, daily/weekly/monthly **automatically generated metadata-grounded research editions**, long-lived editions archive, three-circle reading queues, and conference landing-page link watchers. Initial daily, weekly and monthly editions were generated and published successfully. Optional ChatGPT editorial tasks are now enabled for source reading and reviewed-note updates; these remain separate from GitHub Actions metadata collection.

## What is ready

- Responsive, Chinese-language interface with browse/search/source/discipline/stage filters, insights, paper detail history, source-health page, and CSV export.
- Browser-only bookmarks and read status. These are private to the current browser and do **not** synchronize across devices.
- Metadata collection for NBER and CEPR RSS plus a configured set of English-language journals via Crossref.
- Partial-failure reporting, idempotent paper upsert, stable IDs, DOI/source aliases, and careful title+author fallback matching.
- Daily scheduled metadata ingestion (09:17 Asia/Shanghai), on-demand refresh, provenance audit, tests, and GitHub Pages deployment.
- **Reviewed literature cards** with findings, data/design notes, exact testable transfer paths, evidence levels and reading deadlines. Reviewed notes are stored at `data/curated_reviews.json`, visually separated from automated abstract-only discovery candidates.
- **Dismissible paper modal**: tap/click the backdrop or use the close icon; Escape is also supported by the native dialog.
- **Daily/weekly/monthly** source-backed research reports with core/adjacent/inspiration circles, ranked reading, data/method cues, full indexed paper registry and durable edition history. Automatic rules are *reading triage*, not full-paper reviews; API-backed optional abstract commentary requires a separately configured key. Conference landing-page link changes are monitored but program paper extraction and SSRN/BFI/IZA integration are not implemented.

## Local preview (no Node package install)

```bash
python scripts/build_site.py
python -m http.server 8765 --directory dist
```

Visit `http://localhost:8765`. The first command copies the verified data snapshot into the deployable site. The second serves it locally; do not open `index.html` directly with a `file://` URL because the browser blocks JSON loading.

## Quality checks

```bash
python -m unittest discover -s tests -v
python scripts/validate.py
node --check site/app.js
```

## Fetch new papers (manual only)

```bash
python scripts/ingest.py --since-days 21
python scripts/build_site.py
```

The script makes public HTTPS metadata requests; it requires internet access. Set `RADAR_CONTACT_EMAIL` to a contact email if you want Crossref's polite-pool behavior. This is not a secret and is optional. A failed publisher/metadata request remains visible in `data/runs.json` and on the Sources page. Previous paper records are never dropped on fetch failure.

Initial backfill coverage is bounded by the selected source and the metadata-index lookback. It cannot claim the entire historical literature. For an initial journal backfill use `--backfill-days 180` (no Crossref index-date restriction, publication window of 180 days), then return to normal incremental refresh. Source adapters can still impose retrieval caps and report truncation.

## GitHub setup

1. Create a **public** repository, e.g. `frontier-radar` (or choose private only with a Pages-eligible plan). If ChatGPT will write files through the GitHub connector, initialize with the default README so `main` exists; the project README will replace it. If importing the ZIP yourself, an empty repository is fine.
2. Upload/push the contents of this directory to the repository's `main` branch. If using a linked GitHub App with **selected repositories**, grant the app access to the new repository.
3. In **Settings > Pages > Build and deployment**, choose **GitHub Actions**. The `Build and publish dashboard` workflow deploys the site on `main` changes.
4. Daily data collection is already enabled. For an extra refresh, use **Actions > Refresh papers (daily + manual) > Run workflow**. GitHub's scheduler is best effort.

Expected Pages URL for GitHub.com project sites: `https://<GITHUB-USERNAME>.github.io/<REPOSITORY>/`.

### Why public?

GitHub Pages sites are public even when the source repository is private. Never commit private research questions, unpublished results, contacts, credentials, or personal annotations into this project. Only public bibliographic metadata and explicitly reviewed insight summaries belong in published files.

## Data lineage and limitations

`config/sources.json` is the explicit coverage contract. The pipeline collects only sources with a real adapter (`rss` and `journals`). Conference program links are listed as **watch targets** and do not count as successfully scanned. SSRN, BFI, IZA, CESifo, and university working-paper series are planned, not yet automatically ingested.

- `data/papers.json`: one stable record per deduplicated research paper, source aliases, version events, and optional reviewed notes.
- `data/runs.json`: attempted/successful sources, fetched/new/updated counts, failures, and truncation warnings.
- `data/transfer_cases.json`: source-grounded mechanism-to-new-question transfer case studies, separating factual findings, actor/outcome shifts, missing premises, rival explanations and discriminating tests.
- `data/mechanism_profiles.json`: Project 1 (local government fund selection) and Project 3 (compute allocation) mechanism hypotheses with distinct predictions, rival stories, empirical tests and actual data feasibility. No unpublished empirical results.
- `data/idea_reanalysis.json`: mechanism-first 2026-10-22 audit of 10 representative papers with evidence scope, versions, actor/outcome shifts, falsification paths, data availability and collision notes. This is not a claim to have read all 1,309 archive papers.
- **Research Insights UI:** collapsible project-mechanism maps, Grigoris–Segal/Goldberg mechanism bridges, source-scoped candidate review; public abstracts and existing favorite/read statuses remain intact.

- `docs/MECHANISM_TRANSFER.md`: research-idea discovery standard; prioritizes transferable economic mechanisms over topical/keyword similarity.
- `data/reports.json`: dated automatic daily/weekly/monthly research editions, individual picks, unfiltered paper ID indexes and source-health flags. The default report is deterministic metadata triage, not a claimed in-depth peer-reviewed literature analysis.
- `data/conferences.json`: conference events, empty until a verified program is entered.
- `docs/ARCHITECTURE.md`: schema, de-duplication safeguards, refresh/review and privacy boundaries.
- `data/editions/{daily,weekly,monthly}/YYYY-MM-DD.json`: separately archived report files retained by date.
- `data/conference_status.json`: official conference landing-page link checks with visible failures; this does not parse accepted-paper lists.
- `docs/BRIEFINGS.md`: verified three-cadence workflow, archival contracts, optional abstract-AI configuration and current coverage gaps.
- `docs/SCHEDULE_PROPOSAL.md`: running GitHub Actions collection and briefing times (no ChatGPT task).

Econometrica currently uses a publisher-specific year-granularity retrieval window because some Crossref deposits give only the year of publication. When a date is only known to the year, the dashboard labels it as such rather than inventing a month/day.
\nJournal coverage is only metadata registered with Crossref; it does not guarantee all forthcoming/accepted articles, nor accurate publisher dates. RSS feeds have different horizons, and the project tracks what was actually fetched, not an imagined global inventory. Reports should distinguish abstract-only inference from full-text assessment.

## Updating manually with ChatGPT

Code can be maintained through the linked GitHub App. GitHub Actions automatically refreshes public paper metadata each day, with visible source-health results. GitHub Actions writes the research editions to the website and the repository on its own schedule; this is **website publication, not mobile/ChatGPT push notification**. Without an optional API secret, narrative notes are evidence-tagged metadata triage rather than verified full-text analysis. GitHub Actions may be delayed or disabled after 60 days of repository inactivity.

## Research review and update workflow

- Scheduled human-reviewed editorial passes use the connected GitHub integration to inspect original sources, write evidence-graded analyses into `data/curated_reviews.json`, and verify GitHub readback. Review availability, connected-app permissions, and evidence quality must be checked at each run; the schedule is not proof a review has been completed.
- Weekly and monthly editorial syntheses are stored separately at `data/editorial_summaries.json`; automated metadata-based editions remain at `data/reports.json`.
- Updates to `data/curated_reviews.json` trigger the existing Pages build/deploy workflow; the public website loads curated JSON separately from the 1,309-paper registry. Never commit confidential/unpublished private project details or access credentials.
- These editorial reviews are **not** an OpenAI API integration running inside GitHub Actions. GitHub Actions alone cannot perform ChatGPT-style source reasoning without explicitly configured model credentials.

## Published briefing schedule (Asia/Shanghai)

- **09:17 daily:** public paper metadata and official conference-program link checks.
- **11:43 daily:** generate and publish an indexed daily research digest, normally available around the preferred 12:00 reading time.
- **Sunday 20:13:** weekly three-circle reading and cross-field synthesis.
- **1st of each month 20:31:** monthly lookback at the previous completed month with tentative research/data/method opportunities.

All schedules are best effort. GitHub Actions is not a guarantee of exact-minute publication or a push notification. For deeper AI summary notes, see [docs/BRIEFINGS.md](docs/BRIEFINGS.md) and configure an `OPENAI_API_KEY` repository Actions secret yourself; the standalone API is billed independently of ChatGPT.

## License

MIT for project code. Paper titles, abstracts and external metadata remain attributable to their original sources and respective rights holders. Avoid redistributing article full text.
