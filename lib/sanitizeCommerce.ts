export function sanitizeCommerceClaims(html: string): string {
  return String(html || "")
    .replace(/nxtvitality-20/g, "fxnholdings-20")
    .replace(/<div[^>]*cegg-card-price[\s\S]*?<\/div>\s*(?:<\/p>\s*)?(?:<\/div>\s*)?/gi, "")
    .replace(/<div[^>]*cegg-price-disclaimer[\s\S]*?<\/div>/gi, "")
    .replace(/<small>\s*(?:Amazon\s+)?price updated:[\s\S]*?<\/small>/gi, "")
    .replace(/<span[^>]*cegg-price[^>]*>[\s\S]*?<\/span>/gi, "")
    .replace(/<div[^>]*cegg-price[^>]*>[\s\S]*?<\/div>/gi, "")
    .replace(/<del[^>]*>[\s\S]*?<\/del>/gi, "")
    .replace(/<s[^>]*>[\s\S]*?<\/s>/gi, "")
    .replace(/\b(?:in stock|out of stock)\b/gi, "")
    .replace(/Prices and availability are accurate as of[^<.]*\.?/gi, "");
}
