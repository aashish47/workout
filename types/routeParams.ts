import { Workouts } from "@/db/schema";

export type ParamList = {
    "(workout)": Workouts;

    index: {
        // timers: [keyof Workouts["time"], number][];
        timers: Workouts["time"];
    };

    exercises: {
        exercises: Workouts["exercises"];
    };
    "workout": Workouts;
    "create": undefined;
};
