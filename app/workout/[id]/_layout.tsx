import WorkoutProvider from "@/contexts/WorkoutProvider";
import { Workouts } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { memo, useMemo } from "react";

interface LayoutProps {
    id: number;
    data: Workouts[];
}
const WorkoutLayoutComponent = memo(({ id, data }: LayoutProps) => {
    const workout = data.filter((d) => d.id === id)[0];
    const { title } = workout;
    return (
        <WorkoutProvider workout={workout}>
            <Stack>
                <Stack.Screen
                    name="(workout)"
                    options={{ title, headerShadowVisible: false }}
                />
                <Stack.Screen name="start" />
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
