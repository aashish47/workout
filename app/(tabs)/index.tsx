import IconButton from "@/components/IconButton";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db/drizzle";
import { workouts } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ParamList } from "@/types/routeParams";
import { NavigationProp } from "@react-navigation/native";
import { inArray } from "drizzle-orm";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
    const [selected, setSelected] = useState<number[]>([]);
    const navigation = useNavigation<NavigationProp<ParamList, "create">>();
    const data = useDataContext();
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
                headerRight: () => {
                    const deleteWorkouts = async () => {
                        await db.delete(workouts).where(inArray(workouts.id, selected));
                        setSelected([]);
                    };
                    return (
                        <View style={{ flexDirection: "row", gap: 2 }}>
                            <IconButton
                                onPress={deleteWorkouts}
                                iconName="trash-sharp"
                                size={24}
                            />
                            {/* checkbox to select all */}
                        </View>
                    );
                },
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
                backgroundColor={float}
                style={styles.floatBtn}
                onPress={() => navigation.navigate("create")}
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
