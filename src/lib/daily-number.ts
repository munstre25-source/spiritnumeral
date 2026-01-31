/**
 * Shared logic for daily number emails and homepage widgets.
 * Used by cron job and EngagementFeatures / PersonalNumberToday.
 */

export function getDailyAngelNumber(): number {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const hash = (seed * 9301 + 49297) % 233280;
  return Math.floor((hash / 233280) * 2223); // 0–2222
}

export function getDateString(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function reduceNumber(value: number): number {
  let sum = value;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + Number(digit), 0);
  }
  return sum;
}

function sumDigits(value: number): number {
  return value
    .toString()
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);
}

/**
 * Compute personal day number for today given a birth date string (YYYY-MM-DD).
 */
export function getPersonalDayFromBirthDate(birthDateStr: string): number | null {
  if (!birthDateStr || birthDateStr.length < 10) return null;
  const birth = new Date(birthDateStr.slice(0, 10));
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  const month = birth.getMonth() + 1;
  const day = birth.getDate();
  const year = today.getFullYear();
  const personalYear = reduceNumber(
    sumDigits(month) + sumDigits(day) + sumDigits(year)
  );
  const personalMonth = reduceNumber(
    personalYear + sumDigits(today.getMonth() + 1)
  );
  return reduceNumber(personalMonth + sumDigits(today.getDate()));
}
