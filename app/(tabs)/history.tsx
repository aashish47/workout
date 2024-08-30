import ConfirmModal from "@/components/ConfirmModal";
import HistoryRenderItem from "@/components/HistoryRenderItem";
import WorkoutDetailsModal from "@/components/WorkoutDetailsModal";
import { db } from "@/db/drizzle";
import { record } from "@/db/schema";
import { useSelectionAndModals } from "@/hooks/useSelectionAndModals";
import { desc, inArray } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { memo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const history = memo(() => {
    const { data, error } = useLiveQuery(db.select().from(record).orderBy(desc(record.createdAt)));
    if (error) {
        if (error) {
            return (
                <SafeAreaView>
                    <View>
                        <Text>Error Loading Data:{error.message}</Text>
                    </View>
                </SafeAreaView>
            );
        }
    }

    const [detailsModalVisible, setDetailsModalVisible] = useState(-1);
    const deleteHandler = async (selected: number[]) => {
        await db.delete(record).where(inArray(record.id, selected));
    };

    const { selected, setSelected, modalVisible, setModalVisible, handleDelete } = useSelectionAndModals(deleteHandler);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <HistoryRenderItem
                        index={index}
                        record={item}
                        selected={selected}
                        setSelected={setSelected}
                        setDetailsModalVisible={setDetailsModalVisible}
                    />
                )}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
            />
            {detailsModalVisible !== -1 && (
                <WorkoutDetailsModal
                    details={data[detailsModalVisible]}
                    modalVisible={detailsModalVisible}
                    setModalVisible={setDetailsModalVisible}
                />
            )}
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
});

export default history;

const styles = StyleSheet.create({});
