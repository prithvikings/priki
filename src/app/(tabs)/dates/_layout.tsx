import { Stack } from "expo-router";
import { colors } from "@/theme";

export const unstable_settings = { anchor: "index" };

export default function DatesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add" />
      <Stack.Screen name="meeting" />
      <Stack.Screen name="edit/[id]" />
    </Stack>
  );
}
