#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'data', 'seo', 'sitemap-manifest.json');

const minCount = Number.parseInt(process.env.SITEMAP_MIN_COUNT || '1000', 10);
const includeBlog = /^(1|true|yes|on)$/i.test(process.env.SITEMAP_INCLUDE_BLOG || 'false');

const rawTargetCount = process.env.SITEMAP_TARGET_COUNT;
const enforceExplicitTarget = typeof rawTargetCount !== 'undefined' && rawTargetCount !== '';
const explicitTargetCount = Number.parseInt(rawTargetCount || '', 10);

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

if (!Number.isFinite(manifest.selectedCount) || entries.length !== manifest.selectedCount) {
  failures.push(`entries.length=${entries.length} does not match selectedCount=${manifest.selectedCount}`);
}

if (enforceExplicitTarget) {
  if (!Number.isFinite(explicitTargetCount) || explicitTargetCount <= 0) {
    failures.push(`SITEMAP_TARGET_COUNT is invalid: ${rawTargetCount}`);
  } else if (entries.length !== explicitTargetCount) {
    failures.push(`entries.length=${entries.length} does not match explicit SITEMAP_TARGET_COUNT=${explicitTargetCount}`);
  }
}

const pathSet = new Set();
let missingStaticPrerender = 0;
let staticPrerenderIncluded = 0;

for (const entry of entries) {
  if (!entry || typeof entry !== 'object') {
    failures.push('entry is not an object');
    continue;
  }

  if (typeof entry.path !== 'string' || !entry.path.startsWith('/')) {
    failures.push(`invalid path on entry: ${JSON.stringify(entry)}`);
    continue;
  }

  if (pathSet.has(entry.path)) {
    failures.push(`duplicate path: ${entry.path}`);
  }
  pathSet.add(entry.path);

  if (entry.includeInSitemap !== true) {
    failures.push(`entry missing includeInSitemap=true for path ${entry.path}`);
  }

  if (typeof entry.includeInStaticPrerender === 'undefined') {
    missingStaticPrerender += 1;
  }
  if (entry.includeInStaticPrerender === true) {
    staticPrerenderIncluded += 1;
  }

  if (!includeBlog && String(entry.path).startsWith('/blog')) {
    failures.push(`blog path present while SITEMAP_INCLUDE_BLOG=false: ${entry.path}`);
  }
}

if (missingStaticPrerender > 0) {
  failures.push(`${missingStaticPrerender} entries missing includeInStaticPrerender flag`);
}

if (staticPrerenderIncluded === 0) {
  failures.push('no entries marked includeInStaticPrerender=true');
}

if (staticPrerenderIncluded !== entries.length) {
  failures.push(`staticPrerenderIncluded=${staticPrerenderIncluded} does not match entries.length=${entries.length}`);
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

const staticPrerenderRouteCounts = entries
  .filter((entry) => entry.includeInStaticPrerender === true)
  .reduce((acc, entry) => {
    acc[entry.routeKey] = (acc[entry.routeKey] || 0) + 1;
    return acc;
  }, {});

console.log('Manifest checks passed.');
console.log('Entries:', entries.length);
console.log('Selected count:', manifest.selectedCount);
console.log('Target count:', manifest.targetCount);
console.log('Static prerender entries:', staticPrerenderIncluded);
console.log('Tier counts:', tierCounts);
console.log('Route counts:', routeCounts);
console.log('Static prerender route counts:', staticPrerenderRouteCounts);
