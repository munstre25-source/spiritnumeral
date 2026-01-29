import { notFound } from 'next/navigation';
import { getLifecycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function MaturityNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getLifecycleMeaning('maturity', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Maturity Number ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How does Maturity ${num} affect relationships?`,
      answer: data.love,
    },
    {
      question: `What should I focus on with this maturity number?`,
      answer: data.advice,
    },
    {
      question: `What about career with Maturity ${num}?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Maturity Number ${num} Meaning`}
      subtitle="Your later-life direction and purpose."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/maturity-number', label: 'Maturity Overview' },
        { href: '/pinnacle', label: 'Pinnacle Numbers' },
        { href: '/birthday-number', label: 'Birthday Numbers' },
      ]}
      footer={
        <>
          <LifecyclePaidCTA type="maturity" number={num} />
          <AffiliatePromo offer={OFFERS.affiliate_numerologist} context="Prosperity VSL" />
        </>
      }
    />
  );
}
