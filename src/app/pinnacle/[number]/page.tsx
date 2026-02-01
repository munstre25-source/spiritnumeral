import { notFound } from 'next/navigation';
import { getLifecycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { PsychicPromo } from '@/components/PsychicPromo';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function PinnacleNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getLifecycleMeaning('pinnacle', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Pinnacle ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How does Pinnacle ${num} affect relationships?`,
      answer: data.love,
    },
    {
      question: `What should I focus on during this pinnacle?`,
      answer: data.advice,
    },
    {
      question: `What about career during Pinnacle ${num}?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Pinnacle ${num} Meaning`}
      subtitle="Your long-term growth phase and what to build."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/pinnacle', label: 'Pinnacle Overview' },
        { href: '/challenge', label: 'Challenge Numbers' },
        { href: '/maturity-number', label: 'Maturity Numbers' },
      ]}
      footer={<PsychicPromo contextualLine="For clarity on your next step and timing, a short psychic reading can offer guidance." label="Psychic After Content" />}
    />
  );
}
