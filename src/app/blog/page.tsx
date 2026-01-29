'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPostsByCategory } from '@/lib/blog-data';

// Generate schemas
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';

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

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const filteredPosts = getBlogPostsByCategory(selectedCategory);
    const featuredPosts = filteredPosts.filter(p => p.featured).slice(0, 3);
    const recentPosts = filteredPosts.filter(p => !p.featured);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                            {BLOG_POSTS.length} Expert Articles
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-emerald-100 to-emerald-400 bg-clip-text text-transparent tracking-tighter mb-4">
                            Numerology Blog
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Deep dive into angel numbers, life path meanings, manifestation, and spiritual guidance.
                        </p>
                    </header>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {BLOG_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${cat === selectedCategory
                                    ? 'bg-emerald-500 text-black font-medium'
                                    : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-emerald-500/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                            <div className="text-2xl font-bold text-amber-400">{BLOG_POSTS.filter(p => p.category === 'Angel Numbers').length}</div>
                            <div className="text-xs text-zinc-500">Angel Numbers</div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                            <div className="text-2xl font-bold text-purple-400">{BLOG_POSTS.filter(p => p.category === 'Life Path').length}</div>
                            <div className="text-xs text-zinc-500">Life Paths</div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                            <div className="text-2xl font-bold text-pink-400">{BLOG_POSTS.filter(p => p.category === 'Love Compatibility').length}</div>
                            <div className="text-xs text-zinc-500">Love Compatibility</div>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                            <div className="text-2xl font-bold text-emerald-400">{BLOG_POSTS.length}</div>
                            <div className="text-xs text-zinc-500">Total Articles</div>
                        </div>
                    </div>

                    {/* Featured CTA */}
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 to-zinc-900 border border-amber-500/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Discover Your Life Path Number</h2>
                                <p className="text-zinc-400 text-sm">Get your personalized numerology reading based on your birth date</p>
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
                            <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {featuredPosts.map((post, i) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`}
                                        className={`group relative overflow-hidden rounded-3xl border border-zinc-800 hover:border-emerald-500/50 transition-all ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                    >
                                        <div className={`p-6 ${i === 0 ? 'md:p-10' : ''} bg-gradient-to-br from-emerald-950/30 to-zinc-900`}>
                                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                                                {post.category}
                                            </span>
                                            <h3 className={`font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 ${i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                                                {post.title}
                                            </h3>
                                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center text-xs text-zinc-500 gap-4">
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
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
                            <span className="text-zinc-500 font-normal ml-2">({filteredPosts.length})</span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(selectedCategory === 'All' ? recentPosts : filteredPosts).map(post => (
                                <Link key={post.slug} href={`/blog/${post.slug}`}
                                    className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-all"
                                >
                                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium mb-3">
                                        {post.category}
                                    </span>
                                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                    <div className="flex items-center text-xs text-zinc-600 gap-3">
                                        <span>{post.readTime}</span>
                                        <span>•</span>
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Bottom CTA */}
                    <section className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-indigo-950/30 to-zinc-900 border border-indigo-500/20 text-center">
                        <h2 className="text-2xl font-bold text-white mb-3">Get Your Complete Numerology Reading</h2>
                        <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
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
