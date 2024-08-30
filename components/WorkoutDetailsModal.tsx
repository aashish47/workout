import HeaderWithCloseButton from "@/components/HeaderWithCloseButton";
import { ThemedText } from "@/components/ThemedText";
import { Timers } from "@/components/Timers";
import { Record } from "@/db/schema";
import getFormatedTime from "@/utils/getFormatedTime";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface WorkoutDetailsModalProps {
    details: Record;
    modalVisible: number;
    setModalVisible: Dispatch<SetStateAction<number>>;
}

const WorkoutDetailsModal = memo(({ details, modalVisible, setModalVisible }: WorkoutDetailsModalProps) => {
    const { title, duration, createdAt, timers, exercises } = details;
    const screenHeight = Dimensions.get("window").height;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible !== -1}
            onRequestClose={() => {
                setModalVisible(-1);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <HeaderWithCloseButton
                        title={title}
                        borderBottom
                        onPressClose={() => setModalVisible(-1)}
                    />
                    <View style={styles.detailsView}>
                        <View style={styles.rowView}>
                            <ThemedText>Duration: </ThemedText>
                            <ThemedText type="light">{getFormatedTime(duration)}</ThemedText>
                        </View>
                        <View style={styles.rowView}>
                            <ThemedText>Date: </ThemedText>
                            <ThemedText type="light">{new Date(createdAt).toLocaleDateString()}</ThemedText>
                        </View>
                        <View style={styles.rowView}>
                            <ThemedText>Time: </ThemedText>
                            <ThemedText type="light">{new Date(createdAt).toLocaleTimeString()}</ThemedText>
                        </View>
                        <View>
                            <ThemedText>Timers: </ThemedText>
                            {(Object.entries(timers) as Timers).map(([timer, value]) => (
                                <View
                                    style={styles.rowView}
                                    key={timer}
                                >
                                    <ThemedText
                                        type="light"
                                        style={styles.text}
                                    >
                                        {timer}:{" "}
                                    </ThemedText>
                                    <ThemedText type="light">{timer === "sets" || timer === "cycles" ? value : getFormatedTime(value)}</ThemedText>
                                </View>
                            ))}
                        </View>
                        <ScrollView style={{ maxHeight: screenHeight / 3 }}>
                            <ThemedText>Exercises: </ThemedText>
                            <ThemedText
                                type="light"
                                style={styles.text}
                            >
                                {exercises.join(", ")}
                            </ThemedText>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
});

export default WorkoutDetailsModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    detailsView: {
        padding: 16,
        gap: 12,
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        textTransform: "capitalize",
    },
});
