import { db } from "@/db/drizzle";
import { Workout, workout } from "@/db/schema";
import { useDatabaseIO } from "@/hooks/useDatabaseIO";
import useDataContext from "@/hooks/useDataContext";
import React from "react";
import { Button, View } from "react-native";

const Settings = () => {
	const { exportData, importData } = useDatabaseIO();
	const data = useDataContext();

	const handleExport = async () => {
		await exportData(data, "my_app_backup.json");
	};

	const handleImport = async () => {
		const data: Workout[] = await importData();
		if (data) {
			console.log("Data retrieved:", data);
			await db.insert(workout).values(data);
		}
	};

	return (
		<View style={{ gap: 20, padding: 50 }}>
			<Button
				title="Backup Data"
				onPress={handleExport}
			/>
			<Button
				title="Restore Data"
				onPress={handleImport}
			/>
		</View>
	);
};

export default Settings;
