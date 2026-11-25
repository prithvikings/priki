import { useMemo } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { AppHeader, PrikiText, PrimaryButton, ScreenContainer, SurfaceCard } from "@/components";
import { useMemories } from "@/features/memories/MemoriesProvider";
import { MemoryCard } from "@/features/memories/components/MemoryCard";
import { getMonthLabel } from "@/features/memories/dateUtils";
import { colors, spacing } from "@/theme";

export default function MemoriesScreen() {
  const router = useRouter();
  const { memories } = useMemories();
  const groups = useMemo(() => {
    const sorted = [...memories].sort((a, b) => b.memoryDate.localeCompare(a.memoryDate) || b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
    const map = new Map<string, typeof sorted>();
    sorted.forEach(memory => { const key = memory.memoryDate.slice(0, 7); map.set(key, [...(map.get(key) ?? []), memory]); });
    return [...map.entries()];
  }, [memories]);

  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader title="Our Memories" eyebrow="" />
      <View style={styles.intro}>
        <PrikiText variant="display">Little moments,</PrikiText>
        <PrikiText variant="display" style={styles.accent}>kept close.</PrikiText>
        <PrikiText variant="caption" style={styles.subtitle}>A little scrapbook of the things that make us, us.</PrikiText>
      </View>
      <PrimaryButton title="＋  Add a memory" onPress={() => router.push("/(tabs)/memories/compose")} />
      {groups.length ? groups.map(([month, items]) => (
        <View key={month} style={styles.group}>
          <View style={styles.monthHeading}><View style={styles.rule} /><PrikiText variant="overline" style={styles.month}>{getMonthLabel(`${month}-01`).toUpperCase()}</PrikiText><View style={styles.rule} /></View>
          {items.map(memory => <MemoryCard key={memory.id} memory={memory} onPress={() => router.push({ pathname: "/(tabs)/memories/[id]", params: { id: memory.id } })} />)}
        </View>
      )) : (
        <SurfaceCard style={styles.empty}>
          <View style={styles.emptyIcon}><Ionicons name="images-outline" size={28} color={colors.accent} /></View>
          <PrikiText variant="title">Your scrapbook starts here</PrikiText>
          <PrikiText variant="caption" style={styles.subtitle}>Save the little moments you never want to lose.</PrikiText>
        </SurfaceCard>
      )}
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  content: { paddingTop: spacing.md, paddingBottom: 132, gap: spacing.lg },
  intro: { gap: 0, marginTop: spacing.xs, marginBottom: spacing.xs },
  accent: { color: colors.accent },
  subtitle: { color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 20 },
  group: { gap: spacing.md },
  monthHeading: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.sm },
  rule: { height: 1, flex: 1, backgroundColor: colors.border },
  month: { color: colors.textSecondary, letterSpacing: 1.1, fontSize: 10 },
  empty: { alignItems: "center", gap: spacing.md, paddingVertical: spacing["3xl"] },
  emptyIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
});
