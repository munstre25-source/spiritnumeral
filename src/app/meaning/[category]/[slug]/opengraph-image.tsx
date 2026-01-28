import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Angel Number Meaning';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;

    const isLifePath = category === 'life-path';
    const displayText = isLifePath
        ? `Life Path ${slug.replace('life-path-', '')}`
        : `Angel Number ${slug}`;
    const subtitle = isLifePath
        ? 'Personality • Love • Career Insights'
        : 'Love • Twin Flame • Career • Money';

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
                    background: 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #1c1917 100%)',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Decorative gradient orbs */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-100px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    }}
                />

                {/* Badge */}
                <div
                    style={{
                        display: 'flex',
                        padding: '12px 24px',
                        borderRadius: '999px',
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#f59e0b',
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '32px',
                    }}
                >
                    {isLifePath ? '✨ Life Path Wisdom' : '✨ Angel Number Guidance'}
                </div>

                {/* Main number */}
                <div
                    style={{
                        fontSize: '140px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(to bottom, #fef3c7 0%, #f59e0b 50%, #d97706 100%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1,
                        marginBottom: '16px',
                    }}
                >
                    {displayText}
                </div>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: '32px',
                        color: '#a1a1aa',
                        margin: 0,
                    }}
                >
                    {subtitle}
                </p>

                {/* Branding */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}
                >
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                    >
                        S
                    </div>
                    <span
                        style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#71717a',
                        }}
                    >
                        spiritnumeral.com
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
