import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Exercises = () => {
    const { exercises } = useWorkoutRefContext();
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

export default Exercises;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    exerciseContainer: {
        padding: 16,
        marginTop: 8,
    },
});
