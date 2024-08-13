import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface MultiModeCounterInputProps {
    mode: "timer" | "counter";
    timer: string;
    timerValue: number;
}

const MultiModeCounterInput = ({ mode, timer, timerValue }: MultiModeCounterInputProps) => {
    console.log(`${timer} ${timerValue} rendered at: ${new Date().toLocaleTimeString()}`);
    const { setWorkout } = useWorkoutRefContext();
    const backgroundColor = useThemeColor({}, "secondary");
    const highlightColor = useThemeColor({}, "ripple");
    const [time, setTime] = useState({ minutes: Math.floor(timerValue / 60), seconds: timerValue % 60 });
    const [counter, setCounter] = useState(timerValue);
    const [highlight, setHighlight] = useState<"minutes" | "seconds" | "counter" | null>(null);
    const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

    // this will also run on inital render meaning the 8 timers on inital render will each run this once
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
            let { seconds, minutes } = prevTime;

            // Determine the decrement value based on the highlight
            const decrementSeconds = highlight === "seconds" || !highlight;
            const decrementMinutes = highlight === "minutes";

            // Decrement seconds or minutes based on the highlight
            seconds -= decrementSeconds ? 1 : 0;
            minutes -= decrementMinutes ? 1 : 0;

            // Wrap seconds around and adjust minutes if seconds go below 0
            if (seconds < 0) {
                seconds = 59;
                if (highlight !== "seconds") {
                    minutes -= 1;
                }
            }

            // Ensure minutes do not go below 0
            minutes = Math.max(minutes, 0);

            return { minutes, seconds };
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
        <View style={[styles.container, { backgroundColor }]}>
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
        flex: 1,
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
