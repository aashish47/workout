import { Workout } from "@/db/schema";
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	RefObject,
	SetStateAction,
	use,
	useRef,
	useState,
} from "react";

import React from "react";

interface WorkoutContextType {
	workoutData: Workout;
	setWorkoutData: Dispatch<SetStateAction<Workout>>;
	timersRef: RefObject<Workout["timers"]>;
}
export const WorkoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutProvider = ({
	children,
	workoutData: currentWorkout,
}: PropsWithChildren & { workoutData: Workout }) => {
	const [workoutData, setWorkoutData] = useState(currentWorkout);
	const timersRef = useRef(currentWorkout["timers"]);
	return (
		<WorkoutContext value={{ workoutData, setWorkoutData, timersRef }}>
			{children}
		</WorkoutContext>
	);
};

export default WorkoutProvider;

export const useWorkoutContext = () => {
	const context = use(WorkoutContext);
	if (context === null) {
		throw Error("Workout context Null");
	}
	return { ...context };
};
