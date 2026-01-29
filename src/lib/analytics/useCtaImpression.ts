'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics/client';

type ImpressionPayload = {
  product: string;
  path?: string;
  label?: string;
};

export function useCtaImpression({ product, path, label }: ImpressionPayload) {
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current || fired.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackEvent('cta_impression', {
            product,
            path,
            metadata: { label },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product, path, label]);

  return ref;
}
