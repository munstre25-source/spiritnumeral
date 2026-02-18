import { getSitemapManifest, getSitemapPaths } from '@/lib/seo/sitemap-manifest';
import { ensureAbsoluteUrl, getSiteBaseUrl } from './url';

const DEFAULT_SITEMAP_CHUNK_SIZE = 2000;
const MAX_SITEMAP_CHUNK_SIZE = 50000;

function normalizeChunkSize(value: string | undefined): number {
  if (!value) return DEFAULT_SITEMAP_CHUNK_SIZE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_SITEMAP_CHUNK_SIZE;
  return Math.min(parsed, MAX_SITEMAP_CHUNK_SIZE);
}

export function getSitemapChunkSize(): number {
  return normalizeChunkSize(process.env.SITEMAP_CHUNK_SIZE);
}

export function getAllSitemapUrls(baseUrl = getSiteBaseUrl()) {
  const manifest = getSitemapManifest();
  const generatedAt = manifest.generatedAt || new Date().toISOString();
  const urls = getSitemapPaths().map((path) => ensureAbsoluteUrl(baseUrl, path));

  return { urls, generatedAt };
}
