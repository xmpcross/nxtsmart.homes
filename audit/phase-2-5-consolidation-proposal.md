# Phase 2.5 Cannibalization Consolidation Proposal

Generated: 2026-07-30

Status: GATE - proposal only. No posts were merged, unpublished, redirected, or edited.

## Verification performed

The listed duplicate/cannibalization clusters were checked against the Strapi database. Every slug in the requested cluster list exists. Categories, publish dates, modified dates, and reading-time values were pulled from Strapi before proposing survivor URLs.

## Proposed consolidation plan

| Cluster | Proposed survivor URL | Merge into survivor | Redirect / retire | Rationale | Notes before implementation |
|---|---|---|---|---|---|
| Camera roundups | `/top-rated/top-6-security-cameras-for-home-protection` | Merge any unique camera recommendations, pros/cons, FAQ, and buying advice from the other four camera roundup posts. | 301 `/top-rated/top-7-security-camera-products-protection`, `/top-rated/top-7-security-camera-innovations-need`, `/top-rated/top-6-wireless-security-cameras-2024`, `/top-rated/top-7-home-monitor-cameras` to survivor. | Broadest and clearest search intent: home security cameras for protection. It is less gimmicky than "innovations" and less date-stale than "2024". | Product claims/specs must be preserved only where source data exists. Remove stale prices/stock claims if encountered. |
| Echo Pop vs Echo Dot reversed duplicate | `/product-comparisons/amazon-echo-pop-vs-echo-dot` | Merge useful comparison table rows and decision guidance from the reversed article. | 301 `/product-comparisons/amazon-echo-dot-vs-echo-pop-a-comparison` to survivor. | Shorter URL, direct comparison intent, and existing title names both products. | Retitle survivor if needed so the H1 is neutral: "Amazon Echo Pop vs Echo Dot". |
| TEEHO TE001 vs eufy C210/C220 | `/product-comparisons/teeho-te001-vs-eufy-c220` | Only merge shared lock-buying guidance and TEEHO-specific content from the C210 page. | Conditional 301 `/product-comparisons/teeho-te001-vs-eufy-c210` to survivor only if C210 and C220 pages are not materially different after review. | These are near-duplicates, but C210 and C220 are different eufy models. A forced merge could remove useful model-specific comparison data. | If the C210 page has unique model-specific demand or specs, keep both and only fix duplicate hero/internal links. Approval should confirm whether to merge or keep separate. |
| Layered smart home security guides | `/smart-home-security/build-layered-smart-home-security-cameras-sensors-automation` | Merge any unique wording/examples from the automated-alerts duplicate. | 301 `/smart-home-security/layered-smart-home-security-system-sensors-cameras-automated-alerts` to survivor. | Both posts have the same publish date, same reading time, same category, and nearly identical titles. Survivor has the clearer action-oriented URL. | Keep the newer featured image already assigned to the survivor. |
| Smart lock roundups | `/top-rated/top-7-smart-locks-to-enhance-your-home-security` | Merge any fingerprint-specific details from the innovative-fingerprint roundup. | 301 `/top-rated/top-7-innovative-smart-lock-fingerprint-products-see` to survivor. | Broad evergreen smart-lock intent is stronger than the gimmicky fingerprint-products slug. | If fingerprint locks need their own page later, create a distinct guide with non-duplicative scope. |
| Smart plug roundups | `/top-rated/top-6-smart-plugs-and-outlets-for-home-automation` | Merge Alexa-specific compatibility advice from the Alexa smart plugs post. | 301 `/top-rated/top-alexa-smart-plugs-home` to survivor. | Broader smart plug/outlet roundup can include Alexa compatibility without a separate overlapping roundup. | Ensure Amazon link text is not duplicated as raw URL text during merge. |
| Smart bulb setup guides | `/how-to-guides/smart-lighting-how-to-set-up` | Merge mobile-app setup and Wi-Fi pairing steps into one comprehensive setup/schedules/automation guide. | 301 `/how-to-guides/set-up-smart-light-bulbs-mobile-app` and `/how-to-guides/set-up-wifi-smart-light-bulbs` to survivor. | The survivor covers smart-lighting setup plus schedules/automation, making it the best canonical guide. | Rework steps so they are task-specific and suitable for future HowTo schema only after quality review. |

## Implementation plan after approval

1. Back up affected Strapi posts to `./backups/nxtsmart-posts-consolidation-<ISO date>.json`.
2. Dry-run content merges and redirect additions, showing the first 10 affected records, total count, and diffs.
3. Wait for confirmation after the dry-run.
4. Merge approved content into survivor posts without inventing dates, ratings, product claims, prices, or tests.
5. Add one-hop 301 redirects for retired URLs.
6. Update internal links to point directly at survivor URLs.
7. Rebuild and verify status codes, internal links, schema, and artifact greps.
8. Write `./audit/phase-2-5-report.md`.

## Gate question

Approve this survivor/redirect plan before implementation. The only item needing a specific choice is the TEEHO/eufy pair: merge C210 into C220, or keep both and only de-duplicate shared assets/internal links.
