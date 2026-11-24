import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";
import { NotesProvider } from "@/features/notes/NotesProvider";
import { DailyUsProvider } from "@/features/daily-us/DailyUsProvider";
import { MemoriesProvider } from "@/features/memories/MemoriesProvider";
import { AffectionProvider } from "@/features/affection/AffectionProvider";
import { DatesProfileProvider } from "@/features/dates-profile/DatesProfileProvider";

export default function RootLayout() {
  return (
    <NotesProvider>
      <DailyUsProvider>
        <MemoriesProvider>
        <AffectionProvider>
        <DatesProfileProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        </DatesProfileProvider>
        </AffectionProvider>
        </MemoriesProvider>
      </DailyUsProvider>
    </NotesProvider>
  );
}
