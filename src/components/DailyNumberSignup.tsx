'use client';

import { useState } from 'react';

type Props = { variant?: 'inline' | 'block'; compact?: boolean; className?: string };

export function DailyNumberSignup({ variant = 'block', compact = false, className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          source: 'daily_number',
          metadata: birthDate ? { birthDate: birthDate.slice(0, 10) } : undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed to subscribe');
      setStatus('success');
      setEmail('');
      setBirthDate('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded-2xl bg-green-500/10 border border-green-500/30 text-center p-6 ${className}`}>
        <p className="text-green-600 dark:text-green-400 font-semibold">✓ You’re in! Check your inbox for your free daily number.</p>
      </div>
    );
  }

  const isBlock = variant === 'block';
  return (
    <div className={`rounded-2xl bg-card border border-default p-6 md:p-8 ${className}`}>
      <h3 className="text-lg font-bold text-primary mb-1">Get your free daily number by email</h3>
      <p className="text-secondary text-sm mb-4">
        {isBlock
          ? 'Join thousands getting a personalized daily number and short insight—free, no spam.'
          : 'Free daily number and short insight in your inbox.'}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="w-full bg-page border border-default text-primary px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
        />
        {!compact && (
          <div>
            <label className="text-xs text-muted block mb-1">Birth date (optional — for a personalized daily number)</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-page border border-default text-primary px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
              aria-label="Birth date (optional)"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-amber-500 text-black rounded-xl font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending…' : 'Send me my daily number'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
