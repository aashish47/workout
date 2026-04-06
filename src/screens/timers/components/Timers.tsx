import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { Timers } from "@/db/schema";
import MultiModeCounterInput from "@/screens/timers/components/MultiModeCounterInput";
import React from "react";
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const Timers = () => {
	const { setWorkoutData, timersRef } = useWorkoutContext();
	const timers = Object.entries(timersRef.current) as Timers;

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<ThemedView style={{ flex: 1 }}>
				{timers.map(([timer, value], index: number) => (
					<View
						key={index}
						style={styles.input}
					>
						<ThemedText style={styles.label}>{timer}</ThemedText>
						<MultiModeCounterInput
							setWorkoutData={setWorkoutData}
							timer={timer}
							timerValue={value}
							mode={
								timer === "sets" || timer === "cycles"
									? "counter"
									: "timer"
							}
						/>
					</View>
				))}
			</ThemedView>
		</TouchableWithoutFeedback>
	);
};

export default Timers;

const styles = StyleSheet.create({
	input: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 12,
		marginTop: 24,
	},
	label: {
		flex: 1,
		textTransform: "capitalize",
	},
});
