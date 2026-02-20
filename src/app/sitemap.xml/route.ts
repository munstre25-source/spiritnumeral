import { NextResponse } from 'next/server';
import { getSitemapIndexData } from '@/lib/utils/sitemap';

export const runtime = 'nodejs';
/** Force request-time generation so the sitemap always reflects current manifest data. */
export const dynamic = 'force-dynamic';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const { chunks, generatedAt } = getSitemapIndexData();
  const sitemapEntries = chunks
    .map((chunk) => `<sitemap><loc>${xmlEscape(chunk.loc)}</loc><lastmod>${generatedAt}</lastmod></sitemap>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
