import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
	Pressable,
	StyleSheet,
	TextInput,
	TextInputEndEditingEvent,
	View,
} from "react-native";
import DraggableFlatList, {
	RenderItemParams,
} from "react-native-draggable-flatlist";

const Exercises = () => {
	const { workoutData, setWorkoutData } = useWorkoutContext();
	const { avatarColor: dragColor, exercises } = workoutData;
	const backgroundColor = useThemeColor({}, "secondary");
	const ripple = useThemeColor({}, "ripple");
	const border = useThemeColor({}, "primary");

	const handleEndEditing = (
		e: TextInputEndEditingEvent,
		currIndex: number,
	) => {
		setWorkoutData((prev) => ({
			...prev,
			exercises: exercises.map((exercise, index) =>
				index === currIndex ? e.nativeEvent.text.trim() : exercise,
			),
		}));
	};

	const handleDelete = (currIndex: number) => {
		setWorkoutData((prev) => ({
			...prev,
			exercises: exercises.filter((_, index) => index !== currIndex),
		}));
	};

	const addExercise = () => {
		setWorkoutData((prev) => ({
			...prev,
			exercises: [...exercises, ""],
		}));
	};

	const RenderItem = ({
		item,
		getIndex,
		drag,
		isActive,
	}: RenderItemParams<string>) => {
		const index = getIndex();
		if (index === undefined) {
			console.log("index undefined");
			return;
		}
		return (
			<View
				style={[
					styles.exerciseContainer,
					isActive
						? { backgroundColor: dragColor }
						: { backgroundColor },
				]}
			>
				<IconButton
					iconName={"paw-sharp"}
					size={28}
					onLongPress={drag}
				/>
				<TextInput
					style={{ flexGrow: 1 }}
					defaultValue={item}
					placeholder="Exercise..."
					onEndEditing={(e) => handleEndEditing(e, index)}
				/>
				<IconButton
					iconName={"trash-outline"}
					size={28}
					onPress={() => handleDelete(index)}
				/>
			</View>
		);
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.listContainer}>
				<DraggableFlatList
					data={exercises}
					initialNumToRender={10}
					maxToRenderPerBatch={10}
					windowSize={10}
					keyExtractor={(_, index) => String(index)}
					onDragEnd={({ data }) =>
						setWorkoutData((prev) => ({
							...prev,
							exercises: data,
						}))
					}
					renderItem={RenderItem}
				/>
			</View>

			<View style={styles.wrapper}>
				<Pressable
					android_ripple={{ color: ripple }}
					style={[styles.button, { borderColor: border }]}
					onPress={addExercise}
				>
					<ThemedText>Add Exercise</ThemedText>
				</Pressable>
			</View>
		</ThemedView>
	);
};
export default Exercises;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	listContainer: {
		flex: 1,
	},
	exerciseContainer: {
		marginTop: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
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
