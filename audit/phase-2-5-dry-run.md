# Phase 2.5 Dry Run - Content Consolidation

Generated: 2026-07-30

Status: DRY RUN ONLY. No redirects, internal links, sitemap filters, or Strapi content fields were changed.

## Backup completed

Affected Strapi rows were exported before this dry-run:

`/var/www/html/nxtsmart.homes/backups/nxtsmart-posts-consolidation-2026-07-30T01-27-33Z.json`

Backup row count indicator: 36 `document_id` entries, matching draft/published rows for the 18 affected post slugs.

## Proposed redirect additions

Total retired URL redirects: 11

```ts
const RETIRED_POST_REDIRECTS: Record<string, string> = {
  "/top-rated/top-7-security-camera-products-protection": "/top-rated/top-6-security-cameras-for-home-protection",
  "/top-rated/top-7-security-camera-innovations-need": "/top-rated/top-6-security-cameras-for-home-protection",
  "/top-rated/top-6-wireless-security-cameras-2024": "/top-rated/top-6-security-cameras-for-home-protection",
  "/top-rated/top-7-home-monitor-cameras": "/top-rated/top-6-security-cameras-for-home-protection",
  "/product-comparisons/amazon-echo-dot-vs-echo-pop-a-comparison": "/product-comparisons/amazon-echo-pop-vs-echo-dot",
  "/product-comparisons/teeho-te001-vs-eufy-c210": "/product-comparisons/teeho-te001-vs-eufy-c220",
  "/smart-home-security/layered-smart-home-security-system-sensors-cameras-automated-alerts": "/smart-home-security/build-layered-smart-home-security-cameras-sensors-automation",
  "/top-rated/top-7-innovative-smart-lock-fingerprint-products-see": "/top-rated/top-7-smart-locks-to-enhance-your-home-security",
  "/top-rated/top-alexa-smart-plugs-home": "/top-rated/top-6-smart-plugs-and-outlets-for-home-automation",
  "/how-to-guides/set-up-smart-light-bulbs-mobile-app": "/how-to-guides/smart-lighting-how-to-set-up",
  "/how-to-guides/set-up-wifi-smart-light-bulbs": "/how-to-guides/smart-lighting-how-to-set-up",
};
```

Expected middleware diff shape:

```diff
+import { RETIRED_POST_REDIRECTS } from "@/lib/retiredPosts";
...
+  const retiredTarget = RETIRED_POST_REDIRECTS[pathname];
+  if (retiredTarget) return redirectTo(request, retiredTarget);
```

## Proposed sitemap/listing exclusion

Total retired post slugs excluded from public inventories: 11

```ts
export const RETIRED_POST_SLUGS = new Set([
  "top-7-security-camera-products-protection",
  "top-7-security-camera-innovations-need",
  "top-6-wireless-security-cameras-2024",
  "top-7-home-monitor-cameras",
  "amazon-echo-dot-vs-echo-pop-a-comparison",
  "teeho-te001-vs-eufy-c210",
  "layered-smart-home-security-system-sensors-cameras-automated-alerts",
  "top-7-innovative-smart-lock-fingerprint-products-see",
  "top-alexa-smart-plugs-home",
  "set-up-smart-light-bulbs-mobile-app",
  "set-up-wifi-smart-light-bulbs",
]);
```

Expected data-layer diff shape:

```diff
+import { RETIRED_POST_SLUGS } from "@/lib/retiredPosts";
...
+  if (RETIRED_POST_SLUGS.size) filters.slug = { $notIn: Array.from(RETIRED_POST_SLUGS) };
...
+      if (RETIRED_POST_SLUGS.has(p.slug)) continue;
```

## Internal link rewrite dry-run

Total distinct post/old-slug replacement pairs: 154

Total distinct post slugs that would be updated: 85

First 10 records that would change:

| Containing post | Old slug | New slug |
|---|---|---|
| `2k-pan-tilt-camera-vs-kasa` | `top-6-wireless-security-cameras-2024` | `top-6-security-cameras-for-home-protection` |
| `2k-pan-tilt-camera-vs-kasa` | `top-7-security-camera-innovations-need` | `top-6-security-cameras-for-home-protection` |
| `6-best-smart-lighting-options-in-2024` | `top-7-security-camera-innovations-need` | `top-6-security-cameras-for-home-protection` |
| `6-top-rated-smart-doorbells-of-2024` | `top-6-wireless-security-cameras-2024` | `top-6-security-cameras-for-home-protection` |
| `6-top-rated-smart-doorbells-of-2024` | `top-7-security-camera-innovations-need` | `top-6-security-cameras-for-home-protection` |
| `6-top-smart-home-hubs-2024` | `top-6-wireless-security-cameras-2024` | `top-6-security-cameras-for-home-protection` |
| `6-top-smart-home-hubs-2024` | `top-alexa-smart-plugs-home` | `top-6-smart-plugs-and-outlets-for-home-automation` |
| `access-live-view-hugolog-3k-camera` | `set-up-smart-light-bulbs-mobile-app` | `smart-lighting-how-to-set-up` |
| `access-live-view-hugolog-3k-camera` | `top-6-wireless-security-cameras-2024` | `top-6-security-cameras-for-home-protection` |
| `access-live-view-hugolog-3k-camera` | `top-7-home-monitor-cameras` | `top-6-security-cameras-for-home-protection` |

Example diff for an affected body URL:

```diff
- https://nxtsmart.homes/top-rated/top-6-wireless-security-cameras-2024
+ https://nxtsmart.homes/top-rated/top-6-security-cameras-for-home-protection
```

## Survivor body merge dry-run

Automatic body merging is not being applied in this dry-run because the safe SEO move is clear, but article-body uniqueness is editorial. Pasting loser article bodies into survivor pages would likely create duplicated sections and could introduce stale/speculative product claims. The implementation I recommend applying now is:

1. Add one-hop 301 redirects for all 11 retired URLs.
2. Exclude the 11 retired slugs from sitemap/category/blog/search listings.
3. Rewrite internal links directly to survivor URLs.
4. Leave survivor article bodies unchanged in this mechanical pass.
5. Perform body-level editorial merges separately only where a human review identifies unique, still-accurate sections worth preserving.

## Gate question

Approve applying the mechanical consolidation changes above: redirects, public-inventory exclusion, and internal-link rewrites. This will not rewrite survivor article bodies.
