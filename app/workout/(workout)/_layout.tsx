import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import { Workouts } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { ParamList } from "@/types/routeParams";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { createContext, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";

export interface WorkoutContextType {
    workoutRef: React.RefObject<Workouts>;
    setWorkout: (updateFn: (prevWorkout: Workouts) => Workouts) => void;
}
export const WorkoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutLayout = () => {
    const route = useRoute<RouteProp<ParamList, "(workout)">>();
    const { id } = route.params;
    const data = useDataContext();
    if (!data) {
        throw Error("Data doesn't exist");
    }

    const workout = data.filter((d) => d.id == id)[0];
    const workoutRef = useRef<Workouts>(workout);

    const setWorkout = useCallback((updateFn: (prevWorkout: Workouts) => Workouts) => {
        workoutRef.current = updateFn(workoutRef.current);
    }, []);

    return (
        <WorkoutContext.Provider value={{ workoutRef, setWorkout }}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"start"} />
        </WorkoutContext.Provider>
    );
};

export default WorkoutLayout;

const styles = StyleSheet.create({});
