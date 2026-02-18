import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';
import { isPathInSitemapAllowlist } from './sitemap-manifest';
import { normalizeCanonicalPath, parseCanonicalRoutePath } from './url-normalization';

export interface IndexingPolicy {
  canonicalPath: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  isAllowlisted: boolean;
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (typeof value === 'undefined') return defaultValue;
  const normalized = value.toLowerCase().trim();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return defaultValue;
}

function isAllowlistEnforced(): boolean {
  return parseBoolean(process.env.SEO_ENFORCE_ALLOWLIST, true);
}

export function getIndexingPolicy(rawPath: string): IndexingPolicy {
  const normalizedPath = normalizeCanonicalPath(rawPath) || '/';
  const allowlisted = isPathInSitemapAllowlist(normalizedPath);

  if (!isAllowlistEnforced()) {
    return {
      canonicalPath: normalizedPath,
      robots: { index: true, follow: true },
      isAllowlisted: true,
    };
  }

  if (allowlisted) {
    return {
      canonicalPath: normalizedPath,
      robots: { index: true, follow: true },
      isAllowlisted: true,
    };
  }

  const parsed = parseCanonicalRoutePath(normalizedPath);
  const canonicalPath = parsed.isVariantRoute && typeof parsed.number === 'number'
    ? `/meaning/angel-number/${parsed.number}`
    : normalizedPath;

  return {
    canonicalPath,
    robots: { index: false, follow: true },
    isAllowlisted: false,
  };
}

export function getCanonicalUrlForPath(rawPath: string, baseUrl = getSiteBaseUrl()): string {
  const policy = getIndexingPolicy(rawPath);
  return ensureAbsoluteUrl(baseUrl, policy.canonicalPath);
}
