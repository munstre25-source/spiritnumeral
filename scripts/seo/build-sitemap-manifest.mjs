#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const SPIRITNU_DIR = path.join(ROOT_DIR, 'spiritnu');
const OUTPUT_PATH = path.join(ROOT_DIR, 'data', 'seo', 'sitemap-manifest.json');

const MIN_COUNT = Number.parseInt(process.env.SITEMAP_MIN_COUNT || '3500', 10);
const TOP_NON_INDEXED_COUNT = Number.parseInt(process.env.SITEMAP_TOP_COUNT || '2000', 10);
const FULL_MODE = parseBoolean(process.env.SITEMAP_FULL_MODE, true);
const INCLUDE_BLOG = parseBoolean(process.env.SITEMAP_INCLUDE_BLOG, false);
const STATIC_PRERENDER_COUNT = Number.parseInt(process.env.SITEMAP_STATIC_PRERENDER_COUNT || '4000', 10);
const NON_FULL_TARGET_COUNT = Number.parseInt(process.env.SITEMAP_TARGET_COUNT || '4000', 10);
const MAX_NUMBER = 9999;

const ROUTE_WEIGHTS = {
  core_static: 120,
  meaning: 75,
  why: 55,
  warning: 45,
  twin_flame: 38,
  love: 34,
  money: 32,
  manifestation: 30,
  soulmate: 28,
  dreams: 26,
  career: 24,
  biblical: 18,
  pregnancy: 16,
  breakup: 16,
};

const NUMBER_ROUTES = [
  { routeKey: 'meaning', toPath: (n) => `/meaning/angel-number/${n}`, regex: /^\/meaning\/angel-number\/(\d+)$/ },
  { routeKey: 'why', toPath: (n) => `/why-am-i-seeing/${n}`, regex: /^\/why-am-i-seeing\/(\d+)$/ },
  { routeKey: 'warning', toPath: (n) => `/warning/${n}`, regex: /^\/warning\/(\d+)$/ },
  { routeKey: 'love', toPath: (n) => `/angel-number-love/${n}`, regex: /^\/angel-number-love\/(\d+)$/ },
  { routeKey: 'career', toPath: (n) => `/angel-number-career/${n}`, regex: /^\/angel-number-career\/(\d+)$/ },
  { routeKey: 'manifestation', toPath: (n) => `/manifestation/${n}`, regex: /^\/manifestation\/(\d+)$/ },
  { routeKey: 'biblical', toPath: (n) => `/biblical-meaning/${n}`, regex: /^\/biblical-meaning\/(\d+)$/ },
  { routeKey: 'money', toPath: (n) => `/money/${n}`, regex: /^\/money\/(\d+)$/ },
  { routeKey: 'soulmate', toPath: (n) => `/soulmate/${n}`, regex: /^\/soulmate\/(\d+)$/ },
  { routeKey: 'pregnancy', toPath: (n) => `/pregnancy/${n}`, regex: /^\/pregnancy\/(\d+)$/ },
  { routeKey: 'breakup', toPath: (n) => `/breakup/${n}`, regex: /^\/breakup\/(\d+)$/ },
  { routeKey: 'dreams', toPath: (n) => `/dreams/${n}`, regex: /^\/dreams\/(\d+)$/ },
  { routeKey: 'twin_flame', toPath: (n) => `/twin-flame/${n}`, regex: /^\/twin-flame\/(\d+)$/ },
];

const CORE_STATIC_PATHS = [
  '/',
  '/calculator',
  '/meaning',
  '/meaning/angel-number',
  '/meaning/life-path',
  '/about',
  '/compatibility',
  '/compare',
  '/quiz',
  '/quick-report',
  '/reviews',
  '/celebrity-numerology',
  '/name-numerology',
  '/personal-year',
  '/personal-month',
  '/personal-day',
  '/pinnacle',
  '/challenge',
  '/maturity-number',
  '/birthday-number',
  '/karmic-debt',
  '/twin-flame',
  '/warning',
  '/dreams',
  '/breakup',
  '/pregnancy',
  '/soulmate',
  '/money',
  '/press',
  '/contact',
  '/privacy',
  '/terms',
  '/psychic-readings',
  '/psychic-readings/love',
  '/psychic-readings/career',
  '/psychic-readings/when-to-get',
  '/psychic-readings/angel-numbers-readings',
  '/psychic-readings/questions-to-ask',
  '/psychic-readings/reading-vs-calculator',
  '/house-number',
  '/karmic-lesson',
  '/blog',
];

const POPULAR_NUMBERS = new Set([11, 22, 33, 111, 222, 333, 444, 555, 666, 777, 888, 999, 1111, 1212, 2222]);

function parseBoolean(value, defaultValue) {
  if (typeof value === 'undefined') return defaultValue;
  const normalized = String(value).toLowerCase().trim();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return defaultValue;
}

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function normalizePath(raw) {
  if (!raw) return null;
  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  let pathname = trimmed;
  try {
    const parsed = new URL(trimmed);
    pathname = parsed.pathname;
  } catch {
    pathname = trimmed;
  }

  pathname = pathname.split('#')[0].split('?')[0];
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  pathname = pathname.replace(/\/{2,}/g, '/');
  pathname = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';

  const warningLegacy = pathname.match(/^\/is-(\d+)-a-warning\/(\d+)$/);
  if (warningLegacy) {
    return `/warning/${warningLegacy[2]}`;
  }

  const twinFlameLegacy = pathname.match(/^\/(\d+)-twin-flame\/(\d+)$/);
  if (twinFlameLegacy) {
    return `/twin-flame/${twinFlameLegacy[2]}`;
  }

  return pathname;
}

function parsePercentage(value) {
  if (!value) return 0;
  const n = Number.parseFloat(String(value).replace('%', ''));
  if (!Number.isFinite(n)) return 0;
  return n;
}

function parseNumber(value) {
  if (value === undefined || value === null || value === '') return 0;
  const n = Number.parseFloat(String(value).replace(/,/g, ''));
  if (!Number.isFinite(n)) return 0;
  return n;
}

function findLatestFile(matchDirPrefix, fileName) {
  if (!fs.existsSync(SPIRITNU_DIR)) return null;

  const candidates = fs
    .readdirSync(SPIRITNU_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(matchDirPrefix))
    .map((entry) => path.join(SPIRITNU_DIR, entry.name, fileName))
    .filter((candidatePath) => fs.existsSync(candidatePath))
    .map((candidatePath) => ({
      path: candidatePath,
      mtimeMs: fs.statSync(candidatePath).mtimeMs,
    }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  return candidates[0]?.path || null;
}

const CORE_STATIC_SET = new Set(CORE_STATIC_PATHS);
for (let i = 1; i <= 9; i += 1) {
  CORE_STATIC_SET.add(`/meaning/life-path/life-path-${i}`);
}

['expression', 'soul-urge', 'personality'].forEach((type) => {
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].forEach((num) => CORE_STATIC_SET.add(`/name-numerology/${type}/${num}`));
});

[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((num) => {
  CORE_STATIC_SET.add(`/personal-year/${num}`);
  CORE_STATIC_SET.add(`/personal-month/${num}`);
  CORE_STATIC_SET.add(`/personal-day/${num}`);
  CORE_STATIC_SET.add(`/pinnacle/${num}`);
  CORE_STATIC_SET.add(`/maturity-number/${num}`);
  CORE_STATIC_SET.add(`/karmic-lesson/${num}`);
});

[0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((num) => CORE_STATIC_SET.add(`/challenge/${num}`));
[13, 14, 16, 19].forEach((num) => CORE_STATIC_SET.add(`/karmic-debt/${num}`));
for (let num = 1; num <= 31; num += 1) CORE_STATIC_SET.add(`/birthday-number/${num}`);
[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].forEach((num) => CORE_STATIC_SET.add(`/house-number/${num}`));

function inferRoute(pathname) {
  for (const { routeKey, regex } of NUMBER_ROUTES) {
    const match = pathname.match(regex);
    if (!match) continue;

    const number = Number.parseInt(match[1], 10);
    if (Number.isFinite(number) && number >= 0 && number <= MAX_NUMBER) {
      return { routeKey, number };
    }
    return null;
  }

  if (CORE_STATIC_SET.has(pathname)) {
    return { routeKey: 'core_static' };
  }

  return null;
}

function isBlockedPath(pathname) {
  if (!pathname) return true;
  if (!INCLUDE_BLOG && pathname.startsWith('/blog')) return true;

  const blockedPrefixes = ['/api', '/admin', '/_next'];
  if (blockedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return true;
  }

  const blockedExact = new Set(['/profile', '/order-status', '/thank-you', '/cancelled']);
  return blockedExact.has(pathname);
}

const metricByPath = new Map();
const indexedPathSet = new Set();
const excludedReasonCounts = {};

function bumpReason(reason) {
  excludedReasonCounts[reason] = (excludedReasonCounts[reason] || 0) + 1;
}

const performanceCsvPath = findLatestFile('spiritnumeral.com-Performance-on-Search-', 'Pages.csv');
if (performanceCsvPath) {
  const lines = fs.readFileSync(performanceCsvPath, 'utf8').split(/\r?\n/).filter(Boolean);
  for (let i = 1; i < lines.length; i += 1) {
    const row = parseCsvLine(lines[i]);
    const normalizedPath = normalizePath(row[0]);
    if (!normalizedPath) {
      bumpReason('performance_invalid_path');
      continue;
    }

    if (isBlockedPath(normalizedPath)) {
      bumpReason('performance_blocked');
      continue;
    }

    const route = inferRoute(normalizedPath);
    if (!route) {
      bumpReason('performance_unrecognized_route');
      continue;
    }

    const clicks = parseNumber(row[1]);
    const impressions = parseNumber(row[2]);
    const ctr = parsePercentage(row[3]);
    const position = parseNumber(row[4]);

    const current = metricByPath.get(normalizedPath) || { clicks: 0, impressions: 0, ctr: 0, position: 0, samples: 0 };
    current.clicks += clicks;
    current.impressions += impressions;
    current.ctr += ctr;
    current.position += position;
    current.samples += 1;
    metricByPath.set(normalizedPath, current);
  }
}

const indexedCsvPath = findLatestFile('spiritnumeral.com-Coverage-Valid-', 'Table.csv');
if (indexedCsvPath) {
  const lines = fs.readFileSync(indexedCsvPath, 'utf8').split(/\r?\n/).filter(Boolean);
  for (let i = 1; i < lines.length; i += 1) {
    const row = parseCsvLine(lines[i]);
    const normalizedPath = normalizePath(row[0]);
    if (!normalizedPath) {
      bumpReason('indexed_invalid_path');
      continue;
    }

    if (isBlockedPath(normalizedPath)) {
      bumpReason('indexed_blocked');
      continue;
    }

    if (!inferRoute(normalizedPath)) {
      bumpReason('indexed_unrecognized_route');
      continue;
    }

    indexedPathSet.add(normalizedPath);
  }
}

const candidateMap = new Map();

function upsertCandidate(pathname, routeKey, number) {
  if (isBlockedPath(pathname)) {
    bumpReason('candidate_blocked');
    return;
  }

  if (candidateMap.has(pathname)) return;

  candidateMap.set(pathname, {
    path: pathname,
    routeKey,
    number,
    clicks: 0,
    impressions: 0,
    indexed: false,
    score: 0,
  });
}

for (const staticPath of CORE_STATIC_SET) {
  if (!INCLUDE_BLOG && staticPath.startsWith('/blog')) continue;
  upsertCandidate(staticPath, 'core_static', undefined);
}

for (let number = 0; number <= MAX_NUMBER; number += 1) {
  for (const { routeKey, toPath } of NUMBER_ROUTES) {
    upsertCandidate(toPath(number), routeKey, number);
  }
}

for (const [pathKey, metrics] of metricByPath.entries()) {
  const route = inferRoute(pathKey);
  if (!route) {
    bumpReason('metric_candidate_unrecognized');
    continue;
  }

  if (!candidateMap.has(pathKey)) {
    upsertCandidate(pathKey, route.routeKey, route.number);
  }

  const candidate = candidateMap.get(pathKey);
  if (!candidate) continue;
  candidate.clicks = metrics.clicks;
  candidate.impressions = metrics.impressions;
}

for (const pathKey of indexedPathSet.values()) {
  const route = inferRoute(pathKey);
  if (!route) {
    bumpReason('indexed_candidate_unrecognized');
    continue;
  }

  if (!candidateMap.has(pathKey)) {
    upsertCandidate(pathKey, route.routeKey, route.number);
  }

  const candidate = candidateMap.get(pathKey);
  if (!candidate) continue;
  candidate.indexed = true;
}

for (const candidate of candidateMap.values()) {
  const routeWeight = ROUTE_WEIGHTS[candidate.routeKey] || 0;
  const signalScore = (candidate.clicks * 100) + (candidate.impressions * 0.5);
  const indexedBonus = candidate.indexed ? 400000 : 0;
  const metricBonus = (candidate.clicks > 0 || candidate.impressions > 0) ? 500 : 0;
  const meaningBonus = candidate.routeKey === 'meaning' ? 35 : 0;
  const coreBonus = candidate.routeKey === 'core_static' ? 500000 : 0;
  const popularBonus = typeof candidate.number === 'number' && POPULAR_NUMBERS.has(candidate.number) ? 40 : 0;

  candidate.score = routeWeight + signalScore + indexedBonus + metricBonus + meaningBonus + coreBonus + popularBonus;
}

const sortedCandidates = Array.from(candidateMap.values()).sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

const selected = FULL_MODE
  ? sortedCandidates
  : sortedCandidates.slice(0, Math.max(1, NON_FULL_TARGET_COUNT));

if (selected.length < MIN_COUNT) {
  throw new Error(`Selected ${selected.length} URLs, which is below SITEMAP_MIN_COUNT=${MIN_COUNT}`);
}

const staticPrerenderCount = Math.max(0, Math.min(STATIC_PRERENDER_COUNT, selected.length));
const staticPrerenderSet = new Set(selected.slice(0, staticPrerenderCount).map((candidate) => candidate.path));

let nonIndexedCount = 0;
const entries = selected.map((candidate) => {
  let tier;
  if (candidate.indexed) {
    tier = 'indexed';
  } else if (nonIndexedCount < TOP_NON_INDEXED_COUNT) {
    tier = 'top2000';
    nonIndexedCount += 1;
  } else {
    tier = 'fill';
  }

  return {
    path: candidate.path,
    routeKey: candidate.routeKey,
    tier,
    score: Number(candidate.score.toFixed(2)),
    number: typeof candidate.number === 'number' ? candidate.number : undefined,
    clicks: Number(candidate.clicks.toFixed(2)),
    impressions: Number(candidate.impressions.toFixed(2)),
    indexed: candidate.indexed,
    includeInSitemap: true,
    includeInStaticPrerender: staticPrerenderSet.has(candidate.path),
  };
});

const tierCounts = entries.reduce((acc, entry) => {
  acc[entry.tier] = (acc[entry.tier] || 0) + 1;
  return acc;
}, {});

const routeCountsSummary = entries.reduce((acc, entry) => {
  acc[entry.routeKey] = (acc[entry.routeKey] || 0) + 1;
  return acc;
}, {});

const targetCount = FULL_MODE ? entries.length : Math.max(1, NON_FULL_TARGET_COUNT);

const output = {
  generatedAt: new Date().toISOString(),
  targetCount,
  minCount: MIN_COUNT,
  selectedCount: entries.length,
  sourceFiles: {
    performancePagesCsv: performanceCsvPath ? path.relative(ROOT_DIR, performanceCsvPath) : null,
    indexedCoverageCsv: indexedCsvPath ? path.relative(ROOT_DIR, indexedCsvPath) : null,
  },
  settings: {
    fullMode: FULL_MODE,
    includeBlog: INCLUDE_BLOG,
    maxNumber: MAX_NUMBER,
    staticPrerenderCount,
  },
  summary: {
    tierCounts,
    routeCounts: routeCountsSummary,
    excludedReasonCounts,
    indexedIncluded: entries.filter((entry) => entry.indexed).length,
    staticPrerenderIncluded: entries.filter((entry) => entry.includeInStaticPrerender).length,
  },
  entries,
};

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

console.log('Wrote sitemap manifest:', path.relative(ROOT_DIR, OUTPUT_PATH));
console.log('Selected URLs:', entries.length);
console.log('Static prerender URLs:', staticPrerenderCount);
console.log('Tier counts:', tierCounts);
console.log('Route counts:', routeCountsSummary);
console.log('Excluded reasons:', excludedReasonCounts);
