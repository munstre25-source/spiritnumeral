export const metadata = {
  title: 'Privacy Policy - Spirit Numeral',
  description: 'Learn how Spirit Numeral protects your data and privacy.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-amber">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <p className="text-zinc-400">Last updated: January 22, 2026</p>

        <section className="mt-8 space-y-6 text-zinc-300">
          <p>
            At Spirit Numeral, we value your privacy as much as your spiritual journey. This policy outlines how we collect, use, and safeguard your personal information.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as your name, birth date (for numerology calculations), and email address when you contact us or use our tools.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">2. How We Use Your Information</h2>
          <p>
            Your birth date is used solely to calculate your life path and personal numerology readings. We do not store this data unless you explicitly create an account or sign up for our newsletter.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">3. Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your data is never sold to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">4. Cookies</h2>
          <p>
            We use cookies to improve your experience on our site, analyze traffic, and remember your preferences.
          </p>
        </section>
      </div>
    </main>
  );
}
