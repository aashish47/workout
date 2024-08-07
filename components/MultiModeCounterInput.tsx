import { ThemedText } from "@/components/ThemedText";
import { WorkoutContext } from "@/contexts/WorkoutRefProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface MultiModeCounterInputProps {
    mode: "timer" | "counter";
    timer: string;
    timerValue: number;
    style?: {};
}

const MultiModeCounterInput = ({ style, mode, timer, timerValue }: MultiModeCounterInputProps) => {
    const { setWorkout } = useWorkoutRefContext(WorkoutContext);
    const backgroundColor = useThemeColor({}, "press");
    const highlightColor = useThemeColor({}, "ripple");
    const [time, setTime] = useState({ minutes: Math.floor(timerValue / 60), seconds: timerValue % 60 });
    const [counter, setCounter] = useState(timerValue);
    const [highlight, setHighlight] = useState<"minutes" | "seconds" | "counter" | null>(null);
    const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setWorkout((prev) => ({
            ...prev,
            time: {
                ...prev.time,
                [timer]: mode === "timer" ? time.minutes * 60 + time.seconds : counter,
            },
        }));
    }, [time, counter]);

    const incrementTime = () => {
        setTime((prevTime) => {
            const newSeconds = highlight === "minutes" ? prevTime.seconds : prevTime.seconds + 1;
            const newMinutes =
                highlight === "seconds" ? prevTime.minutes : highlight === "minutes" ? prevTime.minutes + 1 : prevTime.minutes + (newSeconds === 60 ? 1 : 0);

            return {
                minutes: newMinutes,
                seconds: newSeconds % 60,
            };
        });
    };

    const decrementTime = () => {
        setTime((prevTime) => {
            const newSeconds = highlight === "minutes" ? prevTime.seconds : prevTime.seconds - 1;
            const newMinutes =
                highlight === "seconds" ? prevTime.minutes : highlight === "minutes" ? prevTime.minutes - 1 : prevTime.minutes - (newSeconds === -1 ? 1 : 0);
            const finalSeconds = newSeconds === -1 ? (newMinutes === -1 ? 0 : 59) : newSeconds;
            const finalMinutes = newSeconds === -1 ? (newMinutes < 0 ? 0 : newMinutes) : newMinutes;

            const totalSeconds = finalMinutes * 60 + finalSeconds;
            const minAllowedSeconds = 10; // Minimum allowed time in seconds
            if (totalSeconds < minAllowedSeconds) {
                return {
                    minutes: 0,
                    seconds: minAllowedSeconds,
                };
            }

            return {
                minutes: finalMinutes < 0 ? 0 : finalMinutes,
                seconds: finalSeconds === -1 ? (finalMinutes === -1 ? 0 : 59) : finalSeconds,
            };
        });
    };

    const incrementCounter = () => {
        setCounter((prevCounter) => (prevCounter < 99 ? prevCounter + 1 : prevCounter));
    };

    const decrementCounter = () => {
        setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : prevCounter));
    };

    const handleLongPress = (action: () => void) => {
        longPressTimerRef.current = setInterval(action, 100);
    };

    const handlePressOut = () => {
        if (longPressTimerRef.current) {
            clearInterval(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    const handlePress = (action: () => void) => {
        action();
        handlePressOut(); // Ensure interval is cleared if any existing
    };

    const handleTextPress = (type: "minutes" | "seconds" | "counter") => {
        setHighlight((prevHighlight) => (prevHighlight === type ? null : type));
    };

    const renderText = (type: "minutes" | "seconds" | "counter", value: number) => (
        <Pressable
            onPress={() => handleTextPress(type)}
            style={styles.textWrapper}
        >
            <ThemedText
                type="light"
                style={[styles.timeText, highlight === type && { backgroundColor: highlightColor }]}
            >
                {type === "minutes" || "seconds" ? `${value < 10 ? "0" : ""}${value}` : value}
            </ThemedText>
        </Pressable>
    );

    return (
        <View style={[styles.container, { backgroundColor }, style]}>
            <Pressable
                android_ripple={{ color: highlightColor }}
                onPress={() => handlePress(mode === "timer" ? decrementTime : decrementCounter)}
                onLongPress={() => handleLongPress(mode === "timer" ? decrementTime : decrementCounter)}
                onPressOut={handlePressOut}
                style={styles.button}
            >
                <ThemedText type="light">-</ThemedText>
            </Pressable>
            {mode === "timer" ? (
                <View style={styles.timeContainer}>
                    {renderText("minutes", time.minutes)}
                    <ThemedText
                        type="light"
                        style={styles.colon}
                    >
                        :
                    </ThemedText>
                    {renderText("seconds", time.seconds)}
                </View>
            ) : (
                renderText("counter", counter)
            )}

            <Pressable
                android_ripple={{ color: highlightColor }}
                onPress={() => handlePress(mode === "timer" ? incrementTime : incrementCounter)}
                onLongPress={() => handleLongPress(mode === "timer" ? incrementTime : incrementCounter)}
                onPressOut={handlePressOut}
                style={styles.button}
            >
                <ThemedText type="light">+</ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        borderRadius: 10,
    },
    button: { width: 50, alignItems: "center", justifyContent: "center" },
    timeText: {
        padding: 5,
    },
    textWrapper: {
        flexDirection: "row",
    },
    colon: { paddingVertical: 4 },
    timeContainer: {
        flexDirection: "row",
    },
});

export default MultiModeCounterInput;
