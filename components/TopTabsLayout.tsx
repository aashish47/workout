import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Stack, withLayoutContext } from "expo-router";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const TopTabsLayout = () => {
    const tabActiveColor = useThemeColor({}, "tint");
    const tabIndicatorColor = useThemeColor({}, "float");
    const tabInactiveColor = useThemeColor({}, "tabIconDefault");
    const tabRippleColor = useThemeColor({}, "ripple");
    const { title, setWorkout } = useWorkoutRefContext();

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <TextInput
                            defaultValue={title}
                            // selectionColor={"plum"}
                            selectTextOnFocus
                            onChangeText={(text) =>
                                setWorkout((prev) => {
                                    return { ...prev, title: text };
                                })
                            }
                        />
                    ),
                }}
            />
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
        </>
    );
};

export default TopTabsLayout;

const styles = StyleSheet.create({});
