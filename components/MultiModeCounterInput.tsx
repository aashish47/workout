import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

interface MultiModeCounterInputProps {
    mode: "timer" | "counter";
}

const MultiModeCounterInput: React.FC<MultiModeCounterInputProps> = ({ mode }) => {
    const backgroundColor = useThemeColor({}, "press");
    const highlightColor = useThemeColor({}, "ripple");
    const [time, setTime] = useState({ minutes: 0, seconds: 40 });
    const [counter, setCounter] = useState(1);
    const [highlight, setHighlight] = useState<"minutes" | "seconds" | "counter" | null>(null);

    const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

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
            return {
                minutes: newMinutes < 0 ? 0 : newMinutes,
                seconds: newSeconds === -1 ? 59 : newSeconds,
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
            <ThemedText style={[styles.timeText, highlight === type && { backgroundColor: highlightColor }]}>
                {type === "minutes" || "seconds" ? `${value < 10 ? "0" : ""}${value}` : value}
            </ThemedText>
        </Pressable>
    );

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <TouchableOpacity
                onPress={() => handlePress(mode === "timer" ? decrementTime : decrementCounter)}
                onLongPress={() => handleLongPress(mode === "timer" ? decrementTime : decrementCounter)}
                onPressOut={handlePressOut}
                style={styles.button}
            >
                <ThemedText>-</ThemedText>
            </TouchableOpacity>
            {mode === "timer" ? (
                <View style={styles.timeContainer}>
                    {renderText("minutes", time.minutes)}
                    <ThemedText style={styles.colon}>:</ThemedText>
                    {renderText("seconds", time.seconds)}
                </View>
            ) : (
                renderText("counter", counter)
            )}

            <TouchableOpacity
                onPress={() => handlePress(mode === "timer" ? incrementTime : incrementCounter)}
                onLongPress={() => handleLongPress(mode === "timer" ? incrementTime : incrementCounter)}
                onPressOut={handlePressOut}
                style={styles.button}
            >
                <ThemedText>+</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
    },
    button: { width: 50, alignItems: "center" },
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
