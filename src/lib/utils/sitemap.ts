import { ensureAbsoluteUrl, getSiteBaseUrl } from './url';

export function getAllSitemapUrls(baseUrl = getSiteBaseUrl()) {
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
    '/quick-report',
    '/reviews',
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
  ].forEach((path) => {
    urls.push(ensureAbsoluteUrl(baseUrl, path));
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
  blogSlugs.forEach((slug) => urls.push(ensureAbsoluteUrl(baseUrl, `/blog/${slug}`)));

  // Blog category pages
  const blogCategories = [
    'angel-numbers',
    'birthday-number',
    'breakup',
    'career',
    'celebrity-numerology',
    'challenges',
    'compatibility',
    'destiny-number',
    'dream-meaning',
    'life-path',
    'love-compatibility',
    'manifestation',
    'maturity-number',
    'money',
    'name-numerology',
    'personal-day',
    'personal-month',
    'personal-year',
    'personality-number',
    'pinnacles',
    'pregnancy',
    'soul-urge-number',
    'soulmate',
    'twin-flame',
    'warning',
    'why-am-i-seeing',
    'biblical-meaning',
  ];
  blogCategories.forEach((slug) => urls.push(ensureAbsoluteUrl(baseUrl, `/blog/category/${slug}`)));

  // Life path pages (1-9)
  for (let i = 1; i <= 9; i += 1) {
    urls.push(ensureAbsoluteUrl(baseUrl, `/meaning/life-path/life-path-${i}`));
  }

  // Angel numbers 0-9999 with variants
  for (let number = 0; number <= 9999; number += 1) {
    urls.push(ensureAbsoluteUrl(baseUrl, `/meaning/angel-number/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/why-am-i-seeing/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/warning/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/twin-flame/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/angel-number-love/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/angel-number-career/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/manifestation/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/biblical-meaning/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/money/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/soulmate/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/pregnancy/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/breakup/${number}`));
    urls.push(ensureAbsoluteUrl(baseUrl, `/dreams/${number}`));
  }

  // Name numerology numbers
  const nameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  const nameTypes = ['expression', 'soul-urge', 'personality'];
  nameTypes.forEach((type) => {
    nameNumbers.forEach((num) => {
      urls.push(ensureAbsoluteUrl(baseUrl, `/name-numerology/${type}/${num}`));
    });
  });

  // Timing cycles (personal year/month/day)
  const timingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  ['personal-year', 'personal-month', 'personal-day'].forEach((path) => {
    timingNumbers.forEach((num) => {
      urls.push(ensureAbsoluteUrl(baseUrl, `/${path}/${num}`));
    });
  });

  // Lifecycle numbers
  const pinnacleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  pinnacleNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/pinnacle/${num}`)));

  const challengeNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  challengeNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/challenge/${num}`)));

  const maturityNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  maturityNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/maturity-number/${num}`)));

  const birthdayNumbers = Array.from({ length: 31 }, (_, i) => i + 1);
  birthdayNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/birthday-number/${num}`)));

  const karmicDebtNumbers = [13, 14, 16, 19];
  karmicDebtNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/karmic-debt/${num}`)));

  // House number pages (1-9, 11, 22, 33)
  const houseNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  houseNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/house-number/${num}`)));

  // Karmic lesson pages (1-9)
  const karmicLessonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  karmicLessonNumbers.forEach((num) => urls.push(ensureAbsoluteUrl(baseUrl, `/karmic-lesson/${num}`)));

  return { urls, generatedAt: now };
}
