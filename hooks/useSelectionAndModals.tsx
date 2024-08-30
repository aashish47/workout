import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export const useSelectionAndModals = (deleteHandler: (selected: any) => Promise<void>) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (selected.length) {
            navigation.setOptions({
                headerTitle: () => <ThemedText> {selected.length} </ThemedText>,
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
                            onPress={() => setModalVisible(true)}
                            iconName="trash-sharp"
                            size={24}
                        />
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

    const handleDelete = async () => {
        await deleteHandler(selected);
        setSelected([]);
        setModalVisible(false);
    };

    return { selected, setSelected, modalVisible, setModalVisible, handleDelete };
};
