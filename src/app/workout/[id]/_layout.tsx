import WorkoutProvider from "@/contexts/WorkoutProvider";
import useDataContext from "@/hooks/useDataContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const WorkoutLayout = () => {
	const { id } = useLocalSearchParams<{ id: string; title: string }>();
	if (!id) throw Error("ID Null");
	const data = useDataContext();

	const workoutData = data.find((d) => d.id === Number(id));
	if (!workoutData) throw Error("Workout undefined");
	const { title } = workoutData;
	return (
		<WorkoutProvider workoutData={workoutData}>
			<Stack>
				<Stack.Screen
					name="(workout)"
					options={{ title, headerShadowVisible: false }}
				/>
				<Stack.Screen
					name="start"
					options={{
						headerShadowVisible: false,
						headerShown: false,
					}}
				/>
			</Stack>
		</WorkoutProvider>
	);
};

export default WorkoutLayout;
