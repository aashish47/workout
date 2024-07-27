import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";

interface IconButtonProps {
    lightColor?: string;
    darkColor?: string;
    iconName: keyof typeof Ionicons.glyphMap;
    size: number;
    onPress: any;
    backgroundColor?: string;
    height: number;
    width: number;
}

const IconButton: React.FC<IconButtonProps & ViewProps> = ({ style, lightColor, darkColor, iconName, size, backgroundColor, height, width, onPress }) => {
    const pressColor = useThemeColor({ light: lightColor, dark: darkColor }, "press");

    return (
        <Pressable
            onPress={onPress}
            hitSlop={36}
            style={({ pressed }) => [style, styles.headerButton, { backgroundColor: pressed ? pressColor : backgroundColor }, { height, width }]}
        >
            <Ionicons
                name={iconName}
                size={size}
                color="black"
            />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    headerButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
});
