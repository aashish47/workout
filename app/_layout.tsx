import DataProvider from "@/contexts/DataProvider";
// import { workouts } from "@/db/data";
import { workouts } from "@/db/schema";
import migrations from "@/drizzle/migrations";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { openDatabaseSync } from "expo-sqlite";
import { useEffect } from "react";
import { Text, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const expoDb = openDatabaseSync("db.db");
const db = drizzle(expoDb);

export default function RootLayout() {
    const { success, error: migrationError } = useMigrations(db, migrations);
    const colorScheme = useColorScheme();
    const { data, updatedAt, error } = useLiveQuery(db.select().from(workouts));
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    if (migrationError) {
        return (
            <View>
                <Text>Migration error: {migrationError.message}</Text>
            </View>
        );
    }
    if (!success) {
        return (
            <View>
                <Text>Migration is in progress...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error Loading Data</Text>
            </View>
        );
    }

    // const [data, setData] = useState(workoutData);

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <DataProvider value={data}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="workout"
                        options={{ animation: "slide_from_right", headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </DataProvider>
        </ThemeProvider>
    );
}
