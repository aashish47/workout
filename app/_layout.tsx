import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
        </ThemeProvider>
    );
}
