import GenericRenderItem from "@/components/GenericRenderItem";
import { ThemedText } from "@/components/ThemedText";
import { Record } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import getFormatedTime from "@/utils/getFormatedTime";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

interface HistoryRenderItemProps {
    index: number;
    record: Record;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    setDetailsModalVisible: React.Dispatch<React.SetStateAction<number>>;
    setChecked: Dispatch<SetStateAction<boolean>>;
}

const HistoryRenderItem = ({ index, record, selected, setSelected, setChecked, setDetailsModalVisible }: HistoryRenderItemProps) => {
    const pressColor = useThemeColor({}, "secondary");
    const { id } = record;
    return (
        <GenericRenderItem<Record>
            id={id}
            item={record}
            selected={selected}
            setSelected={setSelected}
            setChecked={setChecked}
            onPress={() => setDetailsModalVisible(index)}
            renderContent={(item, isSelected) => (
                <View style={[styles.item, isSelected && { backgroundColor: pressColor }]}>
                    <View>
                        <ThemedText>{item.title}</ThemedText>
                        <ThemedText type="light">{getFormatedTime(item.duration)}</ThemedText>
                    </View>
                    <ThemedText type="light">{new Date(item.createdAt).toLocaleDateString()}</ThemedText>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "silver",
    },
});

export default HistoryRenderItem;
