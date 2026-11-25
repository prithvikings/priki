import { useRouter } from "expo-router";
import { AppHeader, PrikiText, ScreenContainer } from "@/components";
import { MemoryForm } from "@/features/memories/components/MemoryForm";
import { useMemories } from "@/features/memories/MemoriesProvider";
import { spacing } from "@/theme";

export default function ComposeMemoryScreen() {
  const router = useRouter();
  const { createMemory } = useMemories();
  return (
    <ScreenContainer contentStyle={{ paddingTop: spacing.md, paddingBottom: 120, gap: spacing.lg }}>
      <AppHeader title="A new memory" />
      <PrikiText variant="caption">Some moments deserve a page of their own.</PrikiText>
      <MemoryForm submitLabel="Save memory" onCancel={() => router.back()} onSave={input => { createMemory(input); router.replace("/(tabs)/memories"); }} />
    </ScreenContainer>
  );
}
