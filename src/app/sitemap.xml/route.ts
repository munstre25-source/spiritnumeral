import { NextResponse } from 'next/server';
import { applySitemapRollout, getAllSitemapUrls } from '@/lib/utils/sitemap';

export const runtime = 'nodejs';

const CHUNK_SIZE = 25000;

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const { urls } = getAllSitemapUrls();
  const staged = applySitemapRollout(urls);
  const totalChunks = Math.ceil(staged.length / CHUNK_SIZE);

  const indexEntries = Array.from({ length: totalChunks }, (_, i) => {
    return `<sitemap><loc>${xmlEscape(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com'}/sitemap/${i}.xml`)}</loc></sitemap>`;
  }).join('');

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${indexEntries}</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
