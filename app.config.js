const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
	if (IS_DEV) {
		return "com.aashish47.workout.dev";
	}

	if (IS_PREVIEW) {
		return "com.aashish47.workout.preview";
	}

	return "com.aashish47.workout";
};

const getAppName = () => {
	if (IS_DEV) {
		return "Workout47 (Dev)";
	}

	if (IS_PREVIEW) {
		return "Workout47 (Preview)";
	}

	return "Workout47";
};

export default ({ config }) => ({
	...config,
	name: getAppName(),
	ios: {
		...config.ios,
		bundleIdentifier: getUniqueIdentifier(),
	},
	android: {
		...config.android,
		package: getUniqueIdentifier(),
	},

	"plugins": [
		"expo-asset",
		"expo-audio",
		"expo-font",
		"expo-router",
		"expo-sharing",
		"expo-web-browser",
	],
});
