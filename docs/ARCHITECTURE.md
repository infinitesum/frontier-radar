# Architecture and quality contract

## Product invariants

1. Search broadly across included English-language sources. A user's current research topics must not filter the discovery universe.
2. First discovery and first publication are separate dates. A metadata update is not automatically a new research finding.
3. Never invent abstracts, author names, affiliations, results, methods, conference acceptance, or causal claims.
4. Track the set of sources successfully fetched on each scan. Never label planned sources as scanned.
5. Paper records persist across refreshes. Deduplication updates a record; it does not erase provenance or prior events.
6. Public repository files contain public information only. Personal annotations must remain in local browser storage unless a private authenticated store is introduced.
7. Bibliographic ingestion and metadata-grounded editions run entirely under GitHub Actions. No ChatGPT automation task is used; the delivery medium is the public website, not a push message.

## Source adapters (implemented)

- NBER working-paper RSS: `https://www.nber.org/rss/new.xml`
- CEPR discussion-paper RSS: `https://cepr.org/rss/discussion-paper`
- Crossref by journal ISSN: `/journals/{ISSN}/works?filter=from-index-date:...,from-pub-date:...`

Crossref indexing dates are used as metadata-change detection, with a publication lookback floor. Econometrica deposits sometimes provide a publication year without month/day; the adapter extends its lookback and preserves year-only precision instead of pretending these were published on January 1. This can still miss early-accepted papers, delayed deposits, and publishers with incomplete metadata. A rolling extended lookback and periodic official-list audits are needed before any comprehensive coverage claim.

## Source adapters (planned, not implemented)

- SSRN: access arrangements and authorized metadata strategy must be validated before automation.
- BFI, IZA, CESifo, RePEc and university series: official RSS/API where permitted.
- AFA, WFA, EFA, SFS Cavalcade, FIRS, CICF, CFRC, AEA, NBER SI: official program pages/PDFs; only verify changes from the published program after the source is parsed and checked.
- Publisher accepted/early-view lists where Crossref lags.

## Dedupe sequence

1. Normalize DOI (`https://doi.org/` prefix removed, lowercase); DOI aliases are strong keys.
2. Preserve source-specific identifiers (`nber:w...`, `cepr:...`) as aliases.
3. When no strong alias matches, compare normalized title strings with `SequenceMatcher >= .96`, **and require an overlapping author surname**. Title-only matching is forbidden.
4. Keep the existing stable `id` even if a DOI is discovered later. Add the new DOI alias and source. Add `journal-publication` event when a WP gains a journal source.
5. Ambiguous merges should be left as separate records for human review, not guessed.

No algorithm can perfectly deduplicate rewritten titles or team-author variants; periodically audit possible matches. DOI version equivalence is not automatic proof the content is unchanged.

## Safety and provenance

- HTML from source abstracts is converted to plain text before storage.
- The frontend escapes all displayed input and restricts outbound links to HTTP(S).
- Browser state uses `localStorage`; export is an explicit action. No analytics or third-party trackers are included.
- API queries and collection run results are visible in code and JSON. No private API key is committed.
- A source failure is recorded; other sources still update. No source failure deletes an existing paper. Source-health checks warn about zero results and truncated sources; if under 75% of configured journals respond successfully, the post-publish audit fails the workflow so a partially successful collection is not silently marked healthy.
- CSV export escapes spreadsheet-formula-prefixed cells.

## Narrative review contract

Daily report: complete indexed discovery list + selected papers, explicit evidence scope and migration thoughts.
Weekly synthesis: connect findings across fields, flag collisions or novel data, propose a prioritized reading plan.
Monthly synthesis: cross-field thematic review, methods/datasets, possible research questions with feasibility checks.

An AI-written note must include the primary link and its abstract-only evidence boundary. The optional OpenAI Responses API enrichment in `scripts/generate_reports.py` requires a repository Actions secret; without it the system publishes deterministic triage notes, not fabricated model findings. The model is not allowed to override grounded paper identifiers.

## Proposed later enhancements

- Persist user-private saved/read state through an authenticated backend (e.g., private storage); do not put notes in a public repository.
- Convert JSON archives to date shards when payloads exceed practical static-site budgets.
- Add source-adapter integration tests against stored sanitized fixtures, metadata index lag checks, and fuzzy-collision review queue.
- Program-paper/PDF parsing and cross-conference matching are not delivered by the link watcher; retain their source state as pending.
- Optional RSS/push notifications can be added separately if authorized; publishing a webpage does not notify the user.
