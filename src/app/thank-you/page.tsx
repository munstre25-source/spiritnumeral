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
        <a
          href="/order-status"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-amber-500/50 text-amber-600 hover:bg-amber-500/10 transition"
        >
          Check order status or resend
        </a>
      </div>
    </main>
  );
}
