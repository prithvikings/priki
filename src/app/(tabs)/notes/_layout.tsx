import { Stack } from "expo-router";
import { colors } from "@/theme";
import { NotesProvider } from "@/features/notes/NotesProvider";

export default function NotesLayout() {
  return (
    <NotesProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="compose" />
        <Stack.Screen name="[id]" />
      </Stack>
    </NotesProvider>
  );
}
