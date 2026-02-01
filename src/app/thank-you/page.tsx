import Link from 'next/link';

export const metadata = {
  title: 'Thank You • Spirit Numeral',
  description: 'Your order is confirmed. Your personalized PDF will arrive shortly.',
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-page text-primary">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Thank you for your order</h1>
        <p className="text-secondary mb-8">
          Your personalized PDF is being prepared and sent to your email. Most reports arrive within a few minutes.
        </p>
        <Link
          href="/order-status"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-amber-500/50 text-amber-600 hover:bg-amber-500/10 transition"
        >
          Check order status or resend
        </Link>
        <div className="mt-12 p-6 rounded-2xl bg-card border border-default text-left max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-primary mb-2">Want the full picture?</h2>
          <p className="text-secondary text-sm mb-4">
            Get your complete Personal Blueprint — focus, feeling, action plan, and name numerology — for $17.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition"
          >
            Get full Blueprint — $17 →
          </Link>
        </div>
      </div>
    </main>
  );
}
