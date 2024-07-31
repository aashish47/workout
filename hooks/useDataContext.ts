import { DataContext } from "@/contexts/DataProvider";
import { useContext } from "react";

const useDataContext = () => {
    return useContext(DataContext);
};

export default useDataContext;
