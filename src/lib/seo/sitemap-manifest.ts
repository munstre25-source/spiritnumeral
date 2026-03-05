import manifestData from '../../../data/seo/sitemap-manifest.json';
import { normalizeCanonicalPath } from './url-normalization';

export type SitemapTier = 'indexed' | 'top2000' | 'fill';

export type RouteKey =
  | 'meaning'
  | 'why'
  | 'warning'
  | 'love'
  | 'career'
  | 'manifestation'
  | 'biblical'
  | 'money'
  | 'soulmate'
  | 'pregnancy'
  | 'breakup'
  | 'dreams'
  | 'twin_flame'
  | 'core_static';

export interface RankedUrlEntry {
  path: string;
  routeKey: RouteKey;
  tier: SitemapTier;
  score: number;
  number?: number;
  clicks: number;
  impressions: number;
  indexed: boolean;
  includeInSitemap: boolean;
  includeInStaticPrerender: boolean;
}

interface SitemapManifest {
  generatedAt: string;
  targetCount: number;
  minCount: number;
  selectedCount: number;
  entries: RankedUrlEntry[];
  summary?: {
    tierCounts?: Record<string, number>;
    routeCounts?: Record<string, number>;
    excludedReasonCounts?: Record<string, number>;
  };
}

const EMPTY_MANIFEST: SitemapManifest = {
  generatedAt: new Date(0).toISOString(),
  targetCount: 0,
  minCount: 0,
  selectedCount: 0,
  entries: [],
};

const manifest = (manifestData || EMPTY_MANIFEST) as SitemapManifest;
const sitemapEntries = manifest.entries.filter((entry) => entry.includeInSitemap);
const staticEntries = manifest.entries.filter((entry) => entry.includeInStaticPrerender);

const allowlistPathSet = new Set(sitemapEntries.map((entry) => entry.path));
const staticPathSet = new Set(staticEntries.map((entry) => entry.path));

const numbersByRoute = new Map<RouteKey, number[]>();
for (const entry of manifest.entries) {
  if (typeof entry.number !== 'number') continue;
  const existing = numbersByRoute.get(entry.routeKey) || [];
  existing.push(entry.number);
  numbersByRoute.set(entry.routeKey, existing);
}
for (const [routeKey, numbers] of numbersByRoute.entries()) {
  numbersByRoute.set(routeKey, Array.from(new Set(numbers)).sort((a, b) => a - b));
}

export function getSitemapManifest(): SitemapManifest {
  return manifest;
}

export function getRankedSitemapEntries(): RankedUrlEntry[] {
  return manifest.entries;
}

export function getSitemapPaths(): string[] {
  return sitemapEntries.map((entry) => entry.path);
}

export function getStaticPrerenderPaths(): string[] {
  return staticEntries.map((entry) => entry.path);
}

export function isPathInSitemapAllowlist(rawPath: string): boolean {
  const normalized = normalizeCanonicalPath(rawPath);
  if (!normalized) return false;
  return allowlistPathSet.has(normalized);
}

export function isPathInStaticAllowlist(rawPath: string): boolean {
  const normalized = normalizeCanonicalPath(rawPath);
  if (!normalized) return false;
  return staticPathSet.has(normalized);
}

export function getStaticParamsForRoute(routeKey: RouteKey): Array<{ number: string }> {
  const numbers = numbersByRoute.get(routeKey) || [];

  return numbers
    .filter((num) => {
      const path = routeKeyToPath(routeKey, num);
      if (!path) return false;
      return staticPathSet.has(path);
    })
    .map((number) => ({ number: String(number) }));
}

export function getStaticParamsFromTemplate<T>(
  toPath: (entry: RankedUrlEntry) => string | null,
  toParams: (entry: RankedUrlEntry) => T | null
): T[] {
  const params: T[] = [];

  for (const entry of staticEntries) {
    const path = toPath(entry);
    if (!path || !staticPathSet.has(path)) continue;

    const param = toParams(entry);
    if (param) params.push(param);
  }

  return params;
}

export function getAllowlistedNumbersForRoute(routeKey: RouteKey): number[] {
  const numbers = numbersByRoute.get(routeKey) || [];
  return numbers.filter((num) => {
    const path = routeKeyToPath(routeKey, num);
    if (!path) return false;
    return allowlistPathSet.has(path);
  });
}

export function getSitemapTierCounts(): Record<string, number> {
  return sitemapEntries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.tier] = (acc[entry.tier] || 0) + 1;
    return acc;
  }, {});
}

export function getSitemapRouteCounts(): Record<string, number> {
  return sitemapEntries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.routeKey] = (acc[entry.routeKey] || 0) + 1;
    return acc;
  }, {});
}

function routeKeyToPath(routeKey: RouteKey, number: number): string | null {
  switch (routeKey) {
    case 'meaning':
      return `/meaning/angel-number/${number}`;
    case 'why':
      return `/why-am-i-seeing/${number}`;
    case 'warning':
      return `/warning/${number}`;
    case 'love':
      return `/angel-number-love/${number}`;
    case 'career':
      return `/angel-number-career/${number}`;
    case 'manifestation':
      return `/manifestation/${number}`;
    case 'biblical':
      return `/biblical-meaning/${number}`;
    case 'money':
      return `/money/${number}`;
    case 'soulmate':
      return `/soulmate/${number}`;
    case 'pregnancy':
      return `/pregnancy/${number}`;
    case 'breakup':
      return `/breakup/${number}`;
    case 'dreams':
      return `/dreams/${number}`;
    case 'twin_flame':
      return `/twin-flame/${number}`;
    default:
      return null;
  }
}
