import { WorkoutContextType } from "@/contexts/WorkoutRefProvider";
import { useContext } from "react";

const useWorkoutRefContext = (WorkoutContext: React.Context<WorkoutContextType | null>) => {
    const context = useContext(WorkoutContext);
    if (context === null) {
        throw Error("Null context create Workout");
    }
    const { workoutRef, setWorkout } = context;
    if (workoutRef.current === null) {
        throw Error("null workoutref in create index");
    }
    return { ...workoutRef.current, setWorkout };
};

export default useWorkoutRefContext;
