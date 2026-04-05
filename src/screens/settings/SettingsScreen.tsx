import { ThemedView } from "@/components/theme/ThemedView";
import { useDataContext } from "@/contexts/DataProvider";
import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import { useDatabaseIO } from "@/hooks/useDatabaseIO";
import DataButton from "@/screens/settings/components/DataButton";
import React from "react";
import { StyleSheet } from "react-native";

export default function Settings() {
	const { exportData, importData } = useDatabaseIO();
	const data = useDataContext();

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
			<DataButton
				onPress={handleExport}
				buttonText="Backup Data"
			/>
			<DataButton
				onPress={handleImport}
				buttonText="Restore Data"
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		gap: 16,
	},
});
