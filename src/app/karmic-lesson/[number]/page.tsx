import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKarmicLessonMeaning, KARMIC_LESSON_LIST } from '@/lib/data/karmic-lessons';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { PsychicPromo } from '@/components/PsychicPromo';
import { withIndexingPolicy } from '@/lib/seo/metadata';
import { isPathStaticAllowlisted } from '@/lib/seo/static-params';

export const dynamicParams = false;

export async function generateStaticParams() {
  return KARMIC_LESSON_LIST
    .filter((number) => isPathStaticAllowlisted(`/karmic-lesson/${number}`))
    .map((number) => ({ number: String(number) }));
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const num = parseInt(number, 10);
  const data = getKarmicLessonMeaning(num);
  if (!data) {
    return withIndexingPolicy(`/karmic-lesson/${number}`, { title: 'Karmic Lesson | Spirit Numeral' });
  }
  return withIndexingPolicy(`/karmic-lesson/${num}`, {
    title: `Karmic Lesson ${num} Meaning | What to Develop`,
    description: data.meaning.slice(0, 155),
  });
}

export default async function KarmicLessonNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  const data = getKarmicLessonMeaning(num);
  if (!data) return notFound();

  const faqs = [
    { question: `What does Karmic Lesson ${num} mean?`, answer: data.meaning },
    { question: `How do I develop Karmic Lesson ${num}?`, answer: data.advice },
    { question: `How does Karmic Lesson ${num} affect love?`, answer: data.love },
    { question: `What about career with Karmic Lesson ${num}?`, answer: data.career },
  ];

  return (
    <NumerologyMeaning
      title={`Karmic Lesson ${num} Meaning`}
      subtitle="What you're here to develop when this number is missing from your name."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/karmic-lesson', label: 'Karmic Lesson Overview' },
        { href: '/karmic-debt', label: 'Karmic Debt Numbers' },
        { href: '/name-numerology', label: 'Name Numerology' },
        { href: '/psychic-readings', label: 'Psychic Readings' },
      ]}
      footer={<PsychicPromo contextualLine="For clarity on your life path and next step, a short psychic reading can offer guidance." label="Psychic After Content" />}
    />
  );
}
