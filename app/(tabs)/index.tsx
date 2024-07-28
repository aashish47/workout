import IconButton from "@/components/IconButton";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { workouts } from "@/db/data";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
    const [selected, setSelected] = useState<number[]>([]);
    const navigation = useNavigation();
    const [data, setData] = useState(workouts);
    const float = useThemeColor({ light: undefined, dark: undefined }, "float");

    useEffect(() => {
        if (selected.length) {
            navigation.setOptions({
                headerTitle: () => <ThemedText>{selected.length}</ThemedText>,
                headerLeft: () => (
                    <IconButton
                        onPress={() => setSelected([])}
                        iconName="arrow-back-sharp"
                        size={24}
                    />
                ),
                headerRight: () => (
                    <View style={{ flexDirection: "row", gap: 2 }}>
                        <IconButton
                            onPress={() => {
                                setData(data.filter(({ id }) => !selected.includes(id)));
                                setSelected([]);
                            }}
                            iconName="trash-sharp"
                            size={24}
                        />
                        {/* checkbox to select all */}
                    </View>
                ),
            });
        } else {
            navigation.setOptions({
                headerTitle: () => <ThemedText>Logo</ThemedText>,
                headerLeft: undefined,
                headerRight: undefined,
            });
        }
    }, [navigation, selected]);

    return (
        <View style={{ flex: 1 }}>
            <IconButton
                iconName="add"
                size={32}
                onPress={undefined}
                backgroundColor={float}
                style={styles.floatBtn}
            />

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ListItem
                        workout={item}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    floatBtn: {
        position: "absolute",
        bottom: 30,
        right: 30,
        zIndex: 2,
        elevation: 8, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
