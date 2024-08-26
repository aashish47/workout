import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import getTotalTime from "@/utils/getTotalTime";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ListItemProps {
    lightColor?: string;
    darkColor?: string;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    workout: Workout;
}

const ListItem: React.FC<ListItemProps> = ({ lightColor, darkColor, workout, selected, setSelected }) => {
    const { id, title, avatarColor, exercises, timers } = workout;
    const pressColor = useThemeColor({ light: lightColor, dark: darkColor }, "secondary");
    const ripple = useThemeColor({ light: lightColor, dark: darkColor }, "ripple");
    const float = useThemeColor({ light: lightColor, dark: darkColor }, "primary");
    const { formatedDuration } = useMemo(() => getTotalTime(timers, exercises.length), [timers, exercises]);

    const handleLongPress = () => {
        setSelected([...selected, id]);
    };

    const handlePress = () => {
        if (selected.length) {
            if (selected.includes(id)) {
                setSelected(selected.filter((selectedId) => selectedId !== id));
            } else {
                handleLongPress();
            }
        } else {
            router.navigate(`/workout/${id}`);
        }
    };

    return (
        <Pressable
            android_ripple={{ color: ripple, borderless: false }}
            onLongPress={handleLongPress}
            onPress={handlePress}
            style={styles.pressContainer}
        >
            <View style={[styles.container, selected.includes(id) ? { backgroundColor: pressColor } : undefined]}>
                {selected.includes(id) ? (
                    <View style={[styles.avatar, { backgroundColor: float }]}>
                        <Ionicons
                            name="checkmark-sharp"
                            size={24}
                            color="black"
                        />
                    </View>
                ) : (
                    <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
                        <ThemedText style={{ textTransform: "uppercase", color: "white" }}>{title.charAt(0)}</ThemedText>
                    </View>
                )}
                <View style={styles.metaData}>
                    <View style={styles.titleContainer}>
                        <ThemedText>{title}</ThemedText>
                        <ThemedText type="light">{formatedDuration}</ThemedText>
                    </View>
                    <ThemedText
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        type="light"
                        darkColor="darkgrey"
                    >
                        {exercises?.join(", ")}
                    </ThemedText>
                </View>
            </View>
        </Pressable>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    pressContainer: {
        marginBottom: 2,
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
