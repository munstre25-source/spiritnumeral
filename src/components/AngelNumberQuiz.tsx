'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PsychicPromo } from '@/components/PsychicPromo';

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "How often do you notice repeating numbers?",
        options: [
            { text: "Multiple times a day", score: 3 },
            { text: "A few times a week", score: 2 },
            { text: "Occasionally", score: 1 },
            { text: "Rarely, but when I do it feels significant", score: 2 },
        ]
    },
    {
        id: 2,
        question: "Where do you most often see these numbers?",
        options: [
            { text: "Clocks and timestamps", value: 'time', score: 1 },
            { text: "License plates and addresses", value: 'physical', score: 1 },
            { text: "Phone numbers and receipts", value: 'transaction', score: 1 },
            { text: "Everywhere - it's uncanny!", value: 'all', score: 3 },
        ]
    },
    {
        id: 3,
        question: "What's happening in your life right now?",
        options: [
            { text: "Major life transition", value: 'transition', patterns: [111, 555, 999] },
            { text: "Seeking love or relationship clarity", value: 'love', patterns: [222, 444, 666] },
            { text: "Career or financial decisions", value: 'career', patterns: [333, 888, 1111] },
            { text: "Spiritual awakening or growth", value: 'spiritual', patterns: [777, 1111, 2222] },
        ]
    },
    {
        id: 4,
        question: "Which number pattern catches your attention most?",
        options: [
            { text: "Repeating digits (111, 222, 333)", value: 'repeating', patterns: [111, 222, 333] },
            { text: "Mirror numbers (121, 1221)", value: 'mirror', patterns: [121, 212, 1221] },
            { text: "Sequential (123, 456)", value: 'sequential', patterns: [123, 456, 789] },
            { text: "I notice all kinds", value: 'all', patterns: [111, 777, 1111] },
        ]
    },
    {
        id: 5,
        question: "How do you feel when you see these numbers?",
        options: [
            { text: "Reassured and comforted", feeling: 'peace', patterns: [222, 444, 888] },
            { text: "Excited and energized", feeling: 'energy', patterns: [111, 333, 555] },
            { text: "Curious and intrigued", feeling: 'curious', patterns: [777, 1111] },
            { text: "Like I need to pay attention", feeling: 'alert', patterns: [999, 1111, 2222] },
        ]
    }
];

export function AngelNumberQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [suggestedNumbers, setSuggestedNumbers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);

        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate results
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (finalAnswers: number[]) => {
        const patternCounts: Record<number, number> = {};

        // Collect patterns from answers
        finalAnswers.forEach((answerIndex, questionIndex) => {
            const option = QUIZ_QUESTIONS[questionIndex].options[answerIndex];
            const patterns = (option as any).patterns || [111, 222, 333, 444];
            patterns.forEach((p: number) => {
                patternCounts[p] = (patternCounts[p] || 0) + 1;
            });
        });

        // Sort by frequency and get top 3
        const sorted = Object.entries(patternCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([num]) => parseInt(num));

        setSuggestedNumbers(sorted.length > 0 ? sorted : [111, 222, 333]);
        setShowResult(true);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        setSuggestedNumbers([]);
    };

    if (showResult) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="p-8 rounded-3xl bg-card border border-default border border-amber-500/20">
                    <div className="text-center mb-8">
                        <div className="text-sm uppercase tracking-widest text-amber-600 mb-2">Your Numbers</div>
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            The Universe is Speaking Through These Numbers
                        </h2>
                    </div>

                    {/* Suggested Numbers */}
                    <div className="flex justify-center gap-4 mb-8 flex-wrap">
                        {suggestedNumbers.map((num, i) => (
                            <Link
                                key={num}
                                href={`/meaning/angel-number/${num}`}
                                className="group"
                            >
                                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all group-hover:scale-105 ${i === 0
                                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                                        : 'bg-elevated text-amber-600 border border-default'
                                    }`}>
                                    {num}
                                </div>
                                <div className="text-center mt-2 text-xs text-muted">
                                    {i === 0 ? 'Primary' : 'Secondary'}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <p className="text-secondary text-center mb-8">
                        Based on your answers, <span className="text-amber-600 font-semibold">{suggestedNumbers[0]}</span> is
                        your primary angel number right now. This number carries an important message for your current life situation.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link
                            href={`/meaning/angel-number/${suggestedNumbers[0]}`}
                            className="py-4 px-6 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors text-center"
                        >
                            Explore {suggestedNumbers[0]}&apos;s Meaning
                        </Link>
                        <button
                            onClick={restartQuiz}
                            className="py-4 px-6 bg-elevated border border-default text-secondary font-medium rounded-xl hover:bg-elevated transition-colors"
                        >
                            Take Quiz Again
                        </button>
                    </div>
                    <div className="mt-8">
                        <PsychicPromo
                            contextualLine="Want one clear answer? A short psychic reading can add clarity."
                            label="Psychic After Results"
                        />
                    </div>
                </div>
            </div>
        );
    }

    const question = QUIZ_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-muted mb-2">
                    <span>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-elevated rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="p-8 rounded-3xl bg-card border border-default">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                    {question.question}
                </h2>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="w-full p-4 rounded-xl bg-elevated/50 border border-default text-left text-secondary hover:border-amber-500/50 hover:bg-elevated transition-all"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
