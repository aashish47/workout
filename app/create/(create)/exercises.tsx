import { WorkoutContext } from "@/app/create/(create)/_layout";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const exercises = () => {
    const context = useContext(WorkoutContext);
    if (context === null) {
        throw Error("Null context create Workout");
    }
    const { workoutRef, setWorkout } = context;
    if (workoutRef.current === null) {
        throw Error("Null workoutref in exercised create");
    }
    const { exercises } = workoutRef.current;
    const backgroundColor = useThemeColor({}, "press");

    return (
        <View style={styles.container}>
            <FlatList
                data={exercises}
                renderItem={({ item }) => (
                    <ThemedText
                        type="light"
                        style={[styles.exerciseContainer, { backgroundColor }]}
                    >
                        {item}
                    </ThemedText>
                )}
            />
        </View>
    );
};

export default exercises;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    exerciseContainer: {
        padding: 16,
        marginTop: 8,
    },
});
