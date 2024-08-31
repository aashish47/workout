import GenericRenderItem from "@/components/GenericRenderItem";
import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import getTotalTime from "@/utils/getTotalTime";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleSheet, View } from "react-native";

interface WorkoutRenderItemProps {
    workout: Workout;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    setChecked: Dispatch<SetStateAction<boolean>>;
}

const WorkoutRenderItem = ({ workout, selected, setSelected, setChecked }: WorkoutRenderItemProps) => {
    const pressColor = useThemeColor({}, "secondary");
    const backgroundColor = useThemeColor({}, "primary");
    const { id, exercises, timers } = workout;
    const { formatedDuration } = useMemo(() => getTotalTime(timers, exercises.length), [timers, exercises]);

    return (
        <GenericRenderItem<Workout>
            id={id}
            item={workout}
            selected={selected}
            setSelected={setSelected}
            setChecked={setChecked}
            onPress={() => router.navigate(`/workout/${id}`)}
            renderContent={(item, isSelected) => (
                <View style={[styles.container, isSelected && { backgroundColor: pressColor }]}>
                    {isSelected ? (
                        <View style={[styles.avatar, { backgroundColor }]}>
                            <Ionicons
                                name="checkmark-sharp"
                                size={24}
                                color="black"
                            />
                        </View>
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
                            <ThemedText style={{ textTransform: "uppercase", color: "white" }}>{item.title.charAt(0)}</ThemedText>
                        </View>
                    )}
                    <View style={styles.metaData}>
                        <View style={styles.titleContainer}>
                            <ThemedText>{item.title}</ThemedText>
                            <ThemedText type="light">{formatedDuration}</ThemedText>
                        </View>
                        <ThemedText
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            type="light"
                            darkColor="darkgrey"
                        >
                            {item.exercises?.join(", ")}
                        </ThemedText>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    avatar: {
        alignSelf: "flex-start",
        marginTop: 4,
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        height: 48,
        borderRadius: 100,
    },
    metaData: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default WorkoutRenderItem;
