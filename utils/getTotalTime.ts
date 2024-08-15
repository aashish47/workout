import { Workouts } from "@/db/schema";
import getFormatedTime from "@/utils/getFormatedTime";

const getTotalTime = (times: Workouts["time"], exercises: number) => {
    const totalTime =
        exercises && times["work"]
            ? (((times["work"] + times["rest"]) * times["intervals"] - times["rest"] + times["break"]) * exercises -
                  times["break"] +
                  times["warm up"] +
                  times["cool down"] +
                  times["get ready"]) *
              times["cycles"]
            : 0;

    const min = Math.floor(totalTime / 60);
    const hours = Math.floor(min / 60);
    const minutes = hours ? min % 60 : min;
    const seconds = totalTime % 60;

    return `${getFormatedTime(hours)}:${getFormatedTime(minutes)}:${getFormatedTime(seconds)}`;
};

export default getTotalTime;
