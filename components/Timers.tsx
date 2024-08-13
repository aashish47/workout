import MultiModeCounterInput from "@/components/MultiModeCounterInput";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const Timers = () => {
    const { time } = useWorkoutRefContext();
    const timers = Object.entries(time) as [keyof Workouts["time"], number][];

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
                            timer={timer}
                            timerValue={value}
                            mode={timer === "intervals" || timer === "cycles" ? "counter" : "timer"}
                        />
                    </View>
                ))}
            </View>
        </TouchableWithoutFeedback>
    );
};

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
