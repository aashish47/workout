import ColorSelectorModal from "@/components/ColorSelectorModal";
import IconButton from "@/components/IconButton";
import { Workouts } from "@/db/schema";
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
    setWorkout: Dispatch<SetStateAction<Workouts>>;
}

const Header = memo(({ title, backgroundColor, setWorkout, handleBackPress }: HeaderProps & TopTabsHeaderProps) => {
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
                                setWorkout((prev) => {
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
                setWorkout={setWorkout}
            />
        </>
    );
});

const TopTabsLayoutHeader = memo(({ handleBackPress }: TopTabsHeaderProps) => {
    const { workout, setWorkout } = useWorkoutContext();
    const { title, backgroundColor } = workout;

    return (
        <Header
            title={title}
            backgroundColor={backgroundColor}
            setWorkout={setWorkout}
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
