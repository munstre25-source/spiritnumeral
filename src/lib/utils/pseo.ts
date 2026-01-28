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

export function getAllAngelNumberSlugs(): string[] {
  return [];
}

export function getAllLifePathSlugs(): string[] {
  return dataset.life_paths.map(p => p.path.toString());
}

/**
 * Generate SEO-friendly title for an angel number
 */
export function generateAngelNumberTitle(number: number, modifier?: string): string {
  const base = `Angel Number ${number} Meaning`;
  
  if (modifier === 'warning') {
    return `Is Angel Number ${number} a Warning? Meaning for Love & Career`;
  }
  if (modifier === 'twin-flame') {
    return `Angel Number ${number} Twin Flame Meaning`;
  }
  if (modifier === 'why-seeing') {
    return `Why Do I Keep Seeing ${number}? Meaning Explained`;
  }
  
  return `${base}: Love & Career Insights`;
}

/**
 * Generate SEO-friendly description for an angel number
 */
export function generateAngelNumberDescription(number: number, data: any, modifier?: string): string {
  if (modifier === 'warning') {
    return `Is angel number ${number} a warning sign? Discover the meaning and what it says about love, career, and your next steps.`;
  }
  if (modifier === 'twin-flame') {
    return `What does angel number ${number} mean for twin flames? Learn about reunion signs and your connection.`;
  }
  if (modifier === 'why-seeing') {
    return `Why do you keep seeing ${number}? Discover the message and what it means for your life path and relationships.`;
  }
  
  return `Discover the meaning of angel number ${number}. ${data?.meaning || ''} Learn how it affects love, career, and twin flame energy.`;
}
