import DataProvider from "@/contexts/DataProvider";
import { db } from "@/db/drizzle";
import migrations from "@/db/migrations/migrations";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    const { success, error: migrationError } = useMigrations(db, migrations);
    // useDrizzleStudio(expoDb);
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (loaded && success) {
            SplashScreen.hideAsync();
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <DataProvider>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="workout/[id]"
                            options={{ animation: "slide_from_right", headerShown: false }}
                        />
                        <Stack.Screen
                            name="create"
                            options={{ animation: "slide_from_right", headerShown: false }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </DataProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
