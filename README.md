# Frontier Radar

A lightweight, source-backed literature-monitoring dashboard for economics and finance. It keeps the discovery universe broad, linking new journal articles, working papers, and (eventually) conference programs into durable paper histories.

**Status:** Public GitHub Pages website with daily scheduled public-metadata ingestion. Initial archive audit (2026-10-22): 1,309 deduplicated papers and 20/20 sources queried successfully. The initial 6 curated records are retained as bootstrap examples. Narrative daily/weekly/monthly ChatGPT pushes are not yet scheduled because the account has reached its active-task quota.

## What is ready

- Responsive, Chinese-language interface with browse/search/source/discipline/stage filters, insights, paper detail history, source-health page, and CSV export.
- Browser-only bookmarks and read status. These are private to the current browser and do **not** synchronize across devices.
- Metadata collection for NBER and CEPR RSS plus a configured set of English-language journals via Crossref.
- Partial-failure reporting, idempotent paper upsert, stable IDs, DOI/source aliases, and careful title+author fallback matching.
- Daily scheduled metadata ingestion (09:17 Asia/Shanghai), on-demand refresh, provenance audit, tests, and GitHub Pages deployment.
- Daily/weekly/monthly report **slots**, not automatically generated prose. Conference and SSRN integrations are **not** yet automated.

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
- `data/reports.json`: reviewed narrative daily/weekly/monthly editions, empty until authored and audited.
- `data/conferences.json`: conference events, empty until a verified program is entered.
- `docs/ARCHITECTURE.md`: schema, de-duplication safeguards, refresh/review and privacy boundaries.
- `docs/SCHEDULE_PROPOSAL.md`: running collector cadence and proposed editorial push schedule.

Econometrica currently uses a publisher-specific year-granularity retrieval window because some Crossref deposits give only the year of publication. When a date is only known to the year, the dashboard labels it as such rather than inventing a month/day.
\nJournal coverage is only metadata registered with Crossref; it does not guarantee all forthcoming/accepted articles, nor accurate publisher dates. RSS feeds have different horizons, and the project tracks what was actually fetched, not an imagined global inventory. Reports should distinguish abstract-only inference from full-text assessment.

## Updating manually with ChatGPT

Code can be maintained through the linked GitHub App. GitHub Actions automatically refreshes public paper metadata each day, with visible source-health results. Editorial summaries and ChatGPT notifications are separate from data ingestion; the active-task limit currently prevents a new push automation. GitHub Actions may be delayed or disabled after 60 days of repository inactivity.

## License

MIT for project code. Paper titles, abstracts and external metadata remain attributable to their original sources and respective rights holders. Avoid redistributing article full text.
