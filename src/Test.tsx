import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { LightLeak } from "@remotion/light-leaks";

export const Test = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames, width, height } = useVideoConfig();
    const linearDuration = linearTiming({ durationInFrames: 30 }).getDurationInFrames({ fps });
    const opacity1 = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: "clamp",
    });
    const scale = spring({
        fps,
        frame,
    });

    const Letter: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => {
        return (
            <div style={{ color, fontSize: 120, fontWeight: 700, textAlign: "center" }}>
                {children}
            </div>
        );
    };

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
                <div style={{ transform: `scale(${scale})` }}>Spring animations</div>
            </div>
            <div style={{ position: 'relative', height: 120, width: '100%' }}>
                <TransitionSeries>
                    <TransitionSeries.Sequence durationInFrames={40}>
                        <Letter color="#0b84f3">A</Letter>
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Transition
                        presentation={slide()}
                        timing={linearTiming({ durationInFrames: 30 })}
                    />
                    <TransitionSeries.Sequence durationInFrames={60}>
                        <Letter color="pink">B</Letter>
                    </TransitionSeries.Sequence>
                </TransitionSeries>
            </div>
            <div style={{ position: 'relative', height: 120, width: '100%' }}>
                <TransitionSeries>
                    <TransitionSeries.Sequence durationInFrames={40}>
                        <Letter color="#0b84f3">A</Letter>
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Overlay durationInFrames={20}>
                        <LightLeak />
                    </TransitionSeries.Overlay>
                    <TransitionSeries.Sequence durationInFrames={60}>
                        <Letter color="pink">B</Letter>
                    </TransitionSeries.Sequence>
                </TransitionSeries>
            </div>
            <div>
                linearTiming duration: {linearDuration} frames
            </div>
        </AbsoluteFill>
    );
};