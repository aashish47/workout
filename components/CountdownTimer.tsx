import SegmentedCircle from "@/components/SegmentedCircle";
import { ThemedText } from "@/components/ThemedText";
import getFormatedTime from "@/utils/getFormatedTime";
import { OrderType } from "@/utils/getWorkoutOrder";
import React, { Dispatch, memo, SetStateAction, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ColorFormat, useCountdown } from "react-native-countdown-circle-timer";
import Svg, { Path } from "react-native-svg";

interface CountdownTimerProps {
    countDownColor: ColorFormat;
    index: number;
    pause: boolean;
    remainingSets: number;
    screenWidth: number;
    setIndex: Dispatch<SetStateAction<number>>;
    setReset: Dispatch<SetStateAction<number>>;
    sets: number;
    setTimeElapsed: Dispatch<SetStateAction<number>>;
    start: number;
    timerValue: number;
    workoutOrder: OrderType[];
}

const CountdownTimer = memo(
    ({
        countDownColor,
        index,
        pause,
        remainingSets,
        screenWidth,
        setIndex,
        setReset,
        setTimeElapsed,
        sets,
        start,
        timerValue,
        workoutOrder,
    }: CountdownTimerProps) => {
        const { path, pathLength, stroke, strokeDashoffset, remainingTime, elapsedTime, size, strokeWidth } = useCountdown({
            isPlaying: !pause,
            duration: timerValue,
            colors: countDownColor,
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
