import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import getFormatedTime from "@/utils/getFormatedTime";
import { OrderType } from "@/utils/getWorkoutOrder";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface WorkoutOrderModalProps {
    activeColor: string;
    currIndex: number;
    modalVisible: boolean;
    setIndex: Dispatch<SetStateAction<number>>;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    setReset: Dispatch<SetStateAction<number>>;
    workoutorder: OrderType[];
}

const WorkoutOrderModal = memo(({ activeColor, currIndex, modalVisible, setIndex, setModalVisible, setReset, workoutorder }: WorkoutOrderModalProps) => {
    const RenderItem = memo(({ index, item }: { index: number; item: OrderType }) => {
        const { start, timer, timerValue, exercise } = item;
        return (
            <Pressable
                onPress={() => {
                    setIndex(index);
                    setReset(Date.now());
                    setModalVisible(false);
                }}
            >
                <View style={[styles.renderItemContainer, { backgroundColor: currIndex === index ? activeColor : undefined }]}>
                    <View style={styles.renderItemView}>
                        <ThemedText type="light">{index + 1}.</ThemedText>
                        <ThemedText style={styles.text}>{timer === "work" ? exercise : timer}</ThemedText>
                    </View>
                    <View style={styles.renderItemView}>
                        <ThemedText type="light">
                            {getFormatedTime(start)}-{getFormatedTime(start + timerValue)}
                        </ThemedText>
                    </View>
                </View>
            </Pressable>
        );
    });
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ThemedText
                                type="subtitle"
                                style={styles.text}
                            >
                                order
                            </ThemedText>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <IconButton
                                iconName={"close"}
                                size={32}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                    <FlatList
                        data={workoutorder}
                        keyExtractor={(item) => String(item["start"])}
                        renderItem={({ item, index }) => (
                            <RenderItem
                                index={index}
                                item={item}
                            />
                        )}
                        initialScrollIndex={currIndex}
                        getItemLayout={(_, index) => ({
                            length: 60,
                            offset: 60 * index,
                            index,
                        })}
                        initialNumToRender={10}
                        maxToRenderPerBatch={5}
                        windowSize={10}
                    />
                </View>
            </View>
        </Modal>
    );
});

export default WorkoutOrderModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 150,
        paddingBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "grey",
        borderBottomWidth: 2,
    },
    renderItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    renderItemView: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    text: {
        textTransform: "capitalize",
    },
});
