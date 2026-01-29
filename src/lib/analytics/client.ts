'use client';

export function getSessionId() {
  if (typeof window === 'undefined') return undefined;
  const key = 'spirit_session_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function getSessionFirstSeen() {
  if (typeof window === 'undefined') return undefined;
  const key = 'spirit_session_first_seen';
  let firstSeen = localStorage.getItem(key);
  if (!firstSeen) {
    firstSeen = new Date().toISOString();
    localStorage.setItem(key, firstSeen);
  }
  return firstSeen;
}

export async function trackEvent(eventType: string, payload: Record<string, any> = {}) {
  try {
    const sessionId = getSessionId();
    const sessionFirstSeen = getSessionFirstSeen();
    const url = typeof window !== 'undefined' ? window.location.href : undefined;
    const path = payload.path || (typeof window !== 'undefined' ? window.location.pathname : undefined);
    const referrer = payload.referrer || (typeof document !== 'undefined' ? document.referrer || null : null);
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        sessionId,
        sessionFirstSeen,
        url,
        path,
        referrer,
        ...payload,
      }),
      keepalive: true,
    });
  } catch {
    // no-op
  }
}
