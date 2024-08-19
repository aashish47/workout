import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import getFormatedTime from "@/utils/getFormatedTime";
import getWorkoutOrder from "@/utils/getWorkoutOrder";
import { useLocalSearchParams } from "expo-router";
import React, { memo, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

interface StartComponentProps {
    workout: Workouts;
}

const StartComponent = memo(({ workout }: StartComponentProps) => {
    const { formatedDuration, totalSeconds = 0 } = useLocalSearchParams<{ formatedDuration: string; totalSeconds: string }>();
    const { time, exercises } = workout;
    const workoutOrder = getWorkoutOrder(time, exercises);
    const [index, setIndex] = useState(0);
    const { start, timer, timerValue, cycleNumber, exercise, exerciseNumber, timerNumber } = workoutOrder[index];
    const [timeElapsed, setTimeElapsed] = useState(start);
    const startTimeRef = useRef<number>(Date.now());
    const frameRef = useRef<number>(0);
    const lastUpdateTimeRef = useRef(Date.now());

    useEffect(() => {
        const updateTimer = () => {
            const currentTime = Date.now();
            const elapsed = Math.floor((currentTime - startTimeRef.current) / 1000) + start;
            const targetTime = Number(totalSeconds);

            if (elapsed >= targetTime) {
                setTimeElapsed(targetTime);
            } else if (currentTime - lastUpdateTimeRef.current >= 1000) {
                if (elapsed === start + timerValue) {
                    setIndex((prevIndex) => prevIndex + 1);
                } else {
                    setTimeElapsed(elapsed);
                    lastUpdateTimeRef.current = currentTime;
                }
            }

            if (elapsed < targetTime) {
                frameRef.current = requestAnimationFrame(updateTimer);
            }
        };

        frameRef.current = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(frameRef.current);
    }, [start, totalSeconds, timerValue]);

    useEffect(() => {
        resetStart();
    }, [start]);

    const resetStart = () => {
        setTimeElapsed(start);
        startTimeRef.current = Date.now();
        lastUpdateTimeRef.current = Date.now();
    };
    return (
        <View style={styles.container}>
            <View style={styles.timer}>
                <ThemedText
                    type="defaultSemiBold"
                    style={styles.text}
                >
                    {timer}
                </ThemedText>
            </View>
            <View style={styles.number}>
                {time["cycles"] > 1 && cycleNumber && <ThemedText>{`Cycle: ${cycleNumber}/${time["cycles"]}`}</ThemedText>}
                {exerciseNumber && <ThemedText>{`Exercise: ${exerciseNumber}/${exercises.length}`}</ThemedText>}
                {time["intervals"] > 1 && timerNumber && <ThemedText>{`Set: ${timerNumber}/${time["intervals"]}`}</ThemedText>}
            </View>
            <View style={styles.timerValue}>
                <ThemedText
                    style={[styles.text, { fontSize: 64 }]}
                    type="title"
                >
                    {getFormatedTime(timerValue - (timeElapsed - start))}
                </ThemedText>
            </View>

            <View style={styles.message}>
                <ThemedText style={styles.text}>
                    {timer === "get ready" ? "get ready for" : timer === "break" || timer === "rest" ? "next" : undefined}
                </ThemedText>
            </View>
            <View style={styles.exercise}>
                <ThemedText
                    style={styles.text}
                    type="title"
                >
                    {timer === "get ready" || timer === "break" ? exercises[exerciseNumber || 0] : exercise}
                </ThemedText>
            </View>
            <View>
                <ThemedText>progress bar</ThemedText>
                <View style={styles.duration}>
                    <ThemedText type="light">{getFormatedTime(timeElapsed)}</ThemedText>
                    <ThemedText type="light">{formatedDuration}</ThemedText>
                </View>
                <View style={styles.control}>
                    <IconButton
                        iconName={"menu-sharp"}
                        size={32}
                        onPress={undefined}
                    />
                    <IconButton
                        iconName={"play-skip-back-sharp"}
                        size={32}
                        onPress={() => {
                            if (timeElapsed - start > 1) {
                                resetStart();
                            } else {
                                setIndex((index) => Math.max(index - 1, 0));
                            }
                        }}
                    />
                    <IconButton
                        iconName={"play-sharp"}
                        size={64}
                        onPress={undefined}
                    />
                    <IconButton
                        iconName={"play-skip-forward-sharp"}
                        size={32}
                        onPress={() => setIndex((index) => Math.min(index + 1, workoutOrder.length - 1))}
                    />
                    <IconButton
                        iconName={"volume-high-sharp"}
                        size={32}
                        onPress={undefined}
                    />
                </View>
            </View>
        </View>
    );
});

const Start = memo(() => {
    const { workout } = useWorkoutContext();
    return <StartComponent workout={workout} />;
});

export default Start;

const styles = StyleSheet.create({
    text: {
        textTransform: "capitalize",
        textAlign: "center",
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    number: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        flex: 1,
        // backgroundColor: "blue",
    },
    timerValue: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
    },
    timer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "violet",
    },
    message: {
        // backgroundColor: "pink",
        justifyContent: "center",
        flex: 1,
    },
    exercise: {
        // backgroundColor: "green",
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize",
        textAlign: "center",
        paddingHorizontal: 8,
    },
    duration: {
        // backgroundColor: "olive",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 8,
    },
    control: {
        // backgroundColor: "orange",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});
