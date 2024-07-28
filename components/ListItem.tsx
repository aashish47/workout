import { ThemedText } from "@/components/ThemedText";
import { Workout } from "@/db/data";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

interface ListItemProps {
    lightColor?: string;
    darkColor?: string;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    workout: Workout;
}

type ParamList = {
    workout: Workout;
};

type NavigationProp = NativeStackNavigationProp<ParamList, "workout">;

const ListItem: React.FC<ListItemProps> = ({ lightColor, darkColor, workout, selected, setSelected }) => {
    const { id, title, backgroundColor, exercises } = workout;
    const pressColor = useThemeColor({ light: lightColor, dark: darkColor }, "press");
    const ripple = useThemeColor({ light: lightColor, dark: darkColor }, "ripple");
    const float = useThemeColor({ light: lightColor, dark: darkColor }, "float");
    const navigation = useNavigation<NavigationProp>();

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
            navigation.navigate("workout", { ...workout });
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
                    <View style={[styles.avatar, { backgroundColor }]}>
                        <ThemedText style={{ textTransform: "uppercase" }}>{title.charAt(0)}</ThemedText>
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
