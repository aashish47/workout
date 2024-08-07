import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import WorkoutRefProvider from "@/contexts/WorkoutRefProvider";
import { Workouts } from "@/db/schema";
import useDataContext from "@/hooks/useDataContext";
import { ParamList } from "@/types/routeParams";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useRef } from "react";

const WorkoutLayout = () => {
    const route = useRoute<RouteProp<ParamList, "(workout)">>();
    const { id } = route.params;
    const data = useDataContext();
    const workout = data.filter((d) => d.id == id)[0];
    const workoutRef = useRef<Workouts>(workout);

    return (
        <WorkoutRefProvider workoutRef={workoutRef}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"start"} />
        </WorkoutRefProvider>
    );
};

export default WorkoutLayout;
