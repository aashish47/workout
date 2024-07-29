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
}

const IconButton: React.FC<IconButtonProps & ViewProps> = ({ style, lightColor, darkColor, iconName, size, backgroundColor, onPress }) => {
    const ripple = useThemeColor({ light: lightColor, dark: darkColor }, "ripple");

    return (
        <Pressable
            onPress={onPress}
            hitSlop={36}
            android_ripple={{ color: ripple, radius: size }}
            style={[style, styles.headerButton, { height: size * 2, width: size * 2, backgroundColor }]}
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
