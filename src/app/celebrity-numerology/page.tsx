import { Metadata } from 'next';
import Link from 'next/link';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';

export const metadata: Metadata = {
    title: 'Which Celebrities Share Your Life Path? Famous Numerology',
    description: 'See which famous people have your life path number. Free calculator. Discover celebrity numerology and what it means for you.',
    alternates: {
        canonical: '/celebrity-numerology',
    },
    openGraph: {
        title: 'Which Celebrities Share Your Life Path? Famous Numerology',
        description: 'See which famous people have your life path number. Free calculator.',
    },
};

// Celebrity data with verified birthdates
const CELEBRITIES = {
    1: {
        name: 'Life Path 1 - The Leader',
        description: 'Natural born leaders who forge their own path.',
        celebrities: [
            { name: 'Martin Luther King Jr.', birthday: 'January 15, 1929', known: 'Civil Rights Leader' },
            { name: 'Steve Jobs', birthday: 'February 24, 1955', known: 'Apple Founder' },
            { name: 'Lady Gaga', birthday: 'March 28, 1986', known: 'Pop Icon' },
            { name: 'Scarlett Johansson', birthday: 'November 22, 1984', known: 'Actress' },
        ]
    },
    2: {
        name: 'Life Path 2 - The Diplomat',
        description: 'Peacemakers who thrive in partnerships.',
        celebrities: [
            { name: 'Barack Obama', birthday: 'August 4, 1961', known: '44th US President' },
            { name: 'Jennifer Aniston', birthday: 'February 11, 1969', known: 'Actress' },
            { name: 'Kim Kardashian', birthday: 'October 21, 1980', known: 'Media Personality' },
            { name: 'Kanye West', birthday: 'June 8, 1977', known: 'Artist & Entrepreneur' },
        ]
    },
    3: {
        name: 'Life Path 3 - The Communicator',
        description: 'Creative souls who inspire through expression.',
        celebrities: [
            { name: 'Christina Aguilera', birthday: 'December 18, 1980', known: 'Singer' },
            { name: 'Snoop Dogg', birthday: 'October 20, 1971', known: 'Rapper' },
            { name: 'John Travolta', birthday: 'February 18, 1954', known: 'Actor' },
            { name: 'Céline Dion', birthday: 'March 30, 1968', known: 'Singer' },
        ]
    },
    4: {
        name: 'Life Path 4 - The Builder',
        description: 'Disciplined achievers who create lasting foundations.',
        celebrities: [
            { name: 'Oprah Winfrey', birthday: 'January 29, 1954', known: 'Media Mogul' },
            { name: 'Usher', birthday: 'October 14, 1978', known: 'Singer' },
            { name: 'Bill Gates', birthday: 'October 28, 1955', known: 'Microsoft Founder' },
            { name: 'Elton John', birthday: 'March 25, 1947', known: 'Musician' },
        ]
    },
    5: {
        name: 'Life Path 5 - The Freedom Seeker',
        description: 'Adventurous spirits who embrace change.',
        celebrities: [
            { name: 'Beyoncé', birthday: 'September 4, 1981', known: 'Pop Icon' },
            { name: 'Angelina Jolie', birthday: 'June 4, 1975', known: 'Actress & Humanitarian' },
            { name: 'Steven Spielberg', birthday: 'December 18, 1946', known: 'Director' },
            { name: 'Mick Jagger', birthday: 'July 26, 1943', known: 'Rock Legend' },
        ]
    },
    6: {
        name: 'Life Path 6 - The Nurturer',
        description: 'Loving souls devoted to family and responsibility.',
        celebrities: [
            { name: 'Michael Jackson', birthday: 'August 29, 1958', known: 'King of Pop' },
            { name: 'John Lennon', birthday: 'October 9, 1940', known: 'Musician & Activist' },
            { name: 'Eddie Murphy', birthday: 'April 3, 1961', known: 'Actor & Comedian' },
            { name: 'Victoria Beckham', birthday: 'April 17, 1974', known: 'Designer & Singer' },
        ]
    },
    7: {
        name: 'Life Path 7 - The Seeker',
        description: 'Spiritual thinkers who seek deeper truth.',
        celebrities: [
            { name: 'Leonardo DiCaprio', birthday: 'November 11, 1974', known: 'Actor' },
            { name: 'Johnny Depp', birthday: 'June 9, 1963', known: 'Actor' },
            { name: 'Julia Roberts', birthday: 'October 28, 1967', known: 'Actress' },
            { name: 'Princess Diana', birthday: 'July 1, 1961', known: 'Princess of Wales' },
        ]
    },
    8: {
        name: 'Life Path 8 - The Powerhouse',
        description: 'Ambitious achievers destined for material success.',
        celebrities: [
            { name: 'Sandra Bullock', birthday: 'July 26, 1964', known: 'Actress' },
            { name: 'Pablo Picasso', birthday: 'October 25, 1881', known: 'Artist' },
            { name: '50 Cent', birthday: 'July 6, 1975', known: 'Rapper & Businessman' },
            { name: 'Nelson Mandela', birthday: 'July 18, 1918', known: 'World Leader' },
        ]
    },
    9: {
        name: 'Life Path 9 - The Humanitarian',
        description: 'Compassionate souls here to serve humanity.',
        celebrities: [
            { name: 'Mother Teresa', birthday: 'August 26, 1910', known: 'Humanitarian' },
            { name: 'Mahatma Gandhi', birthday: 'October 2, 1869', known: 'Spiritual Leader' },
            { name: 'Jim Carrey', birthday: 'January 17, 1962', known: 'Actor & Comedian' },
            { name: 'Elvis Presley', birthday: 'January 8, 1935', known: 'King of Rock' },
        ]
    },
    11: {
        name: 'Life Path 11 - The Intuitive',
        description: 'Master number with heightened spiritual awareness.',
        celebrities: [
            { name: 'Barack Obama', birthday: 'August 4, 1961', known: '44th US President' },
            { name: 'Michelle Obama', birthday: 'January 17, 1964', known: 'Former First Lady' },
            { name: 'Orlando Bloom', birthday: 'January 13, 1977', known: 'Actor' },
            { name: 'Wolfgang Amadeus Mozart', birthday: 'January 27, 1756', known: 'Composer' },
        ]
    },
    22: {
        name: 'Life Path 22 - The Master Builder',
        description: 'The most powerful life path, capable of turning dreams into reality.',
        celebrities: [
            { name: 'Will Smith', birthday: 'September 25, 1968', known: 'Actor & Producer' },
            { name: 'Paul McCartney', birthday: 'June 18, 1942', known: 'Beatle & Musician' },
            { name: 'Tina Turner', birthday: 'November 26, 1939', known: 'Queen of Rock' },
        ]
    },
};

// Generate ItemList schema for celebrities
const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Famous Celebrities by Life Path Number',
    description: 'A comprehensive list of celebrities organized by their numerology life path numbers.',
    numberOfItems: 11,
    itemListElement: Object.entries(CELEBRITIES).map(([path, data], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: data.name,
        description: data.description,
    })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Which celebrities are Life Path 1?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Famous Life Path 1 celebrities include Martin Luther King Jr., Steve Jobs, Lady Gaga, and Scarlett Johansson. Life Path 1s are natural born leaders.',
            },
        },
        {
            '@type': 'Question',
            name: 'What life path number has the most famous people?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Life Path numbers 1, 5, and 8 tend to have many famous people, as these paths are associated with leadership, freedom, and power respectively.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I find out which celebrity shares my life path?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! Calculate your life path number using your birthdate, then find celebrities on this page who share your number.',
            },
        },
    ],
};

export default function CelebrityNumerologyPage() {

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                            Celebrity Life Paths
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary font-bold tracking-tighter mb-4">
                            Famous Numerology
                        </h1>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            Discover which celebrities share your life path number. See the patterns that connect
                            famous leaders, artists, and visionaries.
                        </p>
                    </header>

                    {/* Life Path Grid */}
                    <div className="space-y-8">
                        {Object.entries(CELEBRITIES).map(([path, data]) => (
                            <section
                                key={path}
                                className="p-6 md:p-8 rounded-3xl bg-card border border-default hover:border-amber-500/30 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-amber-400">{path}</span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-primary">{data.name}</h2>
                                            <p className="text-muted text-sm">{data.description}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/meaning/life-path/life-path-${path}`}
                                        className="text-amber-400 hover:text-amber-300 text-sm font-medium"
                                    >
                                        View Life Path {path} →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {data.celebrities.map((celeb, i) => (
                                        <div
                                            key={i}
                                            className="p-4 rounded-xl bg-elevated/50 border border-default/50"
                                        >
                                            <div className="text-primary font-medium mb-1">{celeb.name}</div>
                                            <div className="text-muted text-xs mb-2">{celeb.known}</div>
                                            <div className="text-muted text-xs">{celeb.birthday}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <section className="mt-16 max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-primary mb-4">What's Your Life Path?</h2>
                        <p className="text-secondary mb-6">
                            Calculate your life path number and discover which celebrities share your numerological destiny.
                        </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/calculator"
                                    className="px-8 py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
                                >
                                    Calculate Your Number
                                </Link>
                            <div className="flex-1 min-w-[240px]">
                                <MeaningPaidCTA />
                            </div>
                            </div>
                    </section>

                    <section className="mt-10 max-w-2xl mx-auto">
                        <AffiliatePromo offer={OFFERS.affiliate_moon_reading} context="Personalized Astrology" />
                    </section>
                </div>
            </main>
        </>
    );
}
