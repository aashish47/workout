import { TabBarIcon } from "@/components/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    const tabBarActiveTintColor = useThemeColor({}, "tabIconSelected");
    const tabBarInactiveTintColor = useThemeColor({}, "tabIconDefault");

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor,
                tabBarInactiveTintColor,
                headerShown: false,
                headerTitle: () => <ThemedText>Logo</ThemedText>,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: "Timers",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "timer" : "timer-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    headerShown: true,
                    title: "History",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "file-tray-full" : "file-tray-full-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            {/* <Tabs.Screen
                name="colors"
                options={{
                    headerShown: true,
                    title: "Colors",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "color-palette" : "color-palette-outline"}
                            color={color}
                        />
                    ),
                }}
            /> */}
        </Tabs>
    );
}
