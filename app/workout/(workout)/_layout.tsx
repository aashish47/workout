import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/data";
import useDataContext from "@/hooks/useDataContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ParamList } from "@/types/routeParams";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { ParamListBase, RouteProp, TabNavigationState, useRoute, useTheme } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const WorkoutLayout = () => {
    const btnColor = useThemeColor({}, "float");
    const ripple = useThemeColor({}, "ripple");
    const { colors } = useTheme();
    const route = useRoute<RouteProp<ParamList, "(workout)">>();
    const { id } = route.params;
    const { data } = useDataContext() ?? {};
    if (!data) {
        throw Error("Data doesn't exsit");
    }

    const workout = data.filter((d) => d.id == id)[0];
    const { time, exercises } = workout;
    const timers = Object.entries(time) as [keyof Workout["time"], number][];
    const tabActiveColor = useThemeColor({}, "tint");
    const tabIndicatorColor = useThemeColor({}, "float");
    const tabInactiveColor = useThemeColor({}, "tabIconDefault");
    const tabRippleColor = useThemeColor({}, "ripple");

    return (
        <>
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
                    initialParams={{ timers }}
                />
                <MaterialTopTabs.Screen
                    name="exercises"
                    initialParams={{ exercises }}
                />
            </MaterialTopTabs>
            <View style={{ backgroundColor: colors.card }}>
                <Pressable
                    android_ripple={{ color: ripple, borderless: false }}
                    style={[styles.button, { backgroundColor: btnColor }]}
                >
                    <ThemedText>Start</ThemedText>
                </Pressable>
            </View>
        </>
    );
};

export default WorkoutLayout;

const styles = StyleSheet.create({
    button: {
        height: 64,
        backgroundColor: "purple",
        padding: 8,
        margin: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
