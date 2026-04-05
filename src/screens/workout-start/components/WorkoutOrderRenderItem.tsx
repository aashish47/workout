import { ThemedText } from "@/components/theme/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import getFormatedTime from "@/utils/getFormatedTime";
import { OrderType } from "@/utils/getWorkoutOrder";
import { Pressable, StyleSheet, View } from "react-native";

const WorkoutOrderRenderItem = ({
	index,
	item,
	currIndex,
	activeColor,
	onPress,
}: {
	index: number;
	item: OrderType;
	currIndex: number;
	activeColor: string;
	onPress: (index: number) => void;
}) => {
	const borderColor = useThemeColor(
		{ light: "#d9d9d9", dark: "#333" },
		"icon",
	);

	const { start, timer, timerValue, exercise } = item;
	return (
		<Pressable onPress={() => onPress(index)}>
			<View
				style={[
					styles.renderItemContainer,
					{
						backgroundColor:
							currIndex === index ? activeColor : undefined,
						borderBottomColor: borderColor,
					},
				]}
			>
				<View style={styles.renderItemView}>
					<ThemedText type="light">{index + 1}.</ThemedText>
					<ThemedText style={styles.text}>
						{timer === "work" ? exercise : timer}
					</ThemedText>
				</View>
				<View style={styles.renderItemView}>
					<ThemedText type="light">
						{getFormatedTime(start)}-
						{getFormatedTime(start + timerValue)}
					</ThemedText>
				</View>
			</View>
		</Pressable>
	);
};

export default WorkoutOrderRenderItem;

const styles = StyleSheet.create({
	renderItemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: 60,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
	},
	renderItemView: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	text: {
		textTransform: "capitalize",
	},
});
