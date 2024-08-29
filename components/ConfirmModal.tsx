import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

interface ConfirmModalProps {
    title: string;
    subtitle: string;
    confirmText: string;
    confirmTextColor: string;
    confirmOnPressHandler: () => void;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ConfirmModal = ({ title, subtitle, confirmText, confirmTextColor, confirmOnPressHandler, modalVisible, setModalVisible }: ConfirmModalProps) => {
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
                    <ThemedText type="defaultSemiBold">{title}</ThemedText>
                    <ThemedText type="light">{subtitle}</ThemedText>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <Button
                            name={"cancel"}
                            onPress={() => setModalVisible(false)}
                        />
                        <Button
                            name={confirmText}
                            onPress={confirmOnPressHandler}
                            color={confirmTextColor}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

interface ButtonProps {
    color?: string;
    name: string;
    onPress: () => void;
}

const Button = ({ color, name, onPress }: ButtonProps) => {
    const ripple = useThemeColor({}, "ripple");

    return (
        <Pressable
            android_ripple={{ color: ripple }}
            onPress={onPress}
        >
            <ThemedText
                type="defaultSemiBold"
                style={{ textTransform: "uppercase", padding: 8, color }}
            >
                {name}
            </ThemedText>
        </Pressable>
    );
};

export default ConfirmModal;

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
        gap: 24,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
