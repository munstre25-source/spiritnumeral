import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHouseNumberMeaning, HOUSE_NUMBER_LIST } from '@/lib/data/house-numbers';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { PsychicPromo } from '@/components/PsychicPromo';
import { withIndexingPolicy } from '@/lib/seo/metadata';
import { isPathStaticAllowlisted } from '@/lib/seo/static-params';

export const dynamicParams = false;

export async function generateStaticParams() {
  return HOUSE_NUMBER_LIST
    .filter((number) => isPathStaticAllowlisted(`/house-number/${number}`))
    .map((number) => ({ number: String(number) }));
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const num = parseInt(number, 10);
  const data = getHouseNumberMeaning(num);
  if (!data) {
    return withIndexingPolicy(`/house-number/${number}`, { title: 'House Number | Spirit Numeral' });
  }
  return withIndexingPolicy(`/house-number/${num}`, {
    title: `House Number ${num} Meaning | Numerology`,
    description: data.meaning.slice(0, 155),
  });
}

export default async function HouseNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  const data = getHouseNumberMeaning(num);
  if (!data) return notFound();

  const faqs = [
    { question: `What does house number ${num} mean?`, answer: data.meaning },
    { question: `How does house ${num} affect relationships?`, answer: data.love },
    { question: `What about career in a ${num} house?`, answer: data.career },
    { question: `How do I work with house number ${num}?`, answer: data.advice },
  ];

  return (
    <NumerologyMeaning
      title={`House Number ${num} Meaning`}
      subtitle="Your home's vibration and what it supports."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/house-number', label: 'House Number Overview' },
        { href: '/name-numerology', label: 'Name Numerology' },
        { href: '/meaning/life-path', label: 'Life Path' },
        { href: '/psychic-readings', label: 'Psychic Readings' },
      ]}
      footer={<PsychicPromo contextualLine="For clarity on your home, timing, or next step, a short psychic reading can offer guidance." label="Psychic After Content" />}
    />
  );
}
