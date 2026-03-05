import { NextResponse } from 'next/server';
import { getAllSitemapUrls } from '@/lib/utils/sitemap';

export const runtime = 'nodejs';
/** Force request-time generation so the sitemap always reflects current manifest data. */
export const dynamic = 'force-dynamic';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const { urls, generatedAt } = getAllSitemapUrls();
  const urlEntries = urls
    .map((url) => `<url><loc>${xmlEscape(url)}</loc><lastmod>${generatedAt}</lastmod></url>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
