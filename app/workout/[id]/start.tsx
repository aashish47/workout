import { Workouts } from "@/db/schema";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface StartComponentProps {
    workout: Workouts;
}

const StartComponent = memo(({ workout }: StartComponentProps) => {
    return (
        <View>
            <Text> Start</Text>
        </View>
    );
});

const Start = memo(() => {
    const { workout } = useWorkoutContext();
    return <StartComponent workout={workout} />;
});

export default Start;

const styles = StyleSheet.create({});
