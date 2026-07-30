# Phase 2.5 Report - Cannibalization Consolidation

Generated: 2026-07-30

## What was verified before changes

- Confirmed every requested duplicate/cannibalization slug exists in Strapi.
- Pulled each post title, category, publish date, modified date, and reading time from Strapi.
- Wrote the approved survivor/redirect proposal to `./audit/phase-2-5-consolidation-proposal.md`.
- Backed up affected Strapi post rows before mutation:
  - `./backups/nxtsmart-posts-consolidation-2026-07-30T01-27-33Z.json`
- Wrote the approved dry-run to `./audit/phase-2-5-dry-run.md`.

## What changed

Frontend files:

- `lib/retiredPosts.ts`
  - Added retired post redirect map.
  - Added retired post slug set for public inventory exclusion.
- `middleware.ts`
  - Added one-hop 301 handling for retired post URLs.
- `lib/strapi.ts`
  - Excluded retired post slugs from `listPosts()` results.
  - Excluded retired post slugs from `listAllPostSlugs()` sitemap source.

Strapi content:

- Rewrote internal links from retired duplicate slugs to approved survivor slugs.
- Initial approved rewrite: 308 row updates across sequential replacements.
- Verification crawl found 3 additional legacy/broken internal links. These were backed up separately before cleanup:
  - `./backups/nxtsmart-posts-extra-internal-links-2026-07-30T01-36-37Z.json`
- Extra internal-link cleanup: 34 row updates.

Redirects added:

- 11 approved duplicate/cannibalization redirects.
- 3 additional legacy/broken URL redirects discovered during verification crawl.

No survivor article bodies were automatically merged. This was deliberate: automatic body merging would likely duplicate sections and could introduce stale or unsupported product claims. Only redirects, public inventory exclusion, and internal-link rewrites were applied.

## Verification output

Build/restart:

- `npm run build` passed.
- `nxtsmart-homes.service` restarted and returned `active`.

Status checks:

- Real survivor page: `https://nxtsmart.homes/top-rated/top-6-security-cameras-for-home-protection` -> 200.
- Unknown category: `https://nxtsmart.homes/no-such-category` -> 404.
- Retired URL: `https://nxtsmart.homes/top-rated/top-7-home-monitor-cameras` -> 301 to `/top-rated/top-6-security-cameras-for-home-protection`.
- Trailing slash: `https://nxtsmart.homes/product-comparisons/` -> 301 to `/product-comparisons`.

Full redirect verification:

- See `./audit/phase-2-5-redirect-verification.txt`.
- All 14 retired/legacy URLs returned 301.
- All 14 redirect targets returned 200.

Sitemap verification:

- `./audit/phase-2-5-sitemap-retired-slug-hits.txt` has 0 lines.
- No retired duplicate/legacy slugs were found in the live sitemap response.

Strapi source verification:

- Retired/legacy slug search across Strapi `content` and `excerpt` returned 0 rows.

Internal-link crawl:

- See `./audit/phase-2-5-internal-link-crawl.txt`.
- Checked 72 internal links from homepage, top-rated, product-comparisons, how-to-guides, and the camera survivor article.
- Result: 0 internal redirects, 0 internal 404s in the sampled crawl.

Structured rating check:

- Live survivor article grep for `AggregateRating`, `ratingValue`, and Review `@type` markers returned 0.

Artifact grep notes:

- Scoped built-page artifact grep excluding `home-optimus-preview` found no relevant page-content SEO artifact issue from this phase.
- A broad `.next/server/app` grep still matches bundled dependency code and the pre-existing `home-optimus-preview` route. Those are not new Phase 2.5 changes.

## Skipped or blocked

- Rich Results Test, validator.schema.org, PageSpeed/Lighthouse were not run from the remote shell. They require external browser/service execution not available in this server-only workflow.
- Manual editorial body merges were skipped intentionally. Any unique content from loser posts should be reviewed by a human editor before merging into survivors.

## Awaiting gate answers

- Phase 3.3 remains open: empty promoted categories need a decision: publish content into them, or remove/noindex until content exists.
- Phase 3.9 remains open: confirm whether a business address and phone can be published.
