import type { Metadata } from 'next';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';
import { getIndexingPolicy } from './indexing-policy';

function mergeAlternates(
  alternates: Metadata['alternates'] | undefined,
  canonical: string,
): Metadata['alternates'] {
  return {
    ...(alternates || {}),
    canonical,
  };
}

/** Use for routes that are always self-canonical. */
export function withCanonicalPath(path: string, metadata: Metadata = {}): Metadata {
  const canonical = ensureAbsoluteUrl(getSiteBaseUrl(), path);
  return {
    ...metadata,
    alternates: mergeAlternates(metadata.alternates, canonical),
  };
}

/** Use for routes that should follow allowlist/indexing-policy canonical + robots behavior. */
export function withIndexingPolicy(path: string, metadata: Metadata = {}): Metadata {
  const policy = getIndexingPolicy(path);
  const canonical = ensureAbsoluteUrl(getSiteBaseUrl(), policy.canonicalPath);
  return {
    ...metadata,
    alternates: mergeAlternates(metadata.alternates, canonical),
    robots: metadata.robots ?? policy.robots,
  };
}
