import WorkoutProvider from "@/contexts/WorkoutProvider";
import { Workout } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { memo, useMemo } from "react";

interface LayoutProps {
    id: number;
    data: Workout[];
}
const WorkoutLayoutComponent = memo(({ id, data }: LayoutProps) => {
    const workoutData = data.find((d) => d.id === id);
    if (!workoutData) throw Error("Workout undefined");
    const { title } = workoutData;
    return (
        <WorkoutProvider workoutData={workoutData}>
            <Stack>
                <Stack.Screen
                    name="(workout)"
                    options={{ title, headerShadowVisible: false }}
                />
                <Stack.Screen
                    name="start"
                    options={{
                        headerShadowVisible: false,
                        headerShown: false,
                    }}
                />
            </Stack>
        </WorkoutProvider>
    );
});

const WorkoutLayout = memo(() => {
    const { id } = useLocalSearchParams<{ id: string; title: string }>();
    if (!id) throw Error("ID Null");
    const dataContext = useDataContext();
    const data = useMemo(() => dataContext, [dataContext]);

    return (
        <WorkoutLayoutComponent
            id={Number(id)}
            data={data}
        />
    );
});

export default WorkoutLayout;
