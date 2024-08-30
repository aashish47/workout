// import { namedColors } from "@/constants/Colors";
// import { memo } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

// const ColorItem = memo(({ colorName, colorValue }: { colorName: keyof typeof namedColors; colorValue: string }) => (
//     <View style={[styles.colorBox, { backgroundColor: colorValue }]}>
//         <Text style={styles.colorName}>{colorName}</Text>
//     </View>
// ));

// const colors = () => {
//     const colorKeys = Object.keys(namedColors) as [keyof typeof namedColors];
//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={colorKeys}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                     <ColorItem
//                         colorName={item}
//                         colorValue={namedColors[item]}
//                     />
//                 )}
//                 initialNumToRender={10}
//                 maxToRenderPerBatch={10}
//                 windowSize={10}
//             />
//         </View>
//     );
// };

// export default colors;

// const styles = StyleSheet.create({
//     container: {},
//     colorBox: {
//         height: 100,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     colorName: {
//         color: "#000000",
//         fontSize: 14,
//         fontWeight: "bold",
//     },
// });
