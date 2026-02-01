import Link from 'next/link';

const TESTIMONIALS = [
  {
    quote: 'The Quick Report gave me one number to focus on. No fluff — just what to do next. Exactly what I needed.',
    name: 'M.',
    context: 'Quick Number Report',
  },
  {
    quote: 'I did the quiz and got my full Blueprint. The focus and time horizon sections made it feel personal, not generic.',
    name: 'J.',
    context: 'Personal Blueprint',
  },
  {
    quote: 'Finally a numerology site that doesn’t overwhelm you. One number, one page, then you decide.',
    name: 'K.',
    context: 'Spirit Numeral',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 border-t border-default">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl font-semibold text-primary mb-6 text-center">What readers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className="bg-card border border-default rounded-2xl p-5 text-secondary text-sm leading-relaxed"
            >
              &ldquo;{t.quote}&rdquo;
              <footer className="mt-3 text-muted text-xs">
                — {t.name}
                {t.context && <span className="block mt-0.5">{t.context}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link href="/reviews" className="text-amber-600 hover:text-amber-500 text-sm font-medium">
            Read our full review →
          </Link>
        </p>
      </div>
    </section>
  );
}
