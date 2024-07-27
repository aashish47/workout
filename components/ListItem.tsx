import { Workout } from "@/app";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { StyleSheet, View } from "react-native";

const ListItem = ({ title, backgroundColor, exercises }: Workout) => {
    return (
        <View style={styles.container}>
            <View style={[styles.avatar, { backgroundColor }]}>
                <ThemedText
                    lightColor="white"
                    darkColor="white"
                    style={{ textTransform: "uppercase" }}
                >
                    {title.charAt(0)}
                </ThemedText>
            </View>
            <View style={styles.textContainer}>
                <ThemedText>{title}</ThemedText>
                <ThemedText
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    type="light"
                    darkColor="darkgrey"
                >
                    {exercises.join(", ")}
                </ThemedText>
            </View>
        </View>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        height: 112,
        flexDirection: "row",
        gap: 16,
    },
    avatar: {
        marginTop: 4,
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        height: 48,
        borderRadius: 100,
    },
    textContainer: {
        flex: 1,
    },
});
