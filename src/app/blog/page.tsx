import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Numerology Blog - Spirit Numeral',
    description: 'Learn about numerology, angel numbers, life paths, and spiritual guidance. Expert insights and guides for your spiritual journey.',
    alternates: {
        canonical: '/blog',
    },
};

// Blog posts - can be moved to CMS or database later
const BLOG_POSTS = [
    {
        slug: 'what-are-angel-numbers',
        title: 'What Are Angel Numbers? A Complete Beginner\'s Guide',
        excerpt: 'Discover the mystical world of angel numbers and learn how the universe communicates with you through numerical patterns.',
        category: 'Basics',
        readTime: '8 min read',
        date: '2026-01-15',
        featured: true,
    },
    {
        slug: 'seeing-1111-everywhere',
        title: 'Why You Keep Seeing 1111 Everywhere',
        excerpt: 'The spiritual significance of 1111 and what it means when this powerful number keeps appearing in your life.',
        category: 'Angel Numbers',
        readTime: '6 min read',
        date: '2026-01-12',
        featured: true,
    },
    {
        slug: 'calculate-life-path-number',
        title: 'How to Calculate Your Life Path Number (Step by Step)',
        excerpt: 'Learn the exact method to calculate your life path number and understand what it reveals about your destiny.',
        category: 'Life Path',
        readTime: '5 min read',
        date: '2026-01-10',
        featured: false,
    },
    {
        slug: 'master-numbers-11-22-33',
        title: 'Master Numbers 11, 22, and 33: The Rare Life Paths',
        excerpt: 'Explore the powerful meaning of master numbers and discover if you\'re one of the rare souls born with these paths.',
        category: 'Life Path',
        readTime: '10 min read',
        date: '2026-01-08',
        featured: true,
    },
    {
        slug: 'angel-numbers-love',
        title: 'Angel Numbers for Love: What They Mean for Your Relationships',
        excerpt: 'From 222 to 666, learn which angel numbers carry messages about love, soulmates, and twin flames.',
        category: 'Love',
        readTime: '7 min read',
        date: '2026-01-05',
        featured: false,
    },
    {
        slug: 'numerology-2026-predictions',
        title: 'Numerology Predictions for 2026: Universal Year 1',
        excerpt: '2026 is a Universal Year 1 in numerology. Discover what this fresh start energy means for you.',
        category: 'Predictions',
        readTime: '9 min read',
        date: '2026-01-01',
        featured: true,
    },
    {
        slug: 'difference-between-angel-numbers-life-path',
        title: 'Angel Numbers vs Life Path Numbers: What\'s the Difference?',
        excerpt: 'Understanding the key differences between these two numerological concepts and how they work together.',
        category: 'Basics',
        readTime: '5 min read',
        date: '2025-12-28',
        featured: false,
    },
    {
        slug: 'why-seeing-same-number',
        title: 'Why Do I Keep Seeing the Same Number? 5 Spiritual Reasons',
        excerpt: 'When numbers follow you everywhere, here\'s what the universe might be trying to tell you.',
        category: 'Spirituality',
        readTime: '6 min read',
        date: '2025-12-25',
        featured: false,
    },
];

const CATEGORIES = ['All', 'Basics', 'Angel Numbers', 'Life Path', 'Love', 'Predictions', 'Spirituality'];

// Generate ItemList schema for blog
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Spirit Numeral Numerology Blog',
    description: 'Learn about numerology, angel numbers, life paths, and spiritual guidance.',
    url: `${baseUrl}/blog`,
    blogPost: BLOG_POSTS.map((post, index) => ({
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

export default function BlogPage() {
    const featuredPosts = BLOG_POSTS.filter(p => p.featured).slice(0, 3);
    const recentPosts = BLOG_POSTS.filter(p => !p.featured);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
            />
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                            Spiritual Insights
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-emerald-100 to-emerald-400 bg-clip-text text-transparent tracking-tighter mb-4">
                            Numerology Blog
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Guides, insights, and deep dives into the world of numerology and angel numbers.
                        </p>
                    </header>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${cat === 'All'
                                    ? 'bg-emerald-500 text-black font-medium'
                                    : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-emerald-500/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Featured Posts */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredPosts.map((post, i) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className={`group relative overflow-hidden rounded-3xl border border-zinc-800 hover:border-emerald-500/50 transition-all ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                        }`}
                                >
                                    <div className={`bg-gradient-to-br from-zinc-900 to-zinc-950 ${i === 0 ? 'p-8 md:p-12' : 'p-6'}`}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                                {post.category}
                                            </span>
                                            <span className="text-zinc-600 text-xs">{post.readTime}</span>
                                        </div>
                                        <h3 className={`font-bold text-white group-hover:text-emerald-400 transition-colors ${i === 0 ? 'text-2xl md:text-3xl mb-4' : 'text-lg mb-2'
                                            }`}>
                                            {post.title}
                                        </h3>
                                        <p className={`text-zinc-400 ${i === 0 ? 'text-base' : 'text-sm line-clamp-2'}`}>
                                            {post.excerpt}
                                        </p>
                                        {i === 0 && (
                                            <div className="mt-6 text-emerald-400 font-medium group-hover:translate-x-2 transition-transform">
                                                Read Article →
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Recent Posts */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
                        <div className="space-y-4">
                            {recentPosts.map(post => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-emerald-500/50 transition-all"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs">
                                                {post.category}
                                            </span>
                                            <span className="text-zinc-600 text-xs">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-zinc-500 text-sm mt-1 line-clamp-1">{post.excerpt}</p>
                                    </div>
                                    <div className="text-zinc-600 text-sm md:text-right">
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Newsletter CTA */}
                    <section className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/30 to-zinc-900 border border-emerald-500/20 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Get Weekly Numerology Insights
                        </h2>
                        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
                            Join thousands of spiritual seekers receiving our weekly angel number
                            interpretations and numerology guides.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}
