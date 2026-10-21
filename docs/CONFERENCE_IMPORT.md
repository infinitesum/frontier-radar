# Verified conference program import

Conference watchlist sources are not automatically scraped. This CSV import path
lets a researcher enter program papers with source provenance after checking an
official conference program. It does not assert that any individual submission
was accepted without the program record.

CSV header and sample (fictional row for syntax demonstration; do not import as a real paper):

```csv
title,authors,paper_url,presentation_date,session,doi
"A Fictional Study of Firm Behavior","Jane Doe; John Smith",https://example.org/paper,2026-07-02,Corporate Finance,
```

After replacing the example with real, source-verified information:

```bash
python scripts/import_conference_csv.py --conference-id cfrc --csv verified_program.csv
python scripts/validate.py
python scripts/build_site.py
```

Only import papers from English-language sessions. Conference references are
saved in `data/conferences.json`, and matching working papers remain a single
paper record in `data/papers.json`. Ambiguous matches must be manually reviewed.
