import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClickBankCTA } from '@/lib/utils/clickbank';

// Blog content for each post
const BLOG_CONTENT: Record<string, {
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    content: string;
    relatedNumbers?: number[];
}> = {
    'what-are-angel-numbers': {
        title: 'What Are Angel Numbers? A Complete Beginner\'s Guide',
        excerpt: 'Discover the mystical world of angel numbers and learn how the universe communicates with you through numerical patterns.',
        category: 'Basics',
        readTime: '8 min read',
        date: '2026-01-15',
        relatedNumbers: [111, 222, 333, 444],
        content: `
## What Are Angel Numbers?

Angel numbers are sequences of numbers that carry divine guidance by referring to specific numerological meanings. In numerology, the divine science of numbers, it is believed that each number carries its own vibrational frequency and meaning.

When you repeatedly see certain number sequences—on clocks, license plates, receipts, or phone numbers—these are believed to be messages from your guardian angels or the universe itself.

## How Do Angel Numbers Work?

The concept of angel numbers is rooted in the belief that we live in a universe governed by patterns and vibrations. Numbers are considered a universal language that transcends cultural boundaries.

When angels want to communicate with us, they use these number patterns because:

1. **Numbers are everywhere** - Easy to spot in daily life
2. **They carry specific meanings** - Each number has its own vibration
3. **They're memorable** - Repeating patterns catch our attention
4. **They're universal** - Numbers mean the same thing across cultures

## Common Angel Numbers and Their Meanings

### 111 - New Beginnings
The number 111 is a powerful manifestation number. When you see it, your thoughts are becoming reality faster than usual.

### 222 - Balance and Harmony
This number appears when you need to trust the process and have faith that everything is working out.

### 333 - Divine Protection
Your angels and ascended masters are near, offering guidance and support.

### 444 - Stability and Foundation
You're being supported by the universe. Keep building on your current path.

### 555 - Major Change
Significant life changes are on the horizon. Embrace transformation.

## How to Interpret Angel Numbers

1. **Note when you see them** - The context matters
2. **Consider your thoughts** - What were you thinking about?
3. **Trust your intuition** - Your first impression is often correct
4. **Look up the meaning** - Use the specific guidance for each number

## Why Am I Seeing Angel Numbers?

You might be seeing angel numbers because:

- You're going through a spiritual awakening
- You're at a crossroads in life
- Your angels are trying to reassure you
- The universe is confirming you're on the right path
- You need guidance on a specific issue

Remember, angel numbers are not just random coincidences. They are gentle reminders that you are loved, guided, and supported by forces beyond the physical realm.

## Start Your Journey

Now that you understand what angel numbers are, start paying attention to the numbers that appear in your life. Keep a journal and note any patterns you notice. Over time, you'll develop a deeper connection with the messages meant for you.
    `
    },
    'seeing-1111-everywhere': {
        title: 'Why You Keep Seeing 1111 Everywhere',
        excerpt: 'The spiritual significance of 1111 and what it means when this powerful number keeps appearing in your life.',
        category: 'Angel Numbers',
        readTime: '6 min read',
        date: '2026-01-12',
        relatedNumbers: [1111, 111, 11],
        content: `
## The Power of 1111

If you keep seeing 1111 on clocks, receipts, or phone numbers, you're experiencing one of the most powerful angel number synchronicities. This isn't a coincidence—it's a cosmic wake-up call.

## What Does 1111 Mean?

1111 is often called the "wake-up call" number or the "gateway" number. It represents:

- **New beginnings** - A fresh start is available
- **Manifestation** - Your thoughts are becoming reality
- **Spiritual awakening** - You're becoming more aware
- **Alignment** - You're on the right path

## The Significance of Four Ones

In numerology, the number 1 represents:
- Leadership and independence
- New beginnings and fresh starts
- Originality and pioneering spirit
- Motivation and progress

When you see four 1s together, this energy is amplified exponentially.

## What To Do When You See 1111

1. **Make a wish** - Your manifestation power is heightened
2. **Check your thoughts** - Are they positive?
3. **Take action** - The universe is supporting new ventures
4. **Pay attention** - A message may be coming
5. **Express gratitude** - Acknowledge the divine guidance

## Common Situations for 1111

Many people report seeing 1111:
- During major life decisions
- When meeting significant people
- Before career changes
- During spiritual growth phases
- When their thoughts are particularly aligned

## The 1111 Portal

Some believe that 1111 opens a "portal" between the human realm and higher dimensions. This is why it's considered an ideal time to:

- Set powerful intentions
- Communicate with angels
- Align with your higher purpose
- Manifest your desires

## Your 1111 Message

If you're seeing 1111 repeatedly, ask yourself:
- What new beginning am I being called toward?
- What thoughts have I been focusing on?
- What doors are opening for me?
- How can I step into my leadership role?

The answer to these questions holds your personal 1111 message.
    `
    },
    // Add more blog posts as needed...
};

export async function generateStaticParams() {
    return Object.keys(BLOG_CONTENT).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_CONTENT[slug];

    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} - Spirit Numeral`,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${slug}`,
        },
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
    const post = BLOG_CONTENT[slug];

    if (!post) {
        notFound();
    }

    const cta = getClickBankCTA('numerology');

    // Simple markdown-like parsing
    const formatContent = (content: string) => {
        return content
            .split('\n')
            .map((line, i) => {
                if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-semibold text-amber-400 mt-6 mb-3">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={i} className="text-zinc-300 ml-4 mb-2">{line.replace('- ', '')}</li>;
                }
                if (line.match(/^\d+\./)) {
                    return <li key={i} className="text-zinc-300 ml-4 mb-2 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
                }
                if (line.trim() === '') {
                    return <br key={i} />;
                }
                return <p key={i} className="text-zinc-400 leading-relaxed mb-4">{line}</p>;
            });
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <article className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Link href="/blog" className="text-zinc-500 hover:text-zinc-300 text-sm">
                            ← Back to Blog
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                            {post.category}
                        </span>
                        <span className="text-zinc-500 text-sm">{post.readTime}</span>
                        <span className="text-zinc-600 text-sm">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="text-xl text-zinc-400">
                        {post.excerpt}
                    </p>
                </header>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    {formatContent(post.content)}
                </div>

                {/* Related Numbers */}
                {post.relatedNumbers && post.relatedNumbers.length > 0 && (
                    <section className="mt-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <h3 className="text-lg font-bold text-white mb-4">Related Angel Numbers</h3>
                        <div className="flex flex-wrap gap-3">
                            {post.relatedNumbers.map(num => (
                                <Link
                                    key={num}
                                    href={`/meaning/angel-number/${num}`}
                                    className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-amber-400 font-medium hover:border-amber-500/50 transition-colors"
                                >
                                    {num}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="mt-12">
                    <a
                        href={cta.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="group block p-8 rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all text-center"
                    >
                        <div className="text-amber-400 font-bold text-xl mb-2">{cta.text}</div>
                        <p className="text-zinc-500">{cta.secondaryText}</p>
                    </a>
                </section>
            </article>
        </main>
    );
}
