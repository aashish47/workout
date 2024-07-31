import { Workout } from "@/db/data";
import { createContext } from "react";

interface ContextType {
    data: Workout[];
    setData: React.Dispatch<React.SetStateAction<Workout[]>>;
}

export const DataContext = createContext<ContextType | null>(null);

import React from "react";

const DataProvider = ({ children, value }: { children: any; value: ContextType }) => {
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
