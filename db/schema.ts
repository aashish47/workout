import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workouts = sqliteTable("workouts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    backgroundColor: text("background_color").notNull(),
    exercises: text("exercises", { mode: "json" }).notNull().$type<string[]>(),
    time: text("time", { mode: "json" }).notNull().$type<{
        work: number;
        rest: number;
        intervals: number;
        "get ready": number;
        cycles: number;
        break: number;
        "warm up": number;
        "cool down": number;
    }>(),
});

export type Workouts = typeof workouts.$inferSelect;
