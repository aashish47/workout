import ConfirmModal from "@/components/ConfirmModal";
import IconButton from "@/components/IconButton";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { inArray } from "drizzle-orm";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
    const [selected, setSelected] = useState<number[]>([]);
    const navigation = useNavigation();
    const data = useDataContext();
    const float = useThemeColor({ light: undefined, dark: undefined }, "primary");
    const [modalVisible, setModalVisible] = useState(false);

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
                    const deleteWorkouts = () => {
                        setModalVisible(true);
                    };
                    return (
                        <View style={{ flexDirection: "row", gap: 2 }}>
                            <IconButton
                                onPress={deleteWorkouts}
                                iconName="trash-sharp"
                                size={24}
                            />
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

    const handleDelete = async () => {
        await db.delete(workout).where(inArray(workout.id, selected));
        setSelected([]);
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <IconButton
                iconName="add"
                size={32}
                style={[styles.floatBtn, { backgroundColor: float }]}
                onPress={() => router.navigate("/create")}
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
            {modalVisible && (
                <ConfirmModal
                    title="Delete the selected workouts?"
                    subtitle="This action cannot be undone."
                    confirmText="delete"
                    confirmTextColor="crimson"
                    confirmOnPressHandler={handleDelete}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            )}
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
