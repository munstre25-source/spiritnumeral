#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'data', 'seo', 'sitemap-manifest.json');

const targetCount = Number.parseInt(process.env.SITEMAP_TARGET_COUNT || '4000', 10);
const minCount = Number.parseInt(process.env.SITEMAP_MIN_COUNT || '3500', 10);
const includeBlog = /^(1|true|yes|on)$/i.test(process.env.SITEMAP_INCLUDE_BLOG || 'false');

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('Manifest not found:', path.relative(ROOT_DIR, MANIFEST_PATH));
  process.exit(1);
}

const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
const manifest = JSON.parse(raw);
const entries = Array.isArray(manifest.entries) ? manifest.entries : [];

const failures = [];

if (entries.length < minCount) {
  failures.push(`entries.length=${entries.length} is below minCount=${minCount}`);
}

if (entries.length !== targetCount) {
  failures.push(`entries.length=${entries.length} does not match targetCount=${targetCount}`);
}

const pathSet = new Set();
for (const entry of entries) {
  if (!entry.includeInSitemap) {
    failures.push(`entry missing includeInSitemap=true for path ${entry.path}`);
    continue;
  }

  if (pathSet.has(entry.path)) {
    failures.push(`duplicate path: ${entry.path}`);
  }
  pathSet.add(entry.path);

  if (!includeBlog && String(entry.path).startsWith('/blog')) {
    failures.push(`blog path present while SITEMAP_INCLUDE_BLOG=false: ${entry.path}`);
  }
}

if (failures.length > 0) {
  console.error('Sitemap manifest checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const tierCounts = entries.reduce((acc, entry) => {
  acc[entry.tier] = (acc[entry.tier] || 0) + 1;
  return acc;
}, {});

const routeCounts = entries.reduce((acc, entry) => {
  acc[entry.routeKey] = (acc[entry.routeKey] || 0) + 1;
  return acc;
}, {});

console.log('Manifest checks passed.');
console.log('Entries:', entries.length);
console.log('Tier counts:', tierCounts);
console.log('Route counts:', routeCounts);
