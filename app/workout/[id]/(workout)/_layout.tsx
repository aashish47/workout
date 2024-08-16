import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import React from "react";

const WorkoutLayout = () => {
    return (
        <>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"start"} />
        </>
    );
};

export default WorkoutLayout;
