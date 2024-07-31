import { Workout } from "@/db/data";

export type ParamList = {
    "(workout)": Workout;

    index: {
        timers: [keyof Workout["time"], number][];
    };

    exercises: {
        exercises: Workout["exercises"];
    };
};
