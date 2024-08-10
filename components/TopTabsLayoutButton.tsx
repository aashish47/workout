import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db/drizzle";
import { workouts } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import { ParamList } from "@/types/routeParams";
import { NavigationProp, useTheme } from "@react-navigation/native";
import { eq } from "drizzle-orm";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface TabLayoutButtonProps {
    name: "create" | "start";
}

const TabLayoutButton: React.FC<TabLayoutButtonProps> = ({ name }) => {
    const btnColor = useThemeColor({}, "float");
    const ripple = useThemeColor({}, "ripple");
    const text = useThemeColor({}, "text");
    const { colors } = useTheme();
    const { workoutRef, setWorkout, title } = useWorkoutRefContext();
    const navigation = useNavigation<NavigationProp<ParamList, "index">>();
    const handlePress = async () => {
        const { id, title, backgroundColor, exercises, time } = workoutRef.current!;
        if (name === "create") {
            createWorkout();
            navigateBack();
        } else {
            // start with update if data updated else start
        }
    };

    const createWorkout = async () => {
        const { title, backgroundColor, exercises, time } = workoutRef.current!;
        await db.insert(workouts).values({ title, backgroundColor, exercises, time });
    };

    const updateWorkout = async () => {
        const { id, title, backgroundColor, exercises, time } = workoutRef.current!;
        await db.update(workouts).set({ title, backgroundColor, exercises, time }).where(eq(workouts.id, id));
    };

    const navigateBack = () => {
        navigation.navigate("index");
    };

    const handleBackPress = () => {
        if (name === "create") {
            createWorkout();
        } else {
            updateWorkout();
        }
        navigateBack();
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    headerTitle: () => (
                        <TextInput
                            defaultValue={title}
                            // selectionColor={"plum"}

                            selectTextOnFocus
                            style={{ fontSize: 18, marginLeft: 20, color: text }}
                            onChangeText={(text) =>
                                setWorkout((prev) => {
                                    return { ...prev, title: text };
                                })
                            }
                        />
                    ),
                    headerLeft: () => (
                        <IconButton
                            iconName={"arrow-back-sharp"}
                            size={24}
                            onPress={handleBackPress}
                        />
                    ),
                }}
            />
            <View style={{ backgroundColor: colors.card }}>
                <View style={styles.container}>
                    <Pressable
                        android_ripple={{ color: ripple }}
                        style={[styles.button, { backgroundColor: btnColor }]}
                        onPress={handlePress}
                    >
                        <ThemedText style={styles.text}>{name}</ThemedText>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default TabLayoutButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10, // Border radius for the ripple effect
        overflow: "hidden", // Clips the ripple effect to the border radius
        margin: 12, // Margin for spacing
    },
    button: {
        height: 64,
        padding: 8,
        borderRadius: 10, // Ensure this matches the container's border radius
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        textTransform: "capitalize",
    },
});
