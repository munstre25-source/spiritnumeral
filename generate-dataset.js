// Script to generate all 90 triple-digit angel numbers (111-999)
const fs = require('fs');
const path = require('path');

// Base templates for generating unique content
const meaningTemplates = {
  repeating: {
    1: "New beginnings and manifestation. Your thoughts are manifesting rapidly.",
    2: "Balance, trust, and harmony. Everything is working out as it should.",
    3: "Creativity, growth, and divine protection. Your spirit guides are near.",
    4: "Protection, stability, and being on the right path. You are surrounded by angels.",
    5: "Significant change and transformation. Huge shifts are coming your way.",
    6: "Rebalance and focus on self-care. Shift your focus from material to spiritual.",
    7: "Spiritual awakening and divine luck. You are in perfect alignment.",
    8: "Abundance and karmic rewards. Financial and spiritual flow is increasing.",
    9: "Completion and release. A major chapter of your life is closing."
  },
  sequential: "Progressive growth and forward movement. Each step builds on the last.",
  mixed: "Combined energies creating unique opportunities for growth and transformation."
};

const colors = ["Gold", "Silver", "White", "Yellow", "Green", "Blue", "Indigo", "Violet", "Rose", "Turquoise", "Emerald", "Sapphire", "Amethyst", "Coral", "Lavender"];
const chakras = ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown", "All"];

function generateAngelNumber(num) {
  const digits = num.toString().split('').map(Number);
  const [a, b, c] = digits;
  
  // Determine if repeating, sequential, or mixed
  let meaning, luckyColor, chakra;
  
  if (a === b && b === c) {
    // Repeating digits (111, 222, etc.)
    meaning = meaningTemplates.repeating[a] || meaningTemplates.mixed;
    luckyColor = colors[a - 1] || colors[Math.floor(Math.random() * colors.length)];
    chakra = chakras[Math.min(a - 1, chakras.length - 1)] || "Crown";
  } else if (b === a + 1 && c === b + 1) {
    // Sequential (123, 234, etc.)
    meaning = meaningTemplates.sequential;
    luckyColor = colors[Math.floor(Math.random() * colors.length)];
    chakra = chakras[Math.floor(Math.random() * chakras.length)];
  } else {
    // Mixed pattern
    meaning = meaningTemplates.mixed;
    luckyColor = colors[Math.floor(Math.random() * colors.length)];
    chakra = chakras[Math.floor(Math.random() * chakras.length)];
  }
  
  // Generate unique variations
  const sum = a + b + c;
  const variations = {
    love: generateLoveContent(num, sum),
    career: generateCareerContent(num, sum),
    twin_flame: generateTwinFlameContent(num, sum),
    "2026_prediction": generate2026Prediction(num, sum),
    what_to_do: generateWhatToDo(num, sum),
    why_seeing: generateWhySeeing(num, sum),
    misconception: generateMisconception(num, sum)
  };
  
  return {
    number: num,
    meaning: meaning,
    love: variations.love,
    career: variations.career,
    twin_flame: variations.twin_flame,
    "2026_prediction": variations["2026_prediction"],
    lucky_color: luckyColor,
    chakra: chakra,
    what_to_do: variations.what_to_do,
    why_seeing: variations.why_seeing,
    misconception: variations.misconception
  };
}

function generateLoveContent(num, sum) {
  const templates = [
    `Your love life is entering a new phase. Trust the process and stay open to connection.`,
    `Relationships are deepening. Focus on authentic communication and emotional honesty.`,
    `A new romantic opportunity may be approaching. Keep your heart open and your intentions clear.`,
    `Your current relationship is evolving. Embrace the changes and grow together.`,
    `Love is manifesting in unexpected ways. Be receptive to new forms of connection.`
  ];
  return templates[sum % templates.length];
}

function generateCareerContent(num, sum) {
  const templates = [
    `New professional opportunities are emerging. Take calculated risks and trust your instincts.`,
    `Your career is entering a growth phase. Focus on building skills and expanding your network.`,
    `Collaboration will be key to your success. Seek partnerships and team-based projects.`,
    `A major career shift is approaching. Prepare for change and embrace new directions.`,
    `Your hard work is paying off. Stay focused and continue building your professional foundation.`
  ];
  return templates[sum % templates.length];
}

function generateTwinFlameContent(num, sum) {
  const templates = [
    `Your twin flame connection is strengthening. Trust the divine timing of your union.`,
    `Spiritual alignment with your twin flame is deepening. Focus on inner healing.`,
    `Your twin flame journey is entering a new phase. Embrace growth and transformation.`,
    `The bond with your twin flame is evolving. Communication and understanding are key.`,
    `Your twin flame relationship is being supported by the universe. Stay patient and trusting.`
  ];
  return templates[sum % templates.length];
}

function generate2026Prediction(num, sum) {
  const templates = [
    `2026 will bring significant growth and new opportunities in your spiritual journey.`,
    `This year marks a turning point in your personal development and life path.`,
    `2026 is a year of manifestation and bringing your dreams into reality.`,
    `Major changes and transformations await you in 2026. Embrace the journey.`,
    `2026 will be a year of deepening connections and spiritual awakening.`
  ];
  return templates[sum % templates.length];
}

function generateWhatToDo(num, sum) {
  const templates = [
    `Focus on positive thoughts and clear intentions. Your manifestations are accelerating.`,
    `Trust your intuition and take aligned action. The universe is supporting you.`,
    `Maintain balance in all areas of life. Harmony is key to your success.`,
    `Express yourself authentically and share your gifts with the world.`,
    `Continue building steadily. You're on the right path and making progress.`
  ];
  return templates[sum % templates.length];
}

function generateWhySeeing(num, sum) {
  const templates = [
    `Your angels are sending you a direct message about your current life path.`,
    `This number appears when you need guidance and confirmation from the spiritual realm.`,
    `The universe is responding to your thoughts and intentions. Pay attention.`,
    `Your angels are confirming that you're on the right track and supported.`,
    `This is a sign that major shifts are happening in your spiritual journey.`
  ];
  return templates[sum % templates.length];
}

function generateMisconception(num, sum) {
  const templates = [
    `This isn't just coincidence - it's a direct message from your angels.`,
    `This doesn't mean you should be passive - it means trust while taking action.`,
    `This isn't a warning - it's confirmation of protection and guidance.`,
    `This isn't about luck alone - it's about alignment creating opportunities.`,
    `This isn't about endings - it's about completing cycles to begin anew.`
  ];
  return templates[sum % templates.length];
}

// Generate all numbers from 111 to 999
const angelNumbers = [];
for (let i = 111; i <= 999; i++) {
  angelNumbers.push(generateAngelNumber(i));
}

// Keep the existing life paths
const lifePaths = [
  {
    "path": 1,
    "title": "The Leader",
    "traits": "Independent, innovative, and pioneering.",
    "love": "Needs space and independence. Attracts strong, admiring partners.",
    "career": "Natural entrepreneur or pioneer. Excels in leadership roles.",
    "challenge": "Stubbornness and potential isolation.",
    "2026_outlook": "A year for starting new solo ventures and taking full control of your destiny."
  },
  {
    "path": 2,
    "title": "The Diplomat",
    "traits": "Empathetic, harmonious, and cooperative.",
    "love": "Nurturing and supportive partner. Seeks deep emotional connection.",
    "career": "Excellent mediator, counselor, or diplomat. Thrives in partnerships.",
    "challenge": "Self-doubt and over-pleasing others.",
    "2026_outlook": "Focus on strengthening partnerships and resolving long-standing conflicts."
  },
  {
    "path": 3,
    "title": "The Creative",
    "traits": "Joyful, expressive, and imaginative.",
    "love": "Playful and social. Needs a partner who appreciates creativity.",
    "career": "Artist, communicator, or entertainer. Success through expression.",
    "challenge": "Distraction and tendency toward superficiality.",
    "2026_outlook": "A massive year for creative breakthroughs and public self-expression."
  },
  {
    "path": 4,
    "title": "The Builder",
    "traits": "Stable, disciplined, and practical.",
    "love": "Loyal and reliable. Builds relationships on a solid foundation.",
    "career": "Manager, builder, or organizer. Excels in structured environments.",
    "challenge": "Rigidity and workaholism.",
    "2026_outlook": "Year of financial consolidation and building a permanent home/base."
  },
  {
    "path": 5,
    "title": "The Adventurer",
    "traits": "Adaptable, free-spirited, and curious.",
    "love": "Exciting and passionate, but can be restless. Needs variety.",
    "career": "Traveler, marketer, or freelancer. Thrives in changing environments.",
    "challenge": "Commitment issues and impulsivity.",
    "2026_outlook": "High energy for travel, exploration, and radical lifestyle changes."
  },
  {
    "path": 6,
    "title": "The Nurturer",
    "traits": "Responsible, compassionate, and family-oriented.",
    "love": "Deeply devoted and protective. The 'parent' of the group.",
    "career": "Teacher, healer, or community leader. Success through service.",
    "challenge": "Lack of boundaries and over-giving.",
    "2026_outlook": "Focus on domestic harmony, community building, and healing others."
  },
  {
    "path": 7,
    "title": "The Seeker",
    "traits": "Intuitive, analytical, and spiritual.",
    "love": "Seeks deep, spiritual bonds. Can be private and reserved.",
    "career": "Researcher, philosopher, or spiritual teacher. Needs quiet focus.",
    "challenge": "Isolation and cynicism.",
    "2026_outlook": "A year of profound spiritual realizations and solitude for study."
  },
  {
    "path": 8,
    "title": "The Achiever",
    "traits": "Ambitious, powerful, and authoritative.",
    "love": "Attracted to power and success. Wants a 'power couple' dynamic.",
    "career": "CEO, investor, or entrepreneur. Focused on material success.",
    "challenge": "Ego and materialism.",
    "2026_outlook": "Massive financial expansion and assuming positions of high authority."
  },
  {
    "path": 9,
    "title": "The Humanitarian",
    "traits": "Wise, selfless, and compassionate.",
    "love": "Loves universally. Needs a partner who shares their ideals.",
    "career": "Activist, artist, or spiritual guide. Focused on global impact.",
    "challenge": "Difficulty letting go and feelings of martyrdom.",
    "2026_outlook": "Completing major humanitarian projects and preparing for a new life phase."
  }
];

const dataset = {
  angel_numbers: angelNumbers,
  life_paths: lifePaths,
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

// Write to file
const outputPath = path.join(__dirname, 'src', 'lib', 'data', 'spirituality-dataset.json');
fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));
console.log(`Generated ${angelNumbers.length} angel numbers and saved to ${outputPath}`);
