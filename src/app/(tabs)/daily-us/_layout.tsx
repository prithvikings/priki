import { Stack } from "expo-router";
import { colors } from "@/theme";

export default function DailyUsLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.background },
      animation: "slide_from_right",
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="history" />
      <Stack.Screen name="history/[date]" />
    </Stack>
  );
}
