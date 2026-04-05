import { db } from "@/db/drizzle";
import { workout, Workout } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { createContext, PropsWithChildren, use } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const DataContext = createContext<Workout[] | null>(null);

const DataProvider = ({ children }: PropsWithChildren) => {
	const { data, updatedAt, error } = useLiveQuery(db.select().from(workout));
	if (error) {
		return (
			<SafeAreaView>
				<View>
					<Text>Error Loading Data:{error.message}</Text>
				</View>
			</SafeAreaView>
		);
	}
	return <DataContext value={data}>{children}</DataContext>;
};

export default DataProvider;

export const useDataContext = () => {
	const context = use(DataContext);
	if (context === null) {
		throw Error("Null Data at useDataContext");
	}

	return context;
};
