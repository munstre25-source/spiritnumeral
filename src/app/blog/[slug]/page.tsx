import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { BLOG_POSTS, getBlogPost, BlogPost } from '@/lib/blog-data';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';

const MAX_STATIC_BLOG_POSTS = 2000;

export async function generateStaticParams() {
    return BLOG_POSTS.slice(0, MAX_STATIC_BLOG_POSTS).map(post => ({ slug: post.slug }));
}

const LEGACY_SLUG_ALIASES: Record<string, string> = {
    'seeing-1111-everywhere': 'angel-number-111-manifestation',
};

const resolvePostBySlug = (slug: string): { post: BlogPost; resolvedSlug: string; redirected: boolean } | null => {
    const direct = getBlogPost(slug);
    if (direct) {
        return { post: direct, resolvedSlug: slug, redirected: false };
    }

    const legacy = LEGACY_SLUG_ALIASES[slug];
    if (legacy) {
        const legacyPost = getBlogPost(legacy);
        if (legacyPost) {
            return { post: legacyPost, resolvedSlug: legacy, redirected: true };
        }
    }

    const numberMatch = slug.match(/\d{1,4}/);
    if (numberMatch) {
        const number = Number(numberMatch[0]);
        const isLifePath = slug.includes('life-path');
        const isAngel = slug.includes('angel') || slug.includes('seeing');
        const candidates = BLOG_POSTS.filter(post => post.relatedNumbers?.includes(number));
        const preferred = candidates.find(post => (isLifePath && post.category === 'Life Path') || (isAngel && post.category === 'Angel Numbers'))
            || candidates[0];
        if (preferred) {
            return { post: preferred, resolvedSlug: preferred.slug, redirected: true };
        }
    }

    return null;
};

const resolveAffiliateForCategory = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes('love') || normalized.includes('twin flame')) {
        return { offer: OFFERS.affiliate_soulmate_story, context: 'Soulmate Sketch' };
    }
    if (normalized.includes('breakup')) {
        return { offer: OFFERS.affiliate_ex_back, context: 'Reconciliation Support' };
    }
    if (normalized.includes('money') || normalized.includes('career') || normalized.includes('personal year') || normalized.includes('personal month') || normalized.includes('personal day') || normalized.includes('manifestation')) {
        return { offer: OFFERS.affiliate_numerologist, context: 'Prosperity VSL' };
    }
    if (normalized.includes('challenges') || normalized.includes('warning')) {
        return { offer: OFFERS.affiliate_genius_song, context: 'Grounding & Clarity' };
    }
    if (normalized.includes('dream') || normalized.includes('angel') || normalized.includes('why-am-i-seeing') || normalized.includes('why am i seeing') || normalized.includes('biblical') || normalized.includes('pregnancy') || normalized.includes('celebrity')) {
        return { offer: OFFERS.affiliate_moon_reading, context: 'Lunar Insight' };
    }
    if (
        normalized.includes('life path') ||
        normalized.includes('name numerology') ||
        normalized.includes('destiny') ||
        normalized.includes('soul urge') ||
        normalized.includes('personality') ||
        normalized.includes('birthday') ||
        normalized.includes('maturity') ||
        normalized.includes('pinnacles')
    ) {
        return { offer: OFFERS.affiliate_moon_reading, context: 'Lunar Insight' };
    }
    if (normalized.includes('compatibility')) {
        return { offer: OFFERS.affiliate_soulmate_story, context: 'Soulmate Sketch' };
    }
    if (normalized.includes('soulmate')) {
        return { offer: OFFERS.affiliate_soulmate_story, context: 'Soulmate Sketch' };
    }
    return null;
};

const extractFaqs = (content: string) => {
    const lines = content.split('\n').map((line) => line.trim());
    const faqs: { question: string; answer: string }[] = [];
    let inFaq = false;
    let currentQuestion = '';
    let currentAnswer: string[] = [];

    const flush = () => {
        if (currentQuestion && currentAnswer.length > 0) {
            faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ') });
        }
        currentQuestion = '';
        currentAnswer = [];
    };

    for (const line of lines) {
        if (line.startsWith('## ')) {
            if (inFaq) flush();
            inFaq = line.toLowerCase().includes('faq');
            continue;
        }
        if (!inFaq) continue;
        if (line.startsWith('### ')) {
            flush();
            currentQuestion = line.replace(/^###\s*/, '').trim();
            continue;
        }
        if (!line) continue;
        if (currentQuestion) {
            currentAnswer.push(line);
        }
    }
    flush();
    return faqs;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const resolved = resolvePostBySlug(slug);
    const post = resolved?.post;

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | Spirit Numeral`,
        description: post.excerpt,
        alternates: { canonical: `/blog/${resolved?.resolvedSlug ?? slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const resolved = resolvePostBySlug(slug);
    const post = resolved?.post;

    if (!post) {
        notFound();
    }

    if (resolved?.redirected && resolved.resolvedSlug !== slug) {
        redirect(`/blog/${resolved.resolvedSlug}`);
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
    const articleUrl = `${baseUrl}/blog/${slug}`;

    // Article schema for rich results
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: `${baseUrl}/opengraph-image`,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'Spirit Numeral', url: baseUrl },
        publisher: {
            '@type': 'Organization',
            name: 'Spirit Numeral',
            url: baseUrl,
            logo: { '@type': 'ImageObject', url: `${baseUrl}/opengraph-image` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        articleSection: post.category,
        keywords: post.relatedNumbers?.join(', ') || post.category,
    };

    // Breadcrumb schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
        ],
    };

    const faqItems = extractFaqs(post.content || '');
    const faqSchema = faqItems.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        }
        : null;

    // Parse markdown-like content
    const formatContent = (content: string) => {
        return content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold text-amber-400 mt-6 mb-3">{line.replace('### ', '')}</h3>;
            if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                if (match) return <li key={i} className="text-zinc-300 ml-4 mb-2"><strong className="text-white">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}</li>;
            }
            if (line.startsWith('- ')) return <li key={i} className="text-zinc-300 ml-4 mb-2">{line.replace('- ', '')}</li>;
            if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-white font-semibold mb-4">{line.replace(/\*\*/g, '')}</p>;
            if (line.match(/^\d+\./)) return <li key={i} className="text-zinc-300 ml-4 mb-2 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
            if (line.startsWith('|')) return null; // Skip table lines (handled separately)
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-zinc-400 leading-relaxed mb-4">{line}</p>;
        }).filter(Boolean);
    };

    // Get related posts
    const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);
    const affiliatePromo = resolveAffiliateForCategory(post.category);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <main className="min-h-screen pt-32 pb-20 px-6">
                <article className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Link href="/blog" className="text-zinc-500 hover:text-zinc-300 text-sm">← Back to Blog</Link>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">{post.category}</span>
                            <span className="text-zinc-500 text-sm">{post.readTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
                        <p className="text-lg text-zinc-400 mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                            <span>Published {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </header>

                    {/* Related Numbers */}
                    {post.relatedNumbers && post.relatedNumbers.length > 0 && (
                        <div className="mb-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                            <span className="text-zinc-500 text-sm">Related numbers: </span>
                            <div className="inline-flex flex-wrap gap-2 mt-1">
                                {post.relatedNumbers.map(num => (
                                    <Link key={num} href={num >= 100 ? `/meaning/angel-number/${num}` : `/meaning/life-path/life-path-${num}`}
                                        className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 text-sm hover:bg-amber-500/20 transition-colors">
                                        {num}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Inline CTA */}
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 to-zinc-900 border border-amber-500/20">
                        <div className="text-center">
                            <p className="text-white font-semibold mb-2">🔮 Discover Your Personal Numbers</p>
                            <p className="text-zinc-400 text-sm mb-4">Calculate your life path and see how it connects to this article</p>
                            <Link href="/calculator" className="inline-block px-6 py-2 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors">
                                Free Calculator →
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                        {formatContent(post.content)}
                    </div>

                    {affiliatePromo && (
                        <section className="mt-10">
                            <AffiliatePromo offer={affiliatePromo.offer} context={affiliatePromo.context} />
                        </section>
                    )}

                    {/* Bottom CTA */}
                    <section className="mt-12 space-y-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-zinc-900 border border-indigo-500/20 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Ready to Go Deeper?</h3>
                            <p className="text-zinc-400 mb-4">Get your complete numerology profile with personalized insights</p>
                            <div className="max-w-sm mx-auto">
                                <MeaningPaidCTA />
                            </div>
                        </div>
                    </section>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
                            <div className="grid gap-4">
                                {relatedPosts.map(related => (
                                    <Link key={related.slug} href={`/blog/${related.slug}`}
                                        className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-all">
                                        <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{related.title}</h3>
                                        <p className="text-zinc-500 text-sm mt-1 line-clamp-1">{related.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>
        </>
    );
}
