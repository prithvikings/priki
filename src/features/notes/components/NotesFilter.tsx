import { Pressable, ScrollView, StyleSheet } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import type { NoteFilter } from "../types";

const filters: { id: NoteFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "received", label: "Received" },
  { id: "sent", label: "Sent" },
  { id: "favorites", label: "Favorites" },
];

export function NotesFilter({ value, onChange }: { value: NoteFilter; onChange: (value: NoteFilter) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {filters.map((filter) => (
        <Pressable key={filter.id} accessibilityRole="button" accessibilityState={{ selected: value === filter.id }} onPress={() => onChange(filter.id)} style={[styles.chip, value === filter.id && styles.active]}>
          <PrikiText variant="caption" style={[styles.label, value === filter.id && styles.activeLabel]}>{filter.label}</PrikiText>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingVertical: spacing.xs },
  chip: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { color: colors.textSecondary, fontWeight: "600" },
  activeLabel: { color: colors.white },
});
