import { Workouts } from "@/db/schema";
import getFormatedTime from "@/utils/getFormatedTime";

const getTotalTime = (times: Workouts["time"], exercises: number) => {
    const totalSeconds =
        exercises && times["work"]
            ? ((times["work"] + times["rest"]) * times["intervals"] - times["rest"] + times["break"]) * exercises * times["cycles"] -
              times["break"] +
              times["warm up"] +
              times["cool down"] +
              times["get ready"]
            : 0;

    return { totalSeconds, formatedDuration: getFormatedTime(totalSeconds) };
};

export default getTotalTime;
