import { Workouts } from "@/db/schema";

const getWorkoutOrder = (times: Workouts["time"], exercises: Workouts["exercises"]) => {
    if (!exercises.length || !times["work"]) {
        return [];
    }

    const order: {
        start: number;
        timer: keyof Workouts["time"];
        timerNumber?: number;
        exercise?: string;
        exerciseNumber?: number;
    }[] = [];

    let start = 0;

    const addTimer = (timer: keyof Workouts["time"], timerNumber?: number, exercise?: string, exerciseNumber?: number) => {
        exercise ? order.push({ start, timer, timerNumber, exercise, exerciseNumber }) : order.push({ start, timer });
        start += times[timer];
    };

    if (times["get ready"]) addTimer("get ready");
    if (times["warm up"]) addTimer("warm up");

    if (times["work"]) {
        exercises.forEach((exercise, exerciseIndex) => {
            for (let interval = 1; interval < times["intervals"]; interval++) {
                addTimer("work", interval, exercise, exerciseIndex + 1);
                if (times["rest"]) addTimer("rest", interval, exercise, exerciseIndex + 1);
            }
            addTimer("work", times["intervals"], exercise, exerciseIndex + 1);

            if (exerciseIndex < exercises.length - 1 && times["break"]) addTimer("break", times["intervals"], exercise, exerciseIndex + 1);
        });
    }

    if (times["cool down"]) addTimer("cool down");

    return order;
};

export default getWorkoutOrder;
