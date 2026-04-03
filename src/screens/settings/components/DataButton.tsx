import { ThemedText } from "@/components/theme/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const DataButton = ({
	onPress,
	buttonText,
}: {
	onPress: () => Promise<void>;
	buttonText: string;
}) => {
	const primaryColor = useThemeColor(
		{ light: undefined, dark: undefined },
		"primary",
	);
	const rippleColor = useThemeColor(
		{ light: undefined, dark: undefined },
		"ripple",
	);

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{
					backgroundColor: primaryColor,
					opacity: pressed ? 0.8 : 1,
				},
			]}
			android_ripple={{ color: rippleColor }}
			onPress={onPress}
		>
			<ThemedText style={styles.buttonText}>{buttonText}</ThemedText>
		</Pressable>
	);
};

export default DataButton;

const styles = StyleSheet.create({
	title: {
		marginBottom: 8,
	},
	button: {
		padding: 16,
		borderRadius: 10,
		alignItems: "center",
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});
