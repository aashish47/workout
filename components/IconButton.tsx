import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, StyleSheet, ViewProps } from "react-native";

interface IconButtonProps {
    lightColor?: string;
    darkColor?: string;
    iconName: keyof typeof Ionicons.glyphMap;
    size: number;
    onPress: PressableProps["onPress"];
}

const IconButton: React.FC<IconButtonProps & ViewProps> = ({ style, lightColor, darkColor, iconName, size, onPress }) => {
    const ripple = useThemeColor({ light: lightColor, dark: darkColor }, "ripple");
    const text = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Pressable
            onPress={onPress}
            // hitSlop={36}
            android_ripple={{ color: ripple, radius: size }}
            style={[style, styles.headerButton, { height: size * 2, width: size * 2 }]}
        >
            <Ionicons
                name={iconName}
                size={size}
                color={text}
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
