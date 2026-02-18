'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    getNextAllowlistedMeaningNumber,
    getPreviousAllowlistedMeaningNumber,
    getRecommendedAllowlistedMeaningNumbers,
    isAllowlistedPath,
} from '@/lib/seo/allowlist-client';

// Reading Progress Bar - shows scroll progress on content pages
export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(progress);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 bg-card z-[100]">
            <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

// Scroll to Top Button
export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-amber-500 text-black rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center hover:bg-amber-400 transition-all hover:scale-110 z-50"
            aria-label="Scroll to top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    );
}

// Quick Actions Bar for Angel Number pages
export function QuickActions({
    number,
    showNavigation = true
}: {
    number: number;
    showNavigation?: boolean;
}) {
    const [copied, setCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const stored = localStorage.getItem('savedAngelNumbers');
        if (stored) {
            const saved = JSON.parse(stored);
            setIsSaved(saved.includes(number));
        }
    }, [number]);

    const toggleSave = () => {
        const stored = localStorage.getItem('savedAngelNumbers');
        let saved: number[] = stored ? JSON.parse(stored) : [];

        if (isSaved) {
            saved = saved.filter(n => n !== number);
        } else {
            saved = [...saved, number].slice(-20); // Keep last 20
        }

        localStorage.setItem('savedAngelNumbers', JSON.stringify(saved));
        setIsSaved(!isSaved);
    };

    const shareUrl = typeof window !== 'undefined'
        ? window.location.href
        : `https://spiritnumeral.com${pathname}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Angel Number ${number} Meaning`,
                    text: `Discover the spiritual meaning of angel number ${number}`,
                    url: shareUrl,
                });
            } catch {
                handleCopy();
            }
        } else {
            handleCopy();
        }
    };

    const prevNumber = getPreviousAllowlistedMeaningNumber(number);
    const nextNumber = getNextAllowlistedMeaningNumber(number);

    return (
        <div className="flex items-center justify-between py-4 border-y border-default">
            {/* Previous/Next Navigation */}
            {showNavigation && (
                <div className="flex items-center gap-2">
                    {prevNumber !== null ? (
                        <Link
                            href={`/meaning/angel-number/${prevNumber}`}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-card border border-default text-secondary hover:text-amber-600 hover:border-amber-500/50 transition-all text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            <span>{prevNumber}</span>
                        </Link>
                    ) : (
                        <div className="w-16" />
                    )}

                    {nextNumber !== null && (
                        <Link
                            href={`/meaning/angel-number/${nextNumber}`}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-card border border-default text-secondary hover:text-amber-600 hover:border-amber-500/50 transition-all text-sm"
                        >
                            <span>{nextNumber}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                    )}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                {/* Save Button */}
                <button
                    onClick={toggleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${isSaved
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-600'
                            : 'bg-card border-default text-secondary hover:text-amber-600 hover:border-amber-500/50'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-default text-secondary hover:text-amber-600 hover:border-amber-500/50 transition-all text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                    </svg>
                    <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
            </div>
        </div>
    );
}

// Breadcrumbs Component
export function Breadcrumbs({
    items
}: {
    items: { label: string; href?: string }[]
}) {
    return (
        <nav className="flex items-center gap-2 text-sm text-muted mb-6 overflow-x-auto pb-2">
            <Link href="/" className="hover:text-amber-600 transition-colors whitespace-nowrap">
                Home
            </Link>
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    {item.href ? (
                        <Link href={item.href} className="hover:text-amber-600 transition-colors whitespace-nowrap">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-secondary whitespace-nowrap">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}

// "Numbers You Might Like" Recommendations
export function RecommendedNumbers({
    currentNumber,
    category = 'meaning'
}: {
    currentNumber: number;
    category?: string;
}) {
    const recommendations = getRecommendedAllowlistedMeaningNumbers(currentNumber, 6);
    const basePath = category === 'meaning' ? '/meaning/angel-number' : `/${category}`;
    const allowlistedRecommendations = recommendations.filter((num) => isAllowlistedPath(`${basePath}/${num}`));

    if (allowlistedRecommendations.length === 0) {
        return null;
    }

    return (
        <section className="py-8 border-t border-default">
            <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Numbers You Might Like
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {allowlistedRecommendations.map((num) => (
                    <Link
                        key={num}
                        href={`${basePath}/${num}`}
                        className="p-4 rounded-xl bg-card border border-default hover:border-amber-500/50 transition-all text-center group"
                    >
                        <div className="text-xl font-bold text-primary group-hover:text-amber-500 transition-colors">
                            {num}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">
                            Angel #
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

// Mobile Bottom Navigation
export function MobileBottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isActive = (path: string) => pathname.startsWith(path);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const num = parseInt(searchQuery, 10);
        if (!isNaN(num) && num >= 0 && num <= 2222) {
            router.push(`/meaning/angel-number/${num}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Search Modal */}
            {searchOpen && (
                <div className="fixed inset-0 bg-page/95 z-50 flex items-start justify-center pt-20 px-6 md:hidden">
                    <div className="w-full max-w-lg">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Enter angel number (0-2222)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value.replace(/[^0-9]/g, ''))}
                                className="w-full bg-card border-2 border-default text-primary px-6 py-5 rounded-2xl text-xl focus:outline-none focus:border-amber-500"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </form>
                        <div className="mt-6 flex flex-wrap gap-2 justify-center">
                            {[111, 222, 333, 444, 777, 888, 1111].map(num => (
                                <button
                                    key={num}
                                    onClick={() => {
                                        router.push(`/meaning/angel-number/${num}`);
                                        setSearchOpen(false);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-card border border-default text-secondary"
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-page/95 backdrop-blur-lg border-t border-default py-2 px-4 z-40 md:hidden">
                <div className="flex items-center justify-around">
                    <Link
                        href="/"
                        className={`flex flex-col items-center gap-1 p-2 ${pathname === '/' ? 'text-amber-500' : 'text-muted'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>

                    <Link
                        href="/meaning/angel-number"
                        className={`flex flex-col items-center gap-1 p-2 ${isActive('/meaning/angel-number') ? 'text-amber-500' : 'text-muted'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                        </svg>
                        <span className="text-[10px] font-medium">Numbers</span>
                    </Link>

                    <button
                        onClick={() => setSearchOpen(true)}
                        className="flex flex-col items-center gap-1 p-2 -mt-6"
                    >
                        <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                    </button>

                    <Link
                        href="/calculator"
                        className={`flex flex-col items-center gap-1 p-2 ${pathname === '/calculator' ? 'text-amber-500' : 'text-muted'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />
                        </svg>
                        <span className="text-[10px] font-medium">Calculate</span>
                    </Link>

                    <Link
                        href="/about"
                        className={`flex flex-col items-center gap-1 p-2 ${pathname === '/about' ? 'text-amber-500' : 'text-muted'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                        </svg>
                        <span className="text-[10px] font-medium">About</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}

// Table of Contents for long content pages
export function TableOfContents({
    sections
}: {
    sections: { id: string; title: string }[]
}) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px' }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    return (
        <nav className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 w-48">
            <p className="text-xs uppercase tracking-widest text-muted font-bold mb-4">On This Page</p>
            <ul className="space-y-2">
                {sections.map(({ id, title }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            className={`block text-sm transition-colors ${activeSection === id
                                ? 'text-amber-500 font-medium'
                                : 'text-muted hover:text-secondary'
                                }`}
                        >
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
