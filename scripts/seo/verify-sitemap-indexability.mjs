#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'data', 'seo', 'sitemap-manifest.json');

const BASE_URL = (process.env.SEO_VERIFY_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com')
  .replace(/\/+$/, '');
const INDEX_URL = `${BASE_URL}/sitemap.xml`;
const CONCURRENCY = Number.parseInt(process.env.SEO_VERIFY_CONCURRENCY || '20', 10);
const TIMEOUT_MS = Number.parseInt(process.env.SEO_VERIFY_TIMEOUT_MS || '20000', 10);
const SAMPLE_LIMIT = Number.parseInt(process.env.SEO_VERIFY_SAMPLE_LIMIT || '0', 10);
const CHUNK_CONCURRENCY = Number.parseInt(process.env.SEO_VERIFY_CHUNK_CONCURRENCY || '4', 10);

function normalizeUrl(raw) {
  const url = new URL(raw);
  url.hash = '';
  url.search = '';
  url.pathname = url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '');
  return url.toString();
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>(.*?)<\/loc>/gms;
  let match = re.exec(xml);
  while (match) {
    const value = String(match[1] || '').trim();
    if (value) {
      locs.push(value);
    }
    match = re.exec(xml);
  }
  return locs;
}

function extractCanonical(html) {
  const re = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
  return hrefMatch?.[1] || null;
}

function extractRobotsContent(html) {
  const re = /<meta[^>]*name=["']robots["'][^>]*>/i;
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  const contentMatch = tag.match(/content=["']([^"']+)["']/i);
  return contentMatch?.[1] || null;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'SpiritSEOVerifier/1.0',
        accept: 'application/xml,text/xml,text/html;q=0.9,*/*;q=0.8',
      },
    });
    const text = await response.text();
    return { response, text };
  } finally {
    clearTimeout(timeout);
  }
}

async function mapWithConcurrency(items, limit, worker) {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 1;
  const results = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(safeLimit, items.length) }, async () => {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

function loadExpectedCount() {
  if (!fs.existsSync(MANIFEST_PATH)) return null;
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (Number.isFinite(parsed?.selectedCount)) {
      return parsed.selectedCount;
    }
  } catch {
    return null;
  }
  return null;
}

async function main() {
  console.log(`Verifying sitemap indexability from ${INDEX_URL}`);

  const { response: indexResponse, text: indexXml } = await fetchText(INDEX_URL);
  if (!indexResponse.ok) {
    throw new Error(`Sitemap index request failed with status ${indexResponse.status}`);
  }
  if (!indexXml.includes('<sitemapindex')) {
    throw new Error('Expected <sitemapindex> in /sitemap.xml response');
  }

  const chunkLocs = extractLocs(indexXml);
  if (chunkLocs.length === 0) {
    throw new Error('No sitemap chunk <loc> entries found in sitemap index');
  }

  console.log(`Discovered ${chunkLocs.length} sitemap chunks`);

  const chunkResults = await mapWithConcurrency(chunkLocs, CHUNK_CONCURRENCY, async (chunkUrl) => {
    try {
      const { response, text } = await fetchText(chunkUrl);
      if (!response.ok) {
        return { chunkUrl, error: `chunk status ${response.status}`, urls: [] };
      }
      if (!text.includes('<urlset')) {
        return { chunkUrl, error: 'missing <urlset>', urls: [] };
      }
      return { chunkUrl, error: null, urls: extractLocs(text) };
    } catch (error) {
      return { chunkUrl, error: String(error), urls: [] };
    }
  });

  const badChunks = chunkResults.filter((result) => result.error);
  if (badChunks.length > 0) {
    console.error(`Chunk fetch failures: ${badChunks.length}`);
    badChunks.slice(0, 20).forEach((result) => {
      console.error(`- ${result.chunkUrl}: ${result.error}`);
    });
    process.exit(1);
  }

  const urlList = Array.from(new Set(chunkResults.flatMap((result) => result.urls).map((url) => normalizeUrl(url))));
  const expectedCount = loadExpectedCount();
  console.log(`URLs discovered in chunks: ${urlList.length.toLocaleString()}`);

  if (expectedCount !== null && expectedCount !== urlList.length) {
    console.error(`Count mismatch: manifest selectedCount=${expectedCount.toLocaleString()}, sitemap URLs=${urlList.length.toLocaleString()}`);
    process.exit(1);
  }

  const urlsToCheck = SAMPLE_LIMIT > 0 ? urlList.slice(0, SAMPLE_LIMIT) : urlList;
  if (SAMPLE_LIMIT > 0) {
    console.log(`Sampling first ${urlsToCheck.length.toLocaleString()} URLs (SEO_VERIFY_SAMPLE_LIMIT=${SAMPLE_LIMIT})`);
  } else {
    console.log(`Checking all ${urlsToCheck.length.toLocaleString()} URLs`);
  }

  const checks = await mapWithConcurrency(urlsToCheck, CONCURRENCY, async (url) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const response = await fetch(url, {
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'user-agent': 'SpiritSEOVerifier/1.0',
          accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        },
      });
      clearTimeout(timeout);

      const status = response.status;
      if (status !== 200) {
        return { url, ok: false, reason: `status_${status}` };
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/html')) {
        return { url, ok: false, reason: `non_html_${contentType || 'unknown'}` };
      }

      const html = await response.text();
      const robotsContent = extractRobotsContent(html);
      if (robotsContent && /noindex/i.test(robotsContent)) {
        return { url, ok: false, reason: 'noindex_meta' };
      }

      const canonical = extractCanonical(html);
      if (!canonical) {
        return { url, ok: false, reason: 'missing_canonical' };
      }

      const canonicalAbsolute = normalizeUrl(new URL(canonical, response.url).toString());
      const responseUrlNormalized = normalizeUrl(response.url);
      if (canonicalAbsolute !== responseUrlNormalized) {
        return { url, ok: false, reason: `canonical_mismatch:${canonicalAbsolute}` };
      }

      return { url, ok: true, reason: null };
    } catch (error) {
      return { url, ok: false, reason: `request_error:${String(error)}` };
    }
  });

  const failures = checks.filter((result) => !result.ok);
  if (failures.length > 0) {
    const reasonCounts = failures.reduce((acc, item) => {
      const key = item.reason || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    console.error(`Verification failed: ${failures.length.toLocaleString()} / ${urlsToCheck.length.toLocaleString()} URLs`);
    console.error('Failure reasons:', reasonCounts);
    failures.slice(0, 50).forEach((failure) => {
      console.error(`- ${failure.url} :: ${failure.reason}`);
    });
    process.exit(1);
  }

  console.log(`Verification passed: ${urlsToCheck.length.toLocaleString()} URLs are 200, indexable, and self-canonical.`);
}

main().catch((error) => {
  console.error('Verification script failed:', error);
  process.exit(1);
});
