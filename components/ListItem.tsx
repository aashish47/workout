import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/data";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ListItemProps {
    lightColor?: string;
    darkColor?: string;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

const ListItem: React.FC<ListItemProps & Workout> = ({ lightColor, darkColor, id, title, backgroundColor, exercises, selected, setSelected }) => {
    const pressColor = useThemeColor({ light: lightColor, dark: darkColor }, "press");

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
            //Link to workout
        }
    };

    return (
        <Pressable
            onLongPress={handleLongPress}
            onPress={handlePress}
            style={({ pressed }) => [styles.pressContainer, { backgroundColor: pressed ? pressColor : undefined }]}
        >
            <View style={[styles.container, selected.includes(id) ? { backgroundColor: pressColor } : undefined]}>
                {selected.includes(id) ? (
                    <View style={[styles.avatar, { backgroundColor: "thistle" }]}>
                        <Ionicons
                            name="checkmark-sharp"
                            size={24}
                            color="black"
                        />
                    </View>
                ) : (
                    <View style={[styles.avatar, { backgroundColor }]}>
                        <ThemedText
                            lightColor="white"
                            darkColor="white"
                            style={{ textTransform: "uppercase" }}
                        >
                            {title.charAt(0)}
                        </ThemedText>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <ThemedText>{title}</ThemedText>
                    <ThemedText
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        type="light"
                        darkColor="darkgrey"
                    >
                        {exercises.join(", ")}
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
    textContainer: {
        flex: 1,
    },
});
