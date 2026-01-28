import { MetadataRoute } from 'next';
import { getAllPSEOSlugs, getAngelNumberRange } from '@/lib/utils/pseo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages
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

  sitemapEntries.push({
    url: `${baseUrl}/about`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  // New tool pages
  sitemapEntries.push({
    url: `${baseUrl}/compatibility`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  sitemapEntries.push({
    url: `${baseUrl}/compare`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  sitemapEntries.push({
    url: `${baseUrl}/quiz`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  sitemapEntries.push({
    url: `${baseUrl}/celebrity-numerology`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  sitemapEntries.push({
    url: `${baseUrl}/profile`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  });

  sitemapEntries.push({
    url: `${baseUrl}/blog`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  });

  // Category landing pages
  [
    '/twin-flame',
    '/warning',
    '/dreams',
    '/breakup',
    '/pregnancy',
    '/soulmate',
    '/money',
  ].forEach((path) => {
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Blog posts - get all from generated data
  const blogSlugs = [
    'angel-number-444-complete-guide',
    'angel-number-111-manifestation',
    'angel-number-222-balance-partnership',
    'angel-number-333-creativity-ascended-masters',
    'angel-number-555-change-transformation',
    'angel-number-666-balance-not-evil',
    'angel-number-777-spiritual-awakening',
    'angel-number-888-abundance-infinity',
    'angel-number-999-completion-ending',
    'life-path-number-1-leader',
    'life-path-number-7-seeker',
    'how-to-calculate-life-path-number',
    'numerology-compatibility-love-match',
    'personal-year-number-2026',
    'karmic-debt-numbers-13-14-16-19',
    'twin-flame-numbers-signs',
    'numerology-money-number',
    'numerology-name-meaning',
    'soul-urge-number-hearts-desire',
    'repeating-numbers-what-they-mean',
    'birthday-numerology-meaning',
    'numerology-manifestation-techniques',
    'numerology-career-guidance',
    'numerology-health-wellness',
  ];
  blogSlugs.forEach(slug => {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Life path pages from static data
  const allSlugs = getAllPSEOSlugs();
  allSlugs.forEach(({ category, slug }) => {
    sitemapEntries.push({
      url: `${baseUrl}/meaning/${category}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Get all angel numbers (0-2222)
  const allAngelNumbers = getAngelNumberRange();

  // Generate all page types for each angel number
  allAngelNumbers.forEach((number) => {
    // Main meaning page
    sitemapEntries.push({
      url: `${baseUrl}/meaning/angel-number/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Why am I seeing
    sitemapEntries.push({
      url: `${baseUrl}/why-am-i-seeing/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Warning
    sitemapEntries.push({
      url: `${baseUrl}/warning/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Twin flame
    sitemapEntries.push({
      url: `${baseUrl}/twin-flame/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Love
    sitemapEntries.push({
      url: `${baseUrl}/angel-number-love/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Career
    sitemapEntries.push({
      url: `${baseUrl}/angel-number-career/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Manifestation
    sitemapEntries.push({
      url: `${baseUrl}/manifestation/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Biblical meaning
    sitemapEntries.push({
      url: `${baseUrl}/biblical-meaning/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Money
    sitemapEntries.push({
      url: `${baseUrl}/money/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Soulmate
    sitemapEntries.push({
      url: `${baseUrl}/soulmate/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Pregnancy
    sitemapEntries.push({
      url: `${baseUrl}/pregnancy/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Breakup
    sitemapEntries.push({
      url: `${baseUrl}/breakup/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Dreams
    sitemapEntries.push({
      url: `${baseUrl}/dreams/${number}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
