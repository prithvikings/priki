import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader, PrikiText, PrimaryButton, ScreenContainer, SecondaryButton } from "@/components";
import { mockCouple } from "@/data/mockData";
import { useMemories } from "@/features/memories/MemoriesProvider";
import { MemoryArtwork } from "@/features/memories/components/MemoryArtwork";
import { formatMemoryDate } from "@/features/memories/dateUtils";
import { colors, spacing } from "@/theme";

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getMemory, deleteMemory } = useMemories();
  const memory = getMemory(id);
  if (!memory) return <ScreenContainer contentStyle={styles.content}><AppHeader title="Memory not found" /><PrikiText variant="body">This memory may have been deleted.</PrikiText><SecondaryButton title="Back to memories" onPress={() => router.replace("/(tabs)/memories")} /></ScreenContainer>;

  const isOwner = memory.creator.id === mockCouple.currentUser.id;
  const confirmDelete = () => Alert.alert("Delete this memory?", "This moment will be removed from your shared scrapbook.", [
    { text: "Keep memory", style: "cancel" },
    { text: "Delete", style: "destructive", onPress: () => { deleteMemory(memory.id); router.replace("/(tabs)/memories"); } },
  ]);

  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader title="" />
      <MemoryArtwork imageRef={memory.imageRef} style={styles.art} />
      <PrikiText variant="display">{memory.title}</PrikiText>
      <View style={styles.meta}><Ionicons name="calendar-outline" size={17} color={colors.accent} /><PrikiText variant="caption" style={styles.date}>{formatMemoryDate(memory.memoryDate)}</PrikiText></View>
      {memory.description ? <PrikiText variant="body" style={styles.description}>{memory.description}</PrikiText> : null}
      <View style={styles.creator}><View style={styles.creatorIcon}><Ionicons name="heart-outline" size={17} color={colors.accent} /></View><View><PrikiText variant="title" style={styles.creatorName}>Kept by {memory.creator.name}</PrikiText><PrikiText variant="caption" style={styles.created}>Added {new Date(memory.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}{memory.updatedAt ? " · Edited" : ""}</PrikiText></View></View>
      {isOwner ? <View style={styles.actions}><PrimaryButton title="Edit memory" onPress={() => router.push({ pathname: "/(tabs)/memories/edit/[id]", params: { id: memory.id } })} style={styles.action} /><Pressable onPress={confirmDelete} accessibilityRole="button" style={styles.delete}><Ionicons name="trash-outline" size={19} color={colors.accent} /><PrikiText variant="caption" style={styles.deleteText}>Delete</PrikiText></Pressable></View> : null}
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  content: { paddingTop: spacing.md, paddingBottom: 130, gap: spacing.lg },
  art: { height: 250 },
  meta: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  date: { color: colors.accent, fontWeight: "600" },
  description: { lineHeight: 26, color: colors.textSecondary, fontSize: 16 },
  creator: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md, backgroundColor: colors.surfaceMuted, borderRadius: 16 },
  creatorIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  creatorName: { fontSize: 14 },
  created: { color: colors.textTertiary, marginTop: 3 },
  actions: { gap: spacing.md },
  action: {},
  delete: { minHeight: 44, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: spacing.xs },
  deleteText: { color: colors.accent },
});
