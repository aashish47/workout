import MultiModeCounterInput from "@/components/MultiModeCounterInput";
import { ThemedText } from "@/components/ThemedText";
import { ParamList } from "@/types/routeParams";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

const Index = () => {
    const route = useRoute<RouteProp<ParamList, "index">>();
    const { timers } = route.params;

    return (
        <View style={{ flex: 1 }}>
            {timers.map(([timer, value], index: any) => (
                <View
                    key={index}
                    style={styles.input}
                >
                    <ThemedText style={{ flex: 2, textTransform: "capitalize" }}>{timer}</ThemedText>

                    <MultiModeCounterInput
                        style={{ flex: 1 }}
                        mode={timer === "intervals" || timer === "cycles" ? "counter" : "timer"}
                    />
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
