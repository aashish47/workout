import IconButton from "@/components/IconButton";
import ColorSelectorModal from "@/components/top-tabs/ColorSelectorModal";
import { nameType } from "@/components/top-tabs/TopTabsButton";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import { eq } from "drizzle-orm";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { BackHandler, Pressable, StyleSheet, TextInput } from "react-native";

interface TopTabsButtonProps {
	name: nameType;
}

const TopTabsHeader: React.FC<TopTabsButtonProps> = ({ name }) => {
	const { workoutData, setWorkoutData } = useWorkoutContext();
	const { title, avatarColor: backgroundColor } = workoutData;
	const { id, ...rest } = workoutData;
	const text = useThemeColor({}, "text");
	const ripple = useThemeColor({}, "ripple");
	const [modalVisible, setModalVisible] = useState(false);

	const handleBackPress = () => {
		if (name === "start") {
			updateWorkout();
		}
		router.back();
		return true;
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBackPress,
		);
		return () => backHandler.remove();
	}, [handleBackPress]);

	const updateWorkout = async () => {
		await db
			.update(workout)
			.set({ ...rest })
			.where(eq(workout.id, id));
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerBackVisible: false,
					headerTitle: () => (
						<TextInput
							defaultValue={title}
							// selectionColor={"plum"}

							selectTextOnFocus
							style={[styles.title, { color: text }]}
							onEndEditing={(e) =>
								setWorkoutData((prev) => {
									return {
										...prev,
										title: e.nativeEvent.text.trim(),
									};
								})
							}
						/>
					),
					headerLeft: () => (
						<IconButton
							iconName={"arrow-back-sharp"}
							size={24}
							onPress={handleBackPress}
						/>
					),
					headerRight: () => {
						return (
							<Pressable
								android_ripple={{
									color: ripple,
									radius: 24,
									borderless: true,
								}}
								hitSlop={20}
								onPress={() => setModalVisible(true)}
								style={[
									styles.currentColor,
									{ backgroundColor },
								]}
							/>
						);
					},
				}}
			/>
			<ColorSelectorModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				backgroundColor={backgroundColor}
				setWorkoutData={setWorkoutData}
			/>
		</>
	);
};

export default TopTabsHeader;

const styles = StyleSheet.create({
	currentColor: {
		width: 16,
		height: 16,
		margin: 16,
		borderRadius: 100,
	},
	title: {
		fontSize: 18,
		marginLeft: 20,
	},
});
