import { notFound } from 'next/navigation';
import { getNameNumberMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { NamePaidCTA } from '@/components/NamePaidCTA';

const VALID_TYPES = new Set(['expression', 'soul-urge', 'personality']);
const TYPE_MAP: Record<string, 'expression' | 'soul_urge' | 'personality'> = {
  'expression': 'expression',
  'soul-urge': 'soul_urge',
  'personality': 'personality',
};

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

export async function generateStaticParams() {
  const params: { type: string; number: string }[] = [];
  ['expression', 'soul-urge', 'personality'].forEach((type) => {
    NUMBERS.forEach((num) => params.push({ type, number: String(num) }));
  });
  return params;
}

export default async function NameNumberPage({ params }: { params: Promise<{ type: string; number: string }> }) {
  const { type, number } = await params;
  if (!VALID_TYPES.has(type)) return notFound();
  const num = parseInt(number, 10);
  if (Number.isNaN(num)) return notFound();

  const data = await getNameNumberMeaning(TYPE_MAP[type], num);
  if (!data) return notFound();

  const title =
    type === 'expression'
      ? `Expression Number ${num} Meaning`
      : type === 'soul-urge'
        ? `Soul Urge Number ${num} Meaning`
        : `Personality Number ${num} Meaning`;

  const faqs = [
    {
      question: `What does ${title.replace(' Meaning', '')} mean?`,
      answer: data.meaning,
    },
    {
      question: `How does number ${num} affect relationships?`,
      answer: data.love,
    },
    {
      question: `What careers align with ${title.replace(' Meaning', '')}?`,
      answer: data.career,
    },
    {
      question: `What should I focus on with this number?`,
      answer: data.advice,
    },
  ];

  return (
    <NumerologyMeaning
      title={title}
      subtitle="Name numerology insight based on your letters and inner patterns."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/name-numerology', label: 'Name Numerology Calculator' },
        { href: `/name-numerology/expression/${num}`, label: `Expression ${num}` },
        { href: `/name-numerology/soul-urge/${num}`, label: `Soul Urge ${num}` },
        { href: `/name-numerology/personality/${num}`, label: `Personality ${num}` },
      ]}
      footer={<NamePaidCTA />}
    />
  );
}
