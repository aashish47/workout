import { Workouts } from "@/db/schema";

export type ParamList = {
    "(workout)": Workouts;

    index: {
        timers: [keyof Workouts["time"], number][];
    };

    exercises: {
        exercises: Workouts["exercises"];
    };
};
