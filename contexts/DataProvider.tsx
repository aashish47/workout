import { Workouts } from "@/db/schema";
import { createContext } from "react";

export const DataContext = createContext<Workouts[] | null>(null);

import React from "react";

const DataProvider = ({ children, value }: { children: any; value: Workouts[] | null }) => {
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
