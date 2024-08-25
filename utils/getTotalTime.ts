import { Workout } from "@/db/schema";
import getFormatedTime from "@/utils/getFormatedTime";

const getTotalTime = (timers: Workout["timers"], exercises: number) => {
    const totalSeconds =
        exercises && timers["work"]
            ? ((timers["work"] + timers["rest"]) * timers["sets"] - timers["rest"] + timers["break"]) * exercises * timers["cycles"] -
              timers["break"] +
              timers["warm up"] +
              timers["cool down"] +
              timers["get ready"]
            : 0;

    return { totalSeconds, formatedDuration: getFormatedTime(totalSeconds) };
};

export default getTotalTime;
