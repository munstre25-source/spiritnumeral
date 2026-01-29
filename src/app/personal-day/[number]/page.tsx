import { notFound } from 'next/navigation';
import { getTimingCycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { TimingPaidCTA } from '@/components/TimingPaidCTA';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function PersonalDayNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getTimingCycleMeaning('personal_day', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Personal Day ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How should I use Personal Day ${num}?`,
      answer: data.advice,
    },
    {
      question: `What should I focus on today in love?`,
      answer: data.love,
    },
    {
      question: `What about career today?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Personal Day ${num} Meaning`}
      subtitle="Today’s energy and how to use it."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      footer={<TimingPaidCTA />}
    />
  );
}
