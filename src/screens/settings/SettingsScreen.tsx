import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import { useDatabaseIO } from "@/hooks/useDatabaseIO"; // adjust path
import useDataContext from "@/hooks/useDataContext";
import React from "react";
import { Button, View } from "react-native";

export default function Settings() {
	const { exportData, importData } = useDatabaseIO();

	const handleExport = async () => {
		const data = useDataContext();
		await exportData(data, "my_app_backup.json");
	};

	const handleImport = async () => {
		const data = await importData();
		if (data) {
			console.log("Data retrieved:", data);
			await db.insert(workout).values({ ...data });
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
}
