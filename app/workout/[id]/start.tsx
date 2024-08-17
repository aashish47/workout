import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { Workouts } from "@/db/schema";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import getFormatedTime from "@/utils/getFormatedTime";
import getWorkoutOrder from "@/utils/getWorkoutOrder";
import { useLocalSearchParams } from "expo-router";
import React, { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface StartComponentProps {
    workout: Workouts;
}

const StartComponent = memo(({ workout }: StartComponentProps) => {
    const { duration } = useLocalSearchParams<{ duration: string }>();
    const { time, exercises } = workout;
    const workoutOrder = getWorkoutOrder(time, exercises);
    const [index, setIndex] = useState(0);
    const { start, timer, timerValue, cycleNumber, exercise, exerciseNumber, timerNumber } = workoutOrder[index];
    return (
        <View style={styles.container}>
            <View>
                <Text>{timer}</Text>
                <Text>{exercise}</Text>
                {time["cycles"] > 1 && cycleNumber && <Text>{`Cycle: ${cycleNumber}/${time["cycles"]}`}</Text>}
                {exerciseNumber && <Text>{`Exercise: ${exerciseNumber}/${exercises.length}`}</Text>}
                {time["intervals"] > 1 && timerNumber && <Text>{`Set: ${timerNumber}/${time["intervals"]}`}</Text>}
            </View>
            <View>
                <Text>progress bar</Text>
                <View style={styles.duration}>
                    <ThemedText>{getFormatedTime(start)}</ThemedText>
                    <ThemedText>{duration}</ThemedText>
                </View>
                <View style={styles.control}>
                    <IconButton
                        iconName={"menu-sharp"}
                        size={32}
                        onPress={undefined}
                    />
                    <IconButton
                        iconName={"play-skip-back-sharp"}
                        size={32}
                        onPress={() => setIndex((index) => Math.max(index - 1, 0))}
                    />
                    <IconButton
                        iconName={"play-sharp"}
                        size={64}
                        onPress={undefined}
                    />
                    <IconButton
                        iconName={"play-skip-forward-sharp"}
                        size={32}
                        onPress={() => setIndex((index) => Math.min(index + 1, workoutOrder.length - 1))}
                    />
                    <IconButton
                        iconName={"volume-high-sharp"}
                        size={32}
                        onPress={undefined}
                    />
                </View>
            </View>
        </View>
    );
});

const Start = memo(() => {
    const { workout } = useWorkoutContext();
    return <StartComponent workout={workout} />;
});

export default Start;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    control: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    duration: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 8,
    },
});
