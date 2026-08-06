# nxtsmart.homes

Next.js frontend for NXTSmart.Homes, backed by the FXN Strapi CMS.

## Netlify deployment

This project is prepared for Netlify's current Next.js/OpenNext adapter.

Build settings:

- Build command: `yarn build`
- Publish directory: `.next`
- Node version: `20`

The Netlify adapter is applied automatically for Next.js 13.5+ projects, so this repo does not pin `@netlify/plugin-nextjs`.

Required environment variables:

```ini
NEXT_PUBLIC_STRAPI_URL=https://strapi.fxnstudio.com
NEXT_PUBLIC_SITE_URL=https://nxtsmart.homes
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=
STRAPI_API_TOKEN=
```

`STRAPI_API_TOKEN` is optional if the Strapi public API permissions allow the frontend reads. If you need private CMS reads, set it in the Netlify UI rather than committing it.

Local production check:

```bash
yarn install --frozen-lockfile
yarn build
```\n
## Deployment

Hosted on **Vercel**, built from `main` on push. Repository:
`xmpcross/strapi-nxtsmarthomes`.

Server-rendered Next.js: it reads Strapi at request time and uses `next/image`
with remote patterns, so it needs a Next.js runtime rather than a static host.

### Environment variables

Set in the Vercel project, not committed:

```text
NEXT_PUBLIC_STRAPI_URL           CMS read at request time
STRAPI_API_TOKEN                 optional; public reads work without it
NEXT_PUBLIC_SITE_URL             canonicals, sitemap, RSS, OpenGraph
NEXT_PUBLIC_GA_MEASUREMENT_ID    analytics
```

### Notes specific to this site

- `middleware.ts` handles legacy WordPress post-ID and retired-post redirects,
  and `next.config.mjs` carries ~10 more. Both need a real Next.js runtime —
  this is why the site is not a static export.
- Two preview routes exist, `/home-draft` and `/home-optimus-preview`. Both set
  `robots: { index: false }`, but they are publicly reachable once deployed.
  Delete them when the layout work is settled.

### The CMS is a runtime dependency

Content is fetched per request and per revalidation, so **the site has no
content if Strapi is unreachable**. That server is a separate machine from the
one Vercel runs on, and a DNS failure on the CMS host is enough to empty the
site — which is exactly what happened in August 2026.
