import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { ExerciseItem } from "@/db/schema";
import ExerciseRenderItem from "@/screens/exercises/components/ExerciseRenderItem";
import React from "react";
import { StyleSheet, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const Exercises = () => {
	const { workoutData, setWorkoutData } = useWorkoutContext();
	const { exercises } = workoutData;

	return (
		<View style={styles.listContainer}>
			<DraggableFlatList<ExerciseItem>
				data={exercises}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				windowSize={10}
				keyExtractor={(item) => item.id}
				onDragEnd={({ data }) =>
					setWorkoutData((prev) => ({
						...prev,
						exercises: data,
					}))
				}
				renderItem={ExerciseRenderItem}
			/>
		</View>
	);
};
export default Exercises;

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
	},
});
