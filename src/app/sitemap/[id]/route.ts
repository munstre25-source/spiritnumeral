import { NextRequest, NextResponse } from 'next/server';
import { applySitemapRollout, getAllSitemapUrls } from '@/lib/utils/sitemap';

export const runtime = 'nodejs';

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
  const staged = applySitemapRollout(urls);
  const start = idx * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const slice = staged.slice(start, end);

  const urlEntries = slice
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
