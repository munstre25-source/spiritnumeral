'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { resolveExitOfferFromPath, resolveOfferFromPath } from '@/lib/offers';
import { trackEvent } from '@/lib/analytics/client';

// Email capture popup that appears after scroll or before exit
export function EmailCapture() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const pathname = usePathname();
    const offer = resolveExitOfferFromPath(pathname || '/') || resolveOfferFromPath(pathname || '/');

    const recentlyShown = () => {
        const last = localStorage.getItem('promoLastShown');
        if (!last) return false;
        const diffDays = (Date.now() - Number(last)) / (1000 * 60 * 60 * 24);
        return diffDays < 7;
    };

    const markShown = () => {
        sessionStorage.setItem('emailPopupShown', 'true');
        localStorage.setItem('promoLastShown', Date.now().toString());
    };

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem('emailPopupShown');
        if (shown) {
            setHasShown(true);
            return;
        }
        // Respect 7-day cooldown
        if (typeof window !== 'undefined' && recentlyShown()) {
            setHasShown(true);
            return;
        }

        // Show after 60% scroll
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 60 && !hasShown) {
                setIsOpen(true);
                setHasShown(true);
                markShown();
            }
        };

        // Exit intent detection (desktop only)
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsOpen(true);
                setHasShown(true);
                markShown();
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasShown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="relative max-w-md w-full bg-card rounded-3xl p-8 border border-default shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* Close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-muted hover:text-secondary transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                    </svg>
                </div>

                {/* Content */}
                <div className="text-center">
                    {offer.badge && (
                        <div className="inline-flex items-center px-3 py-1 text-[11px] uppercase tracking-[0.2em] rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/30 mb-3">
                            {offer.badge}
                        </div>
                    )}
                    <h3 className="text-2xl font-bold text-primary mb-2">
                        {offer.title}
                    </h3>
                    <p className="text-secondary mb-6">
                        {offer.body}
                    </p>
                </div>

                {/* CTA */}
                <Link
                    href={offer.href}
                    onClick={() => trackEvent('cta_click', { product: offer.product || 'unknown', path: pathname, metadata: { label: offer.cta } })}
                    className="w-full block text-center bg-amber-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors"
                >
                    {offer.cta}
                </Link>

                {/* Trust signals */}
                <p className="text-muted text-xs text-center mt-4">
                    One-time purchase · Instant PDF · No login
                </p>
            </div>
        </div>
    );
}

// Inline newsletter signup for footer/pages
export function NewsletterSignup({ className = '' }: { className?: string }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'footer' })
            });

            if (!res.ok) throw new Error('Failed to subscribe');

            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={`p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-center ${className}`}>
                <p className="text-green-400 font-semibold">✓ You're subscribed!</p>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-2xl bg-card border border-default ${className}`}>
            <h4 className="text-lg font-bold text-primary mb-2">Stay Connected</h4>
            <p className="text-secondary text-sm mb-4">
                Weekly angel number insights & spiritual guidance.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email..."
                    required
                    className="flex-1 bg-elevated border border-default text-primary px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-amber-500 text-black rounded-xl font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                    {status === 'loading' ? '...' : 'Join'}
                </button>
            </form>
            {status === 'error' && (
                <p className="text-red-400 text-xs mt-2">Failed to subscribe. Try again.</p>
            )}
        </div>
    );
}
