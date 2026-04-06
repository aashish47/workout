import ConfirmModal from "@/components/ConfirmModal";
import HeaderWithCloseButton from "@/components/HeaderWithCloseButton";
import IconButton from "@/components/IconButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { namedColors } from "@/constants/Colors";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";
import { db } from "@/db/drizzle";
import { record } from "@/db/schema";
import { useSounds } from "@/hooks/useSounds";
import CountdownTimer from "@/screens/workout-start/components/CountdownTimer";
import Status from "@/screens/workout-start/components/Status";
import WorkoutOrderModal from "@/screens/workout-start/components/WorkoutOrderModal";
import getFormatedTime from "@/utils/getFormatedTime";
import getWorkoutOrder, { CountdownTimerType } from "@/utils/getWorkoutOrder";
import { useKeepAwake } from "expo-keep-awake";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ColorFormat } from "react-native-countdown-circle-timer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CountdownColors = Record<CountdownTimerType, string>;

const countdownColors: CountdownColors = {
	"warm up": namedColors["orange"],
	"get ready": namedColors["grey"],
	work: namedColors["tomato"],
	rest: namedColors["lightseagreen"],
	break: namedColors["mediumorchid"],
	"cool down": namedColors["steelblue"],
};

const StartScreen = () => {
	const insets = useSafeAreaInsets();
	const { workoutData } = useWorkoutContext();
	useKeepAwake();
	const screenWidth = Dimensions.get("window").width;
	const navigation = useNavigation();
	const { playSound } = useSounds();
	const { totalSeconds = 0 } = useLocalSearchParams<{
		formatedDuration: string;
		totalSeconds: string;
	}>();
	const targetTime = Number(totalSeconds);

	const { timers, exercises } = workoutData;
	const workoutOrder = getWorkoutOrder(timers, exercises);

	const [index, setIndex] = useState(0);
	const [pause, setPause] = useState(false);
	const [mute, setMute] = useState(false);
	const [reset, setReset] = useState(Date.now());
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [timelineModalVisible, setTimelineModalVisible] = useState(false);
	const [quitModalVisible, setQuitModalVisible] = useState(false);

	const {
		start,
		timer,
		timerValue,
		cycleNumber,
		exercise,
		exerciseNumber,
		timerNumber,
	} = workoutOrder[index];
	const currentSet = timerNumber || 0;
	const remainingSets = timers["sets"] - currentSet;
	const totalRemainingTime = targetTime - timeElapsed;
	const formatedTimeElapsed = getFormatedTime(timeElapsed);
	const formatedTimeRemaining = getFormatedTime(totalRemainingTime);
	const progressWidth = timeElapsed * (screenWidth / targetTime);

	const countDownColor = countdownColors[timer] as ColorFormat;

	useEffect(() => {
		navigation.setOptions({
			title: timer.toUpperCase(),
			headerTitleAlign: "center",
			headerTitleStyle: { color: countDownColor },
		});
	}, [timer, navigation]);

	const handleBack = () => {
		if (timeElapsed - start > 1) {
			setReset(Date.now());
		} else {
			setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
			setReset(Date.now());
		}
	};

	const handleForward = () => {
		if (index === workoutOrder.length - 1) {
			workoutOver();
		} else {
			setIndex((prevIndex) => prevIndex + 1);
			setReset(Date.now());
		}
	};

	const workoutOver = async () => {
		const { id, avatarColor, ...rest } = workoutData;
		try {
			await db.insert(record).values({ ...rest, duration: targetTime });
			router.navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ThemedView
			style={[
				styles.container,
				{ paddingBottom: insets.bottom, paddingTop: insets.top },
			]}
		>
			<HeaderWithCloseButton
				title={timer}
				titleStyle={{
					color: countDownColor,
					textTransform: "uppercase",
				}}
				onPressClose={() => {
					setPause(true);
					setQuitModalVisible(true);
				}}
			/>
			<View style={styles.number}>
				{timers["cycles"] > 1 && cycleNumber && (
					<Status
						name={"Cycle"}
						current={cycleNumber}
						total={timers["cycles"]}
					/>
				)}
				{exerciseNumber && (
					<Status
						name={"Exercise"}
						current={exerciseNumber}
						total={exercises.length}
					/>
				)}
				{timers["sets"] > 1 && timerNumber && (
					<Status
						name={"Set"}
						current={timerNumber}
						total={timers["sets"]}
					/>
				)}
			</View>
			<View style={styles.timerValue}>
				<CountdownTimer
					key={reset}
					countDownColor={countDownColor}
					handleForward={handleForward}
					remainingSets={
						timer === "work"
							? remainingSets + 1
							: timer === "rest"
								? remainingSets
								: 0
					}
					mute={mute}
					pause={pause}
					playSound={playSound}
					screenWidth={screenWidth}
					sets={timers["sets"]}
					setTimeElapsed={setTimeElapsed}
					start={start}
					timer={timer}
					timerValue={timerValue}
					totalRemainingTime={totalRemainingTime}
				/>
			</View>

			<View style={styles.message}>
				<ThemedText
					type="light"
					style={styles.text}
				>
					{timer === "get ready"
						? "get ready for"
						: timer === "break" || timer === "rest"
							? "next"
							: undefined}
				</ThemedText>
			</View>
			<View style={styles.exercise}>
				<ThemedText
					style={styles.text}
					type="title"
				>
					{timer === "get ready" || timer === "break"
						? exercises[
								exerciseNumber
									? exerciseNumber % exercises.length
									: 0
							]
						: exercise}
				</ThemedText>
			</View>
			<View>
				<View
					style={{
						width: progressWidth,
						height: 8,
						backgroundColor: countDownColor,
					}}
				/>
				<View style={styles.duration}>
					<ThemedText type="light">{formatedTimeElapsed}</ThemedText>
					<ThemedText type="light">
						{formatedTimeRemaining}
					</ThemedText>
				</View>
				<View style={styles.control}>
					<IconButton
						iconName={"menu-sharp"}
						size={32}
						onPress={() => {
							setPause(true);
							setTimelineModalVisible(true);
						}}
					/>
					<IconButton
						iconName={"play-skip-back-sharp"}
						size={32}
						onPress={handleBack}
					/>

					{pause ? (
						<IconButton
							iconName={"play-sharp"}
							size={64}
							onPress={() => setPause(false)}
						/>
					) : (
						<IconButton
							iconName={"pause-sharp"}
							size={64}
							onPress={() => setPause(true)}
						/>
					)}
					<IconButton
						iconName={"play-skip-forward-sharp"}
						size={32}
						onPress={handleForward}
					/>
					{mute ? (
						<IconButton
							iconName={"volume-mute-sharp"}
							size={32}
							onPress={() => setMute(false)}
						/>
					) : (
						<IconButton
							iconName={"volume-high-sharp"}
							size={32}
							onPress={() => setMute(true)}
						/>
					)}
				</View>
			</View>
			{timelineModalVisible && (
				<WorkoutOrderModal
					activeColor={countDownColor}
					currIndex={index}
					modalVisible={timelineModalVisible}
					setIndex={setIndex}
					setModalVisible={setTimelineModalVisible}
					setReset={setReset}
					workoutorder={workoutOrder}
				/>
			)}
			{quitModalVisible && (
				<ConfirmModal
					title="Quit?"
					subtitle="Are you sure you want to quit this workout?"
					confirmText="quit"
					confirmTextColor="steelblue"
					confirmOnPressHandler={() => {
						router.navigate("/");
					}}
					modalVisible={quitModalVisible}
					setModalVisible={setQuitModalVisible}
				/>
			)}
		</ThemedView>
	);
};

export default StartScreen;

const styles = StyleSheet.create({
	text: {
		textTransform: "capitalize",
		textAlign: "center",
	},
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	number: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		flex: 1,
	},
	timerValue: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	message: {
		justifyContent: "center",
	},
	exercise: {
		flex: 3,
		justifyContent: "center",
		alignItems: "center",
		textTransform: "capitalize",
		textAlign: "center",
		paddingHorizontal: 8,
	},
	duration: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		paddingHorizontal: 8,
	},
	control: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
});
