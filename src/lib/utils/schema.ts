/**
 * JSON-LD Schema Generator for SEO Rich Snippets
 * Generates FAQ and Article schema for better Google search visibility
 */

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
}

interface AngelNumberData {
  number: number;
  meaning: string;
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
  baseUrl: string = "https://yoursite.com"
): {
  faq: object;
  article: object;
  breadcrumb: object;
} {
  const pageUrl = `${baseUrl}/meaning/angel-number/${data.number}`;
  const faqs = generateDefaultFAQs(data);

  return {
    faq: generateFAQSchema(faqs),
    article: generateArticleSchema({
      title: `Angel Number ${data.number} Meaning: 2026 Predictions for Love & Career`,
      description: `Discover the hidden spiritual meaning of angel number ${data.number}. ${data.meaning} Learn how it affects your twin flame union and career in 2026.`,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString()
    }),
    breadcrumb: generateBreadcrumbSchema([
      { name: "Home", url: baseUrl },
      { name: "Angel Numbers", url: `${baseUrl}/angel-numbers` },
      { name: `Angel Number ${data.number}`, url: pageUrl }
    ])
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
