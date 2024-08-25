import { ThemedText } from "@/components/ThemedText";
import getFormatedTime from "@/utils/getFormatedTime";
import { OrderType } from "@/utils/getWorkoutOrder";
import React, { Dispatch, memo, SetStateAction, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ColorFormat, useCountdown } from "react-native-countdown-circle-timer";
import Svg, { Path } from "react-native-svg";

interface CountdownTimerProps {
    setTimeElapsed: Dispatch<SetStateAction<number>>;
    pause: boolean;
    timerValue: number;
    start: number;
    screenWidth: number;
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
    setReset: Dispatch<SetStateAction<number>>;
    workoutOrder: OrderType[];
    countDownColor: ColorFormat;
}

const CountdownTimer = memo(
    ({ countDownColor, setTimeElapsed, pause, timerValue, start, screenWidth, index, workoutOrder, setIndex, setReset }: CountdownTimerProps) => {
        const { path, pathLength, stroke, strokeDashoffset, remainingTime, elapsedTime, size, strokeWidth } = useCountdown({
            isPlaying: !pause,
            duration: timerValue,
            colors: countDownColor,
            // colors: ["#004777", "#F7B801", "#A30000", "#A30000"],
            // colorsTime: [10, 5, 2, 0],
            size: screenWidth - 96,
            rotation: "counterclockwise",
        });
        useLayoutEffect(() => {
            if (remainingTime <= 0 && index < workoutOrder.length - 1) {
                setIndex((prev) => prev + 1);
                setReset(Date.now());
            }
        }, [remainingTime, index]);
        useEffect(() => {
            setTimeElapsed(start + Math.floor(elapsedTime));
        }, [elapsedTime]);

        return (
            <View style={{ width: size, height: size, position: "relative" }}>
                <Svg
                    width={size}
                    height={size}
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
                    <ThemedText style={[styles.timerValue, { color: stroke }]}>{getFormatedTime(remainingTime)}</ThemedText>
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
        fontSize: 64,
    },
});
