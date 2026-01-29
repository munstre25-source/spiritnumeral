import { notFound } from 'next/navigation';
import { getLifecycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function ChallengeNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getLifecycleMeaning('challenge', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Challenge ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How do I work with Challenge ${num}?`,
      answer: data.advice,
    },
    {
      question: `How does Challenge ${num} affect relationships?`,
      answer: data.love,
    },
    {
      question: `What about career during this challenge?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Challenge ${num} Meaning`}
      subtitle="Core lessons and the path to mastery."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/challenge', label: 'Challenge Overview' },
        { href: '/pinnacle', label: 'Pinnacle Numbers' },
        { href: '/maturity-number', label: 'Maturity Numbers' },
      ]}
      footer={<LifecyclePaidCTA type="challenge" number={num} />}
    />
  );
}
