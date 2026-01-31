import Link from 'next/link';
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPostsByCategory } from '@/lib/blog-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const PAGE_SIZE = 24;

const slugifyCategory = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getFilteredPosts = (category: string, query: string) => {
    const list = category === 'All' ? BLOG_POSTS : getBlogPostsByCategory(category);
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((post) => (
        post.title.toLowerCase().includes(q)
        || post.excerpt.toLowerCase().includes(q)
        || post.content.toLowerCase().includes(q)
    ));
};

export default function BlogPage({ searchParams }: { searchParams?: { category?: string; page?: string; q?: string } }) {
    const categoryParam = searchParams?.category || 'All';
    const query = searchParams?.q?.trim() || '';
    const page = Math.max(1, Number(searchParams?.page || 1));
    const selectedCategory = BLOG_CATEGORIES.includes(categoryParam) ? categoryParam : 'All';

    const filteredPosts = getFilteredPosts(selectedCategory, query);
    const featuredPosts = filteredPosts.filter(p => p.featured).slice(0, 3);
    const recentPosts = filteredPosts.filter(p => !p.featured);
    const totalPages = Math.max(1, Math.ceil(recentPosts.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pagePosts = recentPosts.slice(start, start + PAGE_SIZE);

    const buildPageLink = (nextPage: number) => {
        const params = new URLSearchParams();
        if (selectedCategory !== 'All') params.set('category', selectedCategory);
        if (query) params.set('q', query);
        params.set('page', String(nextPage));
        return `/blog?${params.toString()}`;
    };

    const blogListSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Spirit Numeral Numerology Blog',
        description: 'Expert guides on angel numbers, life path numbers, numerology compatibility, manifestation, and spiritual guidance.',
        url: `${baseUrl}/blog`,
        blogPost: BLOG_POSTS.slice(0, 20).map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `${baseUrl}/blog/${post.slug}`,
            datePublished: post.date,
            author: {
                '@type': 'Organization',
                name: 'Spirit Numeral',
            },
        })),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
        ],
    };

    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Numerology Blog - Spirit Numeral',
        description: 'Expert articles about angel numbers, life path numbers, and spiritual numerology.',
        url: `${baseUrl}/blog`,
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

            <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-primary text-sm font-medium mb-6">
                            {BLOG_POSTS.length} Expert Articles
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary font-bold tracking-tighter mb-4">
                            Numerology Blog
                        </h1>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            Deep dive into angel numbers, life path meanings, manifestation, and spiritual guidance.
                        </p>
                    </header>

                    {/* Categories */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {BLOG_CATEGORIES.map(cat => (
                                <Link
                                    key={cat}
                                    href={cat === 'All' ? '/blog' : `/blog/category/${slugifyCategory(cat)}`}
                                    className={`px-4 py-2 rounded-full text-sm transition-all ${cat === selectedCategory
                                        ? 'bg-amber-500 text-black font-medium'
                                        : 'bg-card border border-default text-secondary hover:border-amber-500/50'
                                        }`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                        <form action="/blog" method="get" className="flex gap-2 items-center justify-center">
                            {selectedCategory !== 'All' && (
                                <input type="hidden" name="category" value={selectedCategory} />
                            )}
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder="Search the blog..."
                                className="w-full md:w-72 bg-card border border-default rounded-full px-4 py-2 text-sm text-primary focus:outline-none focus:border-amber-500/60"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-full bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="p-4 rounded-xl bg-card border border-default text-center">
                            <div className="text-2xl font-bold text-amber-600">{BLOG_POSTS.filter(p => p.category === 'Angel Numbers').length}</div>
                            <div className="text-xs text-muted">Angel Numbers</div>
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-default text-center">
                            <div className="text-2xl font-bold text-primary">{BLOG_POSTS.filter(p => p.category === 'Life Path').length}</div>
                            <div className="text-xs text-muted">Life Paths</div>
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-default text-center">
                            <div className="text-2xl font-bold text-primary">{BLOG_POSTS.filter(p => p.category === 'Love Compatibility').length}</div>
                            <div className="text-xs text-muted">Love Compatibility</div>
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-default text-center">
                            <div className="text-2xl font-bold text-primary">{BLOG_POSTS.length}</div>
                            <div className="text-xs text-muted">Total Articles</div>
                        </div>
                    </div>

                    {/* Featured CTA */}
                    <div className="mb-12 p-6 rounded-2xl bg-card border border-default">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-primary mb-1">Discover Your Life Path Number</h2>
                                <p className="text-secondary text-sm">Get your personalized numerology reading based on your birth date</p>
                            </div>
                            <Link
                                href="/calculator"
                                className="shrink-0 px-6 py-3 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
                            >
                                Calculate Free →
                            </Link>
                        </div>
                    </div>

                    {/* Featured Posts */}
                    {featuredPosts.length > 0 && (
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold text-primary mb-6">Featured Articles</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {featuredPosts.map((post, i) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`}
                                        className={`group relative overflow-hidden rounded-3xl border border-default hover:border-amber-500/50 transition-all ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                    >
                                        <div className={`p-6 ${i === 0 ? 'md:p-10' : ''} bg-card`}>
                                            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-primary text-xs font-medium mb-4">
                                                {post.category}
                                            </span>
                                            <h3 className={`font-bold text-primary group-hover:text-amber-600 transition-colors mb-3 ${i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                                                {post.title}
                                            </h3>
                                            <p className="text-secondary text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center text-xs text-muted gap-4">
                                                <span>{post.readTime}</span>
                                                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All Posts */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6">
                            {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
                            <span className="text-muted font-normal ml-2">({filteredPosts.length})</span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pagePosts.map(post => (
                                <Link key={post.slug} href={`/blog/${post.slug}`}
                                    className="group p-6 rounded-2xl bg-card border border-default hover:border-amber-500/50 transition-all"
                                >
                                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-elevated text-secondary text-xs font-medium mb-3">
                                        {post.category}
                                    </span>
                                    <h3 className="font-bold text-primary group-hover:text-amber-600 transition-colors mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                    <div className="flex items-center text-xs text-muted gap-3">
                                        <span>{post.readTime}</span>
                                        <span>•</span>
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
                                {currentPage > 1 && (
                                    <Link
                                        href={buildPageLink(currentPage - 1)}
                                        className="px-4 py-2 rounded-full border border-default text-secondary hover:border-amber-500/60 transition"
                                    >
                                        ← Prev
                                    </Link>
                                )}
                                <span className="text-sm text-muted">
                                    Page {currentPage} of {totalPages}
                                </span>
                                {currentPage < totalPages && (
                                    <Link
                                        href={buildPageLink(currentPage + 1)}
                                        className="px-4 py-2 rounded-full border border-default text-secondary hover:border-amber-500/60 transition"
                                    >
                                        Next →
                                    </Link>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Bottom CTA */}
                    <section className="mt-16 p-8 rounded-3xl bg-card border border-default text-center">
                        <h2 className="text-2xl font-bold text-primary mb-3">Get Your Complete Numerology Reading</h2>
                        <p className="text-secondary mb-6 max-w-xl mx-auto">
                            Discover your life path, destiny number, soul urge, and more with a personalized numerology analysis.
                        </p>
                        <Link
                            href="/quiz"
                            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:from-amber-400 hover:to-yellow-400 transition-all"
                        >
                            Get My Full Reading →
                        </Link>
                    </section>
                </div>
            </main>
        </>
    );
}
