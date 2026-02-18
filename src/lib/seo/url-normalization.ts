import type { RouteKey } from './sitemap-manifest';

export interface ParsedCanonicalRoutePath {
  path: string;
  routeKey: RouteKey | null;
  number?: number;
  isNumberRoute: boolean;
  isVariantRoute: boolean;
}

const WARNING_LEGACY_RE = /^\/is-(\d+)-a-warning\/(\d+)$/;
const TWIN_FLAME_LEGACY_RE = /^\/(\d+)-twin-flame\/(\d+)$/;

const NUMBER_ROUTE_PATTERNS: Array<{ regex: RegExp; routeKey: RouteKey }> = [
  { regex: /^\/meaning\/angel-number\/(\d+)$/, routeKey: 'meaning' },
  { regex: /^\/why-am-i-seeing\/(\d+)$/, routeKey: 'why' },
  { regex: /^\/warning\/(\d+)$/, routeKey: 'warning' },
  { regex: /^\/angel-number-love\/(\d+)$/, routeKey: 'love' },
  { regex: /^\/angel-number-career\/(\d+)$/, routeKey: 'career' },
  { regex: /^\/manifestation\/(\d+)$/, routeKey: 'manifestation' },
  { regex: /^\/biblical-meaning\/(\d+)$/, routeKey: 'biblical' },
  { regex: /^\/money\/(\d+)$/, routeKey: 'money' },
  { regex: /^\/soulmate\/(\d+)$/, routeKey: 'soulmate' },
  { regex: /^\/pregnancy\/(\d+)$/, routeKey: 'pregnancy' },
  { regex: /^\/breakup\/(\d+)$/, routeKey: 'breakup' },
  { regex: /^\/dreams\/(\d+)$/, routeKey: 'dreams' },
  { regex: /^\/twin-flame\/(\d+)$/, routeKey: 'twin_flame' },
];

function normalizeRawPath(pathname: string): string {
  const noHash = pathname.split('#')[0];
  const noQuery = noHash.split('?')[0];
  const withLeadingSlash = noQuery.startsWith('/') ? noQuery : `/${noQuery}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');
  const withoutTrailingSlash = collapsed !== '/' ? collapsed.replace(/\/+$/, '') : '/';
  return withoutTrailingSlash || '/';
}

function toPathname(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  try {
    const parsed = new URL(value);
    return parsed.pathname;
  } catch {
    return value;
  }
}

export function canonicalizeLegacyPath(path: string): string {
  const warning = path.match(WARNING_LEGACY_RE);
  if (warning) {
    return `/warning/${warning[2]}`;
  }

  const twinFlame = path.match(TWIN_FLAME_LEGACY_RE);
  if (twinFlame) {
    return `/twin-flame/${twinFlame[2]}`;
  }

  return path;
}

export function normalizeCanonicalPath(raw: string): string | null {
  const pathname = toPathname(raw);
  if (!pathname) return null;

  const normalized = normalizeRawPath(pathname);
  return canonicalizeLegacyPath(normalized);
}

export function parseCanonicalRoutePath(raw: string): ParsedCanonicalRoutePath {
  const path = normalizeCanonicalPath(raw) || '/';

  for (const { regex, routeKey } of NUMBER_ROUTE_PATTERNS) {
    const match = path.match(regex);
    if (!match) continue;

    const number = Number.parseInt(match[1], 10);
    const isVariantRoute = routeKey !== 'meaning';
    return {
      path,
      routeKey,
      number,
      isNumberRoute: true,
      isVariantRoute,
    };
  }

  return {
    path,
    routeKey: null,
    isNumberRoute: false,
    isVariantRoute: false,
  };
}
