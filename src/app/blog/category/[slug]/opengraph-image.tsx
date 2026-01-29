import { ImageResponse } from 'next/og';
import { BLOG_CATEGORIES } from '@/lib/blog-data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const slugifyCategory = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const resolveCategory = (slug: string) =>
  BLOG_CATEGORIES.find((cat) => slugifyCategory(cat) === slug && cat !== 'All') || 'Numerology';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = resolveCategory(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #1f2937 100%)',
          fontFamily: 'system-ui, sans-serif',
          color: '#fff',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.2), transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 80% 70%, rgba(251, 191, 36, 0.15), transparent 50%)',
          }}
        />
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', color: '#a7f3d0' }}>
          Spirit Numeral Blog
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            marginTop: 20,
            textAlign: 'center',
            background: 'linear-gradient(to bottom, #fef3c7, #f59e0b)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {category}
        </div>
        <div style={{ fontSize: 24, marginTop: 24, color: '#d4d4d8' }}>
          Insights, meanings, and guidance
        </div>
      </div>
    ),
    { ...size }
  );
}
