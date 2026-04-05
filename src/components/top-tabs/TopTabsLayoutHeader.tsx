import ColorSelectorModal from "@/components/ColorSelectorModal";
import IconButton from "@/components/IconButton";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

interface TopTabsHeaderProps {
	handleBackPress: () => void;
}

const TopTabsLayoutHeader: React.FC<TopTabsHeaderProps> = ({
	handleBackPress,
}) => {
	const { workoutData, setWorkoutData } = useWorkoutContext();
	const { title, avatarColor: backgroundColor } = workoutData;
	const text = useThemeColor({}, "text");
	const ripple = useThemeColor({}, "ripple");
	const [modalVisible, setModalVisible] = useState(false);
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
					headerRight: () => (
						<Pressable
							android_ripple={{
								color: ripple,
								radius: 24,
								borderless: true,
							}}
							hitSlop={20}
							onPress={() => setModalVisible(true)}
							style={[styles.currentColor, { backgroundColor }]}
						/>
					),
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

export default TopTabsLayoutHeader;

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
