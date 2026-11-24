import { Stack, usePathname, useSegments } from "expo-router";
import { useEffect } from "react";
import { colors } from "@/theme";

export const unstable_settings = { anchor: "index" };

export default function DatesLayout() {
  const pathname = usePathname();
  const segments = useSegments();
  useEffect(() => {
    console.log("[Priki][DatesLayout] Mounted; route state", { pathname, segments });
    return () => console.log("[Priki][DatesLayout] Unmounted");
  }, []);
  console.log("[Priki][DatesLayout] Rendered", { pathname, segments });
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
