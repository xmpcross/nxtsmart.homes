export const SITE = {
  name: 'NXTSmart.Homes',
  tagline: 'Empowering Your Home, Enriching Your Life.',
  description:
    'Smart home guides, honest device reviews, side-by-side comparisons and how-to walkthroughs — for everyone making their home smarter.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://nxtsmarthomes.fxnstudio.com').replace(/\/$/, ''),
  amazonAffiliateTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || '',
  social: {
    facebook: 'https://www.facebook.com/nxtsmarthomes',
    twitter: 'https://x.com/nxtsmarthomes',
  },
};

export type SectionKey =
  | 'smart-home-automation'
  | 'smart-home-security'
  | 'smart-home-devices'
  | 'smart-home-entertainment'
  | 'smart-home-energy'
  | 'smart-home-integration'
  | 'product-comparisons'
  | 'product-reviews'
  | 'how-to-guides'
  | 'top-rated'
  | 'informative-articles';

export type Section = {
  slug: SectionKey;
  title: string;
  short: string;
  blurb: string;
};

// Sections shown on the homepage. Slugs match the imported nxtsmart-categories
// (originally from nxtsmart.homes WordPress) so URLs stay 1:1 with the source.
export const SECTIONS: Section[] = [
  {
    slug: 'smart-home-automation',
    title: 'Smart Home Automation',
    short: 'Automation',
    blurb: 'Routines, scenes and scripts that make your home work for you.',
  },
  {
    slug: 'smart-home-security',
    title: 'Smart Home Security',
    short: 'Security',
    blurb: 'Locks, cameras, sensors — keeping your home safe without the friction.',
  },
  {
    slug: 'smart-home-devices',
    title: 'Smart Home Devices',
    short: 'Devices',
    blurb: 'The gear that runs the show — hubs, speakers, displays and the smart basics.',
  },
  {
    slug: 'smart-home-entertainment',
    title: 'Smart Home Entertainment',
    short: 'Entertainment',
    blurb: 'TVs, streaming, multi-room audio and the screens behind the experience.',
  },
  {
    slug: 'smart-home-energy',
    title: 'Smart Home Energy',
    short: 'Energy',
    blurb: 'Thermostats, panels, monitors — saving energy without sacrificing comfort.',
  },
  {
    slug: 'smart-home-integration',
    title: 'Smart Home Integration',
    short: 'Integration',
    blurb: 'Tying Alexa, Google, HomeKit and Matter into one coherent smart home.',
  },
  {
    slug: 'product-reviews',
    title: 'Product Reviews',
    short: 'Reviews',
    blurb: 'Hands-on takes — what works, what doesn’t, what’s worth the money.',
  },
  {
    slug: 'product-comparisons',
    title: 'Product Comparisons',
    short: 'Comparisons',
    blurb: 'Side-by-side breakdowns so you can pick the right one in minutes.',
  },
  {
    slug: 'how-to-guides',
    title: 'How-to Guides',
    short: 'How-to',
    blurb: 'Step-by-step walkthroughs for setup, troubleshooting and getting more from your gear.',
  },
  {
    slug: 'top-rated',
    title: 'Top-Rated Products',
    short: 'Top Rated',
    blurb: 'The standouts — highest-scoring smart home picks across categories.',
  },
  {
    slug: 'informative-articles',
    title: 'Informative Articles',
    short: 'Explainers',
    blurb: 'Background reading — standards, primers and the state of the smart home.',
  },
];
