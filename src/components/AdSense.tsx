'use client';

import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-1694972681105314';
const AD_SLOT = '9924832028';

type AdSenseProps = {
  /** Optional slot override for multiple ad units */
  slot?: string;
  className?: string;
};

export default function AdSense({ slot = AD_SLOT, className }: AdSenseProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || pushedRef.current || !insRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // Ad block or script not loaded
    }
  }, []);

  return (
    <div className={className} aria-label="Advertisement">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
