import SegmentedCircle from "@/components/SegmentedCircle";
import { ThemedText } from "@/components/ThemedText";
import getFormatedTime from "@/utils/getFormatedTime";
import { CountdownTimerType, OrderType } from "@/utils/getWorkoutOrder";
import { Audio } from "expo-av";
import React, { Dispatch, memo, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ColorFormat, useCountdown } from "react-native-countdown-circle-timer";
import Svg, { Path } from "react-native-svg";

interface CountdownTimerProps {
    countDownColor: ColorFormat;
    index: number;
    mute: boolean;
    pause: boolean;
    remainingSets: number;
    screenWidth: number;
    setIndex: Dispatch<SetStateAction<number>>;
    setReset: Dispatch<SetStateAction<number>>;
    sets: number;
    setTimeElapsed: Dispatch<SetStateAction<number>>;
    start: number;
    timer: CountdownTimerType;
    timerValue: number;
    totalRemainingTime: number;
    workoutOrder: OrderType[];
}

const audioPaths = {
    "countdown": require(`../assets/sounds/countdown.mp3`),
    "exercise-over": require(`../assets/sounds/exercise-over.mp3`),
    "halftime": require(`../assets/sounds/halftime.mp3`),
    "set-over": require(`../assets/sounds/set-over.mp3`),
    "ten": require(`../assets/sounds/ten.mp3`),
    "workout-over": require(`../assets/sounds/workout-over.mp3`),
    "zero": require(`../assets/sounds/zero.mp3`),
};

const CountdownTimer = memo(
    ({
        countDownColor,
        index,
        mute,
        pause,
        remainingSets,
        screenWidth,
        setIndex,
        setReset,
        setTimeElapsed,
        sets,
        start,
        timer,
        timerValue,
        totalRemainingTime,
        workoutOrder,
    }: CountdownTimerProps) => {
        const halfTime = timerValue / 2;
        const { path, pathLength, stroke, strokeDashoffset, remainingTime, elapsedTime, size, strokeWidth } = useCountdown({
            isPlaying: !pause,
            duration: timerValue,
            colors: countDownColor,
            size: screenWidth - 96,
            rotation: "counterclockwise",
            onUpdate(remainingTime) {
                if (!mute) {
                    if ([1, 2, 3].includes(remainingTime)) {
                        playSound("countdown");
                    } else if (timer === "work") {
                        if (remainingTime === halfTime) {
                            playSound("halftime");
                        } else if (remainingTime === 10) {
                            playSound("ten");
                        }
                    }
                }
            },
            onComplete() {
                if (!mute) {
                    if (totalRemainingTime === 1) {
                        playSound("workout-over");
                    } else if (timer === "work") {
                        if (remainingSets > 1) {
                            playSound("set-over");
                        } else {
                            playSound("exercise-over");
                        }
                    } else {
                        playSound("zero");
                    }
                }
            },
        });

        const [sound, setSound] = useState<Audio.Sound>();

        const playSound = async (music: keyof typeof audioPaths) => {
            try {
                const { sound } = await Audio.Sound.createAsync(audioPaths[music]);
                setSound(sound);

                await sound.playAsync();
            } catch (err) {
                console.log(err);
            }
        };

        useEffect(() => {
            return sound
                ? () => {
                      sound.unloadAsync();
                  }
                : undefined;
        }, [sound]);

        useLayoutEffect(() => {
            if (remainingTime <= 0 && index < workoutOrder.length - 1) {
                setIndex((prev) => prev + 1);
                setReset(Date.now());
            }
        }, [remainingTime, index]);

        useEffect(() => {
            setTimeElapsed(start + Math.floor(elapsedTime));
        }, [elapsedTime]);

        return (
            <View style={{ width: size, height: size, position: "relative" }}>
                <Svg
                    width={size + 500} // Renders properly without cuts in right & bottom. Don't know why?
                    height={size + 500} // Also fixes color mismatch issue when timers starts in dark mode.
                >
                    <Path
                        d={path}
                        fill="none"
                        stroke="#d9d9d9"
                        strokeWidth={strokeWidth}
                    />
                    <Path
                        d={path}
                        fill="none"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                        strokeDasharray={pathLength}
                        strokeDashoffset={strokeDashoffset}
                    />
                </Svg>
                <View style={styles.time}>
                    <SegmentedCircle
                        remainingSets={remainingSets}
                        sets={sets}
                        size={size - 48}
                        strokeColor="silver"
                    >
                        <ThemedText style={[styles.timerValue, { color: stroke }]}>{getFormatedTime(remainingTime)}</ThemedText>
                    </SegmentedCircle>
                </View>
            </View>
        );
    }
);

export default CountdownTimer;

const styles = StyleSheet.create({
    time: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
    },
    timerValue: {
        textTransform: "capitalize",
        textAlign: "center",
        fontSize: 56,
    },
});
