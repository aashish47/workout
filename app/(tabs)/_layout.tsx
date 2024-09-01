import { TabBarIcon } from "@/components/TabBarIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import React from "react";
import { Image, useColorScheme } from "react-native";

export default function TabLayout() {
    const tabBarActiveTintColor = useThemeColor({}, "tabIconSelected");
    const tabBarInactiveTintColor = useThemeColor({}, "tabIconDefault");
    const colorScheme = useColorScheme();

    const logo = colorScheme === "dark" ? require("@/assets/images/logo-dark.png") : require("@/assets/images/logo-light.png");

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor,
                tabBarInactiveTintColor,
                headerShown: false,
                headerTitle: () => (
                    <Image
                        source={logo}
                        style={{ width: 150, height: "100%", objectFit: "contain" }}
                    />
                ),
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
        </Tabs>
    );
}
