import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="edit-record/[id]"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="view-record/[id]"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
