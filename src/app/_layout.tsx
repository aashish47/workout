import DataProvider from "@/contexts/DataProvider";
import { db } from "@/db/drizzle";
import migrations from "@/db/migrations/migrations";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { preload } from "expo-audio";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export const audioPaths = {
	"countdown": require(`@assets/sounds/countdown.mp3`),
	"exercise-over": require(`@assets/sounds/exercise-over.mp3`),
	"halftime": require(`@assets/sounds/halftime.mp3`),
	"set-over": require(`@assets/sounds/set-over.mp3`),
	"ten": require(`@assets/sounds/ten.mp3`),
	"workout-over": require(`@assets/sounds/workout-over.mp3`),
	"zero": require(`@assets/sounds/zero.mp3`),
};

Object.entries(audioPaths).forEach(([key, path]) => {
	preload(path);
});

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
	return (
		<DataProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="workout/[id]"
					options={{
						animation: "slide_from_right",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="create"
					options={{
						animation: "slide_from_right",
						headerShown: false,
					}}
				/>
				<Stack.Screen name="+not-found" />
			</Stack>
		</DataProvider>
	);
};

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
	});
	const { success, error: migrationError } = useMigrations(db, migrations);
	// useDrizzleStudio(expoDb);
	const colorScheme = useColorScheme();

	useEffect(() => {
		if (loaded && success) {
			SplashScreen.hide();
		}
	}, [loaded, success]);

	if (!loaded || !success) {
		return null;
	}
	if (migrationError) {
		return (
			<SafeAreaView>
				<View>
					<Text>Migration error: {migrationError.message}</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		// <StrictMode>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider
				value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<AppContent />
			</ThemeProvider>
		</GestureHandlerRootView>
		// </StrictMode>
	);
}
function useDrizzleStudio(expoDb: any) {
	throw new Error("Function not implemented.");
}
