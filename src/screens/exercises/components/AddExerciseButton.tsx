import { ThemedText } from "@/components/theme/ThemedText";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { generateUID } from "@/utils/generateUID";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const AddExerciseButton = () => {
	const { workoutData, setWorkoutData } = useWorkoutContext();
	const { exercises } = workoutData;
	const ripple = useThemeColor({}, "ripple");
	const border = useThemeColor({}, "primary");
	const addExercise = () => {
		setWorkoutData((prev) => ({
			...prev,
			exercises: [...exercises, { id: generateUID(), name: "" }],
		}));
	};

	return (
		<View style={styles.wrapper}>
			<Pressable
				android_ripple={{ color: ripple, foreground: true }}
				style={[styles.button, { borderColor: border }]}
				onPress={addExercise}
			>
				<ThemedText>Add Exercise</ThemedText>
			</Pressable>
		</View>
	);
};

export default AddExerciseButton;

const styles = StyleSheet.create({
	wrapper: {
		margin: 12,
		borderRadius: 10,
		overflow: "hidden",
	},
	button: {
		borderWidth: 2,
		borderRadius: 10,
		padding: 8,
		justifyContent: "center",
		alignItems: "center",
	},
});
