import { NextRequest, NextResponse } from 'next/server';
import { getAllSitemapUrls } from '@/lib/utils/sitemap';
import { getSiteBaseUrl } from '@/lib/utils/url';

export const runtime = 'nodejs';
/** Force request-time generation so chunk sitemaps are never cached empty at build. */
export const dynamic = 'force-dynamic';

const CHUNK_SIZE = 25000;

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const rawId = params.id.replace('.xml', '');
  const idx = parseInt(rawId, 10);
  if (Number.isNaN(idx) || idx < 0) {
    return NextResponse.json({ error: 'Invalid sitemap id' }, { status: 400 });
  }

  const { urls, generatedAt } = getAllSitemapUrls();
  const start = idx * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const slice = urls.slice(start, end);

  const baseUrl = getSiteBaseUrl();
  const urlsToEmit = slice.length > 0 ? slice : (idx === 0 ? [baseUrl + '/'] : []);
  if (urlsToEmit.length === 0) {
    return new NextResponse(null, { status: 404 });
  }

  const urlEntries = urlsToEmit
    .map((loc) => `<url><loc>${xmlEscape(loc)}</loc><lastmod>${generatedAt}</lastmod></url>`)
    .join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${urlEntries}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
