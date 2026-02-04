import { NextResponse } from 'next/server';
import { getAllSitemapUrls, getSitemapChunkSize } from '@/lib/utils/sitemap';
import { getSiteBaseUrl } from '@/lib/utils/url';

export const runtime = 'nodejs';
/** Force request-time generation so the index is never cached empty at build (fixes GSC 0 discovered URLs). */
export const dynamic = 'force-dynamic';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const { urls } = getAllSitemapUrls();
  const chunkSize = getSitemapChunkSize();
  const totalChunks = Math.max(1, Math.ceil(urls.length / chunkSize));

  const indexEntries = Array.from({ length: totalChunks }, (_, i) => {
    return `<sitemap><loc>${xmlEscape(`${getSiteBaseUrl()}/sitemap/${i}.xml`)}</loc></sitemap>`;
  }).join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${indexEntries}</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
