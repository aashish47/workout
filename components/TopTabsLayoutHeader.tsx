import ColorSelectorModal from "@/components/ColorSelectorModal";
import IconButton from "@/components/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

interface HeaderProps {
    handleBackPress: () => void;
}

const TopTabsLayoutHeader = ({ handleBackPress }: HeaderProps) => {
    const text = useThemeColor({}, "text");
    const ripple = useThemeColor({}, "ripple");
    const { setWorkout, title, backgroundColor: background } = useWorkoutRefContext();
    const [backgroundColor, setBackgroundColor] = useState(background);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setWorkout((prev) => ({ ...prev, backgroundColor }));
    }, [backgroundColor]);

    return (
        <>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    headerTitle: () => (
                        <TextInput
                            defaultValue={title}
                            // selectionColor={"plum"}

                            selectTextOnFocus
                            style={[styles.title, { color: text }]}
                            onChangeText={(text) =>
                                setWorkout((prev) => {
                                    return { ...prev, title: text };
                                })
                            }
                        />
                    ),
                    headerLeft: () => (
                        <IconButton
                            iconName={"arrow-back-sharp"}
                            size={24}
                            onPress={handleBackPress}
                        />
                    ),
                    headerRight: () => (
                        <Pressable
                            android_ripple={{ color: ripple, radius: 24, borderless: true }}
                            hitSlop={20}
                            onPress={() => setModalVisible(true)}
                            style={[styles.currentColor, { backgroundColor }]}
                        />
                    ),
                }}
            />
            <ColorSelectorModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
            />
        </>
    );
};

export default TopTabsLayoutHeader;

const styles = StyleSheet.create({
    currentColor: {
        width: 16,
        height: 16,
        margin: 16,
        borderRadius: 100,
    },
    title: {
        fontSize: 18,
        marginLeft: 20,
    },
});
