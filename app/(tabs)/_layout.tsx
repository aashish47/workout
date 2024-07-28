import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
                name="statistics"
                options={{
                    headerShown: true,
                    title: "Statistics",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "stats-chart" : "stats-chart-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
