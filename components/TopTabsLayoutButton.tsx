import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db/drizzle";
import { workouts } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import { ParamList } from "@/types/routeParams";
import { NavigationProp, useTheme } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface TabLayoutButtonProps {
    name: "create" | "start";
}

const TabLayoutButton: React.FC<TabLayoutButtonProps> = ({ name }) => {
    const btnColor = useThemeColor({}, "float");
    const ripple = useThemeColor({}, "ripple");
    const { colors } = useTheme();
    const { workoutRef } = useWorkoutRefContext();
    const navigation = useNavigation<NavigationProp<ParamList, "index">>();
    const handlePress = async () => {
        const { title, backgroundColor, exercises, time } = workoutRef.current!;
        if (name === "create") {
            await db.insert(workouts).values({ title, backgroundColor, exercises, time });
            navigation.navigate("index");
        }
    };
    return (
        <View style={{ backgroundColor: colors.card }}>
            <Pressable
                android_ripple={{ color: ripple }}
                style={[styles.button, { backgroundColor: btnColor }]}
                onPress={handlePress}
            >
                <ThemedText style={{ textTransform: "capitalize" }}>{name}</ThemedText>
            </Pressable>
        </View>
    );
};

export default TabLayoutButton;

const styles = StyleSheet.create({
    button: {
        height: 64,
        backgroundColor: "purple",
        padding: 8,
        margin: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
