import MultiModeCounterInput from "@/components/MultiModeCounterInput";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import React, { Dispatch, memo, SetStateAction, useMemo } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface TimersComponentProps {
    timers: ["work" | "rest" | "intervals" | "get ready" | "cycles" | "break" | "warm up" | "cool down", number][];
    setWorkout: Dispatch<SetStateAction<Workouts>>;
}

const TimersComponent = memo(({ timers, setWorkout }: TimersComponentProps) => {
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
                            setWorkout={setWorkout}
                            timer={timer}
                            timerValue={value}
                            mode={timer === "intervals" || timer === "cycles" ? "counter" : "timer"}
                        />
                    </View>
                ))}
            </View>
        </TouchableWithoutFeedback>
    );
});

const Timers = memo(() => {
    const { setWorkout, timersRef } = useWorkoutContext();
    const timers = useMemo(() => Object.entries(timersRef.current) as [keyof Workouts["time"], number][], []);

    return (
        <TimersComponent
            setWorkout={setWorkout}
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
