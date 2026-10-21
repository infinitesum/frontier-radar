# Proposed cadence - NOT ENABLED

User-approved timing preferences, in Asia/Shanghai (UTC+08:00):

- Daily discovery notification: 12:00.
- Weekly synthesis: Sunday evening (time not finalized).
- Monthly research synthesis: the 1st of each month (time not finalized).

This document is an **intent record**, not a live task configuration. Neither GitHub Actions workflow contains `schedule:` or `cron:`. No ChatGPT automation was created as part of this repository.

Recommended eventual split:

1. Source refresh: independent from notifications; monitor source-health and backlog.
2. Daily communication: only incremental new findings, journal/WP/conference links and evidence labels.
3. Weekly synthesis: original cross-field judgments, no reprinting seven dailies.
4. Monthly synthesis: long-horizon research opportunities, with transparent assumptions and data feasibility.

A scheduled GitHub Action, if enabled in the future, is best-effort and subject to GitHub queue delays and inactivity disablement. It should not be treated as exact-time push delivery.
