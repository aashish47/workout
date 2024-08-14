import { WorkoutContext } from "@/contexts/WorkoutProvider";
import { useContext } from "react";

const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);
    if (context === null) {
        throw Error("Workout context Null");
    }
    return { ...context };
};

export default useWorkoutContext;
