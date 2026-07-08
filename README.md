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
```
