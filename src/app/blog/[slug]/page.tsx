import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { BLOG_POSTS, getBlogPost, BlogPost } from '@/lib/blog-data';
import { getClickBankCTA } from '@/lib/utils/clickbank';

export async function generateStaticParams() {
    return BLOG_POSTS.map(post => ({ slug: post.slug }));
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

    const cta = getClickBankCTA('numerology');
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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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

                    {/* Bottom CTA */}
                    <section className="mt-12 space-y-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-zinc-900 border border-indigo-500/20 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Ready to Go Deeper?</h3>
                            <p className="text-zinc-400 mb-4">Get your complete numerology profile with personalized insights</p>
                            <a href={cta.url} target="_blank" rel="noopener noreferrer sponsored"
                                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:from-amber-400 hover:to-yellow-400 transition-all">
                                {cta.text} →
                            </a>
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
