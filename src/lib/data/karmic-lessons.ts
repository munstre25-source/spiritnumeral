/** Karmic lesson numbers 1–9: meanings for the numbers *missing* from your birth name (what you need to develop). */

export type KarmicLessonEntry = {
  number: number;
  meaning: string;
  strengths: string[];
  challenges: string[];
  love: string;
  career: string;
  advice: string;
};

export const KARMIC_LESSONS: KarmicLessonEntry[] = [
  {
    number: 1,
    meaning: 'Karmic Lesson 1 means the number 1 is missing from your birth name. You are here to develop independence, leadership, and initiative. You may have relied on others or avoided taking the lead; this lifetime asks you to step into your own authority and originality.',
    strengths: ['developing self-reliance', 'learning to lead', 'building confidence', 'originality'],
    challenges: ['tendency to follow', 'fear of standing out', 'need for external validation'],
    love: 'In relationships, you are learning to speak up and take initiative rather than always accommodating. Healthy partnerships will support your independence.',
    career: 'You are meant to develop leadership and self-employment or solo projects. Avoid staying in the background when you have ideas.',
    advice: 'Take one small step each week that requires you to lead or decide alone. Practice saying what you want clearly.',
  },
  {
    number: 2,
    meaning: 'Karmic Lesson 2 means the number 2 is missing from your birth name. You are here to develop cooperation, diplomacy, and patience. You may have been overly independent or confrontational; this lifetime asks you to learn partnership and balance.',
    strengths: ['developing teamwork', 'patience', 'diplomacy', 'listening'],
    challenges: ['impatience', 'difficulty with compromise', 'sensitivity to conflict'],
    love: 'You are learning to collaborate and share the spotlight. Relationships are a classroom for give-and-take and emotional attunement.',
    career: 'Partnerships and supportive roles help you grow. Avoid going it alone when collaboration would serve you.',
    advice: 'Practice pausing before reacting. Seek one partnership or team project where you focus on harmony.',
  },
  {
    number: 3,
    meaning: 'Karmic Lesson 3 means the number 3 is missing from your birth name. You are here to develop creativity, expression, and joy. You may have suppressed your voice or avoided play; this lifetime asks you to communicate openly and embrace creativity.',
    strengths: ['developing self-expression', 'creativity', 'optimism', 'social ease'],
    challenges: ['fear of judgment', 'holding back', 'taking life too seriously'],
    love: 'Relationships help you open up and express feelings. You are learning that your voice and joy matter.',
    career: 'Creative, communicative, or people-facing work supports your growth. Share your ideas and humor.',
    advice: 'Do one creative or expressive act weekly. Speak your truth in a safe relationship or group.',
  },
  {
    number: 4,
    meaning: 'Karmic Lesson 4 means the number 4 is missing from your birth name. You are here to develop discipline, structure, and reliability. You may have struggled with consistency or order; this lifetime asks you to build solid foundations and follow through.',
    strengths: ['developing discipline', 'organization', 'reliability', 'practicality'],
    challenges: ['scattered focus', 'avoiding routine', 'unfinished projects'],
    love: 'Stable, committed relationships teach you the value of consistency. You are learning to show up reliably.',
    career: 'Building systems, sticking to plans, and delivering on time are your growth areas. Structure supports your success.',
    advice: 'Choose one area of life to systematize (work, health, or home). Keep one small daily commitment.',
  },
  {
    number: 5,
    meaning: 'Karmic Lesson 5 means the number 5 is missing from your birth name. You are here to develop freedom, adaptability, and healthy change. You may have been rigid or fearful of change; this lifetime asks you to embrace variety and responsible freedom.',
    strengths: ['developing flexibility', 'adaptability', 'courage for change', 'variety'],
    challenges: ['resistance to change', 'fear of the unknown', 'overcontrol'],
    love: 'Relationships that allow growth and change help you. You are learning to let go of the need to control outcomes.',
    career: 'Roles that involve variety, travel, or adaptation support your lesson. Avoid staying in a rut out of fear.',
    advice: 'Introduce one small change per week. Say yes to one opportunity that stretches your comfort zone.',
  },
  {
    number: 6,
    meaning: 'Karmic Lesson 6 means the number 6 is missing from your birth name. You are here to develop responsibility, nurturing, and harmony in relationships and home. You may have avoided commitment or caregiving; this lifetime asks you to step into service and balance.',
    strengths: ['developing responsibility', 'nurturing', 'harmony', 'commitment'],
    challenges: ['avoiding obligation', 'fear of being needed', 'imbalance in giving'],
    love: 'Commitment and family life are your teachers. You are learning to give and receive care without losing yourself.',
    career: 'Care-related, teaching, or community roles support your growth. Balance duty with self-care.',
    advice: 'Take on one clear responsibility (person, project, or home) and show up consistently. Practice receiving help.',
  },
  {
    number: 7,
    meaning: 'Karmic Lesson 7 means the number 7 is missing from your birth name. You are here to develop introspection, wisdom, and trust in the unseen. You may have avoided solitude or depth; this lifetime asks you to seek truth and spiritual understanding.',
    strengths: ['developing intuition', 'analysis', 'spiritual depth', 'trust'],
    challenges: ['surface living', 'fear of silence', 'skepticism of the unseen'],
    love: 'Relationships that allow depth and privacy help you. You are learning to value inner life and truth.',
    career: 'Research, spiritual work, or anything requiring focus and depth supports your lesson. Make time for reflection.',
    advice: 'Spend regular time alone in reflection or study. Explore one spiritual or philosophical path.',
  },
  {
    number: 8,
    meaning: 'Karmic Lesson 8 means the number 8 is missing from your birth name. You are here to develop authority, material mastery, and the wise use of power. You may have avoided ambition or mishandled power; this lifetime asks you to step into leadership and abundance consciously.',
    strengths: ['developing authority', 'manifestation', 'executive ability', 'abundance'],
    challenges: ['fear of power', 'money blocks', 'avoiding leadership'],
    love: 'Partnerships that support mutual success and equality help you. You are learning that power can be shared.',
    career: 'Leadership, business, and material success are your classrooms. Use power and resources with integrity.',
    advice: 'Take one step toward a material or leadership goal. Practice wielding influence fairly and openly.',
  },
  {
    number: 9,
    meaning: 'Karmic Lesson 9 means the number 9 is missing from your birth name. You are here to develop compassion, completion, and a broader view. You may have struggled with letting go or seeing the big picture; this lifetime asks you to embrace endings and service.',
    strengths: ['developing compassion', 'completion', 'wisdom', 'universal view'],
    challenges: ['holding on', 'narrow focus', 'avoiding endings'],
    love: 'Relationships that teach release and unconditional care support you. You are learning to love without clinging.',
    career: 'Service, healing, or work that benefits the whole supports your growth. Complete cycles and let go when it’s time.',
    advice: 'Complete one unfinished cycle (project, relationship, or habit). Practice forgiving and releasing.',
  },
];

export const KARMIC_LESSON_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function getKarmicLessonMeaning(num: number): KarmicLessonEntry | undefined {
  return KARMIC_LESSONS.find((e) => e.number === num);
}
