/**
 * Angel Number Content Generator
 * Generates unique, meaningful content for numbers 0-9999
 * Based on numerology principles: digit reduction, individual digit meanings, patterns
 */

const fs = require('fs');
const path = require('path');

// Core digit meanings in numerology
const digitMeanings = {
    0: { essence: 'infinite potential', energy: 'wholeness', theme: 'divine source and eternal cycles' },
    1: { essence: 'new beginnings', energy: 'leadership', theme: 'independence and manifestation power' },
    2: { essence: 'balance', energy: 'partnership', theme: 'harmony and divine relationships' },
    3: { essence: 'creativity', energy: 'expression', theme: 'joy, growth, and creative manifestation' },
    4: { essence: 'stability', energy: 'foundation', theme: 'hard work and building lasting structures' },
    5: { essence: 'change', energy: 'freedom', theme: 'adventure and transformative experiences' },
    6: { essence: 'love', energy: 'nurturing', theme: 'family, home, and unconditional love' },
    7: { essence: 'spirituality', energy: 'wisdom', theme: 'inner knowledge and spiritual awakening' },
    8: { essence: 'abundance', energy: 'power', theme: 'material success and karmic balance' },
    9: { essence: 'completion', energy: 'humanitarian', theme: 'endings, wisdom, and service to others' },
};

// Life areas for more varied content
const lifeAreas = {
    love: ['romantic connections', 'heart matters', 'soul bonds', 'love life', 'relationships'],
    career: ['professional path', 'work life', 'career journey', 'vocational calling', 'financial success'],
    twin_flame: ['twin flame journey', 'soul mirror', 'divine counterpart', 'spiritual union', 'twin flame connection'],
    money: ['financial abundance', 'wealth flow', 'prosperity', 'monetary blessings', 'material abundance'],
    soulmate: ['soulmate connection', 'destined love', 'soul partnership', 'divine match', 'karmic love'],
};

// Reduce number to single digit (numerology root)
function reduceToDigit(num) {
    let sum = num;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return sum;
}

// Get all digits of a number
function getDigits(num) {
    return num.toString().split('').map(d => parseInt(d));
}

// Check for repeating patterns
function hasRepeatingDigits(num) {
    const str = num.toString();
    return /(.)\1+/.test(str);
}

// Check for sequential patterns
function hasSequentialPattern(num) {
    const str = num.toString();
    for (let i = 0; i < str.length - 1; i++) {
        if (Math.abs(parseInt(str[i]) - parseInt(str[i + 1])) !== 1) return false;
    }
    return str.length > 1;
}

// Generate meaning based on number composition
function generateMeaning(num) {
    const digits = getDigits(num);
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    const uniqueDigits = [...new Set(digits)];
    const digitDescriptions = uniqueDigits.map(d => digitMeanings[d].essence).join(', ');
    const isPalindrome = num.toString() === num.toString().split('').reverse().join('');
    const parity = num % 2 === 0 ? 'even' : 'odd';

    let pattern = '';
    if (hasRepeatingDigits(num)) {
        pattern = 'The repeating digits amplify its power. ';
    } else if (hasSequentialPattern(num)) {
        pattern = 'The sequential pattern indicates progressive spiritual growth. ';
    } else if (isPalindrome) {
        pattern = 'The mirrored pattern reflects inner alignment and karmic feedback. ';
    }

    const templates = [
        `Angel number ${num} carries the vibration of ${rootInfo.theme}. ${pattern}This ${parity} number combines ${digitDescriptions}, creating a message about ${rootInfo.essence} in your life. When you see ${num}, your angels are signaling alignment with your highest path.`,
        `When ${num} appears repeatedly, it's a divine message about ${rootInfo.essence}. ${pattern}The blend of ${digitDescriptions} suggests that ${rootInfo.theme} is unfolding. Trust that your angels are guiding you toward your next step.`,
        `The spiritual significance of ${num} relates to ${rootInfo.theme}. ${pattern}This number blends ${digitDescriptions}, reminding you that the universe supports your journey. Seeing ${num} confirms you're on the right path.`,
        `Angel number ${num} points to ${rootInfo.theme}. ${pattern}Its ${parity} vibration and digit mix (${digitDescriptions}) emphasize ${rootInfo.essence}. Use this signal to move with clarity and intention.`,
    ];

    return templates[num % templates.length];
}

// Generate love content
function generateLove(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];
    const area = lifeAreas.love[num % lifeAreas.love.length];

    const templates = [
        `In matters of ${area}, angel number ${num} brings a message of ${rootInfo.essence}. Your angels are guiding you toward deeper emotional connections. This number suggests that ${rootInfo.theme} will positively transform your love life. Open your heart to receive the romantic blessings heading your way.`,
        `Angel number ${num} in love signals ${rootInfo.essence} and ${rootInfo.energy} energy entering your ${area}. Whether single or partnered, this number indicates positive shifts in how you give and receive love. Trust the divine timing of your romantic journey.`,
        `For your ${area}, ${num} represents ${rootInfo.theme}. Your guardian angels want you to know that love aligned with your soul's purpose is within reach. Embrace ${rootInfo.essence} as you navigate your romantic path.`,
    ];

    return templates[num % templates.length];
}

// Generate career content
function generateCareer(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];
    const area = lifeAreas.career[num % lifeAreas.career.length];

    const templates = [
        `Angel number ${num} brings powerful energy to your ${area}. The message centers on ${rootInfo.essence} and ${rootInfo.theme}. Your professional path is being divinely guided toward opportunities that align with your soul's mission.`,
        `In your ${area}, ${num} signals that ${rootInfo.essence} is key to your success. The ${rootInfo.energy} energy of this number supports bold career moves and financial decisions. Trust your instincts about professional opportunities.`,
        `Regarding your ${area}, angel number ${num} emphasizes ${rootInfo.theme}. Your angels are opening doors that align with your highest potential. Stay focused on ${rootInfo.essence} as you advance professionally.`,
    ];

    return templates[num % templates.length];
}

// Generate twin flame content
function generateTwinFlame(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];
    const area = lifeAreas.twin_flame[num % lifeAreas.twin_flame.length];

    const templates = [
        `For your ${area}, angel number ${num} carries profound significance. This number suggests that ${rootInfo.essence} is central to your twin flame experience. Whether in separation or union, ${rootInfo.theme} is guiding this sacred connection.`,
        `Angel number ${num} in your ${area} indicates ${rootInfo.energy} energy is at work. The theme of ${rootInfo.essence} applies to both you and your divine counterpart. Trust the spiritual process unfolding between you.`,
        `In matters of your ${area}, ${num} signifies ${rootInfo.theme}. Your angels are supporting the evolution of this profound soul bond. Embrace ${rootInfo.essence} on this transformative journey.`,
    ];

    return templates[num % templates.length];
}

// Generate money content
function generateMoney(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];
    const area = lifeAreas.money[num % lifeAreas.money.length];

    const templates = [
        `Angel number ${num} brings positive energy to your ${area}. Through ${rootInfo.essence}, financial blessings are aligning with your path. The universe supports your journey toward ${rootInfo.theme} in material matters.`,
        `For ${area}, ${num} signals that ${rootInfo.energy} energy is attracting opportunities. Focus on ${rootInfo.essence} as you make financial decisions. Your angels are guiding you toward sustainable wealth.`,
        `Regarding ${area}, angel number ${num} emphasizes ${rootInfo.theme}. Abundance flows to those who align with ${rootInfo.essence}. Trust that your financial needs are being divinely supported.`,
    ];

    return templates[num % templates.length];
}

// Generate soulmate content
function generateSoulmate(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];
    const area = lifeAreas.soulmate[num % lifeAreas.soulmate.length];

    const templates = [
        `Angel number ${num} brings hope for your ${area}. The energy of ${rootInfo.essence} is preparing you for deep, meaningful love. Whether you've met your soulmate or await their arrival, ${rootInfo.theme} guides this sacred connection.`,
        `In your search for ${area}, ${num} signals divine timing at work. ${rootInfo.energy} energy surrounds your love life, drawing compatible souls into your orbit. Trust in ${rootInfo.essence} as love unfolds.`,
        `For your ${area}, angel number ${num} represents ${rootInfo.theme}. Your angels confirm that deep, lasting love aligned with your soul's purpose is possible. Embrace ${rootInfo.essence} in matters of the heart.`,
    ];

    return templates[num % templates.length];
}

// Generate pregnancy content
function generatePregnancy(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    const templates = [
        `Angel number ${num} carries ${rootInfo.essence} energy for fertility and new life. Whether you're trying to conceive or already expecting, this number brings blessings of ${rootInfo.theme}. Your angels are supporting your journey to parenthood.`,
        `For pregnancy and fertility, ${num} signals ${rootInfo.energy} energy is at work. The theme of ${rootInfo.essence} applies to conception and creation. Trust divine timing in your family planning journey.`,
        `In matters of pregnancy, angel number ${num} represents ${rootInfo.theme}. New life and creation energy surrounds you. Your angels send blessings of ${rootInfo.essence} for healthy conception and pregnancy.`,
    ];

    return templates[num % templates.length];
}

// Generate breakup content
function generateBreakup(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    const templates = [
        `After a breakup, angel number ${num} brings healing energy of ${rootInfo.essence}. This ending creates space for ${rootInfo.theme} in your life. Your angels are supporting your emotional recovery and guiding you toward brighter days.`,
        `During heartbreak, ${num} signals that ${rootInfo.energy} energy supports your healing. The lesson of ${rootInfo.essence} will emerge from this experience. Trust that better love awaits beyond this ending.`,
        `If you're healing from a breakup, angel number ${num} represents ${rootInfo.theme}. Your angels assure you that this ending serves your highest good. Embrace ${rootInfo.essence} as you move forward.`,
    ];

    return templates[num % templates.length];
}

// Generate dreams content
function generateDreams(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    const templates = [
        `Seeing ${num} in dreams amplifies its spiritual message of ${rootInfo.essence}. Your subconscious is receiving guidance about ${rootInfo.theme}. Pay attention to dream symbols accompanying this number for deeper insights.`,
        `When ${num} appears in dreams, ${rootInfo.energy} energy is communicating through your subconscious. The message of ${rootInfo.essence} may be too important for waking hours alone. Journal your dreams for clarity.`,
        `Dreams featuring ${num} indicate spiritual messages about ${rootInfo.theme}. Your angels use dream state to convey ${rootInfo.essence} when you're most receptive. Trust these nocturnal insights.`,
    ];

    return templates[num % templates.length];
}

// Generate what to do content
function generateWhatToDo(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    return `When you see angel number ${num}, pause and acknowledge the message. Focus on ${rootInfo.essence} in your current situation. Practice meditation or prayer to deepen your connection with angelic guidance. Trust your intuition about next steps.`;
}

// Generate why seeing content
function generateWhySeeing(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    return `You're seeing ${num} because your angels want to communicate about ${rootInfo.theme}. This number appears when ${rootInfo.essence} is needed in your life journey. The universe is confirming you're on the right path and supported by divine guidance.`;
}

// Generate 2026 prediction
function generate2026Prediction(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    return `In 2026, angel number ${num} signals significant developments in ${rootInfo.theme}. The energy of ${rootInfo.essence} will be especially potent. Major life changes aligned with ${rootInfo.energy} energy are likely. Stay open to the opportunities this year brings.`;
}

// Generate affirmation
function generateAffirmation(num) {
    const root = reduceToDigit(num);
    const rootInfo = digitMeanings[root] || digitMeanings[root % 10];

    return `I embrace the energy of ${num}. ${rootInfo.essence.charAt(0).toUpperCase() + rootInfo.essence.slice(1)} flows through me. I am aligned with ${rootInfo.theme}. My angels guide and protect me always.`;
}

// Lucky colors based on root number
const luckyColors = {
    1: 'Gold', 2: 'Silver', 3: 'Yellow', 4: 'Green', 5: 'Blue',
    6: 'Pink', 7: 'Purple', 8: 'Black', 9: 'Red', 0: 'White',
    11: 'Platinum', 22: 'Deep Blue', 33: 'Violet'
};

// Chakras based on dominant energy
const chakras = ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];

// Generate complete angel number data
function generateAngelNumber(num) {
    const root = reduceToDigit(num);

    return {
        number: num,
        meaning: generateMeaning(num),
        love: generateLove(num),
        career: generateCareer(num),
        twin_flame: generateTwinFlame(num),
        "2026_prediction": generate2026Prediction(num),
        lucky_color: luckyColors[root] || luckyColors[root % 10],
        chakra: chakras[root % 7],
        what_to_do: generateWhatToDo(num),
        why_seeing: generateWhySeeing(num),
        misconception: `A common misconception about ${num} is that it only has one meaning. In reality, this number's message varies based on your life circumstances and spiritual readiness.`,
        money: generateMoney(num),
        pregnancy: generatePregnancy(num),
        soulmate: generateSoulmate(num),
        breakup: generateBreakup(num),
        dreams: generateDreams(num),
        affirmation: generateAffirmation(num),
    };
}

// Main execution
async function main() {
    console.log('🔮 Angel Number Content Generator');
    console.log('================================');

    // Read existing data
    const dataPath = path.join(__dirname, '../src/lib/data/spirituality-dataset.json');
    const existingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log(`📊 Existing angel numbers: ${existingData.angel_numbers.length}`);

    // Get max existing number
    const existingNumbers = new Set(existingData.angel_numbers.map(n => n.number));
    const maxExisting = Math.max(...existingNumbers);
    console.log(`📈 Highest existing number: ${maxExisting}`);

    // Generate new numbers up to 9999
    const newNumbers = [];
    for (let i = 0; i <= 9999; i++) {
        if (!existingNumbers.has(i)) {
            newNumbers.push(generateAngelNumber(i));
        }
    }

    console.log(`✨ Generated ${newNumbers.length} new angel numbers`);

    // Combine with existing
    existingData.angel_numbers = [...existingData.angel_numbers, ...newNumbers];
    existingData.angel_numbers.sort((a, b) => a.number - b.number);

    console.log(`📚 Total angel numbers: ${existingData.angel_numbers.length}`);

    // Write updated data
    fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));

    console.log('✅ Data file updated successfully!');
    console.log(`📍 Path: ${dataPath}`);
}

main().catch(console.error);
