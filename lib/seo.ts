import { SITE } from '@/lib/site';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return SITE.url + (path.startsWith('/') ? path : '/' + path);
}

export function trimDescription(value: string, max = 155) {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return sliced.slice(0, lastSpace > 80 ? lastSpace : sliced.length).trim() + '.';
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\u003c');
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl('/logo.png'),
    sameAs: Object.values(SITE.social).filter(Boolean),
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: absoluteUrl("/contact") },
  };
}

export function publisherJsonLd(){return {"@type":"Organization",name:SITE.name,url:SITE.url,logo:{"@type":"ImageObject",url:absoluteUrl(SITE.defaultImage||"/logo.png")}};}
export function websiteJsonLd(){return {"@context":"https://schema.org","@type":"WebSite",name:SITE.name,url:SITE.url,description:SITE.description,publisher:publisherJsonLd(),potentialAction:{"@type":"SearchAction",target:SITE.url+"/search?q={search_term_string}","query-input":"required name=search_term_string"}};}
