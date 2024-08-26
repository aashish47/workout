// import { namedColors } from "@/constants/Colors";
// import React, { memo } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

import { namedColors } from "@/constants/Colors";
import { memo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const ColorItem = memo(({ colorName, colorValue }: { colorName: keyof typeof namedColors; colorValue: string }) => (
    <View style={[styles.colorBox, { backgroundColor: colorValue }]}>
        <Text style={styles.colorName}>{colorName}</Text>
    </View>
));

const statistics = () => {
    const colorKeys = Object.keys(namedColors) as [keyof typeof namedColors];

    return (
        <View style={styles.container}>
            <FlatList
                data={colorKeys}
                keyExtractor={(item) => item} // Ensure unique keys
                renderItem={({ item }) => (
                    <ColorItem
                        colorName={item}
                        colorValue={namedColors[item]}
                    />
                )}
                initialNumToRender={10} // Adjust based on your needs
                maxToRenderPerBatch={10} // Adjust based on your needs
                windowSize={10} // Adjust based on your needs
            />
        </View>
    );
};

export default statistics;

const styles = StyleSheet.create({
    container: {},
    colorBox: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    colorName: {
        color: "#000000", // or use a contrasting color for better readability
        fontSize: 14,
        fontWeight: "bold",
    },
});

// const statistics = () => {
//     return (
//         <SegmentedCircle
//             remainingSets={2}
//             sets={4}
//             size={300}
//             strokeColor="white"
//         >
//             <ThemedText>asd</ThemedText>
//         </SegmentedCircle>
//     );
// };

// export default statistics;
