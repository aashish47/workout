import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export type ExerciseItem = {
	id: string;
	name: string;
};

export const workout = sqliteTable("workout", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	avatarColor: text("avatarColor").notNull(),
	exercises: text("exercises", { mode: "json" })
		.notNull()
		.$type<ExerciseItem[]>(),
	timers: text("timers", { mode: "json" }).notNull().$type<{
		"warm up": number;
		"get ready": number;
		work: number;
		rest: number;
		sets: number;
		break: number;
		cycles: number;
		"cool down": number;
	}>(),
});

export const record = sqliteTable("record", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	duration: integer("duration").notNull(),
	exercises: text("exercises", { mode: "json" })
		.notNull()
		.$type<ExerciseItem[]>(),
	timers: text("timers", { mode: "json" }).notNull().$type<{
		"warm up": number;
		"get ready": number;
		work: number;
		rest: number;
		sets: number;
		break: number;
		cycles: number;
		"cool down": number;
	}>(),
	createdAt: integer("createdAt", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

export type Workout = typeof workout.$inferSelect;
export type Timers = [keyof Workout["timers"], number][];
export type Record = typeof record.$inferSelect;
