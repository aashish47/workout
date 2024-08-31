import ConfirmModal from "@/components/ConfirmModal";
import IconButton from "@/components/IconButton";
import WorkoutRenderItem from "@/components/WorkoutRenderItem";
import { db } from "@/db/drizzle";
import { workout } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { useSelectionAndModals } from "@/hooks/useSelectionAndModals";
import { useThemeColor } from "@/hooks/useThemeColor";
import { inArray } from "drizzle-orm";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
    const data = useDataContext();
    const float = useThemeColor({ light: undefined, dark: undefined }, "primary");
    const deleteHandler = async (selected: number[]) => {
        await db.delete(workout).where(inArray(workout.id, selected));
    };
    const { setChecked, selected, setSelected, modalVisible, setModalVisible, handleDelete } = useSelectionAndModals(deleteHandler, data);

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
                    <WorkoutRenderItem
                        workout={item}
                        selected={selected}
                        setSelected={setSelected}
                        setChecked={setChecked}
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
