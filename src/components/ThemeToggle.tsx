'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [mounted, setMounted] = useState(false)

    // Load theme from localStorage on mount
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.classList.toggle('light', savedTheme === 'light')
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const initialTheme = prefersDark ? 'dark' : 'light'
            setTheme(initialTheme)
            document.documentElement.classList.toggle('light', initialTheme === 'light')
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')
    }

    // Prevent flash of unstyled content
    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full bg-elevated border border-default" />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-elevated border border-default flex items-center justify-center
                 hover:border-amber-500/50 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <Sun className={`w-4 h-4 text-amber-600 ${theme === 'dark' ? 'block' : 'hidden'}`} />
            <Moon className={`w-4 h-4 text-primary ${theme === 'light' ? 'block' : 'hidden'}`} />
        </button>
    )
}
