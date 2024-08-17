import { ThemedText } from "@/components/ThemedText";
import TopTabsLayoutHeader from "@/components/TopTabsLayoutHeader";
import { db } from "@/db/drizzle";
import { Workouts, workouts } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import getTotalTime from "@/utils/getTotalTime";
import { useTheme } from "@react-navigation/native";
import { eq } from "drizzle-orm";
import { router } from "expo-router";
import React, { memo, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface TopTabsLayoutButtonProps {
    name: "create" | "start";
}

const Button = memo(({ name, workout }: TopTabsLayoutButtonProps & { workout: Workouts }) => {
    const btnColor = useThemeColor({}, "primary");
    const ripple = useThemeColor({}, "ripple");
    const { colors } = useTheme();
    const { id, ...rest } = workout;
    const { time, exercises } = workout;
    const totalTime = useMemo(() => getTotalTime(time, exercises.length), [time, exercises]);

    const handlePress = async () => {
        if (name === "create") {
            createWorkout();
            router.back();
        } else {
            updateWorkout();
            router.replace(`workout/${id}/start?duration=${totalTime}`);
        }
    };

    const createWorkout = async () => {
        await db.insert(workouts).values({ ...rest });
    };

    const updateWorkout = async () => {
        await db
            .update(workouts)
            .set({ ...rest })
            .where(eq(workouts.id, id));
    };

    const handleBackPress = useCallback(() => {
        if (name === "create") {
            createWorkout();
        } else {
            updateWorkout();
        }
        router.back();
    }, [workout]);

    return (
        <>
            <TopTabsLayoutHeader handleBackPress={handleBackPress} />
            <View style={{ backgroundColor: colors.card }}>
                <View style={styles.container}>
                    <Pressable
                        android_ripple={{ color: ripple }}
                        style={[styles.button, { backgroundColor: btnColor }]}
                        onPress={handlePress}
                    >
                        <ThemedText style={styles.text}>{`${name} ${totalTime}`}</ThemedText>
                    </Pressable>
                </View>
            </View>
        </>
    );
});

const TopTabsLayoutButton: React.FC<TopTabsLayoutButtonProps> = memo(({ name }) => {
    const { workout: data } = useWorkoutContext();
    const workout = useMemo(() => data, [data]);

    return (
        <Button
            name={name}
            workout={workout}
        />
    );
});

export default TopTabsLayoutButton;

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
