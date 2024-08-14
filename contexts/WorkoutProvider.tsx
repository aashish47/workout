import { Workouts } from "@/db/schema";
import { createContext, Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, useRef, useState } from "react";

import React from "react";

interface WorkoutContextType {
    workout: Workouts;
    setWorkout: Dispatch<SetStateAction<Workouts>>;
    timersRef: MutableRefObject<Workouts["time"]>;
}
export const WorkoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutProvider = ({ children, workout: currentWorkout }: PropsWithChildren & { workout: Workouts }) => {
    const [workout, setWorkout] = useState(currentWorkout);
    const timersRef = useRef(currentWorkout.time);
    return <WorkoutContext.Provider value={{ workout, setWorkout, timersRef }}>{children}</WorkoutContext.Provider>;
};

export default WorkoutProvider;
