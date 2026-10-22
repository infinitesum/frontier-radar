# Frontier Radar: active GitHub Actions schedules (Asia/Shanghai)

GitHub Actions handles metadata harvesting and deterministic report editions. Separate authorized ChatGPT editorial tasks now run source reading and GitHub curation, subject to their source and connector permissions.

- **Daily 09:17:** `.github/workflows/refresh-manual.yml` indexes configured NBER/CEPR and 18 Crossref journal sources, watches official conference-program links and republishes Pages.
- **Daily 11:43:** `.github/workflows/briefings.yml` writes a fresh edition to `data/reports.json` and `data/editions/daily/YYYY-MM-DD.json`, then deploys Pages. Preferred reading time is 12:00.
- **Sunday 20:13:** weekly report with three-circle featured papers and structured method/data clues, in `data/editions/weekly/`.
- **Day 1 20:31:** monthly report on the *previous completed calendar month*, in `data/editions/monthly/`.

All reports are written in Chinese but only track English-language papers (English China research qualifies). The search universe is not limited by current research interests; stratification affects ranking, not ingestion.

**Evidence limitations:** without a separately configured OpenAI API secret, all analysis is deterministic metadata-based reading triage with original source links. With the key, optional AI commentary uses **only title/abstract excerpts** and is not a full-text review. Top conference page watching observes program links, not yet complete conference paper lists. SSRN, BFI, IZA, CESifo and university WP adapters are future connectors.

**Scheduling limitations:** GitHub Actions may run late or drop an invocation, and GitHub Pages only publishes content, not device push notifications. The public repository contains no unpublished private notes or personal credentials.

## Editorial curation (separate from GitHub workflows)

- **Daily 12:00:** Read 2–5 significant papers against accessible original sources, mark evidence scope, and append/update `data/curated_reviews.json` via GitHub tools. When full text is unavailable, label official-abstract rather than asserting an unsupported full-text review.
- **Sunday evening / month 1:** Write focused weekly and previous-month editorial syntheses to `data/editorial_summaries.json`, preserving prior editions. Outside the specified days, a shared conditional task exits without publishing.
- GitHub Pages redeploys after curation file changes; repository publication is not itself a mobile push guarantee. GitHub source-write access must remain connected.
