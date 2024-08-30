import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";

interface HeaderWithCloseButtonProps {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    borderBottom?: boolean;
    onPressClose: () => void;
}

const HeaderWithCloseButton = ({ title, titleStyle, borderBottom, onPressClose }: HeaderWithCloseButtonProps) => {
    return (
        <View style={[styles.header, borderBottom && { borderBottomColor: "silver", borderBottomWidth: 2 }]}>
            <View style={{ flex: 1 }} />
            <ThemedText
                style={titleStyle}
                type="subtitle"
            >
                {title}
            </ThemedText>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <IconButton
                    iconName={"close"}
                    size={32}
                    onPress={onPressClose}
                />
            </View>
        </View>
    );
};

export default HeaderWithCloseButton;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
