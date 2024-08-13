import { useThemeColor } from "@/hooks/useThemeColor";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const TopTabsLayout = () => {
    const tabActiveColor = useThemeColor({}, "tint");
    const tabIndicatorColor = useThemeColor({}, "primary");
    const tabInactiveColor = useThemeColor({}, "tabIconDefault");
    const tabRippleColor = useThemeColor({}, "ripple");

    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarInactiveTintColor: tabInactiveColor,
                tabBarActiveTintColor: tabActiveColor,
                tabBarIndicatorStyle: { backgroundColor: tabIndicatorColor },
                tabBarAndroidRipple: { color: tabRippleColor },
            }}
        >
            <MaterialTopTabs.Screen
                name="index"
                options={{ title: "timer" }}
            />
            <MaterialTopTabs.Screen name="exercises" />
        </MaterialTopTabs>
    );
};

export default TopTabsLayout;

const styles = StyleSheet.create({});
