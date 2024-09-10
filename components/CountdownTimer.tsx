import SegmentedCircle from "@/components/SegmentedCircle";
import { ThemedText } from "@/components/ThemedText";
import { AudioKeys } from "@/hooks/useSounds";
import getFormatedTime from "@/utils/getFormatedTime";
import { CountdownTimerType } from "@/utils/getWorkoutOrder";
import React, { Dispatch, memo, SetStateAction, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ColorFormat, useCountdown } from "react-native-countdown-circle-timer";
import Svg, { Path } from "react-native-svg";

interface CountdownTimerProps {
    countDownColor: ColorFormat;
    handleForward: () => void;
    mute: boolean;
    pause: boolean;
    playSound: (music: AudioKeys) => Promise<void>;
    remainingSets: number;
    screenWidth: number;
    sets: number;
    setTimeElapsed: Dispatch<SetStateAction<number>>;
    start: number;
    timer: CountdownTimerType;
    timerValue: number;
    totalRemainingTime: number;
}

const CountdownTimer = memo(
    ({
        countDownColor,
        handleForward,
        mute,
        pause,
        playSound,
        remainingSets,
        screenWidth,
        setTimeElapsed,
        sets,
        start,
        timer,
        timerValue,
        totalRemainingTime,
    }: CountdownTimerProps) => {
        const halfTime = Math.ceil(timerValue / 2);
        const { path, pathLength, stroke, strokeDashoffset, remainingTime, elapsedTime, size, strokeWidth } = useCountdown({
            isPlaying: !pause,
            duration: timerValue,
            colors: countDownColor,
            size: screenWidth - 96,
            rotation: "counterclockwise",
            updateInterval: 1,
            onUpdate(remainingTime) {
                if (!mute) {
                    if ([1, 2, 3].includes(remainingTime)) {
                        playSound("countdown");
                    } else if (timer === "work") {
                        if (remainingTime === halfTime) {
                            playSound("halftime");
                        } else if (remainingTime === 10) {
                            playSound("ten");
                        }
                    }
                }
            },
            onComplete() {
                if (!mute) {
                    if (totalRemainingTime === 1) {
                        playSound("workout-over");
                    } else if (timer === "work") {
                        if (remainingSets > 1) {
                            playSound("set-over");
                        } else {
                            playSound("exercise-over");
                        }
                    } else {
                        playSound("zero");
                    }
                }
            },
        });

        useLayoutEffect(() => {
            if (remainingTime <= 0) {
                handleForward();
            }
        }, [remainingTime]);

        useEffect(() => {
            setTimeElapsed(start + Math.floor(elapsedTime));
        }, [elapsedTime]);

        return (
            <View style={{ width: size, height: size, position: "relative" }}>
                <Svg
                    width={size + 500} // Renders properly without cuts in right & bottom. Don't know why?
                    height={size + 500} // Also fixes color mismatch issue when timers starts in dark mode.
                >
                    <Path
                        d={path}
                        fill="none"
                        stroke="#d9d9d9"
                        strokeWidth={strokeWidth}
                    />
                    <Path
                        d={path}
                        fill="none"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                        strokeDasharray={pathLength}
                        strokeDashoffset={strokeDashoffset}
                    />
                </Svg>
                <View style={styles.time}>
                    <SegmentedCircle
                        remainingSets={remainingSets}
                        sets={sets}
                        size={size - 48}
                        strokeColor="silver"
                    >
                        <ThemedText style={[styles.timerValue, { color: stroke }]}>{getFormatedTime(remainingTime)}</ThemedText>
                    </SegmentedCircle>
                </View>
            </View>
        );
    }
);

export default CountdownTimer;

const styles = StyleSheet.create({
    time: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
    },
    timerValue: {
        textTransform: "capitalize",
        textAlign: "center",
        fontSize: 56,
    },
});
