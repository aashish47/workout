import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import WorkoutRefProvider from "@/contexts/WorkoutRefProvider";
import { Workouts } from "@/db/schema";
import React, { useRef } from "react";

export type WorkoutsWithoutId = Omit<Workouts, "id">;

const CreateLayout = () => {
    const workoutRef = useRef<WorkoutsWithoutId>({
        title: "Timer",
        backgroundColor: "plum",
        exercises: [],
        time: {
            work: 40,
            rest: 20,
            intervals: 3,
            "get ready": 10,
            cycles: 10,
            break: 80,
            "warm up": 10,
            "cool down": 10,
        },
    });

    return (
        <WorkoutRefProvider workoutRef={workoutRef}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"create"} />
        </WorkoutRefProvider>
    );
};

export default CreateLayout;
