import { useLocalSearchParams, useRouter } from "expo-router";
import { AppHeader, PrikiText, ScreenContainer, SecondaryButton } from "@/components";
import { mockCouple } from "@/data/mockData";
import { MemoryForm } from "@/features/memories/components/MemoryForm";
import { useMemories } from "@/features/memories/MemoriesProvider";
import { spacing } from "@/theme";

export default function EditMemoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getMemory, updateMemory } = useMemories();
  const memory = getMemory(id);
  if (!memory || memory.creator.id !== mockCouple.currentUser.id) return <ScreenContainer contentStyle={{ paddingTop: spacing.md, gap: spacing.lg }}><AppHeader title="Can't edit this memory" /><PrikiText variant="body">Only the person who added a memory can edit it.</PrikiText><SecondaryButton title="Back to memory" onPress={() => router.back()} /></ScreenContainer>;
  return (
    <ScreenContainer contentStyle={{ paddingTop: spacing.md, paddingBottom: 120, gap: spacing.lg }}>
      <AppHeader title="Edit memory" eyebrow="MAKE A LITTLE CHANGE" />
      <MemoryForm initialValue={{ title: memory.title, description: memory.description, memoryDate: memory.memoryDate, imageRef: memory.imageRef }} submitLabel="Save changes" onCancel={() => router.back()} onSave={input => { updateMemory(memory.id, input); router.replace({ pathname: "/(tabs)/memories/[id]", params: { id: memory.id } }); }} />
    </ScreenContainer>
  );
}
