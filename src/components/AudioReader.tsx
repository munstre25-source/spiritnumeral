'use client';

import { useState, useEffect, useRef } from 'react';

interface AudioReaderProps {
    text: string;
    title?: string;
}

export function AudioReader({ text, title }: AudioReaderProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [progress, setProgress] = useState(0);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const textRef = useRef(text);

    useEffect(() => {
        setIsSupported('speechSynthesis' in window);
        textRef.current = text;
    }, [text]);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handlePlay = () => {
        if (!isSupported) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
            return;
        }

        // Cancel any existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textRef.current);
        utteranceRef.current = utterance;

        // Configure voice settings for a calm, meditative feel
        utterance.rate = 0.9; // Slightly slower for spiritual content
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to select a good voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            v.name.includes('Female') ||
            v.name.includes('Samantha') ||
            v.name.includes('Google UK English Female')
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // Track progress (approximate)
        const words = textRef.current.split(' ').length;
        const estimatedDuration = (words / 150) * 60 * 1000; // ~150 words per minute
        let startTime = Date.now();

        const progressInterval = setInterval(() => {
            if (isPlaying && !isPaused) {
                const elapsed = Date.now() - startTime;
                setProgress(Math.min((elapsed / estimatedDuration) * 100, 100));
            }
        }, 500);

        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
            startTime = Date.now();
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
            clearInterval(progressInterval);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
            clearInterval(progressInterval);
        };

        window.speechSynthesis.speak(utterance);
    };

    const handlePause = () => {
        if (!isPlaying) return;
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(0);
    };

    if (!isSupported) {
        return null; // Graceful degradation - don't show if not supported
    }

    return (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-default">
            {/* Play/Pause Button */}
            <button
                onClick={isPlaying ? handlePause : handlePlay}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying
                        ? 'bg-amber-500 text-black'
                        : 'bg-elevated text-secondary hover:bg-elevated hover:text-amber-600'
                    }`}
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                )}
            </button>

            {/* Progress and Label */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-secondary text-sm">
                        {title || 'Listen to this reading'}
                    </span>
                    {(isPlaying || isPaused) && (
                        <button
                            onClick={handleStop}
                            className="text-muted hover:text-secondary text-xs"
                        >
                            Stop
                        </button>
                    )}
                </div>
                <div className="h-1 bg-elevated rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Status indicator */}
            {isPlaying && (
                <div className="flex gap-0.5">
                    <span className="w-1 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
            )}
        </div>
    );
}

// Compact version for inline use
export function AudioReaderCompact({ text }: { text: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        setIsSupported('speechSynthesis' in window);
    }, []);

    const togglePlay = () => {
        if (!isSupported) return;

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    if (!isSupported) return null;

    return (
        <button
            onClick={togglePlay}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${isPlaying
                    ? 'bg-amber-500/20 text-amber-600 border border-amber-500/30'
                    : 'bg-card text-secondary border border-default hover:text-amber-600 hover:border-amber-500/50'
                }`}
        >
            {isPlaying ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                    <span>Stop</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                    <span>Listen</span>
                </>
            )}
        </button>
    );
}
