import { DataContext } from "@/contexts/DataProvider";
import { use } from "react";

const useDataContext = () => {
	const context = use(DataContext);
	if (context === null) {
		throw Error("Null Data at useDataContext");
	}

	return context;
};

export default useDataContext;
