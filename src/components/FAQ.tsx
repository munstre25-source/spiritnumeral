'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
}

/**
 * FAQ Component with accordion functionality
 * Displays frequently asked questions in an expandable format
 */
export default function FAQ({ faqs, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 p-8 rounded-3xl bg-card border border-default">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary font-bold">
        {title}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-default rounded-xl overflow-hidden transition-all hover:border-amber-500/30"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-elevated hover:bg-card transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-primary pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 bg-elevated border-t border-default">
                <p className="text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
