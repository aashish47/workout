import { WorkoutContext, WorkoutState } from "@/app/create/(create)/_layout";
import MultiModeCounterInput from "@/components/MultiModeCounterInput";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

const Index = () => {
    const context = useContext(WorkoutContext);
    if (context === null) {
        throw Error("Null context create Workout");
    }
    const { workoutRef, setWorkout } = context;
    if (workoutRef.current === null) {
        throw Error("null workoutref in create index");
    }
    const { time } = workoutRef.current;
    const timers = Object.entries(time) as [keyof Workouts["time"], number][];

    return (
        <View style={{ flex: 1 }}>
            {timers.map(([timer, value], index: any) => (
                <View
                    key={index}
                    style={styles.input}
                >
                    <ThemedText style={{ flex: 1, textTransform: "capitalize" }}>{timer}</ThemedText>

                    <MultiModeCounterInput<WorkoutState>
                        style={{ flex: 1 }}
                        timer={timer}
                        timerValue={value}
                        mode={timer === "intervals" || timer === "cycles" ? "counter" : "timer"}
                        setWorkout={setWorkout}
                    />
                </View>
            ))}
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 12,
        marginTop: 24,
    },
});
