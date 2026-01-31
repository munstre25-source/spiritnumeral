import dataset from '../data/spirituality-dataset.json';
import { getAngelNumber, transformAngelNumberData } from '../supabase';

export async function getPSEODataAsync(category: string, slug: string) {
  if (category === 'angel-number') {
    const num = parseInt(slug, 10);
    if (isNaN(num)) return null;
    const data = await getAngelNumber(num);
    if (!data) return null;
    return transformAngelNumberData(data);
  }
  if (category === 'life-path') {
    const id = slug.replace('life-path-', '');
    return dataset.life_paths.find(p => p.path.toString() === id);
  }
  return null;
}

export function getPSEOData(category: string, slug: string) {
  if (category === 'angel-number') {
    return dataset.angel_numbers.find(n => n.number.toString() === slug);
  }
  if (category === 'life-path') {
    const id = slug.replace('life-path-', '');
    return dataset.life_paths.find(p => p.path.toString() === id);
  }
  return null;
}

export function getAllPSEOSlugs() {
  const paths: { category: string; slug: string }[] = [];

  dataset.life_paths.forEach(p => {
    paths.push({ category: 'life-path', slug: `life-path-${p.path}` });
  });

  return paths;
}

/**
 * Get all angel numbers in range 0-2222 for sitemap (expanded data)
 */
export function getAngelNumberRange(): number[] {
  const numbers: number[] = [];
  for (let i = 0; i <= 9999; i++) {
    numbers.push(i);
  }
  return numbers;
}

export function getAllAngelNumberSlugs(): string[] {
  return [];
}

export function getAllLifePathSlugs(): string[] {
  return dataset.life_paths.map(p => p.path.toString());
}

/**
 * Generate SEO-friendly title for an angel number (GSC-optimized for CTR)
 * Queries: "X meaning", "angel number X meaning", "meaning in love", "twin flame", "money"
 */
export function generateAngelNumberTitle(number: number, modifier?: string): string {
  const base = `Angel Number ${number} Meaning`;

  if (modifier === 'warning') {
    return `Is ${number} a Warning? Angel Number Meaning for Love & Career`;
  }
  if (modifier === 'twin-flame') {
    return `${number} Twin Flame Meaning: Angel Number Guide`;
  }
  if (modifier === 'why-seeing') {
    return `Why Am I Seeing ${number}? Meaning & What To Do`;
  }

  return `${base}: Love, Career & Twin Flame`;
}

/**
 * Generate SEO-friendly description for an angel number (GSC-optimized for CTR)
 * Desktop position ~15, mobile ~8.6; stronger snippets help both.
 */
export function generateAngelNumberDescription(number: number, data: any, modifier?: string): string {
  if (modifier === 'warning') {
    return `Is angel number ${number} a warning? Find out the meaning for love, career, and what to do next.`;
  }
  if (modifier === 'twin-flame') {
    return `What does ${number} mean for twin flames? Reunion signs, connection, and spiritual meaning.`;
  }
  if (modifier === 'why-seeing') {
    return `Why does ${number} keep appearing? Get the meaning and what to do next. Love, career & spiritual guidance.`;
  }

  return `Angel number ${number} meaning: love, career & twin flame. ${(data?.meaning || '').slice(0, 100)}`;
}
