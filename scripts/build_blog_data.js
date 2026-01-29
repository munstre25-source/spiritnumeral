#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function titleCase(input) {
  return input
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function mapCategory(section) {
  const overrides = {
    'angel-numbers': 'Angel Numbers',
    'life-path': 'Life Path',
    'love-compatibility': 'Love Compatibility',
    'dream-meaning': 'Dream Meaning',
    'personal-year': 'Personal Year',
    'personal-month': 'Personal Month',
    'personal-day': 'Personal Day',
    'name-numerology': 'Name Numerology',
    'destiny-number': 'Destiny Number',
    'soul-urge-number': 'Soul Urge Number',
    'personality-number': 'Personality Number',
    'birthday-number': 'Birthday Number',
    'maturity-number': 'Maturity Number',
    'pinnacles': 'Pinnacles',
    'challenges': 'Challenges',
    'twin-flame': 'Twin Flame',
    'breakup': 'Breakup',
    'money': 'Money',
    'career': 'Career',
  };
  return overrides[section] || titleCase(section);
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function readTime(text) {
  const minutes = Math.max(6, Math.round(wordCount(text) / 180));
  return `${minutes} min read`;
}

function extractNumbers(text) {
  const matches = text.match(/\d{1,4}/g) || [];
  const nums = matches.map((m) => Number(m)).filter((n) => !Number.isNaN(n));
  return Array.from(new Set(nums)).slice(0, 8);
}

function buildExcerpt(content) {
  const clean = content.replace(/#+\s*/g, '').replace(/\n+/g, ' ').trim();
  if (clean.length <= 160) return clean;
  return clean.slice(0, 157).trimEnd() + '...';
}

function buildPosts(raw) {
  const now = new Date();
  return raw.map((item, index) => {
    const date = new Date(now.getTime() - index * 86400000);
    const isoDate = date.toISOString().slice(0, 10);
    const content = item.content || '';
    const title = item.topic || item.title || 'Numerology Insight';
    const slug = item.slug || slugify(title);
    const category = mapCategory(item.section || 'General');
    return {
      slug,
      title,
      excerpt: item.excerpt || buildExcerpt(content),
      category,
      readTime: readTime(content),
      date: isoDate,
      relatedNumbers: extractNumbers(title + ' ' + content),
      content,
    };
  });
}

function markFeatured(posts) {
  const featuredSections = new Set(['Angel Numbers', 'Life Path', 'Love Compatibility', 'Money']);
  let count = 0;
  return posts.map((post) => {
    if (count < 3 && featuredSections.has(post.category)) {
      count += 1;
      return { ...post, featured: true };
    }
    return post;
  });
}

function writeBlogData(outPath, posts) {
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort();
  const content = `// Auto-generated blog content\n// Generated: ${new Date().toISOString()}\n// Total Posts: ${posts.length}\n\nexport interface BlogPost {\n  slug: string;\n  title: string;\n  excerpt: string;\n  category: string;\n  readTime: string;\n  date: string;\n  relatedNumbers: number[];\n  content: string;\n  featured?: boolean;\n}\n\nexport const BLOG_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n\nexport const BLOG_CATEGORIES = [\n  'All',\n  ${categories.map((c) => `'${c}'`).join(',\n  ')}\n];\n\nexport function getBlogPost(slug: string): BlogPost | undefined {\n  return BLOG_POSTS.find(post => post.slug === slug);\n}\n\nexport function getBlogPostsByCategory(category: string): BlogPost[] {\n  if (category === 'All') return BLOG_POSTS;\n  return BLOG_POSTS.filter(post => post.category === category);\n}\n`;
  fs.writeFileSync(outPath, content, 'utf8');
}

function main() {
  const inArg = process.argv.find((arg) => arg.startsWith('--in='));
  const outArg = process.argv.find((arg) => arg.startsWith('--out='));
  const inputPath = inArg ? inArg.split('=')[1] : 'data/blog/blog_drafts.json';
  const outputPath = outArg ? outArg.split('=')[1] : 'src/lib/blog-data.ts';

  const raw = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const posts = markFeatured(buildPosts(raw));
  writeBlogData(outputPath, posts);
  console.log(`Generated ${posts.length} posts -> ${outputPath}`);
}

main();
