# Mechanism Bridge: a research-idea discovery standard

## Mission

Frontier Radar should find papers that create **new economic questions** when a real mechanism is transferred across actors, outcomes, institutions or units of analysis. Topical overlap, term overlap, journal rank and coding convenience alone are not sufficient. Keep English-language breadth, including papers unrelated to current projects. A legitimate surprise is a strong result.

## Source → Bridge → New question (mandatory before promotion)

1. **Verified source claim.** Record exactly what the paper studies: decision-maker, treatment or environment, outcome, theoretical mechanism, data/design, unit and evidence (full text / official abstract / title only).
2. **Portable economic primitive.** Identify a general mechanism: propagation through networks, real options/irreversibility, information production, complementarities, misaligned incentives, non-appropriable spillovers, market power, dynamic selection, strategic interaction, time horizons.
3. **Perspective change.** Move one substantial element: change decision-maker (firms → financiers/regulators), move from effect to allocation or intervention, change outcome from firm responses to investor choice, aggregate a micro mechanism into network stability, reverse a marginal decision. This is *not* simply changing country or sample.
4. **Missing bridge assumption.** Explicitly state what the source did NOT establish: externalities, private capital shortages, public decision-makers' objective, implementation credibility, identification assumptions. A plausible research direction can pass without pretending this bridge is proved.
5. **Discriminating tests and rival stories.** Provide two predictions that differ under (A) the transfer story and (B) at least one rival data-generating process; list feasible measurements/data and a failure/kill condition. 'Could have implications' without a test is not enough.

Prefer asking: **What is economically important here, who decides something about it, and what new outcome should we measure?** *Do not* generate five forced government-fund analogies for every interesting paper.

## Example: Grigoris & Segal (JF 2026) → upstream public capital allocation

The Journal of Finance article shows that the impact of supplier-origin vs customer-origin uncertainty on a focal firm's investment is asymmetric. Earlier public text combines a real-options model with time-to-build, Compustat Segments + FactSet Revere relationships, and BEA input-output industry upstreamness for a distinct macro analysis. It does **not** show that the upstream industry itself faces more uncertainty, nor that government investment stabilizes the network.

Reframe:

- **Source unit:** producing firm; **source shock:** volatility at its suppliers or customers; **source outcome:** producing firm's investment.
- **Transfer unit:** investor–target relationship; **new explanatory attribute:** target industry's distance from final demand and importance to downstream customers; **new outcome:** which nodes policy capital or market VC chooses to finance.
- **Added premise to test:** network-wide benefits from upstream finance might not be privately appropriated, and a policy investor could choose to prioritize those benefits. Neither premise follows from the source paper alone.
- **Rivals:** sector lists, local industrial policy, firm maturity, industry demand, GP selection, technological intensity, SOE preferences.
- **Differentiating evidence:** interaction with downstream exposure / non-substitutability; compare policy vs private investor choice under comparable firm/industry conditions; link finance to *downstream* investment or supply disruption rather than stopping at investor preference.

Critical measurement guard: upstream uncertainty for a focal firm ≠ upstreamness of an invested industry. The article's supplier/customer uncertainty proxy and BEA upstreamness are different variables used at different levels. Never collapse them into one topic tag.

Sources: DOI https://doi.org/10.1111/jofi.70010 (first online 2025-12-22; 2026 issue); earlier working draft https://wrds-www.wharton.upenn.edu/documents/1779/Investment_Under_Up-_and_Downstream_Uncertainty.pdf. This example only describes an illustrative public research question. It intentionally omits unpublished user manuscript results or private material.

## Reading and ranking rubric

Promote a nonadjacent paper only if the reviewer can complete all of:
- Ground the mechanism in a *specific passage* or official abstract, including source URL and evidence scope.
- State what is **held fixed** in the economic primitive and what decision-maker/outcome changes.
- Derive a concrete novel question that passes the nonacademic "so what" test.
- Surface a **discriminating** test and one meaningful rival explanation (not a generic robustness check).
- Identify variables/data and explain what the source never demonstrates.
- Keep user-authored/project-private empirical evidence out of this public repository.

Assign labels: `strong-bridge` (five checks satisfied), `interesting-untested` (source mechanism supported but data/bridge assumptions open), `surface-only` (abstract/title matches without a real bridge), `reject` (just same vocabulary or sample swap). Never call a bridge novel without a recent-literature collision check.

**Quality gate, not a numeric similarity ranking**: promote surprising transferable mechanisms even when no keywords match the user's current topic. The original paper can be from macro finance, IO, labor, trade, asset pricing, political economy or experimental research. Preserve topical breadth in the intake, then apply this strict review gate to the editor's recommendations.

## Editorial contract

For each reviewed paper, write separate Chinese fields:
- Paper-factual finding and mechanism (cite source, flag working-version vs published).
- Actor/outcome change and proposed new research question.
- Missing bridge assumption; alternative data-generating process.
- 1–2 decisive tests (direction/prediction), actual data candidates and identification blockers.
- Source evidence level; full abstract preserved; original and open-text links when available.

GitHub Actions without a research-capable model is only metadata triage and must **not** present a title/keyword guess as original mechanism insight. The connected daily editorial workflow can maintain real mechanism bridges after verified reading. The static front end reads `data/transfer_cases.json` (public examples) and `data/curated_reviews.json` (verified reading notes).
