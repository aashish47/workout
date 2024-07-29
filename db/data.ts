export interface Workout {
    id: number;
    title: string;
    backgroundColor: string;
    exercises: string[];
    time: {
        work: number;
        rest: number;
        intervals: number;
        getReady: number;
        cycles: number;
        break: number;
        warmUp: number;
        coolDown: number;
    };
}

export const workouts = [
    {
        id: 1,
        title: "Legs",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 1123,
        title: "Legsx",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 123,
        title: "Legsx",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 11,
        title: "Legsx",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 2,
        title: "Push",
        backgroundColor: "steelblue", // Steel blue
        exercises: ["Bench Press", "Overhead Press", "Push-Ups", "Dumbbell Flyes", "Tricep Dips"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 3,
        title: "Pull",
        backgroundColor: "limegreen", // Lime green
        exercises: ["Pull-Ups", "Bent Over Rows", "Deadlifts", "Face Pulls", "Bicep Curls"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 4,
        title: "HIIT",
        backgroundColor: "gold", // Gold
        exercises: ["Burpees", "Jumping Jacks", "High Knees", "Mountain Climbers", "Sprint Intervals"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
    {
        id: 5,
        title: "Abs",
        backgroundColor: "hotpink", // Hot pink
        exercises: ["Crunches", "Planks", "Leg Raises", "Russian Twists", "Bicycle Crunches"],
        time: { work: 40, rest: 20, intervals: 4, getReady: 10, cycles: 8, break: 80, warmUp: 10, coolDown: 10 },
    },
];
