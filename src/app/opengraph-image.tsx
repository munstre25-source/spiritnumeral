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

                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '40px',
                    }}
                >
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                    >
                        S
                    </div>
                    <span
                        style={{
                            fontSize: '40px',
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
