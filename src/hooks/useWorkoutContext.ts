import { WorkoutContext } from "@/contexts/WorkoutProvider";
import { use } from "react";

const useWorkoutContext = () => {
	const context = use(WorkoutContext);
	if (context === null) {
		throw Error("Workout context Null");
	}
	return { ...context };
};

export default useWorkoutContext;
