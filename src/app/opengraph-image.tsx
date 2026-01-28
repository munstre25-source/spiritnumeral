import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Spirit Numeral - Angel Number Meanings';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
                {/* Decorative elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                    }}
                />

                {/* Logo - Spiritual Star Design */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '40px',
                    }}
                >
                    {/* Icon matching favicon */}
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, #0c0a11 0%, #111827 45%, #1f2937 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            border: '2px solid rgba(251, 191, 36, 0.3)',
                        }}
                    >
                        {/* Star glow */}
                        <div
                            style={{
                                position: 'absolute',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
                            }}
                        />
                        {/* Star symbol */}
                        <span style={{ fontSize: '48px', zIndex: 10 }}>✦</span>
                    </div>
                    <span
                        style={{
                            fontSize: '48px',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        Spirit Numeral
                    </span>
                </div>

                {/* Main text */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to bottom, #fef3c7, #f59e0b)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            lineHeight: 1.1,
                        }}
                    >
                        Discover Your
                    </h1>
                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to bottom, #f59e0b, #d97706)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            lineHeight: 1.1,
                        }}
                    >
                        Angel Number Meaning
                    </h1>
                </div>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: '28px',
                        color: '#a1a1aa',
                        marginTop: '24px',
                        textAlign: 'center',
                    }}
                >
                    2,223 Angel Numbers • Love • Career • Twin Flames
                </p>
            </div>
        ),
        { ...size }
    );
}
