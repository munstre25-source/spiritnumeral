const fs = require('fs');
const path = require('path');

const NUMBER_ARCHETYPES = {
  1: { theme: 'leadership and initiative', strengths: ['self-starting', 'decisive', 'confident'], challenges: ['impatience', 'ego clashes', 'going it alone'] },
  2: { theme: 'harmony and partnership', strengths: ['empathetic', 'diplomatic', 'supportive'], challenges: ['over-sensitivity', 'indecision', 'people-pleasing'] },
  3: { theme: 'creativity and expression', strengths: ['optimistic', 'communicative', 'imaginative'], challenges: ['scattered focus', 'overpromising', 'avoidance of hard work'] },
  4: { theme: 'structure and stability', strengths: ['reliable', 'disciplined', 'methodical'], challenges: ['rigidity', 'stubbornness', 'workaholism'] },
  5: { theme: 'freedom and change', strengths: ['adaptable', 'curious', 'adventurous'], challenges: ['restlessness', 'impulsivity', 'inconsistency'] },
  6: { theme: 'care and responsibility', strengths: ['nurturing', 'loyal', 'service-oriented'], challenges: ['overgiving', 'control issues', 'self-neglect'] },
  7: { theme: 'introspection and wisdom', strengths: ['analytical', 'spiritual', 'perceptive'], challenges: ['isolation', 'skepticism', 'emotional distance'] },
  8: { theme: 'power and abundance', strengths: ['ambitious', 'strategic', 'resilient'], challenges: ['work-life imbalance', 'materialism', 'control struggles'] },
  9: { theme: 'compassion and completion', strengths: ['humanitarian', 'creative', 'forgiving'], challenges: ['martyrdom', 'difficulty letting go', 'emotional overwhelm'] },
  11: { theme: 'intuition and illumination', strengths: ['visionary', 'inspired', 'sensitive'], challenges: ['nervous tension', 'self-doubt', 'overwhelm'] },
  22: { theme: 'master builder and legacy', strengths: ['practical visionary', 'organized', 'influential'], challenges: ['pressure to perform', 'perfectionism', 'overextension'] },
  33: { theme: 'master teacher and compassion', strengths: ['healing presence', 'service-minded', 'uplifting'], challenges: ['burnout', 'boundary issues', 'idealism'] },
};

const NAME_TYPES = [
  { key: 'expression', label: 'Expression (Destiny) Number', angle: 'how your talents show in the world' },
  { key: 'soul_urge', label: "Soul Urge (Heart's Desire)", angle: 'what your inner self truly wants' },
  { key: 'personality', label: 'Personality Number', angle: 'the impression you give others' },
];

const TIMING_TYPES = [
  { key: 'personal_year', label: 'Personal Year', horizon: '12-month cycle' },
  { key: 'personal_month', label: 'Personal Month', horizon: '30-day focus' },
  { key: 'personal_day', label: 'Personal Day', horizon: '24-hour rhythm' },
];

const LIFECYCLE_TYPES = [
  { key: 'pinnacle', label: 'Pinnacle', angle: 'long-term growth themes' },
  { key: 'challenge', label: 'Challenge', angle: 'core lessons to master' },
  { key: 'maturity', label: 'Maturity', angle: 'later-life direction' },
  { key: 'birthday', label: 'Birthday', angle: 'the gift you bring' },
  { key: 'karmic_debt', label: 'Karmic Debt', angle: 'deep pattern to balance' },
];

function sentenceCase(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function joinList(items) {
  return items.join(', ');
}

function makeMeaning(label, number, theme, angle) {
  const opener = `${label} ${number} centers on ${theme}.`;
  const second = `It describes ${angle} and how you can align choices with this pattern.`;
  const third = `When you honor this number, you move faster with less friction and feel more grounded in your direction.`;
  return `${opener} ${second} ${third}`;
}

function makeLove(theme) {
  return `In love, this number leans into ${theme}. Build trust by naming needs clearly and choosing consistency over mixed signals.`;
}

function makeCareer(theme) {
  return `Career flow improves when your work reflects ${theme}. Choose roles where your natural pattern is an advantage, not a compromise.`;
}

function makeAdvice(number) {
  if (number === 11 || number === 22 || number === 33) {
    return 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.';
  }
  return 'Focus on one clear goal, track weekly progress, and adjust gently rather than forcing a big change overnight.';
}

function normalizeNumber(num) {
  let n = num;
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = n.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

function buildNameNumbers() {
  const rows = [];
  Object.keys(NUMBER_ARCHETYPES).forEach((key) => {
    const number = Number(key);
    const { theme, strengths, challenges } = NUMBER_ARCHETYPES[number];
    NAME_TYPES.forEach((type) => {
      rows.push({
        type: type.key,
        number,
        meaning: makeMeaning(type.label, number, theme, type.angle),
        strengths,
        challenges,
        love: makeLove(theme),
        career: makeCareer(theme),
        advice: makeAdvice(number),
      });
    });
  });
  return rows;
}

function buildTimingCycles() {
  const rows = [];
  for (let number = 1; number <= 9; number += 1) {
    const { theme, strengths, challenges } = NUMBER_ARCHETYPES[number];
    TIMING_TYPES.forEach((type) => {
      rows.push({
        type: type.key,
        number,
        meaning: `${type.label} ${number} highlights ${theme} in a ${type.horizon}. Use this window to set intentions, notice repeating signals, and commit to one aligned action.`,
        strengths,
        challenges,
        love: makeLove(theme),
        career: makeCareer(theme),
        advice: `Treat this ${type.horizon} as a focused experiment. Keep one promise to yourself each week.`,
      });
    });
  }
  return rows;
}

function buildLifecycleNumbers() {
  const rows = [];

  // Pinnacles 1-9
  for (let number = 1; number <= 9; number += 1) {
    const { theme, strengths, challenges } = NUMBER_ARCHETYPES[number];
    rows.push({
      type: 'pinnacle',
      number,
      meaning: `Pinnacle ${number} emphasizes ${theme} as your long-term growth theme. Expect repeated lessons that reward patience, skill-building, and consistent choices.`,
      strengths,
      challenges,
      love: makeLove(theme),
      career: makeCareer(theme),
      advice: 'Track milestones yearly and notice what keeps recurring. Those cycles are your path markers.',
    });
  }

  // Challenges 0-8
  const challengeThemes = {
    0: 'open-ended growth that tests many areas at once',
    1: 'assertion, self-trust, and healthy independence',
    2: 'cooperation, patience, and emotional balance',
    3: 'expression, confidence, and focus',
    4: 'discipline, structure, and steady effort',
    5: 'freedom with responsibility, change without chaos',
    6: 'boundaries, care, and accountability',
    7: 'faith, reflection, and trust in your inner wisdom',
    8: 'power, ambition, and ethical leadership',
  };

  Object.keys(challengeThemes).forEach((key) => {
    const number = Number(key);
    const theme = challengeThemes[number];
    rows.push({
      type: 'challenge',
      number,
      meaning: `Challenge ${number} focuses on ${theme}. This is a training ground for choices that build resilience and self-mastery over time.`,
      strengths: ['self-awareness', 'growth mindset', 'perseverance'],
      challenges: ['resistance to lessons', 'overcorrection', 'impatience'],
      love: 'Relationships improve when you name the lesson directly and ask for support instead of testing people.',
      career: 'Work grows when you commit to one skill and build consistency over intensity.',
      advice: 'Name the lesson in one sentence and revisit it weekly. Clarity reduces friction.',
    });
  });

  // Maturity 1-9
  for (let number = 1; number <= 9; number += 1) {
    const { theme, strengths, challenges } = NUMBER_ARCHETYPES[number];
    rows.push({
      type: 'maturity',
      number,
      meaning: `Maturity ${number} reflects how ${theme} becomes more visible later in life. This number often signals deeper purpose and clearer direction with age.`,
      strengths,
      challenges,
      love: makeLove(theme),
      career: makeCareer(theme),
      advice: 'Simplify commitments and focus on legacy. What you build now echoes forward.',
    });
  }

  // Birthday 1-31
  for (let number = 1; number <= 31; number += 1) {
    const base = normalizeNumber(number);
    const archetype = NUMBER_ARCHETYPES[base];
    const theme = archetype ? archetype.theme : 'practical insight and steady growth';
    rows.push({
      type: 'birthday',
      number,
      meaning: `Birthday ${number} carries the vibration of ${base}, emphasizing ${theme}. Your day adds a specific flavor to how you express that energy in daily life and relationships.`,
      strengths: archetype ? archetype.strengths : ['grounded', 'adaptable', 'observant'],
      challenges: archetype ? archetype.challenges : ['overthinking', 'hesitation', 'mixed priorities'],
      love: makeLove(theme),
      career: makeCareer(theme),
      advice: 'Use your birthday number as a small daily compass. One aligned action beats ten perfect plans.',
    });
  }

  // Karmic Debt 13/14/16/19
  const karmic = {
    13: 'discipline, patience, and building through consistent effort',
    14: 'freedom balanced by responsibility and truth',
    16: 'humility, heart growth, and deeper spiritual insight',
    19: 'independence tempered with service and integrity',
  };
  Object.keys(karmic).forEach((key) => {
    const number = Number(key);
    const theme = karmic[number];
    rows.push({
      type: 'karmic_debt',
      number,
      meaning: `Karmic Debt ${number} emphasizes ${theme}. It represents a repeating pattern that asks for conscious repair, humility, and wiser choices.`,
      strengths: ['self-honesty', 'resilience', 'inner accountability'],
      challenges: ['repeating old patterns', 'avoidance', 'self-judgment'],
      love: 'Relationships improve when you choose transparency and steady repair over quick fixes.',
      career: 'Work grows when you practice ethical leadership and stay consistent with your values.',
      advice: 'Choose one behavior to reform and track it daily. Small changes compound fast.',
    });
  });

  return rows;
}

function main() {
  const output = {
    name_numbers: buildNameNumbers(),
    timing_cycles: buildTimingCycles(),
    lifecycle_numbers: buildLifecycleNumbers(),
    generated_at: new Date().toISOString(),
  };

  const outDir = path.join(__dirname, '..', 'data', 'normalized');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'numerology_content.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`Wrote ${outPath}`);
}

main();
