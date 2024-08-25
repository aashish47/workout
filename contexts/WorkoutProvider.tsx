import { Workout } from "@/db/schema";
import { createContext, Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, useRef, useState } from "react";

import React from "react";

interface WorkoutContextType {
    workoutData: Workout;
    setWorkoutData: Dispatch<SetStateAction<Workout>>;
    timersRef: MutableRefObject<Workout["timers"]>;
}
export const WorkoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutProvider = ({ children, workoutData: currentWorkout }: PropsWithChildren & { workoutData: Workout }) => {
    const [workoutData, setWorkoutData] = useState(currentWorkout);
    const timersRef = useRef(currentWorkout["timers"]);
    return <WorkoutContext.Provider value={{ workoutData, setWorkoutData, timersRef }}>{children}</WorkoutContext.Provider>;
};

export default WorkoutProvider;
