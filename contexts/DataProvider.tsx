import { db } from "@/db/drizzle";
import { workout, Workout } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { createContext, PropsWithChildren } from "react";
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
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
