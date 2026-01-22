export const metadata = {
  title: 'Terms of Service - Spirit Numeral',
  description: 'The terms and conditions for using Spirit Numeral services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-amber">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        
        <p className="text-zinc-400">Last updated: January 22, 2026</p>

        <section className="mt-8 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-semibold text-zinc-100">1. Acceptance of Terms</h2>
          <p>
            By accessing Spirit Numeral, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">2. Spiritual Guidance Disclaimer</h2>
          <p>
            The content on Spirit Numeral is for entertainment and spiritual growth purposes only. Numerology and angel number interpretations are subjective and should not replace professional medical, legal, or financial advice.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">3. Intellectual Property</h2>
          <p>
            All content, calculations, and designs on Spirit Numeral are the property of Spirit Numeral and are protected by copyright laws.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">4. Limitation of Liability</h2>
          <p>
            Spirit Numeral is not liable for any decisions made based on our readings. You are responsible for your own life choices and interpretations.
          </p>
        </section>
      </div>
    </main>
  );
}
