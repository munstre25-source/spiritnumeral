/** House number numerology: meanings for 1–9 and master numbers 11, 22, 33. */

export type HouseNumberEntry = {
  number: number;
  meaning: string;
  strengths: string[];
  challenges: string[];
  love: string;
  career: string;
  advice: string;
};

export const HOUSE_NUMBERS: HouseNumberEntry[] = [
  {
    number: 1,
    meaning: 'A house with the vibration of 1 supports independence, new beginnings, and leadership. It suits people who want to take charge of their space and life. The energy encourages initiative and self-reliance.',
    strengths: ['independence', 'fresh starts', 'leadership', 'clarity'],
    challenges: ['can feel isolating', 'need to avoid dominance in shared homes'],
    love: 'Relationships in a 1 house thrive when both partners respect independence and take turns leading. Good for singles ready to focus on self-growth.',
    career: 'Ideal for home offices, freelancers, and anyone who needs a space that supports initiative and solo focus.',
    advice: 'Keep the entrance clear and the main living area uncluttered so 1 energy can flow. Add one strong focal point (art or plant) to anchor the vibe.',
  },
  {
    number: 2,
    meaning: 'A 2 house emphasizes partnership, harmony, and cooperation. It supports diplomacy, patience, and balance. Well suited to couples, roommates, or anyone who values peace at home.',
    strengths: ['harmony', 'partnership', 'patience', 'diplomacy'],
    challenges: ['can tip toward indecision', 'need to avoid passive tension'],
    love: 'Natural fit for couples. The energy supports compromise and emotional safety. Good for those seeking or nurturing a committed relationship.',
    career: 'Works well for collaborative work from home, counseling, or any role that benefits from a calm, balanced environment.',
    advice: 'Use pairs in decor (two lamps, two cushions) to reinforce 2 energy. Keep communication open with anyone you share the space with.',
  },
  {
    number: 3,
    meaning: 'A 3 house brings creativity, expression, and joy. It supports socializing, art, and communication. Suits people who want their home to feel lively and welcoming.',
    strengths: ['creativity', 'expression', 'social energy', 'optimism'],
    challenges: ['can scatter focus', 'need boundaries with guests'],
    love: 'Great for hosting and for relationships that thrive on fun and communication. Can help shy people open up.',
    career: 'Ideal for creatives, writers, and anyone who works with expression or media. Good for client meetings at home.',
    advice: 'Add color and art. Keep one area dedicated to creativity or hobbies. Balance social spaces with a quiet corner for rest.',
  },
  {
    number: 4,
    meaning: 'A 4 house grounds stability, structure, and hard work. It supports routines, security, and long-term building. Suits people who want a dependable, organized home.',
    strengths: ['stability', 'structure', 'reliability', 'discipline'],
    challenges: ['can feel rigid', 'need to allow some flexibility'],
    love: 'Relationships here benefit from clear roles and consistency. Good for building a family or a long-term partnership.',
    career: 'Supports traditional work, real estate, and any role that benefits from order and persistence. Strong for home offices.',
    advice: 'Keep systems in place (storage, schedules). Maintain the physical structure of the home. Add softness so 4 doesn’t feel cold.',
  },
  {
    number: 5,
    meaning: 'A 5 house brings change, freedom, and variety. It supports adventure and adaptability. Suits people who travel, relocate, or want a home that doesn’t feel stuck.',
    strengths: ['freedom', 'adaptability', 'variety', 'adventure'],
    challenges: ['can feel restless', 'need to anchor occasionally'],
    love: 'Good for non-traditional setups and partners who value space and novelty. May see more comings and goings.',
    career: 'Fits remote work, travel-based jobs, and anyone who needs flexibility. Can feel distracting for highly routine work.',
    advice: 'Embrace change but create one stable zone (e.g. bedroom or desk) for grounding. Rotate decor to satisfy 5’s need for variety.',
  },
  {
    number: 6,
    meaning: 'A 6 house emphasizes family, responsibility, and nurturing. It supports caregiving, community, and harmony at home. Suits families and those who want a loving, responsible household.',
    strengths: ['nurturing', 'responsibility', 'family', 'harmony'],
    challenges: ['can lead to overgiving', 'need to set boundaries'],
    love: 'Classic family home. Supports marriage, children, and taking care of others. Strong for commitment and loyalty.',
    career: 'Good for care-related work, teaching, or running a family business from home. Can support healing and service roles.',
    advice: 'Prioritize the heart of the home (kitchen, living room). Balance giving with self-care so 6 doesn’t burn out.',
  },
  {
    number: 7,
    meaning: 'A 7 house supports introspection, spirituality, and wisdom. It suits people who want quiet, privacy, and a space for study or meditation.',
    strengths: ['introspection', 'wisdom', 'privacy', 'spiritual focus'],
    challenges: ['can feel isolating', 'need to stay connected to others'],
    love: 'Relationships here benefit from depth and mutual respect for solitude. Good for spiritual or intellectual partners.',
    career: 'Ideal for research, writing, and any work that requires focus and contemplation. Not ideal for constant hosting.',
    advice: 'Create a dedicated space for meditation, study, or rest. Limit clutter so 7 energy can breathe.',
  },
  {
    number: 8,
    meaning: 'An 8 house supports ambition, authority, and material success. It suits people who want their home to reflect achievement and to support business or leadership.',
    strengths: ['ambition', 'authority', 'abundance', 'manifestation'],
    challenges: ['can overemphasize status', 'need to balance with heart'],
    love: 'Partnerships here can be power couples. Ensure equality and shared goals so 8 doesn’t become controlling.',
    career: 'Strong for executives, entrepreneurs, and anyone who works from home in a leadership or high-stakes role.',
    advice: 'Keep the entrance and main room impressive but welcoming. Balance material success with gratitude and rest.',
  },
  {
    number: 9,
    meaning: 'A 9 house supports completion, compassion, and a broader view. It suits people who want a home that feels inclusive and aligned with service or humanitarian values.',
    strengths: ['compassion', 'completion', 'wisdom', 'inclusivity'],
    challenges: ['can scatter energy', 'need to finish projects'],
    love: 'Good for blended families and relationships that value growth and giving back. Can feel like a haven for others.',
    career: 'Fits healing, teaching, and nonprofit work. Supports endings and new cycles in your professional life.',
    advice: 'Use the space for gathering and giving. Create one area that represents completion (e.g. a gratitude or altar space).',
  },
  {
    number: 11,
    meaning: 'A house with master number 11 carries intuition and illumination. It supports vision, inspiration, and spiritual awareness. Suits those who want a home that feels charged with higher guidance.',
    strengths: ['intuition', 'inspiration', 'vision', 'spiritual awareness'],
    challenges: ['can feel intense', 'need grounding and rest'],
    love: 'Relationships here can feel fated or deeply spiritual. Good for twin flame or soul-level connections.',
    career: 'Ideal for intuitive, creative, or spiritual work. Supports innovation and channeled inspiration.',
    advice: 'Create a meditation or vision space. Ground with nature (plants, earth tones) so 11 doesn’t overwhelm.',
  },
  {
    number: 22,
    meaning: 'A 22 house embodies the master builder: large-scale vision with practical execution. It supports legacy, organization, and bringing big plans into form.',
    strengths: ['vision + practicality', 'legacy', 'organization', 'impact'],
    challenges: ['pressure to achieve', 'need to avoid burnout'],
    love: 'Partnerships here can build something lasting together. Good for shared projects and long-term goals.',
    career: 'Strong for building businesses, projects, or institutions from home. Supports leadership and large-scale thinking.',
    advice: 'Use the space for planning and executing. Balance ambition with rest and family so 22 stays sustainable.',
  },
  {
    number: 33,
    meaning: 'A 33 house carries master teacher and compassion energy. It supports healing, service, and uplifting others. Suits those who want a home that feels like a sanctuary for the heart.',
    strengths: ['compassion', 'healing', 'teaching', 'service'],
    challenges: ['boundary issues', 'need to receive as well as give'],
    love: 'Relationships here thrive on care and mutual support. Good for healing and family harmony.',
    career: 'Ideal for healing arts, teaching, counseling, and any role that uplifts others. Can support community work from home.',
    advice: 'Create spaces for gathering and healing. Set clear boundaries so 33 doesn’t lead to exhaustion.',
  },
];

export const HOUSE_NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

export function getHouseNumberMeaning(num: number): HouseNumberEntry | undefined {
  return HOUSE_NUMBERS.find((e) => e.number === num);
}
