import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ParamList } from "@/types/routeParams";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const exercises = () => {
    const route = useRoute<RouteProp<ParamList, "exercises">>();
    const { exercises } = route.params;
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
