import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { BLOG_POSTS, getBlogPost, BlogPost } from '@/lib/blog-data';
import { PsychicPromo } from '@/components/PsychicPromo';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

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

const resolveToolsForCategory = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes('love') || normalized.includes('twin flame') || normalized.includes('compatibility') || normalized.includes('soulmate') || normalized.includes('breakup')) {
        return [
            { title: 'Compare Numbers', href: '/compare', description: 'See how two numbers blend in relationships.' },
            { title: 'Compatibility Calculator', href: '/compatibility', description: 'Check love compatibility by life path.' },
            { title: 'Angel Number Quiz', href: '/quiz', description: 'Discover your primary angel number.' },
        ];
    }
    if (normalized.includes('money') || normalized.includes('career') || normalized.includes('manifestation')) {
        return [
            { title: 'Money Numbers', href: '/money', description: 'Explore abundance meanings for your numbers.' },
            { title: 'Personal Year', href: '/personal-year', description: 'See timing and career momentum.' },
            { title: 'Life Path Calculator', href: '/calculator', description: 'Find your core number quickly.' },
        ];
    }
    if (normalized.includes('life path') || normalized.includes('name numerology') || normalized.includes('destiny') || normalized.includes('soul urge') || normalized.includes('personality') || normalized.includes('birthday') || normalized.includes('maturity')) {
        return [
            { title: 'Life Path Calculator', href: '/calculator', description: 'Calculate your core life path number.' },
            { title: 'Name Numerology', href: '/name-numerology', description: 'Reveal expression, soul urge, and personality.' },
            { title: 'Life Path Library', href: '/meaning/life-path', description: 'Browse all life path meanings.' },
        ];
    }
    if (normalized.includes('angel') || normalized.includes('dream') || normalized.includes('warning') || normalized.includes('why am i seeing') || normalized.includes('biblical')) {
        return [
            { title: 'Angel Number Library', href: '/meaning/angel-number', description: 'Browse all 0–9999 meanings.' },
            { title: 'Why Am I Seeing', href: '/why-am-i-seeing/111', description: 'Decode repeating number signals.' },
            { title: 'Warning Numbers', href: '/warning/111', description: 'See cautionary meanings and next steps.' },
        ];
    }
    return [
        { title: 'Life Path Calculator', href: '/calculator', description: 'Start with your core numerology number.' },
        { title: 'Angel Number Library', href: '/meaning/angel-number', description: 'Find meanings for any number.' },
        { title: 'Angel Number Quiz', href: '/quiz', description: 'Discover your primary angel number.' },
    ];
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

    const baseUrl = getSiteBaseUrl();
    const articleUrl = ensureAbsoluteUrl(baseUrl, `/blog/${resolved?.resolvedSlug ?? slug}`);

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
            if (line.startsWith('## ')) {
                const heading = line.replace('## ', '').trim();
                if (heading.toLowerCase() === 'soft cta') return null;
                return <h2 key={i} className="text-2xl font-bold text-primary mt-8 mb-4">{heading}</h2>;
            }
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold text-amber-600 mt-6 mb-3">{line.replace('### ', '')}</h3>;
            if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                if (match) return <li key={i} className="text-secondary ml-4 mb-2"><strong className="text-primary">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}</li>;
            }
            if (line.startsWith('- ')) return <li key={i} className="text-secondary ml-4 mb-2">{line.replace('- ', '')}</li>;
            if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-primary font-semibold mb-4">{line.replace(/\*\*/g, '')}</p>;
            if (line.match(/^\d+\./)) return <li key={i} className="text-secondary ml-4 mb-2 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
            if (line.startsWith('|')) return null; // Skip table lines (handled separately)
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-secondary leading-relaxed mb-4">{line}</p>;
        }).filter(Boolean);
    };

    // Split by ## for mid-article CTA (after 2nd section on long posts)
    const contentParts = post.content.split(/\n(?=## )/);
    const hasMidArticleCta = contentParts.length >= 3;

    // Get related posts
    const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);
    const tools = resolveToolsForCategory(post.category);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
                <article className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Link href="/blog" className="text-muted hover:text-secondary text-sm">← Back to Blog</Link>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-primary text-sm font-medium">{post.category}</span>
                            <span className="text-muted text-sm">{post.readTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">{post.title}</h1>
                        <p className="text-lg text-secondary mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted">
                            <span>Published {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </header>

                    {/* Related Numbers */}
                    {post.relatedNumbers && post.relatedNumbers.length > 0 && (
                        <div className="mb-8 p-4 rounded-xl bg-card border border-default">
                            <span className="text-muted text-sm">Related numbers: </span>
                            <div className="inline-flex flex-wrap gap-2 mt-1">
                                {post.relatedNumbers.map(num => (
                                    <Link key={num} href={num >= 100 ? `/meaning/angel-number/${num}` : `/meaning/life-path/life-path-${num}`}
                                        className="px-2 py-1 rounded bg-amber-500/10 text-amber-600 text-sm hover:bg-amber-500/20 transition-colors">
                                        {num}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content: on long posts, CTA after 2nd section (emotional placement) */}
                    <div className="prose max-w-none text-primary">
                        {hasMidArticleCta ? (
                            <>
                                {formatContent(contentParts[0])}
                                {formatContent(contentParts[1])}
                                {formatContent(contentParts[2])}
                                <div className="my-10">
                                    <PsychicPromo label="Psychic Mid-Article" />
                                </div>
                                {contentParts.slice(3).map((part, i) => (
                                    <div key={i}>{formatContent(part)}</div>
                                ))}
                            </>
                        ) : (
                            formatContent(post.content)
                        )}
                    </div>

                    <div className="mt-10">
                        <PsychicPromo label="Psychic After Content" />
                    </div>

                    {tools.length > 0 && (
                        <section className="mt-10 p-6 rounded-2xl bg-card border border-default">
                            <h3 className="text-xl font-bold text-primary mb-4">Related Tools</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {tools.map((tool) => (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        className="p-4 rounded-xl bg-page/60 border border-default hover:border-amber-500/50 transition"
                                    >
                                        <div className="text-amber-600 font-semibold mb-1">{tool.title}</div>
                                        <div className="text-secondary text-sm">{tool.description}</div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold text-primary mb-6">Related Articles</h2>
                            <div className="grid gap-4">
                                {relatedPosts.map(related => (
                                    <Link key={related.slug} href={`/blog/${related.slug}`}
                                        className="group p-4 rounded-xl bg-card border border-default hover:border-amber-500/50 transition-all">
                                        <h3 className="font-semibold text-primary group-hover:text-amber-600 transition-colors">{related.title}</h3>
                                        <p className="text-muted text-sm mt-1 line-clamp-1">{related.excerpt}</p>
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
