import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Test = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames, width, height } = useVideoConfig();
    const opacity1 = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: "clamp",
    });
    const scale = spring({
        fps,
        frame,
    });

    const Title: React.FC<{ title: string }> = ({ title }) => {
        const frame = useCurrentFrame();
        const opacity = interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: 'clamp',
        });

        return (
            <div style={{ opacity, textAlign: 'center', fontSize: '1em' }}>{title}</div>
        );
    };

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                fontSize: 100,
                backgroundColor: "white",
            }}
        >
            <div style={{ position: 'relative', height: 120, width: '100%' }}>
                <Sequence durationInFrames={40}>
                    <Title title="Hello" />
                </Sequence>
                <Sequence from={40}>
                    <Title title="World" />
                </Sequence>
            </div>
            <div>The current frame is {frame},This {width}x{height}px video is {durationInFrames / fps} seconds long.</div>
            <div style={{ opacity: opacity1 }}>Fade In</div>
            <div
                style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "1em",
                }}
            >
            </div>
            <div style={{ transform: `scale(${scale})` }}>Spring animations</div>
        </AbsoluteFill>
    );
};