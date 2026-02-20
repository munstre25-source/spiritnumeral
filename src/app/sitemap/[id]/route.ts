import { NextResponse } from 'next/server';
import { getSitemapChunkData } from '@/lib/utils/sitemap';

export const runtime = 'nodejs';
/** Force request-time generation so the sitemap always reflects current manifest data. */
export const dynamic = 'force-dynamic';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chunkId = Number.parseInt(id, 10);

  const chunk = getSitemapChunkData(chunkId);
  if (!chunk) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const urlEntries = chunk.urls
    .map((loc) => `<url><loc>${xmlEscape(loc)}</loc><lastmod>${chunk.generatedAt}</lastmod></url>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
