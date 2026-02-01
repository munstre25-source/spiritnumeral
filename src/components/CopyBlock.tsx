'use client';

import { useState } from 'react';

export interface CopyBlockProps {
  /** Text to copy to clipboard. */
  text: string;
  /** Optional label shown above the block (e.g. "One-liner"). */
  label?: string;
  /** Optional class for the container. */
  className?: string;
  /** Children: the visible block content (paragraph or pre). */
  children: React.ReactNode;
}

export function CopyBlock({ text, label, className = '', children }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{label}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 rounded-lg border border-default bg-elevated text-secondary hover:border-amber-500/50 hover:text-primary transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <div className="p-4 rounded-xl bg-page/60 border border-default text-secondary text-sm leading-relaxed">
        {children}
      </div>
      {!label && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 text-xs px-2 py-1 rounded border border-default bg-elevated/80 text-muted hover:border-amber-500/50 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
    </div>
  );
}
