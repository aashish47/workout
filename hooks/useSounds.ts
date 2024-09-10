import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

const audioPaths = {
    "countdown": require(`../assets/sounds/countdown.mp3`),
    "exercise-over": require(`../assets/sounds/exercise-over.mp3`),
    "halftime": require(`../assets/sounds/halftime.mp3`),
    "set-over": require(`../assets/sounds/set-over.mp3`),
    "ten": require(`../assets/sounds/ten.mp3`),
    "workout-over": require(`../assets/sounds/workout-over.mp3`),
    "zero": require(`../assets/sounds/zero.mp3`),
};

export type AudioKeys = keyof typeof audioPaths;

export const useSounds = () => {
    const soundsRef = useRef<{ [key: string]: Audio.Sound | null }>({});

    useEffect(() => {
        const loadSounds = async () => {
            const loadedSounds: { [key: string]: Audio.Sound } = {};
            try {
                for (const [key, path] of Object.entries(audioPaths)) {
                    const { sound } = await Audio.Sound.createAsync(path);
                    loadedSounds[key] = sound;
                }
                soundsRef.current = loadedSounds;
                console.log("sounds loaded");
            } catch (err) {
                console.error("Error loading sounds:", err);
            }
        };

        loadSounds();

        return () => {
            // Cleanup sounds on unmount
            const unloadSounds = async () => {
                try {
                    for (const sound of Object.values(soundsRef.current)) {
                        if (sound) {
                            await sound.unloadAsync();
                        }
                    }
                    console.log("Sounds unloaded");
                } catch (error) {
                    console.error("Error unloading sounds:", error);
                }
            };

            setTimeout(() => unloadSounds(), 5000);
        };
    }, []);

    const playSound = async (music: AudioKeys) => {
        const sound = soundsRef.current[music];
        if (sound) {
            try {
                await sound.replayAsync();
            } catch (err) {
                console.error("Error playing sound:", err);
            }
        }
    };
    return { playSound };
};
