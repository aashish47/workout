import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import WorkoutProvider from "@/contexts/WorkoutProvider";
import React from "react";

const CreateLayout = () => {
    const workout = {
        id: 0,
        title: "Timer",
        backgroundColor: "plum",
        exercises: new Array(10).fill(""),
        time: {
            work: 40,
            rest: 20,
            intervals: 3,
            "get ready": 10,
            cycles: 1,
            break: 80,
            "warm up": 590,
            "cool down": 80,
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
