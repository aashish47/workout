import CountdownTimer from "@/components/CountdownTimer";
import IconButton from "@/components/IconButton";
import Status from "@/components/Status";
import { ThemedText } from "@/components/ThemedText";
import WorkoutOrderModal from "@/components/WorkoutOrderModal";
import { namedColors } from "@/constants/Colors";
import { Workout } from "@/db/schema";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import getFormatedTime from "@/utils/getFormatedTime";
import getWorkoutOrder, { CountdownTimerType } from "@/utils/getWorkoutOrder";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ColorFormat } from "react-native-countdown-circle-timer";

interface StartComponentProps {
    workoutData: Workout;
}

type CountdownColors = { [key in CountdownTimerType]: string };

const countdownColors: CountdownColors = {
    "warm up": namedColors["orange"],
    "get ready": namedColors["grey"],
    work: namedColors["tomato"],
    rest: namedColors["lightseagreen"],
    break: namedColors["mediumorchid"],
    "cool down": namedColors["steelblue"],
};

const StartComponent = memo(({ workoutData }: StartComponentProps) => {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();
    const { totalSeconds = 0 } = useLocalSearchParams<{ formatedDuration: string; totalSeconds: string }>();
    const targetTime = Number(totalSeconds);

    const { timers, exercises } = workoutData;
    const workoutOrder = useMemo(() => getWorkoutOrder(timers, exercises), [timers, exercises]);

    const [index, setIndex] = useState(0);
    const [pause, setPause] = useState(false);
    const [mute, setMute] = useState(false);
    const [reset, setReset] = useState(Date.now());
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const { start, timer, timerValue, cycleNumber, exercise, exerciseNumber, timerNumber } = workoutOrder[index];
    const currentSet = timerNumber || 0;
    const remainingSets = timers["sets"] - currentSet;
    const formatedTimeElapsed = getFormatedTime(timeElapsed);
    const formatedTimeRemaining = getFormatedTime(targetTime - timeElapsed);
    const progressWidth = timeElapsed * (screenWidth / targetTime);

    const countDownColor = countdownColors[timer] as ColorFormat;

    useEffect(() => {
        navigation.setOptions({ title: timer.toUpperCase(), headerTitleAlign: "center", headerTitleStyle: { color: countDownColor } });
    }, [timer, navigation]);

    const handleBack = useCallback(() => {
        if (timeElapsed - start > 1) {
            setReset(Date.now());
        } else {
            setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            setReset(Date.now());
        }
    }, [timeElapsed, start]);

    const handleForward = useCallback(() => {
        setIndex((prevIndex) => Math.min(prevIndex + 1, workoutOrder.length - 1));
        setReset(Date.now());
    }, [workoutOrder]);

    return (
        <View style={styles.container}>
            <View style={styles.number}>
                {timers["cycles"] > 1 && cycleNumber && (
                    <Status
                        name={"Cycle"}
                        current={cycleNumber}
                        total={timers["cycles"]}
                    />
                )}
                {exerciseNumber && (
                    <Status
                        name={"Exercise"}
                        current={exerciseNumber}
                        total={exercises.length}
                    />
                )}
                {timers["sets"] > 1 && timerNumber && (
                    <Status
                        name={"Set"}
                        current={timerNumber}
                        total={timers["sets"]}
                    />
                )}
            </View>
            <View style={styles.timerValue}>
                <CountdownTimer
                    key={reset}
                    countDownColor={countDownColor}
                    remainingSets={timer === "work" ? remainingSets + 1 : timer === "rest" ? remainingSets : 0}
                    index={index}
                    pause={pause}
                    screenWidth={screenWidth}
                    setIndex={setIndex}
                    sets={timers["sets"]}
                    setReset={setReset}
                    setTimeElapsed={setTimeElapsed}
                    start={start}
                    timerValue={timerValue}
                    workoutOrder={workoutOrder}
                />
            </View>

            <View style={styles.message}>
                <ThemedText
                    type="light"
                    style={styles.text}
                >
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
                <View style={{ width: progressWidth, height: 8, backgroundColor: countDownColor }} />
                <View style={styles.duration}>
                    <ThemedText type="light">{formatedTimeElapsed}</ThemedText>
                    <ThemedText type="light">{formatedTimeRemaining}</ThemedText>
                </View>
                <View style={styles.control}>
                    <IconButton
                        iconName={"menu-sharp"}
                        size={32}
                        onPress={() => setModalVisible(true)}
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
                            onPress={() => setPause(false)}
                        />
                    ) : (
                        <IconButton
                            iconName={"pause-sharp"}
                            size={64}
                            onPress={() => setPause(true)}
                        />
                    )}
                    <IconButton
                        iconName={"play-skip-forward-sharp"}
                        size={32}
                        onPress={handleForward}
                    />
                    {mute ? (
                        <IconButton
                            iconName={"volume-mute-sharp"}
                            size={32}
                            onPress={() => setMute(false)}
                        />
                    ) : (
                        <IconButton
                            iconName={"volume-high-sharp"}
                            size={32}
                            onPress={() => setMute(true)}
                        />
                    )}
                </View>
            </View>
            {modalVisible && (
                <WorkoutOrderModal
                    activeColor={countDownColor}
                    currIndex={index}
                    modalVisible={modalVisible}
                    setIndex={setIndex}
                    setModalVisible={setModalVisible}
                    setReset={setReset}
                    workoutorder={workoutOrder}
                />
            )}
        </View>
    );
});

const Start = memo(() => {
    const { workoutData } = useWorkoutContext();
    return <StartComponent workoutData={workoutData} />;
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
        paddingHorizontal: 8,
        flex: 1,
    },
    timerValue: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    message: {
        justifyContent: "center",
    },
    exercise: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize",
        textAlign: "center",
        paddingHorizontal: 8,
    },
    duration: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 8,
    },
    control: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});
