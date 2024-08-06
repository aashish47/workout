import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface TabLayoutButtonProps {
    name: string;
}

const TabLayoutButton: React.FC<TabLayoutButtonProps> = ({ name }) => {
    const btnColor = useThemeColor({}, "float");
    const ripple = useThemeColor({}, "ripple");
    const { colors } = useTheme();
    return (
        <View style={{ backgroundColor: colors.card }}>
            <Pressable
                android_ripple={{ color: ripple, borderless: false }}
                style={[styles.button, { backgroundColor: btnColor }]}
            >
                <ThemedText style={{ textTransform: "capitalize" }}>{name}</ThemedText>
            </Pressable>
        </View>
    );
};

export default TabLayoutButton;

const styles = StyleSheet.create({
    button: {
        height: 64,
        backgroundColor: "purple",
        padding: 8,
        margin: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});
