import TopTabsFooter, { nameType } from "@/components/top-tabs/TopTabsFooter";
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
			<TopTabsHeader name={name} />
			<TopTabsLayout />
			<TopTabsFooter name={name} />
		</>
	);
};

export default TopTabs;

const styles = StyleSheet.create({});
