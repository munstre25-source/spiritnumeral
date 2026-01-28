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
    'calculate-life-path-number': {
        title: 'How to Calculate Your Life Path Number (Step by Step)',
        excerpt: 'Learn the exact method to calculate your life path number and understand what it reveals about your destiny.',
        category: 'Life Path',
        readTime: '5 min read',
        date: '2026-01-10',
        relatedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        content: `
## What Is a Life Path Number?

Your Life Path Number is the most important number in your numerology chart. It reveals your life's purpose, natural talents, and the challenges you'll face on your journey.

## How to Calculate Your Life Path Number

The calculation is simple but must be done correctly. Here's the step-by-step method:

### Step 1: Write Your Full Birth Date

Use the format: Month / Day / Year
Example: December 15, 1990 = 12 / 15 / 1990

### Step 2: Reduce Each Component

- Month: 1 + 2 = 3
- Day: 1 + 5 = 6
- Year: 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1

### Step 3: Add the Reduced Numbers

3 + 6 + 1 = 10

### Step 4: Reduce to a Single Digit

1 + 0 = 1

The Life Path Number is 1.

## Master Numbers Exception

If you get 11, 22, or 33 at any step, do NOT reduce further. These are Master Numbers with special significance.

## Life Path Meanings Overview

- **Life Path 1**: The Leader - Independent and ambitious
- **Life Path 2**: The Peacemaker - Diplomatic and sensitive
- **Life Path 3**: The Communicator - Creative and expressive
- **Life Path 4**: The Builder - Practical and reliable
- **Life Path 5**: The Freedom Seeker - Adventurous and dynamic
- **Life Path 6**: The Nurturer - Responsible and loving
- **Life Path 7**: The Seeker - Spiritual and analytical
- **Life Path 8**: The Powerhouse - Ambitious and material-oriented
- **Life Path 9**: The Humanitarian - Compassionate and giving

## Calculate Yours Now

Ready to discover your Life Path Number? Use our free calculator to get your personalized reading instantly.
    `
    },
    'master-numbers-11-22-33': {
        title: 'Master Numbers 11, 22, and 33: The Rare Life Paths',
        excerpt: 'Explore the powerful meaning of master numbers and discover if you\'re one of the rare souls born with these paths.',
        category: 'Life Path',
        readTime: '10 min read',
        date: '2026-01-08',
        relatedNumbers: [11, 22, 33, 1111, 2222],
        content: `
## What Are Master Numbers?

In numerology, Master Numbers are double-digit numbers that are not reduced to a single digit. The three Master Numbers are 11, 22, and 33. These numbers carry higher spiritual vibration and greater potential—but also greater challenges.

## Life Path 11: The Intuitive Master

### Characteristics
- Highly intuitive and psychic
- Natural spiritual teacher
- Extremely sensitive to energy
- Visionary and inspirational

### Challenges
- Prone to anxiety and self-doubt
- May struggle with practical matters
- Can feel misunderstood
- Tendency toward nervous energy

### Famous Life Path 11s
Barack Obama, Michelle Obama, Wolfgang Mozart, Orlando Bloom

## Life Path 22: The Master Builder

### Characteristics
- Ability to turn dreams into reality
- Exceptional organizational skills
- Natural leader with vision
- Can achieve on a massive scale

### Challenges
- Immense pressure to succeed
- May become workaholic
- Can be controlling
- Fear of failure

### Famous Life Path 22s
Will Smith, Paul McCartney, Tina Turner

## Life Path 33: The Master Teacher

### Characteristics
- Rare and powerful number
- Devoted to uplifting humanity
- Extreme compassion and love
- Natural healer and counselor

### Challenges
- Often sacrifice personal needs
- May take on others' burdens
- Can become martyrs
- Struggle with boundaries

## Are You a Master Number?

To calculate if you have a Master Number life path:

1. Add your birth date components
2. If you get 11, 22, or 33 before final reduction, you have that Master Number
3. Some numerologists only count the final sum

## Living With a Master Number

If you have a Master Number life path, remember:

- Your potential is extraordinary
- Your challenges are also greater
- Regular grounding practices help
- Trust your intuitive gifts
- Find healthy outlets for sensitivity
    `
    },
    'angel-numbers-love': {
        title: 'Angel Numbers for Love: What They Mean for Your Relationships',
        excerpt: 'From 222 to 666, learn which angel numbers carry messages about love, soulmates, and twin flames.',
        category: 'Love',
        readTime: '7 min read',
        date: '2026-01-05',
        relatedNumbers: [222, 444, 555, 666, 777],
        content: `
## Angel Numbers and Love

When it comes to matters of the heart, the universe often communicates through angel numbers. These numerical messages can provide guidance about your current relationship, future love life, or spiritual connections.

## 222 - Partnership and Balance

The number 222 is THE love number. When you see it:

- A significant partnership is forming
- Trust in your relationship is growing
- Balance is being restored in love
- Stay patient with your partner

## 444 - Stable Love Foundation

Seeing 444 in love matters means:

- Your relationship has strong foundations
- Angels are protecting your bond
- Commitment is favored now
- Build something lasting together

## 555 - Relationship Transformation

555 appears when love is changing:

- A new relationship may be entering
- An existing relationship is evolving
- Let go of what no longer serves
- Embrace change in love

## 666 - Heart Healing Needed

Despite negative associations, 666 in love means:

- Focus on emotional healing
- Balance giving and receiving
- Self-love is essential now
- Release relationship anxiety

## 777 - Divine Love Connection

When 777 appears in love:

- A spiritually aligned partner is near
- Trust divine timing in love
- Deepen spiritual connection with partner
- Your prayers about love are heard

## Twin Flame Numbers

Specific sequences relate to twin flames:

- **1111**: Twin flame awakening or meeting
- **2222**: Twin flame union approaching
- **1212**: Your twin flame journey is progressing
- **717**: You're on the right path to reunion

## What To Do When You See Love Numbers

1. Note what you were thinking about love
2. Journal your feelings and insights
3. Take inspired action toward love
4. Trust the guidance you receive
    `
    },
    'numerology-2026-predictions': {
        title: 'Numerology Predictions for 2026: Universal Year 1',
        excerpt: '2026 is a Universal Year 1 in numerology. Discover what this fresh start energy means for you.',
        category: 'Predictions',
        readTime: '9 min read',
        date: '2026-01-01',
        relatedNumbers: [1, 111, 1111],
        content: `
## 2026: A Universal Year 1

In numerology, we calculate the Universal Year by adding the digits: 2 + 0 + 2 + 6 = 10 → 1 + 0 = 1

2026 is a Universal Year 1, marking the beginning of a new 9-year cycle. This is a year of fresh starts, new beginnings, and pioneering energy.

## What Universal Year 1 Means

### New Beginnings Are Favored
- Start new projects
- Launch new ventures
- Make significant life changes
- Plant seeds for the future

### Independence is Highlighted
- Assert your individuality
- Take leadership roles
- Make independent decisions
- Stand on your own

### Action is Required
- Don't wait for others
- Take initiative
- Be proactive
- Move forward with confidence

## 2026 Predictions by Life Path

### Life Path 1 (Personal Year 2)
Focus on partnerships and patience. Collaborate with others.

### Life Path 2 (Personal Year 3)
Your creativity blossoms. Express yourself freely.

### Life Path 3 (Personal Year 4)
Time to build foundations. Focus on stability.

### Life Path 4 (Personal Year 5)
Embrace change and freedom. Travel and explore.

### Life Path 5 (Personal Year 6)
Home and family take priority. Nurture relationships.

### Life Path 6 (Personal Year 7)
Spiritual growth and introspection. Study and learn.

### Life Path 7 (Personal Year 8)
Career and finances flourish. Manifest abundance.

### Life Path 8 (Personal Year 9)
Complete old cycles. Release what no longer serves.

### Life Path 9 (Personal Year 1)
Double new beginning energy! Major fresh starts.

## Key Months in 2026

- **January**: Strong energy for new starts (1+1=2 energy)
- **October**: Manifestation month (10=1)
- **November**: Master month (11)

## How to Make the Most of 2026

1. Set clear intentions in January
2. Take action on new ideas immediately
3. Be willing to lead
4. Trust your unique path
5. Don't fear standing out
    `
    },
    'difference-between-angel-numbers-life-path': {
        title: 'Angel Numbers vs Life Path Numbers: What\'s the Difference?',
        excerpt: 'Understanding the key differences between these two numerological concepts and how they work together.',
        category: 'Basics',
        readTime: '5 min read',
        date: '2025-12-28',
        relatedNumbers: [111, 222, 333],
        content: `
## Two Different Numerological Systems

While both involve numbers and spiritual meaning, Angel Numbers and Life Path Numbers serve very different purposes in numerology.

## Life Path Numbers Explained

### What They Are
- Calculated from your birth date
- Fixed for your entire life
- Reveals your life purpose
- Shows innate personality traits

### How They Work
Your Life Path Number is determined at birth and never changes. It's like your personal code that reveals:
- Your natural talents
- Your life challenges
- Your soul's purpose
- Your compatibility with others

### Example
Born March 15, 1985 = 3+1+5+1+9+8+5 = 32 → 3+2 = 5
Life Path 5: The Freedom Seeker

## Angel Numbers Explained

### What They Are
- Random number sequences you notice
- Appear repeatedly in daily life
- Change based on life circumstances
- Messages from divine guidance

### How They Work
Angel Numbers appear when you need guidance. They're not fixed—you might see different numbers at different times based on:
- Current life situation
- Decisions you're facing
- Spiritual growth phase
- Messages angels want to send

### Example
Seeing 444 repeatedly = Angels saying "We're protecting and supporting you"

## Key Differences Summary

| Aspect | Life Path | Angel Numbers |
|--------|-----------|---------------|
| Source | Birth date | Random sightings |
| Permanence | Fixed for life | Changes over time |
| Purpose | Life blueprint | Current guidance |
| Calculation | Mathematical | Observation |



## How They Work Together

Your Life Path Number and the Angel Numbers you see often relate to each other:

- Life Path 1 might frequently see 111 or 1111
- Life Path 7 might notice 777 during spiritual growth
- Life Path 9 might see 999 during completion phases

Both systems complement each other to provide complete spiritual guidance.
    `
    },
    'why-seeing-same-number': {
        title: 'Why Do I Keep Seeing the Same Number? 5 Spiritual Reasons',
        excerpt: 'When numbers follow you everywhere, here\'s what the universe might be trying to tell you.',
        category: 'Spirituality',
        readTime: '6 min read',
        date: '2025-12-25',
        relatedNumbers: [111, 222, 333, 444, 555],
        content: `
## When Numbers Follow You

You glance at the clock: 11:11. Your receipt total: $22.22. The address you're looking for: 333. When the same number keeps appearing, it's natural to wonder why.

## 5 Reasons You Keep Seeing the Same Number

### 1. The Universe Is Getting Your Attention

Sometimes the spiritual realm needs to break through our busy minds. Repetitive numbers are like a cosmic tap on the shoulder saying, "Pay attention!"

What to do: Stop and notice what you were thinking or doing when the number appeared.

### 2. You're Receiving Confirmation

Are you facing a big decision? Seeing a number repeatedly can be divine confirmation that you're on the right path—or a gentle nudge to reconsider.

What to do: Trust the feeling you get when you see the number. Your intuition knows.

### 3. Your Vibration Is Aligned

When you're in a high vibrational state, you become more attuned to universal messages. Seeing numbers frequently might mean your spiritual antenna is tuned in.

What to do: Keep doing what you're doing! This is a positive sign.

### 4. Angels Are Communicating

Many believe that angels use numbers because they're a universal language. Your guardian angels might be sending specific guidance through these numerical messages.

What to do: Look up the specific meaning of the number you're seeing.

### 5. You're Experiencing Synchronicity

Carl Jung coined this term for meaningful coincidences. Repeated numbers are powerful synchronicities showing you're connected to something greater.

What to do: Keep a synchronicity journal and look for patterns.

## How to Respond to Repeated Numbers

1. **Acknowledge the number** - Don't dismiss it as coincidence
2. **Pause and breathe** - Center yourself in the moment
3. **Note your thoughts** - What were you thinking about?
4. **Research the meaning** - Each number has significance
5. **Take inspired action** - Let the message guide you

## When to Pay Extra Attention

The message is especially important if:
- You see the number 3+ times in one day
- It appears in unexpected places
- You get a strong feeling when seeing it
- Multiple people mention it to you
- It relates to a specific situation in your life

## Trust the Process

Remember, if a number keeps appearing to you, there's a reason. Trust that you're meant to receive this message at this time in your life.
    `
    },
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

    // Generate Article schema for rich results
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
    const articleUrl = `${baseUrl}/blog/${slug}`;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: `${baseUrl}/opengraph-image`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Organization',
            name: 'Spirit Numeral',
            url: baseUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Spirit Numeral',
            url: baseUrl,
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/opengraph-image`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        articleSection: post.category,
        keywords: post.relatedNumbers?.join(', ') || '',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${baseUrl}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: articleUrl,
            },
        ],
    };

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
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
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
        </>
    );
}
