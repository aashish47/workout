import { db, expoDb } from "@/db/drizzle";
import migrations from "@/db/migrations/migrations";
import { workout, Workout } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import React, { createContext, PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const DataContext = createContext<Workout[] | null>(null);

const DataComponent = ({ children }: PropsWithChildren) => {
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

const DataProvider = ({ children }: PropsWithChildren) => {
    const { success, error: migrationError } = useMigrations(db, migrations);
    useDrizzleStudio(expoDb);

    if (migrationError) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Migration error: {migrationError.message}</Text>
                </View>
            </SafeAreaView>
        );
    }
    if (!success) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Migration is in progress...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return <DataComponent>{children}</DataComponent>;
};

export default DataProvider;
