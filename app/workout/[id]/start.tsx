import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import getFormatedTime from "@/utils/getFormatedTime";
import getWorkoutOrder from "@/utils/getWorkoutOrder";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface StartComponentProps {
    workout: Workouts;
}

const StartComponent = memo(({ workout }: StartComponentProps) => {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();
    const progressColor = useThemeColor({}, "primary");
    const { formatedDuration, totalSeconds = 0 } = useLocalSearchParams<{ formatedDuration: string; totalSeconds: string }>();
    const { time, exercises } = workout;
    const workoutOrder = useMemo(() => getWorkoutOrder(time, exercises), [time, exercises]);

    const [index, setIndex] = useState(0);
    const { start, timer, timerValue, cycleNumber, exercise, exerciseNumber, timerNumber } = workoutOrder[index];
    const [timeElapsed, setTimeElapsed] = useState(start);
    const [pause, setPause] = useState(false);

    const startTimeRef = useRef<number>(Date.now());
    const frameRef = useRef<number>(0);
    const lastUpdateTimeRef = useRef(Date.now());

    const targetTime = Number(totalSeconds);
    const timeLeft = getFormatedTime(timerValue - (timeElapsed - start));

    useEffect(() => {
        navigation.setOptions({ title: timer.toUpperCase(), headerTitleAlign: "center" });
    }, [timer, navigation]);

    useEffect(() => {
        const updateTimer = () => {
            if (!pause) {
                const currentTime = Date.now();
                const elapsed = Math.floor((currentTime - startTimeRef.current) / 1000) + start;

                if (elapsed >= targetTime) {
                    setTimeElapsed(targetTime);
                } else if (currentTime - lastUpdateTimeRef.current >= 1000) {
                    if (elapsed === start + timerValue) {
                        setIndex((prevIndex) => {
                            const newIndex = prevIndex + 1;
                            resetStart(workoutOrder[newIndex].start);
                            return newIndex;
                        });
                    } else {
                        setTimeElapsed(elapsed);
                        lastUpdateTimeRef.current = currentTime;
                    }
                }

                if (elapsed < targetTime) {
                    frameRef.current = requestAnimationFrame(updateTimer);
                }
            }
        };

        frameRef.current = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(frameRef.current);
    }, [start, totalSeconds, timerValue, pause]);

    const resetStart = useCallback((newStart: number) => {
        setTimeElapsed(newStart);
        startTimeRef.current = Date.now();
        lastUpdateTimeRef.current = Date.now();
    }, []);

    const handlePause = useCallback(() => {
        setPause(true);
    }, []);

    const handlePlay = useCallback(() => {
        startTimeRef.current = Date.now() - (timeElapsed - start) * 1000;
        lastUpdateTimeRef.current = Date.now();
        setPause(false);
    }, [timeElapsed, start]);

    const handleBack = useCallback(() => {
        if (timeElapsed - start > 1) {
            resetStart(start);
        } else {
            setIndex((prevIndex) => {
                const newIndex = Math.max(prevIndex - 1, 0);
                resetStart(workoutOrder[newIndex].start);
                return newIndex;
            });
        }
    }, [timeElapsed, start]);

    const handleForward = useCallback(() => {
        setIndex((prevIndex) => {
            const newIndex = Math.min(prevIndex + 1, workoutOrder.length - 1);
            resetStart(workoutOrder[newIndex].start);
            return newIndex;
        });
    }, []);

    return (
        <View style={styles.container}>
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
                    {timeLeft}
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
                    {timer === "get ready" || timer === "break" ? exercises[exerciseNumber ? exerciseNumber % exercises.length : 0] : exercise}
                </ThemedText>
            </View>
            <View>
                <View style={{ width: timeElapsed * (screenWidth / targetTime), height: 8, backgroundColor: progressColor }} />
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
                        onPress={handleBack}
                    />

                    {pause ? (
                        <IconButton
                            iconName={"play-sharp"}
                            size={64}
                            onPress={handlePlay}
                        />
                    ) : (
                        <IconButton
                            iconName={"pause-sharp"}
                            size={64}
                            onPress={handlePause}
                        />
                    )}
                    <IconButton
                        iconName={"play-skip-forward-sharp"}
                        size={32}
                        onPress={handleForward}
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
    progress: {
        height: 8,
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
