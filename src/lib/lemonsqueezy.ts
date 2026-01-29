import crypto from 'crypto';

const LEMON_API_BASE = 'https://api.lemonsqueezy.com/v1';

type ProductType = 'blueprint' | 'relationship' | 'wealth' | 'bundle';

export interface CheckoutMetadata {
  numbers?: number[];
  birthdays?: string[];
  quizAnswers?: any;
  email?: string;
  product?: string;
  nameNumbers?: {
    fullName?: string;
    expression?: number;
    soulUrge?: number;
    personality?: number;
  };
  personalTiming?: {
    birthdate?: string;
    targetDate?: string;
    personalYear?: number;
    personalMonth?: number;
    personalDay?: number;
  };
  lifecycle?: {
    type?: 'pinnacle' | 'challenge' | 'maturity' | 'birthday' | 'karmic_debt';
    number?: number;
  };
  compatibility?: {
    score: number;
    description?: string;
  };
  name?: string;
  focus?: 'love' | 'career' | 'spiritual' | 'money' | 'healing';
  feeling?: 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken';
  timeHorizon?: '7d' | '30d' | '90d';
  relationshipStatus?: 'single' | 'dating' | 'committed' | 'situationship' | 'separated';
  challenge?: string;
}

function getVariantId(product: ProductType) {
  const blueprint = process.env.LEMON_VARIANT_BLUEPRINT;
  const relationship = process.env.LEMON_VARIANT_RELATIONSHIP;
  const wealth = process.env.LEMON_VARIANT_WEALTH;
  const bundle = process.env.LEMON_VARIANT_BUNDLE;

  if (product === 'blueprint' && blueprint) return blueprint;
  if (product === 'relationship' && relationship) return relationship;
  if (product === 'wealth' && wealth) return wealth;
  if (product === 'bundle' && bundle) return bundle;
  throw new Error('Missing Lemon Squeezy variant environment variables.');
}

export async function createCheckout(product: ProductType, metadata: CheckoutMetadata, successUrl?: string, cancelUrl?: string) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  if (!apiKey || !storeId) {
    throw new Error('Missing Lemon Squeezy API credentials.');
  }

  const variantId = getVariantId(product);
  const redirectUrl = successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || ''}/thank-you`;

  const custom: Record<string, string> = {};
  Object.entries(metadata || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'string') {
      if (value.trim().length === 0) return;
      custom[key] = value;
      return;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      custom[key] = String(value);
      return;
    }
    custom[key] = JSON.stringify(value);
  });

  const email = typeof metadata.email === 'string' && metadata.email.includes('@') ? metadata.email : undefined;

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          ...(email ? { email } : {}),
          custom,
        },
        checkout_options: {
          embed: true,
          media: false,
          logo: false,
        },
        product_options: {
          redirect_url: redirectUrl,
          enabled_variants: [parseInt(variantId, 10)].filter((id) => !Number.isNaN(id)),
        },
      },
      relationships: {
        store: {
          data: { type: 'stores', id: storeId },
        },
        variant: {
          data: { type: 'variants', id: variantId },
        },
      },
    },
  };

  const res = await fetch(`${LEMON_API_BASE}/checkouts`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lemon Squeezy checkout error: ${res.status} ${text}`);
  }

  const json = await res.json();
  const url = json?.data?.attributes?.url as string | undefined;
  if (!url) throw new Error('Invalid Lemon Squeezy response (no URL).');
  return url;
}

export function verifyLemonSignature(payload: string, signature: string | null | undefined) {
  const secret = process.env.LEMONSQUEEZY_SIGNING_SECRET;
  if (!secret || !signature) return false;
  const digest = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export interface LemonOrderPayload {
  meta?: { event_name?: string };
  data?: any;
}

export function extractOrderEmail(payload: any): string | null {
  return payload?.data?.attributes?.user_email || payload?.data?.attributes?.customer_email || null;
}

export function extractCustomData(payload: any): CheckoutMetadata | undefined {
  return payload?.data?.attributes?.checkout_data?.custom;
}
