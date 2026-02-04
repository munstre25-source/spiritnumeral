/**
 * Build an absolute URL with no double slashes (fixes Ahrefs "Double slash in URL").
 * Use whenever concatenating base URL + path, including sitemap and canonical.
 */
export function ensureAbsoluteUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '/').replace(/\/+/g, '/');
  return p === '/' ? `${b}/` : `${b}${p}`;
}

/** Default site base URL (no trailing slash). */
export function getSiteBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  return url.replace(/\/+$/, '');
}

/** Meta description: aim 120–160 chars (fixes "too short" / "too long"). */
export function clampMetaDescription(desc: string, min = 120, max = 160): string {
  const t = desc.trim();
  if (t.length <= max) return t.length >= min ? t : t + ' Discover more angel number and life path meanings at Spirit Numeral.'.slice(0, min - t.length);
  return t.slice(0, max - 3) + '...';
}

/** Title: cap at 60 chars for SERP (fixes "title too long"). */
export function clampTitle(title: string, max = 60): string {
  const t = title.trim();
  return t.length <= max ? t : t.slice(0, max - 3) + '...';
}
