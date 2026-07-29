/**
 * Read-only bridge to the restored WordPress site (wp.nxtsmart.homes), which
 * remains the system of record for legacy post comments. Posts are matched
 * via their imported `legacyWpId`.
 */
const WP_BASE = 'https://wp.nxtsmart.homes';

export type WpComment = {
  id: number;
  parent: number;
  authorName: string;
  date: string;
  text: string;
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ');
}

/** Strip all markup — comments render as plain text so legacy spam links are inert. */
function toPlainText(html: string): string {
  return decodeEntities(
    html
      .replace(/<\/p>\s*<p>/g, '\n\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]+>/g, ''),
  ).trim();
}

export async function fetchWpComments(wpPostId: number): Promise<WpComment[]> {
  const url = `${WP_BASE}/wp-json/wp/v2/comments?post=${wpPostId}&per_page=100&orderby=date&order=asc`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const raw = (await res.json()) as Array<{
    id: number;
    parent: number;
    author_name: string;
    date: string;
    content: { rendered: string };
  }>;
  return raw
    .map((c) => ({
      id: c.id,
      parent: c.parent,
      authorName: decodeEntities(c.author_name || 'Anonymous'),
      date: c.date,
      text: toPlainText(c.content?.rendered ?? ''),
    }))
    .filter((c) => c.text.length > 0);
}
