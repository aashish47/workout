import HeaderWithCloseButton from "@/components/HeaderWithCloseButton";
import { ThemedView } from "@/components/theme/ThemedView";
import RenderItem from "@/screens/workout-start/components/RenderItem";
import { OrderType } from "@/utils/getWorkoutOrder";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";

interface WorkoutOrderModalProps {
	activeColor: string;
	currIndex: number;
	modalVisible: boolean;
	setIndex: Dispatch<SetStateAction<number>>;
	setModalVisible: Dispatch<SetStateAction<boolean>>;
	setReset: Dispatch<SetStateAction<number>>;
	workoutorder: OrderType[];
}

const WorkoutOrderModal = ({
	activeColor,
	currIndex,
	modalVisible,
	setIndex,
	setModalVisible,
	setReset,
	workoutorder,
}: WorkoutOrderModalProps) => {
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		if (modalVisible && workoutorder.length > 0) {
			// Small delay to ensure layout is settled before scrolling
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({
					index: currIndex,
					animated: false,
				});
			}, 100);
		}
	}, [modalVisible]);

	const handleItemPress = (index: number) => {
		setIndex(index);
		setReset(Date.now());
		setModalVisible(false);
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.centeredView}>
				<ThemedView style={styles.modalView}>
					<HeaderWithCloseButton
						title={"timeline"}
						titleStyle={styles.text}
						borderBottom
						onPressClose={() => setModalVisible(false)}
					/>
					<FlatList
						ref={flatListRef}
						style={styles.list}
						data={workoutorder}
						keyExtractor={(item) => String(item["start"])}
						renderItem={({ item, index }) => (
							<RenderItem
								index={index}
								item={item}
								currIndex={currIndex}
								activeColor={activeColor}
								onPress={handleItemPress}
							/>
						)}
						getItemLayout={(_, index) => ({
							length: 60,
							offset: 60 * index,
							index,
						})}
						onScrollToIndexFailed={(info) => {
							flatListRef.current?.scrollToOffset({
								offset: info.averageItemLength * info.index,
								animated: false,
							});
						}}
						initialNumToRender={workoutorder.length} // Small list optimization
					/>
				</ThemedView>
			</View>
		</Modal>
	);
};

export default WorkoutOrderModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		flex: 1,
		marginTop: 150,
		paddingBottom: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomColor: "silver",
		borderBottomWidth: 2,
	},
	list: {
		flex: 1,
	},
	text: {
		textTransform: "capitalize",
	},
});
