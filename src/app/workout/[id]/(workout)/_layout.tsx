import TopTabsLayout from "@/components/top-tabs/TopTabsLayout";
import TopTabsLayoutButton from "@/components/top-tabs/TopTabsLayoutButton";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutLayout = () => {
	return (
		<SafeAreaView
			edges={["bottom"]}
			style={{ flex: 1 }}
		>
			<TopTabsLayout />
			<TopTabsLayoutButton name={"start"} />
		</SafeAreaView>
	);
};

export default WorkoutLayout;
