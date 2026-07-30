export const SITE = {
  name: 'NXTSmart.Homes',
  tagline: 'Empowering Your Home, Enriching Your Life.',
  description:
    'Smart home guides, honest device reviews, side-by-side comparisons and how-to walkthroughs — for everyone making their home smarter.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://nxtsmarthomes.fxnstudio.com').replace(/\/$/, ''),
  defaultImage: "/logo.png",
  amazonAffiliateTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || '',
  social: {
    facebook: 'https://www.facebook.com/1nxtsmarthomes',
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
    blurb: 'Explore practical smart home automation ideas that turn everyday routines into reliable, hands-off experiences. This section covers scenes, schedules, sensors, hubs, voice assistants, and app-based workflows that help your home respond naturally from morning wake-up to bedtime.',
  },
  {
    slug: 'smart-home-security',
    title: 'Smart Home Security',
    short: 'Security',
    blurb: 'Smart home security should make your home easier to protect, not harder to manage. Here you will find guides to cameras, video doorbells, smart locks, alarms, sensors, privacy settings, and monitoring setups that balance convenience, reliability, and peace of mind.',
  },
  {
    slug: 'smart-home-devices',
    title: 'Smart Home Devices',
    short: 'Devices',
    blurb: 'Smart home devices are the building blocks of a connected home, from speakers and displays to hubs, plugs, switches, sensors, and everyday appliances. This category helps you understand what each device does, how it fits into a wider setup, and what to check before buying.',
  },
  {
    slug: 'smart-home-entertainment',
    title: 'Smart Home Entertainment',
    short: 'Entertainment',
    blurb: 'Build a better entertainment setup with practical guidance on smart TVs, streaming devices, speakers, remotes, projectors, lighting scenes, and multi-room audio. These articles focus on making movies, music, gaming, and everyday viewing easier to control and more enjoyable at home.',
  },
  {
    slug: 'smart-home-energy',
    title: 'Smart Home Energy',
    short: 'Energy',
    blurb: 'Smart home energy articles focus on comfort, efficiency, and visibility into how your home uses power. Learn about smart thermostats, plugs, energy monitors, lighting schedules, solar-ready devices, and automation ideas that can reduce waste without making the home feel less comfortable.',
  },
  {
    slug: 'smart-home-integration',
    title: 'Smart Home Integration',
    short: 'Integration',
    blurb: 'Smart home integration is about getting devices, platforms, and routines to work together without constant troubleshooting. This section explains Matter, Thread, Alexa, Google Home, Apple Home, Home Assistant, hubs, bridges, and cross-platform choices so your setup feels coherent rather than fragmented.',
  },
  {
    slug: 'product-reviews',
    title: 'Product Reviews',
    short: 'Reviews',
    blurb: "Reviews of smart home devices with clear notes on setup, compatibility, reliability, privacy, and value. Use this section to decide whether a product fits your home before you buy.",
  },
  {
    slug: 'product-comparisons',
    title: 'Product Comparisons',
    short: 'Comparisons',
    blurb: "Product comparisons help you choose between similar smart home devices, platforms, and ecosystems. We compare features, setup needs, compatibility, tradeoffs, and buyer fit so the right option is easier to spot.",
  },
  {
    slug: 'how-to-guides',
    title: 'How-to Guides',
    short: 'How-to',
    blurb: "How-to guides give you step-by-step help for setting up, connecting, troubleshooting, and improving smart home devices. Use these walkthroughs when you need a clear next step for a setup or automation.",
  },
  {
    slug: 'top-rated',
    title: 'Top-Rated Products',
    short: 'Top Rated',
    blurb: "Top-rated product pages collect standout smart home devices across key categories. These guides focus on practical performance, compatibility, ease of use, reliability, and long-term value.",
  },
  {
    slug: 'informative-articles',
    title: 'Informative Articles',
    short: 'Explainers',
    blurb: "Informative articles explain the ideas, standards, and trends behind the modern smart home. Read these primers to understand Matter, Thread, Wi-Fi, Zigbee, automation platforms, privacy controls, and connected devices.",
  },
];

export const DEFAULT_AUTHOR = {
  name: "kspellman",
  slug: "kspellman",
  role: "Writer and editor",
  bio: "kspellman writes and edits smart home guides, product comparisons, and setup resources for NXTSmart.Homes, focusing on practical information for homeowners planning connected devices, automation, and security systems.",
  sameAs: [] as string[],
};
