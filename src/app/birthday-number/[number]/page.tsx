import { notFound } from 'next/navigation';
import { getLifecycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

const NUMBERS = Array.from({ length: 31 }, (_, i) => i + 1);

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function BirthdayNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getLifecycleMeaning('birthday', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Birthday Number ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How does Birthday ${num} affect love?`,
      answer: data.love,
    },
    {
      question: `What should I focus on with Birthday ${num}?`,
      answer: data.advice,
    },
    {
      question: `What about career with Birthday ${num}?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Birthday Number ${num} Meaning`}
      subtitle="Your natural gifts and how you express them."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      footer={<LifecyclePaidCTA type="birthday" number={num} />}
    />
  );
}
