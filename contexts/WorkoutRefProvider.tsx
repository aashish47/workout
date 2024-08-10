import { Workouts } from "@/db/schema";
import { createContext, useCallback } from "react";

export type WorkoutsWithoutId = Omit<Workouts, "id">;

export interface WorkoutContextType {
    workoutRef: React.RefObject<Workouts>;
    setWorkout: (updateFn: (prevWorkout: Workouts) => Workouts) => void;
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null);

interface WorkoutRefProviderProps {
    workoutRef: React.MutableRefObject<Workouts>;
    children: any;
}
const WorkoutRefProvider: React.FC<WorkoutRefProviderProps> = ({ workoutRef, children }) => {
    const setWorkout = useCallback((updateFn: (prevWorkout: Workouts) => Workouts) => {
        workoutRef.current = updateFn(workoutRef.current);
    }, []);

    return <WorkoutContext.Provider value={{ workoutRef, setWorkout }}>{children}</WorkoutContext.Provider>;
};

export default WorkoutRefProvider;
