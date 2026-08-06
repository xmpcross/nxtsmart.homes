/*
 * Server-side cleanup for posts imported from the old WordPress site.
 *
 * Imported content arrives as Elementor + GreenShift + Content Egg markup.
 * The previous approach (regex-stripping price blocks in sanitizeCommerce /
 * PostContent) removed nested <div> openers but left their closers behind,
 * which unbalanced the DOM: affiliate cards escaped their grid, and React
 * hydration failed with error #418. This module replaces that with a real
 * DOM transform (cheerio):
 *
 *   - Content Egg offer widgets  -> clean .product-embed cards (no prices)
 *   - GreenShift accordions      -> native <details>/<summary> FAQ items
 *   - Elementor/GreenShift wrappers -> unwrapped
 *   - wp: block comments, empty paragraphs, inline styles -> removed
 *   - Amazon affiliate tags      -> rewritten to AFFILIATE_TAG
 *
 * AI-authored markdown posts are returned untouched (isWpImportedContent).
 */
import * as cheerio from 'cheerio';
import type { Cheerio, CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';

const AFFILIATE_TAG = 'fxnholdings-20';

export type TocEntry = { id: string; text: string };

export function isWpImportedContent(html: string): boolean {
  return /elementor|cegg|gspb_|wp-block|<!--\s*\/?wp:/i.test(String(html || ''));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

export function rewriteAffiliateUrl(href: string): string {
  if (!href) return href;
  let url = href.replace(/nxtvitality-20/g, AFFILIATE_TAG);
  if (/amazon\./i.test(url)) {
    if (/[?&]tag=/.test(url)) {
      url = url.replace(/([?&]tag=)[^&#]*/i, `$1${AFFILIATE_TAG}`);
    } else {
      url += (url.includes('?') ? '&' : '?') + `tag=${AFFILIATE_TAG}`;
    }
  }
  return url;
}

type OfferCard = {
  href: string;
  title: string;
  image: string;
  imageAlt: string;
  merchant: string;
  rating: string;
};

function extractOfferCard($: CheerioAPI, card: Cheerio<Element>): OfferCard | null {
  const link = card.find('a[href]').first();
  const href = rewriteAffiliateUrl(link.attr('href') || '');
  if (!href) return null;

  const img = card.find('img').first();
  const image = img.attr('src') || '';
  const imageAlt = img.attr('alt') || '';
  const title = card.find('.card-title').first().text().trim() || imageAlt.trim();
  if (!title) return null;

  const merchant = card.find('.cegg-merchant').first().text().trim();
  const rating = card.find('.cegg-rating-value').first().text().trim();
  return { href, title, image, imageAlt: imageAlt || title, merchant, rating };
}

function renderOfferCard(offer: OfferCard): string {
  const meta = [offer.rating ? `<span class="product-embed__rating">★ ${escapeHtml(offer.rating)}</span>` : '', offer.merchant ? escapeHtml(offer.merchant) : '']
    .filter(Boolean)
    .join(' · ');
  const cta = offer.merchant ? `View at ${escapeHtml(offer.merchant)}` : 'View offer';
  return [
    `<a class="product-embed" href="${escapeHtml(offer.href)}" target="_blank" rel="nofollow sponsored noopener">`,
    offer.image
      ? `<span class="product-embed__media"><img src="${escapeHtml(offer.image)}" alt="${escapeHtml(offer.imageAlt)}" loading="lazy" decoding="async" /></span>`
      : '',
    `<span class="product-embed__body">`,
    `<span class="product-embed__title">${escapeHtml(offer.title)}</span>`,
    meta ? `<span class="product-embed__meta">${meta}</span>` : '',
    `<span class="product-embed__cta">${cta}<span aria-hidden="true"> →</span></span>`,
    `</span>`,
    `</a>`,
  ].join('');
}

function rebuildOfferContainers($: CheerioAPI): void {
  const roots = $('.cegg5-container, .cegg-container').filter(
    (_, el) => $(el).parents('.cegg5-container, .cegg-container').length === 0,
  );
  roots.each((_, el) => {
    const root = $(el);
    const cards: OfferCard[] = [];
    const seen = new Set<string>();
    root.find('.cegg-card').each((__, cardEl) => {
      const offer = extractOfferCard($, $(cardEl));
      if (offer && !seen.has(offer.href)) {
        seen.add(offer.href);
        cards.push(offer);
      }
    });
    if (!cards.length) {
      root.remove();
      return;
    }
    const isGrid = /cegg-offers_grid/.test(root.attr('class') || '') && cards.length > 1;
    const cls = isGrid ? 'product-embed-group product-embed-group--grid' : 'product-embed-group';
    root.replaceWith(`<div class="${cls}" data-testid="product-embeds">${cards.map(renderOfferCard).join('')}</div>`);
  });
}

function rebuildAccordions($: CheerioAPI): void {
  $('.gs-accordion-item').each((_, el) => {
    const item = $(el);
    const title = item.find('.gs-accordion-item__heading').first().text().trim();
    const body = item.find('.gs-accordion-item__text').first().html() || '';
    if (!title) {
      item.remove();
      return;
    }
    item.replaceWith(
      `<details class="post-faq"><summary>${escapeHtml(title)}</summary><div class="post-faq__body">${body}</div></details>`,
    );
  });
  $('.gs-accordion').each((_, el) => {
    const group = $(el);
    group.replaceWith(`<div class="post-faqs" data-testid="post-faqs">${group.html() || ''}</div>`);
  });
}

function unwrapLayoutWrappers($: CheerioAPI): void {
  const selector = [
    'div[data-elementor-type]',
    'div.elementor-element',
    'div.elementor-widget-container',
    'div.e-con-inner',
    'div.e-con',
    'div[class*="gspb_heading_sep"]',
    'div[class*="wp-block-greenshift"]',
    'div[class*="gspb_"]',
  ].join(', ');
  for (let pass = 0; pass < 25; pass += 1) {
    const wrappers = $(selector);
    if (!wrappers.length) break;
    wrappers.each((_, el) => {
      const node = $(el);
      node.replaceWith(node.contents());
    });
  }
}

function cleanHeadings($: CheerioAPI): void {
  const used = new Set<string>();
  $('h2, h3, h4, h5, h6').each((_, el) => {
    const heading = $(el);
    const text = heading.text().replace(/ /g, ' ').trim();
    if (!text) {
      heading.remove();
      return;
    }
    heading.removeAttr('class');
    const existing = heading.attr('id') || '';
    let id = existing && !/gspb|gsbp/i.test(existing) ? existing : slugifyHeading(text);
    if (!id) return;
    while (used.has(id)) id += '-2';
    used.add(id);
    heading.attr('id', id);
  });
}

function removeJunk($: CheerioAPI): void {
  $('script, style, link, del, s').remove();
  $('.cegg-price-disclaimer, .cegg-card-price, .cegg-price').remove();
  $('[style]').removeAttr('style');
  // WP block classes carry no styling here — drop them (keep other classes).
  $('[class*="wp-block"]').each((_, el) => {
    const node = $(el);
    const kept = (node.attr('class') || '')
      .split(/\s+/)
      .filter((cls) => cls && !cls.startsWith('wp-block'));
    if (kept.length) node.attr('class', kept.join(' '));
    else node.removeAttr('class');
  });
  // Degenerate list shells from the Elementor export: empty <ul>/<li>, and
  // single-item lists whose only content is another list.
  for (let pass = 0; pass < 5; pass += 1) {
    let changed = false;
    $('ul, ol').each((_, el) => {
      const list = $(el);
      if (!list.text().replace(/ /g, ' ').trim() && !list.find('img').length) {
        list.remove();
        changed = true;
      }
    });
    $('li').each((_, el) => {
      const item = $(el);
      if (!item.text().replace(/ /g, ' ').trim() && !item.find('img').length) {
        item.remove();
        changed = true;
      }
    });
    $('ul > li, ol > li').each((_, el) => {
      const item = $(el);
      const children = item.children();
      const ownText = item
        .contents()
        .filter((__, node) => node.type === 'text')
        .text()
        .replace(/ /g, ' ')
        .trim();
      if (children.length === 1 && (children.is('ul') || children.is('ol')) && !ownText) {
        const parent = item.parent();
        if (parent.children().length === 1) {
          parent.replaceWith(children);
          changed = true;
        }
      }
    });
    if (!changed) break;
  }
  // Empty paragraphs left behind by wp: block comments and Elementor spacing.
  for (let pass = 0; pass < 3; pass += 1) {
    $('p').each((_, el) => {
      const p = $(el);
      if (p.find('img, iframe, embed, video, audio').length) return;
      const text = p.text().replace(/ /g, ' ').trim();
      if (!text) p.remove();
    });
  }
  $('p > br:first-child, div > br:first-child').remove();
}

function stripComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

function sanitizeClaimsText(html: string): string {
  return html
    .replace(/<small>\s*(?:Amazon\s+)?price updated:[\s\S]*?<\/small>/gi, '')
    .replace(/\b(?:in stock|out of stock)\b/gi, '')
    .replace(/Prices and availability are accurate as of[^<.]*\.?/gi, '')
    .replace(/nxtvitality-20/g, AFFILIATE_TAG);
}

export function transformWpContent(html: string): string {
  const raw = String(html || '');
  if (!isWpImportedContent(raw)) return raw;

  const $ = cheerio.load(stripComments(raw), {}, false);
  rebuildOfferContainers($);
  rebuildAccordions($);
  unwrapLayoutWrappers($);
  cleanHeadings($);
  removeJunk($);
  return sanitizeClaimsText($.html());
}

/** List the h2 anchors of transformed content, for an "On this page" TOC. */
export function extractToc(html: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const re = /<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (text) entries.push({ id: match[1], text });
  }
  return entries;
}
