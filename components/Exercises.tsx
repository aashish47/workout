import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";

const Exercises = () => {
    const { exercises: data, setWorkout } = useWorkoutRefContext();
    const [exercises, setExercises] = useState(data);
    const backgroundColor = useThemeColor({}, "press");
    const ripple = useThemeColor({}, "ripple");
    const border = useThemeColor({}, "float");

    useEffect(() => {
        setWorkout((prev) => ({ ...prev, exercises }));
    }, [exercises]);

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
                                onEndEditing={(e) => setExercises(exercises.map((exercise, index) => (index === currIndex ? e.nativeEvent.text : exercise)))}
                            />
                            <IconButton
                                iconName={"trash-outline"}
                                size={28}
                                onPress={() => setExercises(exercises.filter((_, index) => index !== currIndex))}
                            />
                        </View>
                    );
                }}
            />
            <View style={styles.wrapper}>
                <Pressable
                    android_ripple={{ color: ripple }}
                    style={[styles.button, { borderColor: border }]}
                    onPress={() => setExercises([...exercises, ""])}
                >
                    <ThemedText>Add Exercise</ThemedText>
                </Pressable>
            </View>
        </View>
    );
};

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
