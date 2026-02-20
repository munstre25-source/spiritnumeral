import { getSitemapManifest, getSitemapPaths } from '@/lib/seo/sitemap-manifest';
import { ensureAbsoluteUrl, getSiteBaseUrl } from './url';

const DEFAULT_SITEMAP_CHUNK_SIZE = 50000;
const MAX_SITEMAP_CHUNK_SIZE = 50000;

function normalizeChunkSize(value: string | undefined): number {
  if (!value) return DEFAULT_SITEMAP_CHUNK_SIZE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_SITEMAP_CHUNK_SIZE;
  return Math.min(parsed, MAX_SITEMAP_CHUNK_SIZE);
}

export interface SitemapChunk {
  id: number;
  loc: string;
  size: number;
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

export function getSitemapIndexData(baseUrl = getSiteBaseUrl()) {
  const { urls, generatedAt } = getAllSitemapUrls(baseUrl);
  const chunkSize = getSitemapChunkSize();
  const totalChunks = Math.ceil(urls.length / chunkSize);
  const chunks: SitemapChunk[] = [];

  for (let id = 0; id < totalChunks; id += 1) {
    const start = id * chunkSize;
    const end = Math.min(start + chunkSize, urls.length);
    chunks.push({
      id,
      loc: ensureAbsoluteUrl(baseUrl, `/sitemap/${id}`),
      size: end - start,
    });
  }

  return {
    generatedAt,
    totalUrls: urls.length,
    totalChunks,
    chunkSize,
    chunks,
  };
}

export function getSitemapChunkData(id: number, baseUrl = getSiteBaseUrl()) {
  if (!Number.isInteger(id) || id < 0) {
    return null;
  }

  const { urls, generatedAt } = getAllSitemapUrls(baseUrl);
  const chunkSize = getSitemapChunkSize();
  const totalChunks = Math.ceil(urls.length / chunkSize);
  if (id >= totalChunks) {
    return null;
  }

  const start = id * chunkSize;
  const end = Math.min(start + chunkSize, urls.length);
  const chunkUrls = urls.slice(start, end);

  return {
    id,
    generatedAt,
    totalChunks,
    totalUrls: urls.length,
    chunkSize,
    urls: chunkUrls,
  };
}
