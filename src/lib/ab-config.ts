'use client';

import { useState, useEffect } from 'react';

export type AbConfig = {
  variants: { id: string; copy: string }[];
  controlId: string;
};

let cached: AbConfig | null = null;
let promise: Promise<AbConfig> | null = null;

export function getAbConfig(): Promise<AbConfig> {
  if (cached) return Promise.resolve(cached);
  if (!promise) {
    promise = fetch('/api/ab-config?key=psychic_cta')
      .then((r) => r.json())
      .then((data) => {
        const config: AbConfig = {
          variants: Array.isArray(data.variants) ? data.variants : [],
          controlId: data.controlId || 'control',
        };
        cached = config;
        return config;
      })
      .catch(() => {
        promise = null;
        return { variants: [], controlId: 'control' };
      });
  }
  return promise;
}

export function useAbConfig(): AbConfig | null {
  const [config, setConfig] = useState<AbConfig | null>(cached);
  useEffect(() => {
    if (cached) {
      setConfig(cached);
      return;
    }
    getAbConfig().then(setConfig);
  }, []);
  return config;
}

export function getAssignedVariant(
  config: AbConfig | null,
  fallbackVariant: 'control' | 'reveal',
  fallbackCopy: string
): { variantId: string | null; copy: string } {
  if (!config?.variants?.length) {
    return {
      variantId: fallbackVariant,
      copy: fallbackVariant === 'reveal' ? 'Reveal my number →' : fallbackCopy,
    };
  }
  if (typeof window === 'undefined') {
    return { variantId: config.controlId, copy: config.variants.find((v) => v.id === config.controlId)?.copy ?? fallbackCopy };
  }
  let vid = sessionStorage.getItem('psychic_cta_variant');
  if (!vid || !config.variants.some((v) => v.id === vid)) {
    vid = config.variants[Math.floor(Math.random() * config.variants.length)].id;
    sessionStorage.setItem('psychic_cta_variant', vid);
  }
  const variant = config.variants.find((v) => v.id === vid);
  return { variantId: vid, copy: variant?.copy ?? fallbackCopy };
}
