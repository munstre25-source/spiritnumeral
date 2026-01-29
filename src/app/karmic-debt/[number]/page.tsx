import { notFound } from 'next/navigation';
import { getLifecycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

const NUMBERS = [13, 14, 16, 19];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function KarmicDebtNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getLifecycleMeaning('karmic_debt', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Karmic Debt ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How do I work with Karmic Debt ${num}?`,
      answer: data.advice,
    },
    {
      question: `How does Karmic Debt ${num} affect relationships?`,
      answer: data.love,
    },
    {
      question: `What about career with Karmic Debt ${num}?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Karmic Debt ${num} Meaning`}
      subtitle="Core lessons and patterns to balance."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/karmic-debt', label: 'Karmic Debt Overview' },
        { href: '/challenge', label: 'Challenge Numbers' },
        { href: '/pinnacle', label: 'Pinnacle Numbers' },
      ]}
      footer={<LifecyclePaidCTA type="karmic_debt" number={num} />}
    />
  );
}
