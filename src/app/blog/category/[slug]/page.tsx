import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPostsByCategory } from '@/lib/blog-data';

import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';
const baseUrl = getSiteBaseUrl();
const PAGE_SIZE = 24;

const slugifyCategory = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const resolveCategory = (slug: string) =>
  BLOG_CATEGORIES.find((cat) => slugifyCategory(cat) === slug && cat !== 'All');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category} Blog | Spirit Numeral`,
    description: `Explore ${category.toLowerCase()} numerology insights, guides, and interpretations.`,
    alternates: { canonical: ensureAbsoluteUrl(baseUrl, `/blog/category/${slug}`) },
    openGraph: {
      title: `${category} Blog | Spirit Numeral`,
      description: `Explore ${category.toLowerCase()} numerology insights, guides, and interpretations.`,
      images: [`${baseUrl}/blog/category/${slug}/opengraph-image`],
    },
  };
}

export default async function BlogCategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: { page?: string; q?: string } }) {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) return notFound();

  const query = searchParams?.q?.trim() || '';
  const page = Math.max(1, Number(searchParams?.page || 1));
  const filtered = getBlogPostsByCategory(category).filter((post) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return post.title.toLowerCase().includes(q)
      || post.excerpt.toLowerCase().includes(q)
      || post.content.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = filtered.slice(start, start + PAGE_SIZE);

  const buildPageLink = (nextPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('page', String(nextPage));
    return `/blog/category/${slug}?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-primary text-sm font-medium mb-6">
            {filtered.length} {category} Articles
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-bold tracking-tighter mb-4">
            {category} Blog
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Explore in-depth {category.toLowerCase()} insights, meanings, and guidance.
          </p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm transition-all bg-card border border-default text-secondary hover:border-amber-500/50"
            >
              All Categories
            </Link>
            {BLOG_CATEGORIES.filter((cat) => cat !== 'All').map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${slugifyCategory(cat)}`}
                className={`px-4 py-2 rounded-full text-sm transition-all ${cat === category
                  ? 'bg-emerald-500 text-black font-medium'
                  : 'bg-card border border-default text-secondary hover:border-amber-500/50'
                  }`}
              >
                {cat}
              </Link>
            ))}
          </div>
          <form action={`/blog/category/${slug}`} method="get" className="flex gap-2 items-center justify-center">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search this category..."
              className="w-full md:w-72 bg-card border border-default rounded-full px-4 py-2 text-sm text-primary focus:outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
            >
              Search
            </button>
          </form>
        </div>

        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagePosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-card border border-default hover:border-amber-500/50 transition-all"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-elevated text-secondary text-xs font-medium mb-3">
                  {post.category}
                </span>
                <h3 className="font-bold text-primary group-hover:text-amber-600 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center text-xs text-muted gap-3">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              {currentPage > 1 && (
                <Link
                  href={buildPageLink(currentPage - 1)}
                  className="px-4 py-2 rounded-full border border-default text-secondary hover:border-emerald-500/60 transition"
                >
                  ← Prev
                </Link>
              )}
              <span className="text-sm text-muted">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={buildPageLink(currentPage + 1)}
                  className="px-4 py-2 rounded-full border border-default text-secondary hover:border-emerald-500/60 transition"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
