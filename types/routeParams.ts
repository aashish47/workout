import { Workouts } from "@/db/schema";

export type ParamList = {
    "(workout)": Workouts;
    "workout": Workouts;
    "create": undefined;
    "index": undefined;
};
