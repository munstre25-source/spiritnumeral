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

export async function trackEvent(eventType: string, payload: Record<string, any> = {}) {
  try {
    const sessionId = getSessionId();
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        sessionId,
        ...payload,
      }),
      keepalive: true,
    });
  } catch {
    // no-op
  }
}
