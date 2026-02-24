import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Test = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const progress = frame / durationInFrames;
    const angle = interpolate(progress, [0, 1], [-35, 35]);
    const tilt = 8;
    const scale = 1.05;

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                background: "radial-gradient(circle at 50% 40%, #f7fbff 0%, #e7f0ff 55%, #d5e4ff 100%)",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "120%",
                    height: "35%",
                    background: "radial-gradient(circle at 50% 0%, #7fbd5a 0%, #5fa04a 50%, #4d8f3e 100%)",
                    filter: "blur(0.5px)",
                }}
            />

            <div
                style={{
                    width: 600,
                    height: 600,
                    perspective: 1200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 420,
                        height: 520,
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${angle}deg) rotateX(${tilt}deg) scale(${scale})`,
                        transition: "transform 0.1s linear",
                        filter: "drop-shadow(0 22px 24px rgba(0,0,0,0.2))",
                    }}
                >
                    <svg width="420" height="520" viewBox="0 0 420 520">
                        <defs>
                            <radialGradient id="canopy" cx="50%" cy="35%" r="60%">
                                <stop offset="0%" stopColor="#b5f2a5" />
                                <stop offset="55%" stopColor="#57c157" />
                                <stop offset="100%" stopColor="#2f8f3b" />
                            </radialGradient>
                            <linearGradient id="trunk" x1="0" x2="1">
                                <stop offset="0%" stopColor="#7a4a2a" />
                                <stop offset="45%" stopColor="#a46a3a" />
                                <stop offset="100%" stopColor="#5e3a21" />
                            </linearGradient>
                            <radialGradient id="light" cx="35%" cy="25%" r="70%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                                <stop offset="70%" stopColor="rgba(255,255,255,0)" />
                            </radialGradient>
                        </defs>

                        <ellipse cx="210" cy="470" rx="130" ry="26" fill="rgba(0,0,0,0.18)" />

                        <g transform="translate(0,20)">
                            <path
                                d="M200 380 C190 310 195 250 185 200 C175 150 190 110 210 80 C230 110 245 150 235 200 C225 250 230 310 220 380 Z"
                                fill="url(#trunk)"
                            />
                            <rect x="198" y="330" width="24" height="40" rx="10" fill="rgba(0,0,0,0.12)" />
                        </g>

                        <g>
                            <ellipse cx="210" cy="170" rx="140" ry="110" fill="url(#canopy)" />
                            <ellipse cx="135" cy="200" rx="95" ry="80" fill="url(#canopy)" />
                            <ellipse cx="290" cy="205" rx="95" ry="80" fill="url(#canopy)" />
                            <ellipse cx="210" cy="250" rx="130" ry="95" fill="url(#canopy)" />
                            <ellipse cx="210" cy="190" rx="150" ry="120" fill="url(#light)" />
                        </g>

                        <g opacity="0.9">
                            <circle cx="120" cy="190" r="10" fill="#2d7c36" />
                            <circle cx="310" cy="220" r="8" fill="#2d7c36" />
                            <circle cx="260" cy="150" r="6" fill="#2d7c36" />
                            <circle cx="170" cy="260" r="7" fill="#2d7c36" />
                        </g>
                    </svg>
                </div>
            </div>
        </AbsoluteFill>
    );
};