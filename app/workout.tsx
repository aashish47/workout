import { Workout } from "@/db/data";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const workout = () => {
    const params: Partial<Workout> = useLocalSearchParams();
    return (
        <View>
            <Stack.Screen options={{ title: params.title }} />
            <Text>{params.title}</Text>
        </View>
    );
};

export default workout;

const styles = StyleSheet.create({});
