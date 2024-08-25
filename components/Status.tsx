import { ThemedText } from "@/components/ThemedText";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

const Status = memo(({ name, current, total }: { name: string; current: number; total: number }) => {
    return (
        <View style={styles.container}>
            <ThemedText type="light">{name}:</ThemedText>
            <ThemedText type="defaultSemiBold">
                {current}/{total}
            </ThemedText>
        </View>
    );
});

export default Status;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 4,
    },
});
