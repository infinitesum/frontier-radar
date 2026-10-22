# Conference papers and attachment discovery

## What currently runs
- `scripts/conference_watch.py`: daily checks official meeting landing pages for Program links.
- `scripts/conference_papers.py`: parses the official 2026 CFRC and CICF Editorial Express HTML programs, records paper titles and paper-attachment links, and verifies a bounded sample of PDF responses.
- `data/conference_papers.json`: persistent paper-level index, status, original URL and scan errors.
- Site **Sources & health** shows official Program links, indexed paper rows, and PDF availability.

## Meaning of each status
- `pdf-accessible`: returned a PDF signature or PDF media type when checked; this is **not** a redistribution license.
- `pdf-unavailable`: returned an HTTP or connection error (including expired download links).
- `pending`: linked paper was indexed but its file has not been probed.
- `paper-link`: a paper page, DOI or manuscript landing page rather than an identified PDF.
- `pdf-not-confirmed`: response was not confirmed to contain PDF bytes.

## Source provenance and rights
- Only publications clearly licensed for redistribution can be committed as full PDFs to a **public** GitHub repository. A publicly downloadable PDF is not inherently openly licensed.
- Do not attempt login bypass, cookie reuse, paywall circumvention or hidden file IDs.
- This initial implementation archives metadata, titles and URLs, not the manuscript bytes.
- The preferred future option for preserving all legitimately accessible papers for personal reference is a **private** owner-controlled document store, with a rights/retention policy and SHA-256 hashes. Repo owner would need to approve the storage destination and its permissions first.
- GitHub imposes per-file and repository-size limits; do not append large binaries directly to source-control history merely because the first download succeeds.

## Coverage gaps
- HTML-only parser currently recognizes two 2026 conference programs. PDF-only Program documents, other conferences, expired materials, JS-driven lists and meeting-specific access controls need separate adapters.
- A successful source URL check is not proof every paper was captured. Compare extracted titles to organizer's expected Program total where published.
