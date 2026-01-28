import { MetadataRoute } from 'next';
import { getAllPSEOSlugs } from '@/lib/utils/pseo';
import { getAllAngelNumbers } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  sitemapEntries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  sitemapEntries.push({
    url: `${baseUrl}/calculator`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  sitemapEntries.push({
    url: `${baseUrl}/meaning/life-path`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });
  sitemapEntries.push({
    url: `${baseUrl}/meaning`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });
  sitemapEntries.push({
    url: `${baseUrl}/meaning/angel-number`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  const allSlugs = getAllPSEOSlugs();
  const allAngelNumbers = await getAllAngelNumbers();

  allSlugs.forEach(({ category, slug }) => {
    sitemapEntries.push({
      url: `${baseUrl}/meaning/${category}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  allAngelNumbers.forEach((number) => {
    sitemapEntries.push({
      url: `${baseUrl}/meaning/angel-number/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    sitemapEntries.push({
      url: `${baseUrl}/why-am-i-seeing/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/warning/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/twin-flame/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/angel-number-love/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/angel-number-career/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/manifestation/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/biblical-meaning/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // New high-intent page types
    sitemapEntries.push({
      url: `${baseUrl}/money/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/soulmate/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/pregnancy/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/breakup/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemapEntries.push({
      url: `${baseUrl}/dreams/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
