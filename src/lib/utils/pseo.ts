import dataset from '../data/spirituality-dataset.json';

/**
 * Get PSEO data for a specific category and slug
 */
export function getPSEOData(category: string, slug: string) {
  if (category === 'angel-number') {
    return dataset.angel_numbers.find(n => n.number.toString() === slug);
  }
  if (category === 'life-path') {
    // Expecting slug like 'life-path-7' or just '7'
    const id = slug.replace('life-path-', '');
    return dataset.life_paths.find(p => p.path.toString() === id);
  }
  return null;
}

/**
 * Get all PSEO slugs for static generation
 */
export function getAllPSEOSlugs() {
  const paths: { category: string; slug: string }[] = [];
  
  dataset.angel_numbers.forEach(n => {
    paths.push({ category: 'angel-number', slug: n.number.toString() });
  });
  
  dataset.life_paths.forEach(p => {
    paths.push({ category: 'life-path', slug: `life-path-${p.path}` });
  });
  
  return paths;
}

/**
 * Get all angel number slugs (for additional URL patterns)
 */
export function getAllAngelNumberSlugs(): string[] {
  return dataset.angel_numbers.map(n => n.number.toString());
}

/**
 * Get all life path slugs
 */
export function getAllLifePathSlugs(): string[] {
  return dataset.life_paths.map(p => p.path.toString());
}

/**
 * Generate SEO-friendly title for an angel number
 */
export function generateAngelNumberTitle(number: number, modifier?: string): string {
  const base = `Angel Number ${number} Meaning`;
  
  if (modifier === 'warning') {
    return `Is ${number} a Warning? 2026 Meaning for Love & Career`;
  }
  if (modifier === 'twin-flame') {
    return `${number} Twin Flame Meaning: 2026 Reunion Predictions`;
  }
  if (modifier === 'why-seeing') {
    return `Why Do I Keep Seeing ${number}? Spiritual Meaning Explained`;
  }
  
  return `${base}: 2026 Predictions for Love & Career`;
}

/**
 * Generate SEO-friendly description for an angel number
 */
export function generateAngelNumberDescription(number: number, data: any, modifier?: string): string {
  if (modifier === 'warning') {
    return `Is angel number ${number} a warning sign? Discover the true spiritual meaning and what your angels are trying to tell you about love, career, and your twin flame connection in 2026.`;
  }
  if (modifier === 'twin-flame') {
    return `What does angel number ${number} mean for twin flames? Learn about reunion signs, spiritual connection, and 2026 predictions for your twin flame journey.`;
  }
  if (modifier === 'why-seeing') {
    return `Why do you keep seeing ${number}? Discover the hidden spiritual message your angels are sending and what it means for your life path, relationships, and 2026 journey.`;
  }
  
  return `Discover the hidden spiritual meaning of angel number ${number}. ${data?.meaning || ''} Learn how it affects your twin flame union and career in 2026.`;
}
