// Run with: npx tsx scripts/populate-db.ts

const SUPABASE_URL = 'https://iygpvkrdqzksipwqrphj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Z3B2a3JkcXprc2lwd3FycGhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2NjExOSwiZXhwIjoyMDg1MTQyMTE5fQ.QVaIGUwnqB5HgwFwQ4-lJAYbWDe38faJwKD8IGd1ags';

// Meanings based on numerology principles
const digitMeanings: Record<number, { theme: string; love: string; career: string; twinFlame: string; color: string; chakra: string }> = {
    0: { theme: 'Infinite potential and divine connection', love: 'Spiritual union and unconditional love', career: 'Limitless opportunities await', twinFlame: 'Your connection transcends physical boundaries', color: 'White', chakra: 'Crown' },
    1: { theme: 'New beginnings and leadership', love: 'Taking initiative in relationships', career: 'Leadership roles and new ventures', twinFlame: 'A new chapter in your twin flame journey', color: 'Red', chakra: 'Root' },
    2: { theme: 'Balance, harmony, and partnership', love: 'Deep partnership and commitment', career: 'Collaboration brings success', twinFlame: 'Divine partnership is strengthening', color: 'Orange', chakra: 'Sacral' },
    3: { theme: 'Creativity, expression, and growth', love: 'Joyful expression in relationships', career: 'Creative projects flourishing', twinFlame: 'Communication with your twin flame deepens', color: 'Yellow', chakra: 'Solar Plexus' },
    4: { theme: 'Stability, foundation, and hard work', love: 'Building lasting relationship foundations', career: 'Solid career foundations being built', twinFlame: 'Grounding your twin flame connection', color: 'Green', chakra: 'Heart' },
    5: { theme: 'Change, freedom, and adventure', love: 'Exciting changes in love life', career: 'Career transitions and new opportunities', twinFlame: 'Transformation in your twin flame bond', color: 'Blue', chakra: 'Throat' },
    6: { theme: 'Love, nurturing, and responsibility', love: 'Nurturing and caring relationships', career: 'Service-oriented success', twinFlame: 'Unconditional love with your twin flame', color: 'Indigo', chakra: 'Third Eye' },
    7: { theme: 'Spirituality, wisdom, and introspection', love: 'Deep spiritual connection in love', career: 'Wisdom guiding career decisions', twinFlame: 'Spiritual awakening with twin flame', color: 'Violet', chakra: 'Crown' },
    8: { theme: 'Abundance, success, and karma', love: 'Abundant love and prosperity together', career: 'Financial success and recognition', twinFlame: 'Karmic balance in twin flame union', color: 'Gold', chakra: 'Solar Plexus' },
    9: { theme: 'Completion, humanitarianism, and wisdom', love: 'Completing romantic cycles', career: 'Humanitarian work and completion', twinFlame: 'Twin flame journey reaching new heights', color: 'Silver', chakra: 'Crown' },
};

const moneyMeanings = [
    'Financial abundance is aligning with your path',
    'New income opportunities are manifesting',
    'Your money mindset is attracting prosperity',
    'Financial stability is within reach',
    'Investments will yield positive returns',
    'Career advancement brings financial growth',
    'Unexpected financial blessings are coming',
    'Your hard work is attracting wealth',
    'Financial freedom is on the horizon',
    'Abundance flows freely to you',
];

const pregnancyMeanings = [
    'New life and creation energy surrounds you',
    'Fertility blessings are being sent your way',
    'Divine timing for family expansion',
    'Your body is preparing for new beginnings',
    'Maternal/paternal energy is strengthening',
    'The universe supports your family dreams',
    'New additions to your family are blessed',
    'Creation energy is at its peak',
    'Trust the divine timing of conception',
    'Angels are watching over new life',
];

const soulmateMeanings = [
    'Your soulmate connection is strengthening',
    'Divine timing is bringing your soulmate closer',
    'Soul recognition will happen soon',
    'Your heart is ready for deep connection',
    'The universe is aligning soulmate energy',
    'Past life connections are awakening',
    'Your soulmate is thinking of you',
    'Destined love is approaching',
    'Soul bonds are deepening',
    'True love recognition is near',
];

const breakupMeanings = [
    'Healing energy surrounds your heart',
    'This ending opens new beginnings',
    'Self-love is your path forward',
    'Better love is being prepared for you',
    'Release the past to embrace the future',
    'Your heart is healing and growing stronger',
    'This chapter closes for a better one to open',
    'Angels support your emotional healing',
    'Growth comes through this transition',
    'Trust that better love awaits',
];

const dreamMeanings = [
    'Pay attention to recurring dream symbols',
    'Your subconscious is sending messages',
    'Dream visitations carry important guidance',
    'Prophetic dreams may be occurring',
    'Your dreams are connected to your path',
    'Spirit guides communicate through dreams',
    'Dream journaling will reveal insights',
    'Lucid dreaming abilities are awakening',
    'Night visions contain hidden wisdom',
    'Your dreams reflect spiritual growth',
];

const affirmations = [
    'I am aligned with divine purpose and abundance',
    'I trust the universe to guide my path',
    'I am worthy of love, success, and happiness',
    'My energy attracts positive experiences',
    'I embrace change as an opportunity for growth',
    'I am connected to infinite wisdom and guidance',
    'I release fear and welcome divine blessings',
    'My life is filled with meaning and purpose',
    'I am exactly where I need to be',
    'I trust in perfect divine timing',
];

function generateMeaning(num: number): string {
    const digits = num.toString().split('').map(Number);
    const primaryDigit = digits[0];
    const base = digitMeanings[primaryDigit];

    if (num < 10) {
        return base.theme + '. This foundational number carries pure, concentrated energy.';
    }

    if (num < 100) {
        const secondDigit = digits[1];
        const secondary = digitMeanings[secondDigit];
        return `${base.theme}, combined with ${secondary.theme.toLowerCase()}. This powerful combination amplifies both energies.`;
    }

    if (digits.every(d => d === digits[0])) {
        return `${base.theme}. The repetition of ${digits[0]} creates an extremely powerful message - your angels are emphasizing this energy intensely.`;
    }

    return `${base.theme}. The sequence ${num} carries layered meanings through its component digits, creating a unique spiritual message.`;
}

function generateLove(num: number): string {
    const primary = digitMeanings[num % 10];
    return `${primary.love}. Angel number ${num} brings ${num < 100 ? 'foundational' : 'amplified'} love energy into your romantic life.`;
}

function generateCareer(num: number): string {
    const primary = digitMeanings[num % 10];
    return `${primary.career}. This number signals ${num < 100 ? 'steady progress' : 'accelerated growth'} in your professional journey.`;
}

function generateTwinFlame(num: number): string {
    const primary = digitMeanings[num % 10];
    return `${primary.twinFlame}. Angel number ${num} confirms your twin flame energy is ${num < 100 ? 'developing' : 'intensifying'}.`;
}

function generatePrediction(num: number): string {
    const themes = ['prosperity', 'growth', 'transformation', 'new opportunities', 'spiritual awakening', 'abundance', 'love', 'success', 'healing', 'manifestation'];
    const theme = themes[num % 10];
    return `2026 brings ${theme} and ${themes[(num + 3) % 10]} through this powerful number.`;
}

function getColor(num: number): string {
    return digitMeanings[num % 10].color;
}

function getChakra(num: number): string {
    return digitMeanings[num % 10].chakra;
}

function generateWhatToDo(num: number): string {
    const actions = ['meditate on this number', 'write down your goals', 'express gratitude', 'take inspired action', 'release fear', 'connect spiritually', 'trust your intuition', 'focus on abundance', 'nurture relationships', 'complete unfinished projects'];
    return `When you see ${num}, ${actions[num % 10]} and trust the process. Your angels are confirming you're on the right path.`;
}

function generateWhySeeing(num: number): string {
    const reasons = ['your angels are confirming your path', 'the universe is sending encouragement', 'your manifestations are aligning', 'spiritual guidance is heightened', 'important changes are coming', 'pay attention to your thoughts', 'your prayers have been heard', 'synchronicities are increasing', 'you are in divine alignment', 'transformation is occurring'];
    return `You're seeing ${num} because ${reasons[num % 10]}. This is divine communication.`;
}

function generateMisconception(num: number): string {
    return `Angel number ${num} is not a warning or bad omen - it's a loving message from your guardian angels guiding you toward your highest good.`;
}

function generateMoney(num: number): string {
    return moneyMeanings[num % 10] + `. Angel number ${num} brings ${num < 100 ? 'steady' : 'accelerated'} financial energy.`;
}

function generatePregnancy(num: number): string {
    return pregnancyMeanings[num % 10] + `. The energy of ${num} supports ${num < 100 ? 'natural conception' : 'divine timing for family growth'}.`;
}

function generateSoulmate(num: number): string {
    return soulmateMeanings[num % 10] + `. Angel number ${num} confirms ${num < 100 ? 'soulmate energy is present' : 'powerful soul connections are forming'}.`;
}

function generateBreakup(num: number): string {
    return breakupMeanings[num % 10] + `. Seeing ${num} during heartbreak means ${num < 100 ? 'gentle healing is coming' : 'rapid transformation through healing'}.`;
}

function generateDreams(num: number): string {
    return dreamMeanings[num % 10] + `. If ${num} appears in dreams, it carries ${num < 100 ? 'important messages' : 'amplified spiritual significance'}.`;
}

function generateAffirmation(num: number): string {
    return affirmations[num % 10] + ` I embrace the energy of ${num} and trust my angels.`;
}

function generateEntry(num: number) {
    return {
        number: num,
        meaning: generateMeaning(num),
        love: generateLove(num),
        career: generateCareer(num),
        twin_flame: generateTwinFlame(num),
        prediction_2026: generatePrediction(num),
        lucky_color: getColor(num),
        chakra: getChakra(num),
        what_to_do: generateWhatToDo(num),
        why_seeing: generateWhySeeing(num),
        misconception: generateMisconception(num),
        money: generateMoney(num),
        pregnancy: generatePregnancy(num),
        soulmate: generateSoulmate(num),
        breakup: generateBreakup(num),
        dreams: generateDreams(num),
        affirmation: generateAffirmation(num),
    };
}

async function upsertBatch(entries: any[]) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/angel_numbers`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify(entries),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to upsert: ${response.status} - ${text}`);
    }

    return response;
}

async function main() {
    console.log('🚀 Starting database population...\n');

    // Generate all numbers to add
    const numbersToAdd: number[] = [];

    // Single and double digits (0-110)
    for (let i = 0; i <= 110; i++) {
        numbersToAdd.push(i);
    }

    // Four-digit patterns
    const fourDigitPatterns = [
        1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111,
        1122, 1133, 1144, 1155, 1166, 1177, 1188, 1199,
        1200, 1212, 1221, 1234,
        1300, 1313, 1331, 1333,
        1400, 1414, 1441, 1444,
        1500, 1515, 1551, 1555,
        1600, 1616, 1661, 1666,
        1700, 1717, 1771, 1777,
        1800, 1818, 1881, 1888,
        1900, 1919, 1991, 1999,
        2000, 2002, 2020, 2022, 2100, 2112, 2121, 2200, 2211, 2222,
    ];
    numbersToAdd.push(...fourDigitPatterns);

    console.log(`📊 Preparing ${numbersToAdd.length} angel numbers...\n`);

    const entries = numbersToAdd.map(generateEntry);

    // Insert in batches
    const batchSize = 100;
    let successCount = 0;

    for (let i = 0; i < entries.length; i += batchSize) {
        const batch = entries.slice(i, i + batchSize);
        try {
            await upsertBatch(batch);
            successCount += batch.length;
            console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entries.length / batchSize)} (${successCount}/${entries.length} numbers)`);
        } catch (error) {
            console.error(`❌ Error in batch ${Math.floor(i / batchSize) + 1}:`, error);
        }
    }

    console.log(`\n🎉 Complete! Added/updated ${successCount} angel numbers.`);

    // Now update existing 111-999 numbers with new columns
    console.log('\n📝 Now updating existing numbers (111-999) with new column data...\n');

    const existingNumbers: number[] = [];
    for (let i = 111; i <= 999; i++) {
        existingNumbers.push(i);
    }

    const updateEntries = existingNumbers.map(num => ({
        number: num,
        money: generateMoney(num),
        pregnancy: generatePregnancy(num),
        soulmate: generateSoulmate(num),
        breakup: generateBreakup(num),
        dreams: generateDreams(num),
        affirmation: generateAffirmation(num),
    }));

    let updateCount = 0;
    for (let i = 0; i < updateEntries.length; i += batchSize) {
        const batch = updateEntries.slice(i, i + batchSize);
        try {
            await upsertBatch(batch);
            updateCount += batch.length;
            console.log(`✅ Updated batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(updateEntries.length / batchSize)} (${updateCount}/${updateEntries.length} numbers)`);
        } catch (error) {
            console.error(`❌ Error updating batch:`, error);
        }
    }

    console.log(`\n🎉 All done! Updated ${updateCount} existing numbers with new columns.`);
    console.log('\n📈 Your database now has maximum topical coverage!');
}

main().catch(console.error);
