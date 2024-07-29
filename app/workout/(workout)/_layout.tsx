import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState, useTheme } from "@react-navigation/native";
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
    return (
        <>
            <MaterialTopTabs>
                <MaterialTopTabs.Screen
                    name="index"
                    options={{ title: "timer" }}
                />
                <MaterialTopTabs.Screen name="exercises" />
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
    button: { height: 64, backgroundColor: "purple", padding: 8, margin: 16, borderRadius: 10, alignItems: "center", justifyContent: "center" },
});
