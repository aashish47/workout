import ColorSelectorModal from "@/components/ColorSelectorModal";
import IconButton from "@/components/IconButton";
import { Workout } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutContext from "@/hooks/useWorkoutContext";
import { Stack } from "expo-router";
import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

interface TopTabsHeaderProps {
    handleBackPress: () => void;
}

interface HeaderProps {
    title: string;
    backgroundColor: string;
    setWorkoutData: Dispatch<SetStateAction<Workout>>;
}

const Header = memo(({ title, backgroundColor, setWorkoutData, handleBackPress }: HeaderProps & TopTabsHeaderProps) => {
    const text = useThemeColor({}, "text");
    const ripple = useThemeColor({}, "ripple");
    const [modalVisible, setModalVisible] = useState(false);
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
                            onEndEditing={(e) =>
                                setWorkoutData((prev) => {
                                    return { ...prev, title: e.nativeEvent.text.trim() };
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
                setWorkoutData={setWorkoutData}
            />
        </>
    );
});

const TopTabsLayoutHeader = memo(({ handleBackPress }: TopTabsHeaderProps) => {
    const { workoutData, setWorkoutData } = useWorkoutContext();
    const { title, avatarColor } = workoutData;

    return (
        <Header
            title={title}
            backgroundColor={avatarColor}
            setWorkoutData={setWorkoutData}
            handleBackPress={handleBackPress}
        />
    );
});

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
