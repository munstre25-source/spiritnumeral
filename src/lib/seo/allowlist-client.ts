import { normalizeCanonicalPath, parseCanonicalRoutePath } from './url-normalization';

const MIN_MEANING_NUMBER = 0;
const MAX_MEANING_NUMBER = 9999;

const STATIC_ALLOWLIST = new Set([
  '/',
  '/about',
  '/calculator',
  '/meaning',
  '/meaning/angel-number',
  '/meaning/life-path',
  '/compatibility',
  '/compare',
  '/quiz',
  '/quick-report',
  '/reviews',
  '/celebrity-numerology',
  '/name-numerology',
  '/personal-year',
  '/personal-month',
  '/personal-day',
  '/pinnacle',
  '/challenge',
  '/maturity-number',
  '/birthday-number',
  '/karmic-debt',
  '/house-number',
  '/karmic-lesson',
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
]);

const ONE_TO_NINE = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const CHALLENGE_NUMBERS = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
const NAME_NUMBERS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]);
const KARMIC_DEBT_NUMBERS = new Set([13, 14, 16, 19]);
const HOUSE_NUMBERS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]);

const LIFE_PATH_RE = /^\/meaning\/life-path\/life-path-(\d+)$/;
const PERSONAL_TIMING_RE = /^\/personal-(year|month|day)\/(\d+)$/;
const SIMPLE_ONE_TO_NINE_RE = /^\/(maturity-number|pinnacle|karmic-lesson)\/(\d+)$/;
const CHALLENGE_RE = /^\/challenge\/(\d+)$/;
const BIRTHDAY_RE = /^\/birthday-number\/(\d+)$/;
const KARMIC_DEBT_RE = /^\/karmic-debt\/(\d+)$/;
const HOUSE_NUMBER_RE = /^\/house-number\/(\d+)$/;
const NAME_NUMEROLOGY_RE = /^\/name-numerology\/(expression|soul-urge|personality)\/(\d+)$/;

function parsePathNumber(path: string, regex: RegExp): number | null {
  const match = path.match(regex);
  if (!match) return null;
  const segment = match[1] ?? match[2] ?? '';
  const value = Number.parseInt(segment, 10);
  return Number.isInteger(value) ? value : null;
}

function isValidMeaningNumber(number: number): boolean {
  return Number.isInteger(number) && number >= MIN_MEANING_NUMBER && number <= MAX_MEANING_NUMBER;
}

export function isAllowlistedPath(rawPath: string): boolean {
  const normalized = normalizeCanonicalPath(rawPath);
  if (!normalized) return false;

  if (STATIC_ALLOWLIST.has(normalized)) {
    return true;
  }

  const parsed = parseCanonicalRoutePath(normalized);
  if (parsed.isNumberRoute && typeof parsed.number === 'number') {
    return isValidMeaningNumber(parsed.number);
  }

  const lifePathNumber = parsePathNumber(normalized, LIFE_PATH_RE);
  if (lifePathNumber !== null) {
    return ONE_TO_NINE.has(lifePathNumber);
  }

  const personalTimingMatch = normalized.match(PERSONAL_TIMING_RE);
  if (personalTimingMatch) {
    const value = Number.parseInt(personalTimingMatch[2], 10);
    return ONE_TO_NINE.has(value);
  }

  const simpleOneToNineMatch = normalized.match(SIMPLE_ONE_TO_NINE_RE);
  if (simpleOneToNineMatch) {
    const value = Number.parseInt(simpleOneToNineMatch[2], 10);
    return ONE_TO_NINE.has(value);
  }

  const challengeNumber = parsePathNumber(normalized, CHALLENGE_RE);
  if (challengeNumber !== null) {
    return CHALLENGE_NUMBERS.has(challengeNumber);
  }

  const birthdayNumber = parsePathNumber(normalized, BIRTHDAY_RE);
  if (birthdayNumber !== null) {
    return birthdayNumber >= 1 && birthdayNumber <= 31;
  }

  const karmicDebtNumber = parsePathNumber(normalized, KARMIC_DEBT_RE);
  if (karmicDebtNumber !== null) {
    return KARMIC_DEBT_NUMBERS.has(karmicDebtNumber);
  }

  const houseNumber = parsePathNumber(normalized, HOUSE_NUMBER_RE);
  if (houseNumber !== null) {
    return HOUSE_NUMBERS.has(houseNumber);
  }

  const nameNumerologyMatch = normalized.match(NAME_NUMEROLOGY_RE);
  if (nameNumerologyMatch) {
    const value = Number.parseInt(nameNumerologyMatch[2], 10);
    return NAME_NUMBERS.has(value);
  }

  return false;
}

export function isAllowlistedMeaningNumber(number: number): boolean {
  return isValidMeaningNumber(number);
}

export function getNextAllowlistedMeaningNumber(currentNumber: number): number | null {
  if (!Number.isInteger(currentNumber)) return null;
  const next = currentNumber + 1;
  return isAllowlistedMeaningNumber(next) ? next : null;
}

export function getPreviousAllowlistedMeaningNumber(currentNumber: number): number | null {
  if (!Number.isInteger(currentNumber)) return null;
  const prev = currentNumber - 1;
  return isAllowlistedMeaningNumber(prev) ? prev : null;
}

export function getRecommendedAllowlistedMeaningNumbers(currentNumber: number, count = 6): number[] {
  const normalizedCount = Number.isInteger(count) && count > 0 ? count : 6;
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

  const selected = Array.from(candidates)
    .sort((a, b) => Math.abs(a - currentNumber) - Math.abs(b - currentNumber) || a - b)
    .slice(0, normalizedCount);

  if (selected.length >= normalizedCount) {
    return selected;
  }

  for (let radius = 1; radius <= MAX_MEANING_NUMBER && selected.length < normalizedCount; radius += 1) {
    const left = currentNumber - radius;
    if (isAllowlistedMeaningNumber(left) && !candidates.has(left) && left !== currentNumber) {
      selected.push(left);
      candidates.add(left);
      if (selected.length >= normalizedCount) break;
    }

    const right = currentNumber + radius;
    if (isAllowlistedMeaningNumber(right) && !candidates.has(right) && right !== currentNumber) {
      selected.push(right);
      candidates.add(right);
      if (selected.length >= normalizedCount) break;
    }
  }

  return selected.slice(0, normalizedCount);
}
