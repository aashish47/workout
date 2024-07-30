import { Workout } from "@/db/data";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const WorkoutLayout = () => {
    const params: Partial<Workout> = useLocalSearchParams();

    return (
        <Stack>
            <Stack.Screen
                name="(workout)"
                options={{ title: params.title, headerShadowVisible: false }}
                initialParams={params}
            />
        </Stack>
    );
};

export default WorkoutLayout;
