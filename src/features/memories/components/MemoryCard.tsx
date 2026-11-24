import { Pressable, StyleSheet, View } from "react-native";
import { PrikiText } from "@/components/PrikiText";
import { colors, radius, spacing, shadows } from "@/theme";
import { formatMemoryDate } from "../dateUtils";
import type { CoupleMemory } from "../types";
import { MemoryArtwork } from "./MemoryArtwork";

export function MemoryCard({ memory, onPress }: { memory: CoupleMemory; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <MemoryArtwork imageRef={memory.imageRef} style={styles.image} />
      <View style={styles.copy}>
        <PrikiText variant="title" style={styles.title}>{memory.title}</PrikiText>
        <PrikiText variant="caption" style={styles.date}>{formatMemoryDate(memory.memoryDate)}</PrikiText>
        {memory.description ? <PrikiText variant="caption" numberOfLines={2} style={styles.description}>{memory.description}</PrikiText> : null}
        <PrikiText variant="caption" style={styles.creator}>Kept by {memory.creator.name}</PrikiText>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.sm, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  image: { height: 164 },
  copy: { padding: spacing.md, gap: spacing.xs },
  title: { fontSize: 16 },
  date: { color: colors.accent, fontWeight: "600" },
  description: { color: colors.textSecondary, lineHeight: 19 },
  creator: { color: colors.textTertiary, marginTop: 2, fontSize: 11 },
  pressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
});
