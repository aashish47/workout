import { DataContext } from "@/contexts/DataProvider";
import { useContext } from "react";

const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === null) {
        throw Error("Null Data at useDataContext");
    }

    return context;
};

export default useDataContext;
