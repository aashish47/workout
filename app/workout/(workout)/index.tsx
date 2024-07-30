import MultiModeCounterInput from "@/components/MultiModeCounterInput";
import { ThemedText } from "@/components/ThemedText";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

const Index = () => {
    const route = useRoute();
    const params: any = route.params;
    const timers = JSON.parse(params.timer);

    return (
        <View style={{ flex: 1 }}>
            {Object.entries(timers).map(([timer, value]: any, index: any) => (
                <View
                    key={index}
                    style={styles.input}
                >
                    <ThemedText>{timer}</ThemedText>
                    <MultiModeCounterInput mode="timer" />
                </View>
            ))}
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 24,
        marginTop: 12,
    },
});
