import TopTabsLayout from "@/components/TopTabsLayout";
import TopTabsLayoutButton from "@/components/TopTabsLayoutButton";
import WorkoutProvider from "@/contexts/WorkoutProvider";
import useDataContext from "@/hooks/useDataContext";
import { ParamList } from "@/types/routeParams";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";

const WorkoutLayout = () => {
    const route = useRoute<RouteProp<ParamList, "(workout)">>();
    const { id } = route.params;
    const data = useDataContext();
    const workout = data.filter((d) => d.id == id)[0];

    return (
        <WorkoutProvider workout={workout}>
            <TopTabsLayout />
            <TopTabsLayoutButton name={"start"} />
        </WorkoutProvider>
    );
};

export default WorkoutLayout;
