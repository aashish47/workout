import { useThemeColor } from "@/hooks/useThemeColor";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet } from "react-native";

interface GenericRenderItemProps<T> {
    id: number;
    item: T;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
    setChecked: Dispatch<SetStateAction<boolean>>;
    onPress: () => void;
    renderContent: (item: T, isSelected: boolean) => React.ReactNode;
    lightColor?: string;
    darkColor?: string;
}

function GenericRenderItem<T>({ id, item, selected, setSelected, setChecked, onPress, renderContent, lightColor, darkColor }: GenericRenderItemProps<T>) {
    const ripple = useThemeColor({}, "ripple");
    const isSelected = selected.includes(id);

    const handlePress = () => {
        setChecked(false);
        if (selected.length) {
            if (isSelected) {
                setSelected(selected.filter((selectedId) => selectedId !== id));
            } else {
                handleLongPress();
            }
        } else {
            onPress();
        }
    };

    const handleLongPress = () => {
        setSelected([...selected, id]);
    };

    return (
        <Pressable
            android_ripple={{ color: ripple, borderless: false }}
            onLongPress={handleLongPress}
            onPress={handlePress}
        >
            {renderContent(item, isSelected)}
        </Pressable>
    );
}

const styles = StyleSheet.create({});

export default GenericRenderItem;
