import { Stack } from "expo-router";
import React from "react";

const CreateLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(create)"
                options={{ title: "timer", headerShadowVisible: false }}
            />
        </Stack>
    );
};

export default CreateLayout;
