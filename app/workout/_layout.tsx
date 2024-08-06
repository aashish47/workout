import { Workouts } from "@/db/schema";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const WorkoutLayout = () => {
    const params: Partial<Workouts> = useLocalSearchParams();
    const { title } = params;

    return (
        <Stack>
            <Stack.Screen
                name="(workout)"
                options={{ title, headerShadowVisible: false }}
                initialParams={params}
            />
        </Stack>
    );
};

export default WorkoutLayout;
