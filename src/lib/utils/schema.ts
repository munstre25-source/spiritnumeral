/**
 * JSON-LD Schema Generator for SEO Rich Snippets
 * Generates FAQ and Article schema for better Google search visibility
 */

const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';

interface FAQItem {
  question: string;
  answer: string;
}

interface ArticleData {
  title: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  mainEntityOfPage?: string;
}

interface AngelNumberData {
  number?: number;
  path?: number | string;
  title?: string;
  traits?: string;
  meaning?: string;
  love?: string;
  career?: string;
  twin_flame?: string;
  "2026_prediction"?: string;
  what_to_do?: string;
  why_seeing?: string;
  misconception?: string;
}

/**
 * Generate FAQ Schema JSON-LD for an angel number page
 */
export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Article Schema JSON-LD for SEO
 */
export function generateArticleSchema(data: ArticleData): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "author": {
      "@type": "Organization",
      "name": data.author || "Spiritual Numerology Guide"
    },
    "datePublished": data.datePublished || new Date().toISOString(),
    "dateModified": data.dateModified || new Date().toISOString(),
    ...(data.mainEntityOfPage && { "mainEntityOfPage": data.mainEntityOfPage }),
    ...(data.image && {
      "image": {
        "@type": "ImageObject",
        "url": data.image
      }
    })
  };
}

/**
 * Generate Breadcrumb Schema JSON-LD
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate default FAQs for an angel number
 */
export function generateDefaultFAQs(data: AngelNumberData): FAQItem[] {
  const faqs: FAQItem[] = [];

  // FAQ 1: What does this number mean?
  faqs.push({
    question: `What does angel number ${data.number} mean?`,
    answer: data.meaning || `Angel number ${data.number} carries a unique spiritual message from your angels.`
  });

  // FAQ 2: Why am I seeing this number?
  if (data.why_seeing) {
    faqs.push({
      question: `Why do I keep seeing ${data.number}?`,
      answer: data.why_seeing
    });
  }

  // FAQ 3: What should I do?
  if (data.what_to_do) {
    faqs.push({
      question: `What should I do when I see angel number ${data.number}?`,
      answer: data.what_to_do
    });
  }

  // FAQ 4: Love/Twin Flame
  if (data.love || data.twin_flame) {
    faqs.push({
      question: `What does ${data.number} mean for love and twin flames?`,
      answer: data.twin_flame || data.love || `Angel number ${data.number} has significant meaning for relationships and twin flame connections.`
    });
  }

  // FAQ 5: Career
  if (data.career) {
    faqs.push({
      question: `What does ${data.number} mean for my career?`,
      answer: data.career
    });
  }

  // FAQ 6: Common misconception
  if (data.misconception) {
    faqs.push({
      question: `Is there a common misconception about angel number ${data.number}?`,
      answer: data.misconception
    });
  }

  return faqs;
}

/**
 * Generate all schemas for an angel number page
 */
export function generateAllSchemas(
  data: AngelNumberData,
  options: {
    baseUrl?: string;
    path?: string;
    breadcrumbTrail?: Array<{ name: string; url?: string }>;
    title?: string;
    description?: string;
    faqOverride?: FAQItem[];
    image?: string;
  } = {}
): {
  faq: object;
  article: object;
  breadcrumb: object;
} {
  const baseUrl = (options.baseUrl || DEFAULT_SITE_URL).replace(/\/$/, "");
  const identifier = data.number ?? data.path ?? 'page';
  const path = options.path || `/meaning/angel-number/${identifier}`;
  const pageUrl = `${baseUrl}${path}`;
  const faqs = options.faqOverride || generateDefaultFAQs(data as any);

  const articleTitle =
    options.title ||
    `Angel Number ${identifier} Meaning: 2026 Predictions for Love & Career`;

  const articleDescription =
    options.description ||
    `Discover the hidden spiritual meaning of angel number ${identifier}. ${data.meaning || data.traits || ''} Learn how it affects your twin flame union and career in 2026.`;

  const defaultTrail: Array<{ name: string; url: string }> = [
    { name: "Home", url: baseUrl },
    { name: "Angel Numbers", url: `${baseUrl}/meaning/angel-number` },
    { name: `Angel Number ${identifier}`, url: pageUrl }
  ];

  const breadcrumb = options.breadcrumbTrail?.map((item, index, arr) => ({
    name: item.name,
    url: item.url || `${baseUrl}${index === arr.length - 1 ? path : ""}`
  })) || defaultTrail;

  return {
    faq: generateFAQSchema(faqs),
    article: generateArticleSchema({
      title: articleTitle,
      description: articleDescription,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      image: options.image,
      mainEntityOfPage: pageUrl
    }),
    breadcrumb: generateBreadcrumbSchema(breadcrumb)
  };
}

/**
 * Convert schema object to JSON-LD script tag string
 */
export function schemaToScriptTag(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Generate all schema script tags for a page
 */
export function generateSchemaScriptTags(
  data: AngelNumberData,
  baseUrl?: string
): string {
  const schemas = generateAllSchemas(data, baseUrl);
  return [
    schemaToScriptTag(schemas.faq),
    schemaToScriptTag(schemas.article),
    schemaToScriptTag(schemas.breadcrumb)
  ].join("\n");
}
