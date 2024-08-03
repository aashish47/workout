import IconButton from "@/components/IconButton";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db/drizzle";
import { workouts } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { inArray } from "drizzle-orm";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
    const [selected, setSelected] = useState<number[]>([]);
    const navigation = useNavigation();
    const data = useDataContext();
    if (!data) {
        throw Error("Data doesn't exist");
    }

    const float = useThemeColor({ light: undefined, dark: undefined }, "float");

    useEffect(() => {
        if (selected.length) {
            navigation.setOptions({
                headerTitle: () => <ThemedText>{selected.length}</ThemedText>,
                headerLeft: () => (
                    <IconButton
                        onPress={() => setSelected([])}
                        iconName="arrow-back-sharp"
                        size={24}
                    />
                ),
                headerRight: () => (
                    <View style={{ flexDirection: "row", gap: 2 }}>
                        <IconButton
                            onPress={async () => {
                                // setData(data.filter(({ id }) => !selected.includes(id)));
                                await db.delete(workouts).where(inArray(workouts.id, selected));
                                setSelected([]);
                            }}
                            iconName="trash-sharp"
                            size={24}
                        />
                        {/* checkbox to select all */}
                    </View>
                ),
            });
        } else {
            navigation.setOptions({
                headerTitle: () => <ThemedText>Logo</ThemedText>,
                headerLeft: undefined,
                headerRight: undefined,
            });
        }
    }, [navigation, selected]);

    return (
        <View style={{ flex: 1 }}>
            <IconButton
                iconName="add"
                size={32}
                onPress={async () =>
                    await db.insert(workouts).values({
                        title: "Legs",
                        backgroundColor: "tomato", // Tomato red
                        exercises: [
                            "Squats",
                            "Lunges",
                            "Leg Press",
                            "Hamstring Curls",
                            "Calf Raises",
                            "Leg Extensions",
                            "Leg Curls",
                            "Step-Ups",
                            "Glute Bridges",
                            "Bulgarian Split Squats",
                        ],
                        time: { "work": 40, "rest": 20, "intervals": 4, "get ready": 10, "cycles": 8, "break": 80, "warm up": 10, "cool down": 10 },
                    })
                }
                backgroundColor={float}
                style={styles.floatBtn}
            />

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ListItem
                        workout={item}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    floatBtn: {
        position: "absolute",
        bottom: 30,
        right: 30,
        zIndex: 2,
        elevation: 8, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
