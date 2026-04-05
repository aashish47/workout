import { useAudioPlayer } from "expo-audio";

const audioPaths = {
	"countdown": require(`@assets/sounds/countdown.mp3`),
	"exercise-over": require(`@assets/sounds/exercise-over.mp3`),
	"halftime": require(`@assets/sounds/halftime.mp3`),
	"set-over": require(`@assets/sounds/set-over.mp3`),
	"ten": require(`@assets/sounds/ten.mp3`),
	"workout-over": require(`@assets/sounds/workout-over.mp3`),
	"zero": require(`@assets/sounds/zero.mp3`),
};

export type AudioKeys = keyof typeof audioPaths;

export const useSounds = () => {
	const countdownPlayer = useAudioPlayer(audioPaths["countdown"]);
	const exerciseOverPlayer = useAudioPlayer(audioPaths["exercise-over"]);
	const halftimePlayer = useAudioPlayer(audioPaths["halftime"]);
	const setOverPlayer = useAudioPlayer(audioPaths["set-over"]);
	const tenPlayer = useAudioPlayer(audioPaths["ten"]);
	const workoutOverPlayer = useAudioPlayer(audioPaths["workout-over"]);
	const zeroPlayer = useAudioPlayer(audioPaths["zero"]);

	const players = {
		"countdown": countdownPlayer,
		"exercise-over": exerciseOverPlayer,
		"halftime": halftimePlayer,
		"set-over": setOverPlayer,
		"ten": tenPlayer,
		"workout-over": workoutOverPlayer,
		"zero": zeroPlayer,
	};

	const playSound = async (music: AudioKeys) => {
		const player = players[music];
		if (player) {
			try {
				await player.seekTo(0); // Reset to beginning
				player.play();
			} catch (err) {
				console.error("Error playing sound:", err);
			}
		}
	};

	return { playSound };
};
