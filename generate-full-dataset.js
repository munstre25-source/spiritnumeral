// Generate complete angel numbers dataset (111-999)
const fs = require('fs');
const path = require('path');

console.log('Starting dataset generation...');

const colors = ["Gold", "Silver", "White", "Yellow", "Green", "Blue", "Indigo", "Violet", "Rose", "Turquoise", "Emerald", "Sapphire", "Amethyst", "Coral", "Lavender", "Pearl", "Ruby", "Copper", "Bronze", "Platinum"];
const chakras = ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown", "All"];

const meaningBase = [
  "New beginnings and manifestation",
  "Balance and harmony",
  "Creative expression and growth", 
  "Stability and foundation",
  "Change and transformation",
  "Nurturing and care",
  "Spiritual awakening",
  "Abundance and success",
  "Completion and wisdom"
];

const loveBase = [
  "New romantic opportunities are emerging",
  "Relationships are deepening and stabilizing",
  "Creative passion is flowing in your love life",
  "Building lasting bonds through commitment",
  "Exciting changes in your relationship dynamics",
  "Nurturing and caring for your partnerships",
  "Spiritual connection with your soulmate",
  "Abundant love and deep commitment",
  "Completing cycles to welcome new love"
];

const careerBase = [
  "New professional opportunities are arriving",
  "Collaborative success through teamwork",
  "Creative projects bringing recognition",
  "Building solid career foundations",
  "Major career transitions and growth",
  "Service-oriented success and fulfillment",
  "Spiritual alignment with your purpose",
  "Financial abundance and career advancement",
  "Completing projects and starting new chapters"
];

function generateContent(num, templates) {
  const digits = num.toString().split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  const index = sum % templates.length;
  return templates[index];
}

function generateAngelNumber(num) {
  const digits = num.toString().split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  
  return {
    number: num,
    meaning: generateContent(num, meaningBase),
    love: generateContent(num, loveBase),
    career: generateContent(num, careerBase),
    twin_flame: `Your twin flame connection is ${['strengthening', 'evolving', 'deepening', 'aligning', 'transforming'][sum % 5]} through divine timing`,
    "2026_prediction": `2026 brings ${['new beginnings', 'harmonious growth', 'creative expansion', 'solid foundations', 'transformative change', 'nurturing opportunities', 'spiritual awakening', 'abundant blessings', 'completion and renewal'][sum % 9]} to your journey`,
    lucky_color: colors[sum % colors.length],
    chakra: chakras[sum % chakras.length],
    what_to_do: `Focus on ${['manifestation', 'balance', 'creativity', 'stability', 'adaptation', 'self-care', 'spiritual practice', 'abundance mindset', 'letting go'][sum % 9]} and trust the process`,
    why_seeing: `You're seeing ${num} because your angels are ${['guiding your path', 'confirming your choices', 'supporting your growth', 'protecting your journey', 'celebrating your progress'][sum % 5]}`,
    misconception: `This isn't ${['coincidence', 'a warning', 'random', 'meaningless', 'something to fear'][sum % 5]} - it's divine guidance from your angels`
  };
}

console.log('Generating 889 angel numbers...');
const angelNumbers = [];
for (let i = 111; i <= 999; i++) {
  angelNumbers.push(generateAngelNumber(i));
  if (i % 100 === 0) console.log(`Generated ${i - 110} numbers...`);
}

console.log(`Total angel numbers generated: ${angelNumbers.length}`);

const dataset = {
  angel_numbers: angelNumbers,
  life_paths: [
    {
      path: 1,
      title: "The Leader",
      traits: "Independent, innovative, and pioneering.",
      love: "Needs space and independence. Attracts strong, admiring partners.",
      career: "Natural entrepreneur or pioneer. Excels in leadership roles.",
      challenge: "Stubbornness and potential isolation.",
      "2026_outlook": "A year for starting new solo ventures and taking full control of your destiny."
    },
    {
      path: 2,
      title: "The Diplomat",
      traits: "Empathetic, harmonious, and cooperative.",
      love: "Nurturing and supportive partner. Seeks deep emotional connection.",
      career: "Excellent mediator, counselor, or diplomat. Thrives in partnerships.",
      challenge: "Self-doubt and over-pleasing others.",
      "2026_outlook": "Focus on strengthening partnerships and resolving long-standing conflicts."
    },
    {
      path: 3,
      title: "The Creative",
      traits: "Joyful, expressive, and imaginative.",
      love: "Playful and social. Needs a partner who appreciates creativity.",
      career: "Artist, communicator, or entertainer. Success through expression.",
      challenge: "Distraction and tendency toward superficiality.",
      "2026_outlook": "A massive year for creative breakthroughs and public self-expression."
    },
    {
      path: 4,
      title: "The Builder",
      traits: "Stable, disciplined, and practical.",
      love: "Loyal and reliable. Builds relationships on a solid foundation.",
      career: "Manager, builder, or organizer. Excels in structured environments.",
      challenge: "Rigidity and workaholism.",
      "2026_outlook": "Year of financial consolidation and building a permanent home/base."
    },
    {
      path: 5,
      title: "The Adventurer",
      traits: "Adaptable, free-spirited, and curious.",
      love: "Exciting and passionate, but can be restless. Needs variety.",
      career: "Traveler, marketer, or freelancer. Thrives in changing environments.",
      challenge: "Commitment issues and impulsivity.",
      "2026_outlook": "High energy for travel, exploration, and radical lifestyle changes."
    },
    {
      path: 6,
      title: "The Nurturer",
      traits: "Responsible, compassionate, and family-oriented.",
      love: "Deeply devoted and protective. The 'parent' of the group.",
      career: "Teacher, healer, or community leader. Success through service.",
      challenge: "Lack of boundaries and over-giving.",
      "2026_outlook": "Focus on domestic harmony, community building, and healing others."
    },
    {
      path: 7,
      title: "The Seeker",
      traits: "Intuitive, analytical, and spiritual.",
      love: "Seeks deep, spiritual bonds. Can be private and reserved.",
      career: "Researcher, philosopher, or spiritual teacher. Needs quiet focus.",
      challenge: "Isolation and cynicism.",
      "2026_outlook": "A year of profound spiritual realizations and solitude for study."
    },
    {
      path: 8,
      title: "The Achiever",
      traits: "Ambitious, powerful, and authoritative.",
      love: "Attracted to power and success. Wants a 'power couple' dynamic.",
      career: "CEO, investor, or entrepreneur. Focused on material success.",
      challenge: "Ego and materialism.",
      "2026_outlook": "Massive financial expansion and assuming positions of high authority."
    },
    {
      path: 9,
      title: "The Humanitarian",
      traits: "Wise, selfless, and compassionate.",
      love: "Loves universally. Needs a partner who shares their ideals.",
      career: "Activist, artist, or spiritual guide. Focused on global impact.",
      challenge: "Difficulty letting go and feelings of martyrdom.",
      "2026_outlook": "Completing major humanitarian projects and preparing for a new life phase."
    }
  ],
  pSEO_modifiers: [
    "meaning",
    "love",
    "career",
    "twin-flame",
    "2026",
    "birth-month",
    "zodiac",
    "compatibility",
    "spirit-guides"
  ]
};

const outputPath = path.join(__dirname, 'src', 'lib', 'data', 'spirituality-dataset.json');
fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));
console.log(`✓ Successfully generated dataset with ${angelNumbers.length} angel numbers`);
console.log(`✓ Saved to: ${outputPath}`);
console.log(`\nTotal pages that will be generated:`);
console.log(`  - Angel number pages: ${angelNumbers.length} x 4 patterns = ${angelNumbers.length * 4}`);
console.log(`  - Life path pages: 9`);
console.log(`  - Total: ${(angelNumbers.length * 4) + 9} pages`);
