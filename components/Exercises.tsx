import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import React, { Dispatch, memo, SetStateAction } from "react";
import { FlatList, NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputEndEditingEventData, View } from "react-native";

interface ExercisesComponentProps {
    exercises: Workouts["exercises"];
    setWorkout: Dispatch<SetStateAction<Workouts>>;
}

const ExercisesComponent = memo(({ exercises, setWorkout }: ExercisesComponentProps) => {
    const backgroundColor = useThemeColor({}, "secondary");
    const ripple = useThemeColor({}, "ripple");
    const border = useThemeColor({}, "primary");

    const handleEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>, currIndex: number) => {
        setWorkout((prev) => ({ ...prev, exercises: exercises.map((exercise, index) => (index === currIndex ? e.nativeEvent.text : exercise)) }));
    };

    const handleDelete = (currIndex: number) => {
        setWorkout((prev) => ({
            ...prev,
            exercises: exercises.filter((_, index) => index !== currIndex),
        }));
    };

    const addExercise = () => {
        setWorkout((prev) => ({
            ...prev,
            exercises: [...exercises, ""],
        }));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={exercises}
                renderItem={({ item, index }) => {
                    const currIndex = index;
                    return (
                        <View style={[styles.exerciseContainer, { backgroundColor }]}>
                            <TextInput
                                style={{ flexGrow: 1 }}
                                defaultValue={item}
                                placeholder="Exercise..."
                                onEndEditing={(e) => handleEndEditing(e, currIndex)}
                            />
                            <IconButton
                                iconName={"trash-outline"}
                                size={28}
                                onPress={() => handleDelete(currIndex)}
                            />
                        </View>
                    );
                }}
            />
            <View style={styles.wrapper}>
                <Pressable
                    android_ripple={{ color: ripple }}
                    style={[styles.button, { borderColor: border }]}
                    onPress={addExercise}
                >
                    <ThemedText>Add Exercise</ThemedText>
                </Pressable>
            </View>
        </View>
    );
});

const Exercises = memo(() => {
    const { workout, setWorkout } = useWorkoutContext();
    const exercises = workout["exercises"];

    return (
        <ExercisesComponent
            exercises={exercises}
            setWorkout={setWorkout}
        />
    );
});

export default Exercises;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    exerciseContainer: {
        paddingHorizontal: 16,
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    wrapper: {
        margin: 12,
        borderRadius: 10,
        overflow: "hidden",
    },
    button: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});
