import { MetadataRoute } from 'next';
import { getAllPSEOSlugs, getAllAngelNumberSlugs } from '@/lib/utils/pseo';

export const dynamic = 'force-static';

/**
 * Generate sitemap for all pages
 * Includes:
 * - Main pages (home, calculator, etc.)
 * - All angel number pages (multiple URL patterns)
 * - All life path pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const now = new Date();
  
  const sitemap: MetadataRoute.Sitemap = [];

  // Homepage and main pages
  sitemap.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  sitemap.push({
    url: `${baseUrl}/calculator`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  // Get all angel numbers and life paths
  const allSlugs = getAllPSEOSlugs();
  const allAngelNumbers = getAllAngelNumberSlugs();

  // Main meaning pages: /meaning/angel-number/[number] and /meaning/life-path/[path]
  allSlugs.forEach(({ category, slug }) => {
    sitemap.push({
      url: `${baseUrl}/meaning/${category}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Additional URL patterns for angel numbers
  allAngelNumbers.forEach((number) => {
    // Why am I seeing pattern
    sitemap.push({
      url: `${baseUrl}/why-am-i-seeing/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Is warning pattern
    sitemap.push({
      url: `${baseUrl}/is-${number}-a-warning/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Twin flame pattern
    sitemap.push({
      url: `${baseUrl}/${number}-twin-flame/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemap;
}
