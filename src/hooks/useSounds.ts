import { audioPaths } from "@/app/_layout";
import { useAudioPlayer } from "expo-audio";

export type AudioKeys = keyof typeof audioPaths;

const players = {} as Record<AudioKeys, ReturnType<typeof useAudioPlayer>>;

export const useSounds = () => {
	Object.entries(audioPaths).forEach(([key, path]) => {
		players[key as AudioKeys] = useAudioPlayer(path);
	});
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
