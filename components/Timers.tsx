import MultiModeCounterInput from "@/components/MultiModeCounterInput";
import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/schema";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import React, { Dispatch, memo, SetStateAction, useMemo } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export type Timers = [keyof Workout["timers"], number][];

interface TimersComponentProps {
    timers: Timers;
    setWorkoutData: Dispatch<SetStateAction<Workout>>;
}

const TimersComponent = memo(({ timers, setWorkoutData }: TimersComponentProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
                {timers.map(([timer, value], index: number) => (
                    <View
                        key={index}
                        style={styles.input}
                    >
                        <ThemedText style={styles.label}>{timer}</ThemedText>
                        <MultiModeCounterInput
                            setWorkoutData={setWorkoutData}
                            timer={timer}
                            timerValue={value}
                            mode={timer === "sets" || timer === "cycles" ? "counter" : "timer"}
                        />
                    </View>
                ))}
            </View>
        </TouchableWithoutFeedback>
    );
});

const Timers = memo(() => {
    const { setWorkoutData, timersRef } = useWorkoutContext();
    const timers = useMemo(() => Object.entries(timersRef.current) as Timers, []);

    return (
        <TimersComponent
            setWorkoutData={setWorkoutData}
            timers={timers}
        />
    );
});

export default Timers;

const styles = StyleSheet.create({
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 12,
        marginTop: 24,
    },
    label: {
        flex: 1,
        textTransform: "capitalize",
    },
});
