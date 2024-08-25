import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import WorkoutProvider from "@/contexts/WorkoutProvider";
import React from "react";

const CreateLayout = () => {
    const workoutData = {
        id: 0,
        title: "Timer",
        avatarColor: "plum",
        exercises: new Array(10).fill(""),
        timers: {
            "warm up": 590,
            "get ready": 10,
            work: 40,
            rest: 20,
            sets: 3,
            break: 80,
            cycles: 1,
            "cool down": 80,
        },
    };

    return (
        <WorkoutProvider workoutData={workoutData}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"create"} />
        </WorkoutProvider>
    );
};

export default CreateLayout;
