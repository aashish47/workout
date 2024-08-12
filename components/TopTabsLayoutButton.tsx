import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/db/drizzle";
import { workouts } from "@/db/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import useWorkoutRefContext from "@/hooks/useWorkoutRefContext";
import { ParamList } from "@/types/routeParams";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useTheme } from "@react-navigation/native";
import { eq } from "drizzle-orm";
import { Stack, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";

interface TabLayoutButtonProps {
    name: "create" | "start";
}

const TabLayoutButton: React.FC<TabLayoutButtonProps> = ({ name }) => {
    const btnColor = useThemeColor({}, "float");
    const ripple = useThemeColor({}, "ripple");
    const text = useThemeColor({}, "text");
    const { colors } = useTheme();
    const { workoutRef, setWorkout, title, backgroundColor: background } = useWorkoutRefContext();
    const navigation = useNavigation<NavigationProp<ParamList, "index">>();
    const [backgroundColor, setBackgroundColor] = useState(background);
    const [modalVisible, setModalVisible] = useState(false);
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

    useEffect(() => {
        setWorkout((prev) => ({ ...prev, backgroundColor }));
    }, [backgroundColor]);

    const handlePress = async () => {
        if (name === "create") {
            createWorkout();
            navigateBack();
        } else {
            // start with update if data updated else start
        }
    };

    const createWorkout = async () => {
        const { title, backgroundColor, exercises, time } = workoutRef.current!;
        await db.insert(workouts).values({ title, backgroundColor, exercises, time });
    };

    const updateWorkout = async () => {
        const { id, title, backgroundColor, exercises, time } = workoutRef.current!;
        await db.update(workouts).set({ title, backgroundColor, exercises, time }).where(eq(workouts.id, id));
    };

    const navigateBack = () => {
        navigation.navigate("index");
    };

    const handleBackPress = () => {
        if (name === "create") {
            createWorkout();
        } else {
            updateWorkout();
        }
        navigateBack();
    };

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
                            style={{ fontSize: 18, marginLeft: 20, color: text }}
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
                            style={[styles.background, { backgroundColor }]}
                        />
                    ),
                }}
            />
            <View style={{ backgroundColor: colors.card }}>
                <View style={styles.container}>
                    <Pressable
                        android_ripple={{ color: ripple }}
                        style={[styles.button, { backgroundColor: btnColor }]}
                        onPress={handlePress}
                    >
                        <ThemedText style={styles.text}>{name}</ThemedText>
                    </Pressable>
                </View>
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
                            <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
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
            </View>
        </>
    );
};

export default TabLayoutButton;

const styles = StyleSheet.create({
    buttonClose: {
        backgroundColor: "yellow",
    },
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
    container: {
        borderRadius: 10, // Border radius for the ripple effect
        overflow: "hidden", // Clips the ripple effect to the border radius
        margin: 12, // Margin for spacing
    },
    button: {
        height: 64,
        padding: 8,
        borderRadius: 10, // Ensure this matches the container's border radius
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        textTransform: "capitalize",
    },
    background: {
        width: 16,
        height: 16,
        margin: 16,
        borderRadius: 100,
    },
    colorOption: {
        width: 48,
        height: 48,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
});
