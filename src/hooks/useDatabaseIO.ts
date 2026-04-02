import { Workout } from "@/db/schema";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export const useDatabaseIO = () => {
	// 1. EXPORT: Takes a string or object and saves it to a file
	const exportData = async (data: Workout[], fileName = "backup.json") => {
		try {
			// Check if sharing is available on the device
			if (!(await Sharing.isAvailableAsync())) {
				Alert.alert("Error", "Sharing is not available on this device");
				return;
			}

			const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
			const content =
				typeof data === "string" ? data : JSON.stringify(data);

			// Write to temporary cache
			await FileSystem.writeAsStringAsync(fileUri, content, {
				encoding: FileSystem.EncodingType.UTF8,
			});

			// Open the "Save to Files" / Share popup
			await Sharing.shareAsync(fileUri, {
				mimeType: "application/json",
				dialogTitle: "Export Database Data",
				UTI: "public.json", // Required for iOS to recognize the file type
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error("Export Error:", error.message);
				Alert.alert("Export Failed", error.message);
			} else {
				console.error("Export Error:", error);
			}
		}
	};

	// 2. IMPORT: Opens file picker and returns the file content
	const importData = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ["application/json", "text/plain"],
				copyToCacheDirectory: true,
			});

			if (result.canceled) return null;

			const { uri } = result.assets[0];

			// Read the file content
			const content = await FileSystem.readAsStringAsync(uri, {
				encoding: FileSystem.EncodingType.UTF8,
			});

			return JSON.parse(content);
		} catch (error) {
			console.error("Import Error:", error);
			Alert.alert(
				"Import Failed",
				"The file might be corrupted or invalid.",
			);
			return null;
		}
	};

	return { exportData, importData };
};
