import IconButton from "@/components/IconButton";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { ExerciseItem } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
	StyleSheet,
	TextInput,
	TextInputEndEditingEvent,
	View,
} from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";

const ExerciseRenderItem = ({
	item,
	drag,
	isActive,
}: RenderItemParams<ExerciseItem>) => {
	const { workoutData, setWorkoutData } = useWorkoutContext();
	const { avatarColor: dragColor, exercises } = workoutData;
	const backgroundColor = useThemeColor({}, "secondary");

	const handleEndEditing = (e: TextInputEndEditingEvent, id: string) => {
		setWorkoutData((prev) => ({
			...prev,
			exercises: exercises.map((exercise) =>
				exercise.id === id
					? { ...exercise, name: e.nativeEvent.text.trim() }
					: exercise,
			),
		}));
	};

	const handleDelete = (id: string) => {
		setWorkoutData((prev) => ({
			...prev,
			exercises: exercises.filter((exercise) => exercise.id !== id),
		}));
	};

	return (
		<View
			style={[
				styles.exerciseContainer,
				isActive ? { backgroundColor: dragColor } : { backgroundColor },
			]}
		>
			<IconButton
				iconName={"paw-sharp"}
				size={28}
				onLongPress={drag}
			/>
			<TextInput
				style={{ flexGrow: 1 }}
				defaultValue={item.name}
				placeholder="Exercise..."
				onEndEditing={(e) => handleEndEditing(e, item.id)}
			/>
			<IconButton
				iconName={"trash-outline"}
				size={28}
				onPress={() => handleDelete(item.id)}
			/>
		</View>
	);
};

export default ExerciseRenderItem;

const styles = StyleSheet.create({
	exerciseContainer: {
		marginTop: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
