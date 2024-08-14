import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import WorkoutProvider from "@/contexts/WorkoutProvider";
import React from "react";

const CreateLayout = () => {
    const workout = {
        id: 0,
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
    };

    return (
        <WorkoutProvider workout={workout}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"create"} />
        </WorkoutProvider>
    );
};

export default CreateLayout;
