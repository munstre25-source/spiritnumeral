export const metadata = {
  title: 'Checkout Cancelled • Spirit Numeral',
  description: 'Your checkout was cancelled. You can try again anytime.',
};

export default function CancelledPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Checkout cancelled</h1>
        <p className="text-zinc-400 mb-8">
          No problem—your order wasn’t completed. You can return to your reading and try again anytime.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:border-amber-500/40 hover:text-amber-400 transition"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
