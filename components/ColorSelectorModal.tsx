import IconButton from "@/components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

interface ColorSelectorModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    backgroundColor: string;
    setBackgroundColor: Dispatch<SetStateAction<string>>;
}

const ColorSelectorModal = ({ modalVisible, setModalVisible, backgroundColor, setBackgroundColor }: ColorSelectorModalProps) => {
    const colorOptions = [
        "coral",
        "tomato",
        "crimson",
        "gold",
        "mediumseagreen",
        "olivedrab",
        "olive",
        "powderblue",
        "steelblue",
        "midnightblue",
        "lightslategrey",
        "plum",
        "hotpink",
        "mediumorchid",
        "indigo",
    ];
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <IconButton
                        iconName={"close"}
                        size={24}
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                    <View style={styles.colorContainer}>
                        {colorOptions.map((color) => (
                            <Pressable
                                key={color}
                                style={[styles.colorOption, { backgroundColor: color }]}
                                onPress={() => setBackgroundColor(color)}
                            >
                                {color === backgroundColor && (
                                    <Ionicons
                                        name="checkmark"
                                        size={24}
                                        color="black"
                                    />
                                )}
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ColorSelectorModal;

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
        height: 250,
        padding: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    colorContainer: {
        flexDirection: "row",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: "center",
    },
    colorOption: {
        width: 48,
        height: 48,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
});
