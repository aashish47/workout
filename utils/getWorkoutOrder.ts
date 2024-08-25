import { Workout } from "@/db/schema";

export type CountdownTimerType = keyof Omit<Workout["timers"], "sets" | "cycles">;

export interface OrderType {
    start: number;
    timer: CountdownTimerType;
    timerValue: number;
    timerNumber?: number;
    exercise?: string;
    exerciseNumber?: number;
    cycleNumber?: number;
}

const getWorkoutOrder = (times: Workout["timers"], exercises: Workout["exercises"]) => {
    if (!exercises.length || !times["work"]) {
        return [];
    }

    const order: OrderType[] = [];

    let start = 0;

    const addTimer = (timer: CountdownTimerType, timerNumber?: number, exercise?: string, exerciseNumber?: number, cycleNumber?: number) => {
        exercise
            ? order.push({ start, timer, timerValue: times[timer], timerNumber, exercise, exerciseNumber, cycleNumber })
            : order.push({ start, timer, timerValue: times[timer] });
        start += times[timer];
    };

    if (times["warm up"]) addTimer("warm up");
    if (times["get ready"]) addTimer("get ready");

    for (let cycle = 1; cycle <= times["cycles"]; cycle++) {
        exercises.forEach((exercise, exerciseIndex) => {
            for (let interval = 1; interval < times["sets"]; interval++) {
                addTimer("work", interval, exercise, exerciseIndex + 1, cycle);
                if (times["rest"]) addTimer("rest", interval, exercise, exerciseIndex + 1, cycle);
            }
            addTimer("work", times["sets"], exercise, exerciseIndex + 1, cycle);

            if (times["break"] && (cycle < times["cycles"] || exerciseIndex < exercises.length - 1))
                addTimer("break", times["sets"], exercise, exerciseIndex + 1, cycle);
        });
    }

    if (times["cool down"]) addTimer("cool down");

    return order;
};

export default getWorkoutOrder;
