import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Checkbox from "expo-checkbox";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, useColorScheme, View } from "react-native";

export function useSelectionAndModals<T extends { id: number }>(deleteHandler: (selected: number[]) => Promise<void>, data: T[]) {
    const colorScheme = useColorScheme();
    const primary = useThemeColor({}, "primary");
    const logo = colorScheme === "dark" ? require("@/assets/images/logo-dark.png") : require("@/assets/images/logo-light.png");
    const [selected, setSelected] = useState<number[]>([]);
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const clearSelected = useRef(false);
    const navigation = useNavigation();
    const allIds = data.map((workout) => workout.id);

    if (isChecked && selected.length !== allIds.length) {
        setSelected(allIds);
    } else if (clearSelected.current && selected.length !== 0) {
        setSelected([]);
        clearSelected.current = false;
    }

    useEffect(() => {
        if (selected.length) {
            navigation.setOptions({
                headerTitle: () => <ThemedText> {selected.length} </ThemedText>,
                headerLeft: () => (
                    <IconButton
                        onPress={() => {
                            setChecked(false);
                            setSelected([]);
                        }}
                        iconName="arrow-back-sharp"
                        size={24}
                    />
                ),
                headerRight: () => (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16, paddingRight: 16 }}>
                        <IconButton
                            onPress={() => setModalVisible(true)}
                            iconName="trash-sharp"
                            size={28}
                        />
                        <Checkbox
                            value={isChecked}
                            onValueChange={handleCheck}
                            color={primary}
                            style={{ height: 24, width: 24 }}
                        />
                    </View>
                ),
            });
        } else {
            navigation.setOptions({
                headerTitle: () => (
                    <Image
                        source={logo}
                        style={{ width: 150, height: "100%", objectFit: "contain" }}
                    />
                ),
                headerLeft: undefined,
                headerRight: undefined,
            });
            setChecked(false);
        }
    }, [navigation, selected, isChecked]);

    const handleCheck = () => {
        setChecked((prev) => {
            if (prev) {
                clearSelected.current = true;
            }

            return !prev;
        });
    };

    const handleDelete = async () => {
        await deleteHandler(selected);
        setSelected([]);
        setModalVisible(false);
    };

    return { setChecked, selected, setSelected, modalVisible, setModalVisible, handleDelete };
}
