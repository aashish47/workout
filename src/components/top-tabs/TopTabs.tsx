import TopTabsButton, { nameType } from "@/components/top-tabs/TopTabsButton";
import TopTabsHeader from "@/components/top-tabs/TopTabsHeader";
import TopTabsLayout from "@/components/top-tabs/TopTabsLayout";
import React from "react";
import { StyleSheet } from "react-native";

interface TopTabsProps {
	name: nameType;
}

const TopTabs: React.FC<TopTabsProps> = ({ name }) => {
	return (
		<>
			<TopTabsLayout />
			<TopTabsHeader name={name} />
			<TopTabsButton name={name} />
		</>
	);
};

export default TopTabs;

const styles = StyleSheet.create({});
