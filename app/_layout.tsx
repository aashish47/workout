import DataProvider from "@/contexts/DataProvider";
import { workouts } from "@/db/data";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [data, setData] = useState(workouts);
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <DataProvider value={{ data, setData }}>
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
