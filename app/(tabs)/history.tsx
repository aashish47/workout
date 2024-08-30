import { ThemedText } from "@/components/ThemedText";
import WorkoutDetailsModal from "@/components/WorkoutDetailsModal";
import { db } from "@/db/drizzle";
import { Record, record } from "@/db/schema";
import getFormatedTime from "@/utils/getFormatedTime";
import { desc } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { memo, useState } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const history = memo(() => {
    const { data, error } = useLiveQuery(db.select().from(record).orderBy(desc(record.createdAt)));
    const [modalVisible, setModalVisible] = useState(-1);
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

    const RenderItem: ListRenderItem<Record> = ({ item, index }) => {
        const { id, title, exercises, timers, duration, createdAt } = item;
        return (
            <Pressable onPress={() => setModalVisible(index)}>
                <View style={styles.item}>
                    <View>
                        <ThemedText>{title}</ThemedText>
                        <ThemedText type="light">{getFormatedTime(duration)}</ThemedText>
                    </View>
                    <ThemedText type="light">{new Date(createdAt).toLocaleDateString()}</ThemedText>
                </View>
            </Pressable>
        );
    };
    return (
        data && (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={RenderItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                />
                {modalVisible !== -1 && (
                    <WorkoutDetailsModal
                        details={data[modalVisible]}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                )}
            </View>
        )
    );
});

export default history;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "silver",
    },
});
