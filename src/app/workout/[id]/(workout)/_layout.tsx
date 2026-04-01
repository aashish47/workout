import TopTabsLayout from "@/components/top-tabs/TopTabsLayout";
import TopTabsLayoutButton from "@/components/top-tabs/TopTabsLayoutButton";
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
