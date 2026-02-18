import manifestData from '../../../data/seo/sitemap-manifest.json';
import { normalizeCanonicalPath } from './url-normalization';
import type { RankedUrlEntry } from './sitemap-manifest';

interface ManifestShape {
  entries: RankedUrlEntry[];
}

const entries = ((manifestData as ManifestShape).entries || []).filter((entry) => entry.includeInSitemap);
const allowlistedPaths = new Set(entries.map((entry) => entry.path));

const allowlistedMeaningNumbers = entries
  .filter((entry) => entry.routeKey === 'meaning' && typeof entry.number === 'number')
  .map((entry) => entry.number as number)
  .sort((a, b) => a - b);

const allowlistedMeaningSet = new Set(allowlistedMeaningNumbers);

export function isAllowlistedPath(rawPath: string): boolean {
  const normalized = normalizeCanonicalPath(rawPath);
  if (!normalized) return false;
  return allowlistedPaths.has(normalized);
}

export function isAllowlistedMeaningNumber(number: number): boolean {
  return allowlistedMeaningSet.has(number);
}

export function getNextAllowlistedMeaningNumber(currentNumber: number): number | null {
  for (const num of allowlistedMeaningNumbers) {
    if (num > currentNumber) return num;
  }
  return null;
}

export function getPreviousAllowlistedMeaningNumber(currentNumber: number): number | null {
  for (let i = allowlistedMeaningNumbers.length - 1; i >= 0; i -= 1) {
    const num = allowlistedMeaningNumbers[i];
    if (num < currentNumber) return num;
  }
  return null;
}

export function getRecommendedAllowlistedMeaningNumbers(currentNumber: number, count = 6): number[] {
  const candidates = new Set<number>();

  const nearbyOffsets = [-10, -5, -2, -1, 1, 2, 5, 10];
  nearbyOffsets.forEach((offset) => {
    const candidate = currentNumber + offset;
    if (isAllowlistedMeaningNumber(candidate)) {
      candidates.add(candidate);
    }
  });

  const reversed = Number.parseInt(String(currentNumber).split('').reverse().join(''), 10);
  if (Number.isFinite(reversed) && isAllowlistedMeaningNumber(reversed) && reversed !== currentNumber) {
    candidates.add(reversed);
  }

  const popular = [111, 222, 333, 444, 555, 666, 777, 888, 999, 1111, 1212, 2222];
  popular.forEach((num) => {
    if (isAllowlistedMeaningNumber(num) && num !== currentNumber) {
      candidates.add(num);
    }
  });

  const sorted = Array.from(candidates)
    .sort((a, b) => Math.abs(a - currentNumber) - Math.abs(b - currentNumber) || a - b)
    .slice(0, count);

  if (sorted.length >= count) return sorted;

  for (const num of allowlistedMeaningNumbers) {
    if (num === currentNumber || candidates.has(num)) continue;
    sorted.push(num);
    if (sorted.length >= count) break;
  }

  return sorted.slice(0, count);
}
