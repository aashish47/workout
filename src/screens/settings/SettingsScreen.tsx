import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import { useDatabaseIO } from "@/hooks/useDatabaseIO";
import useDataContext from "@/hooks/useDataContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function Settings() {
	const { exportData, importData } = useDatabaseIO();
	const data = useDataContext();

	const primaryColor = useThemeColor(
		{ light: undefined, dark: undefined },
		"primary",
	);
	const rippleColor = useThemeColor(
		{ light: undefined, dark: undefined },
		"ripple",
	);

	const handleExport = async () => {
		await exportData(data, "my_app_backup.json");
	};

	const handleImport = async () => {
		const importedData = await importData();
		if (importedData) {
			const dataToInsert = Array.isArray(importedData)
				? importedData
				: [importedData];
			await db.insert(workout).values(dataToInsert);
		}
	};

	return (
		<ThemedView style={styles.container}>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					{
						backgroundColor: primaryColor,
						opacity: pressed ? 0.8 : 1,
					},
				]}
				android_ripple={{ color: rippleColor }}
				onPress={handleExport}
			>
				<ThemedText style={styles.buttonText}>Backup Data</ThemedText>
			</Pressable>

			<Pressable
				style={({ pressed }) => [
					styles.button,
					{
						backgroundColor: primaryColor,
						opacity: pressed ? 0.8 : 1,
					},
				]}
				android_ripple={{ color: rippleColor }}
				onPress={handleImport}
			>
				<ThemedText style={styles.buttonText}>Restore Data</ThemedText>
			</Pressable>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		gap: 16,
	},
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
