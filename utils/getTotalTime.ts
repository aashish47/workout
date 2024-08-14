import { Workouts } from "@/db/schema";
import getFormatedTime from "@/utils/getFormatedTime";

const getTotalTime = (times: Workouts["time"]) => {
    const totalTime =
        (times["work"] * times["intervals"] + times["rest"] * (times["intervals"] - 1) + times["break"]) * times["cycles"] -
        times["break"] +
        times["warm up"] +
        times["cool down"] +
        times["get ready"];

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    return `${getFormatedTime(minutes)}:${getFormatedTime(seconds)}`;
};

export default getTotalTime;
