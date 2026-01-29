const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';

export function getAllSitemapUrls(baseUrl = DEFAULT_SITE_URL) {
  const urls: string[] = [];
  const now = new Date().toISOString();

  // Static pages
  [
    '/',
    '/calculator',
    '/meaning/life-path',
    '/meaning',
    '/meaning/angel-number',
    '/about',
    '/compatibility',
    '/compare',
    '/quiz',
    '/celebrity-numerology',
    '/profile',
    '/blog',
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
  ].forEach((path) => {
    urls.push(`${baseUrl}${path}`);
  });

  // Blog posts
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
  blogSlugs.forEach((slug) => urls.push(`${baseUrl}/blog/${slug}`));

  // Life path pages (1-9)
  for (let i = 1; i <= 9; i += 1) {
    urls.push(`${baseUrl}/meaning/life-path/life-path-${i}`);
  }

  // Angel numbers 0-9999 with variants
  for (let number = 0; number <= 9999; number += 1) {
    urls.push(`${baseUrl}/meaning/angel-number/${number}`);
    urls.push(`${baseUrl}/why-am-i-seeing/${number}`);
    urls.push(`${baseUrl}/warning/${number}`);
    urls.push(`${baseUrl}/twin-flame/${number}`);
    urls.push(`${baseUrl}/angel-number-love/${number}`);
    urls.push(`${baseUrl}/angel-number-career/${number}`);
    urls.push(`${baseUrl}/manifestation/${number}`);
    urls.push(`${baseUrl}/biblical-meaning/${number}`);
    urls.push(`${baseUrl}/money/${number}`);
    urls.push(`${baseUrl}/soulmate/${number}`);
    urls.push(`${baseUrl}/pregnancy/${number}`);
    urls.push(`${baseUrl}/breakup/${number}`);
    urls.push(`${baseUrl}/dreams/${number}`);
  }

  // Name numerology numbers
  const nameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  const nameTypes = ['expression', 'soul-urge', 'personality'];
  nameTypes.forEach((type) => {
    nameNumbers.forEach((num) => {
      urls.push(`${baseUrl}/name-numerology/${type}/${num}`);
    });
  });

  // Timing cycles (personal year/month/day)
  const timingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  ['personal-year', 'personal-month', 'personal-day'].forEach((path) => {
    timingNumbers.forEach((num) => {
      urls.push(`${baseUrl}/${path}/${num}`);
    });
  });

  // Lifecycle numbers
  const pinnacleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  pinnacleNumbers.forEach((num) => urls.push(`${baseUrl}/pinnacle/${num}`));

  const challengeNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  challengeNumbers.forEach((num) => urls.push(`${baseUrl}/challenge/${num}`));

  const maturityNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  maturityNumbers.forEach((num) => urls.push(`${baseUrl}/maturity-number/${num}`));

  const birthdayNumbers = Array.from({ length: 31 }, (_, i) => i + 1);
  birthdayNumbers.forEach((num) => urls.push(`${baseUrl}/birthday-number/${num}`));

  const karmicDebtNumbers = [13, 14, 16, 19];
  karmicDebtNumbers.forEach((num) => urls.push(`${baseUrl}/karmic-debt/${num}`));

  return { urls, generatedAt: now };
}

export function applySitemapRollout(urls: string[]) {
  const rolloutMax = process.env.SITEMAP_ROLLOUT_MAX;
  if (!rolloutMax) return urls;
  const limit = parseInt(rolloutMax, 10);
  if (Number.isNaN(limit) || limit <= 0) return urls;
  return urls.slice(0, limit);
}
