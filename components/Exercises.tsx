import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import React, { Dispatch, memo, SetStateAction } from "react";
import { NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputEndEditingEventData, View } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

interface ExercisesComponentProps {
    dragColor: string;
    exercises: Workout["exercises"];
    setWorkoutData: Dispatch<SetStateAction<Workout>>;
}

const ExercisesComponent = memo(({ dragColor, exercises, setWorkoutData }: ExercisesComponentProps) => {
    const backgroundColor = useThemeColor({}, "secondary");
    const ripple = useThemeColor({}, "ripple");
    const border = useThemeColor({}, "primary");

    const handleEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>, currIndex: number) => {
        setWorkoutData((prev) => ({ ...prev, exercises: exercises.map((exercise, index) => (index === currIndex ? e.nativeEvent.text.trim() : exercise)) }));
    };

    const handleDelete = (currIndex: number) => {
        setWorkoutData((prev) => ({
            ...prev,
            exercises: exercises.filter((_, index) => index !== currIndex),
        }));
    };

    const addExercise = () => {
        setWorkoutData((prev) => ({
            ...prev,
            exercises: [...exercises, ""],
        }));
    };

    const RenderItem = ({ item, getIndex, drag, isActive }: RenderItemParams<string>) => {
        const index = getIndex();
        if (index === undefined) {
            console.log("index undefined");
            return;
        }
        return (
            <View style={[styles.exerciseContainer, isActive ? { backgroundColor: dragColor } : { backgroundColor }]}>
                <IconButton
                    iconName={"paw-sharp"}
                    size={28}
                    onLongPress={drag}
                />
                <TextInput
                    style={{ flexGrow: 1 }}
                    defaultValue={item}
                    placeholder="Exercise..."
                    onEndEditing={(e) => handleEndEditing(e, index)}
                />
                <IconButton
                    iconName={"trash-outline"}
                    size={28}
                    onPress={() => handleDelete(index)}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <DraggableFlatList
                    data={exercises}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    keyExtractor={(_, index) => String(index)}
                    onDragEnd={({ data }) => setWorkoutData((prev) => ({ ...prev, exercises: data }))}
                    renderItem={RenderItem}
                />
            </View>

            <View style={styles.wrapper}>
                <Pressable
                    android_ripple={{ color: ripple }}
                    style={[styles.button, { borderColor: border }]}
                    onPress={addExercise}
                >
                    <ThemedText>Add Exercise</ThemedText>
                </Pressable>
            </View>
        </View>
    );
});

const Exercises = memo(() => {
    const { workoutData, setWorkoutData } = useWorkoutContext();
    const { avatarColor, exercises } = workoutData;

    return (
        <ExercisesComponent
            dragColor={avatarColor}
            exercises={exercises}
            setWorkoutData={setWorkoutData}
        />
    );
});

export default Exercises;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    listContainer: {
        flex: 1,
    },
    exerciseContainer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    wrapper: {
        margin: 12,
        borderRadius: 10,
        overflow: "hidden",
    },
    button: {
        borderWidth: 2,
        borderRadius: 10,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});
