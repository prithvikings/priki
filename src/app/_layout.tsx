import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";
import { NotesProvider } from "@/features/notes/NotesProvider";
import { DailyUsProvider } from "@/features/daily-us/DailyUsProvider";

export default function RootLayout() {
  return (
    <NotesProvider>
      <DailyUsProvider>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </DailyUsProvider>
    </NotesProvider>
  );
}
