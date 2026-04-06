import { ThemedView } from "@/components/theme/ThemedView";
import AddExerciseButton from "@/screens/exercises/components/AddExerciseButton";
import Exercises from "@/screens/exercises/components/Exercises";
import React from "react";
import { StyleSheet } from "react-native";

const ExercisesScreen = () => {
	return (
		<ThemedView style={styles.container}>
			<Exercises />
			<AddExerciseButton />
		</ThemedView>
	);
};

export default ExercisesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
