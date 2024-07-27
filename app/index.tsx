import ListItem from "@/components/ListItem";
import { FlatList, View } from "react-native";

const workouts = [
    {
        id: 1,
        title: "Legs",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
    },
    {
        id: 1123,
        title: "Legs",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
    },
    {
        id: 123,
        title: "Legs",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
    },
    {
        id: 11,
        title: "Legs",
        backgroundColor: "tomato", // Tomato red
        exercises: ["Squats", "Lunges", "Leg Press", "Hamstring Curls", "Calf Raises"],
    },
    {
        id: 2,
        title: "Push",
        backgroundColor: "steelblue", // Steel blue
        exercises: ["Bench Press", "Overhead Press", "Push-Ups", "Dumbbell Flyes", "Tricep Dips"],
    },
    {
        id: 3,
        title: "Pull",
        backgroundColor: "limegreen", // Lime green
        exercises: ["Pull-Ups", "Bent Over Rows", "Deadlifts", "Face Pulls", "Bicep Curls"],
    },
    {
        id: 4,
        title: "HIIT",
        backgroundColor: "gold", // Gold
        exercises: ["Burpees", "Jumping Jacks", "High Knees", "Mountain Climbers", "Sprint Intervals"],
    },
    {
        id: 5,
        title: "Abs",
        backgroundColor: "hotpink", // Hot pink
        exercises: ["Crunches", "Planks", "Leg Raises", "Russian Twists", "Bicycle Crunches"],
    },
];

export interface Workout {
    id: number;
    title: string;
    backgroundColor: string;
    exercises: string[];
}

export default function Index() {
    return (
        <View>
            <FlatList
                data={workouts}
                renderItem={({ item }) => <ListItem {...item} />}
            />
        </View>
    );
}
