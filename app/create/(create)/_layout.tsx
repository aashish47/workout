import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";

import React, { createContext, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";

export interface WorkoutState {
    title: string;
    backgroundColor: string;
    exercises: string[];
    time: {
        work: number;
        rest: number;
        intervals: number;
        "get ready": number;
        cycles: number;
        break: number;
        "warm up": number;
        "cool down": number;
    };
}

export interface WorkoutContextType {
    workoutRef: React.RefObject<WorkoutState>;
    setWorkout: (updateFn: (prevWorkout: WorkoutState) => WorkoutState) => void;
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null);

const CreateLayout = () => {
    const workoutRef = useRef<WorkoutState>({
        title: "timer",
        backgroundColor: "plum",
        exercises: [],
        time: {
            work: 100,
            rest: 20,
            intervals: 4,
            "get ready": 10,
            cycles: 8,
            break: 80,
            "warm up": 10,
            "cool down": 10,
        },
    });

    const setWorkout = useCallback((updateFn: (prevWorkout: WorkoutState) => WorkoutState) => {
        workoutRef.current = updateFn(workoutRef.current);
    }, []);

    return (
        <WorkoutContext.Provider value={{ workoutRef, setWorkout }}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"create"} />
        </WorkoutContext.Provider>
    );
};

export default CreateLayout;

const styles = StyleSheet.create({});
