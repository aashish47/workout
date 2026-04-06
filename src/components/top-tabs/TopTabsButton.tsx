import { ThemedText } from "@/components/theme/ThemedText";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import getTotalTime from "@/utils/getTotalTime";
import { useTheme } from "@react-navigation/native";
import { eq } from "drizzle-orm";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type nameType = "create" | "start";

interface TopTabsButtonProps {
	name: nameType;
}

const TopTabsButton: React.FC<TopTabsButtonProps> = ({ name }) => {
	const insets = useSafeAreaInsets();
	const { workoutData } = useWorkoutContext();
	const btnColor = useThemeColor({}, "primary");
	const ripple = useThemeColor({}, "ripple");
	const { colors } = useTheme();
	const { id, ...rest } = workoutData;
	const { timers, exercises } = workoutData;
	const { formatedDuration, totalSeconds } = getTotalTime(
		timers,
		exercises.length,
	);

	const handlePress = async () => {
		if (name === "create") {
			createWorkout();
			router.navigate("/");
		} else {
			updateWorkout();
			router.replace({
				pathname: "/workout/[id]/start",
				params: { id, totalSeconds, formatedDuration },
			});
		}
	};

	const createWorkout = async () => {
		await db.insert(workout).values({ ...rest });
	};

	const updateWorkout = async () => {
		await db
			.update(workout)
			.set({ ...rest })
			.where(eq(workout.id, id));
	};

	return (
		<View style={{ backgroundColor: colors.card }}>
			<View style={[styles.container, { marginBottom: insets.bottom }]}>
				<Pressable
					android_ripple={{ color: ripple }}
					style={[styles.button, { backgroundColor: btnColor }]}
					onPress={handlePress}
				>
					<ThemedText
						style={styles.text}
					>{`${name} ${formatedDuration}`}</ThemedText>
				</Pressable>
			</View>
		</View>
	);
};

export default TopTabsButton;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10, // Border radius for the ripple effect
		overflow: "hidden", // Clips the ripple effect to the border radius
		margin: 12, // Margin for spacing
	},

	button: {
		height: 64,
		padding: 8,
		borderRadius: 10, // Ensure this matches the container's border radius
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		textTransform: "capitalize",
	},
});
