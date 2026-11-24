import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PrikiText } from "@/components/PrikiText";
import { colors, radius, spacing } from "@/theme";
import type { LoveReason } from "../types";
export function ReasonCard({ reason, onPress, onFavorite, onDelete }: { reason: LoveReason; onPress: () => void; onFavorite: () => void; onDelete?: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}>
    <View style={styles.top}><Ionicons name="heart" size={17} color={colors.accent} /><View style={styles.actions}><Pressable hitSlop={8} onPress={onFavorite}><Ionicons name={reason.isFavorite ? "heart" : "heart-outline"} size={21} color={colors.accent} /></Pressable>{onDelete ? <Pressable hitSlop={8} onPress={onDelete}><Ionicons name="trash-outline" size={18} color={colors.textTertiary} /></Pressable> : null}</View></View>
    <PrikiText variant="title" style={styles.text}>{reason.text}</PrikiText>
    <PrikiText variant="caption" style={styles.creator}>Added by {reason.creator.name}</PrikiText>
  </Pressable>;
}
const styles = StyleSheet.create({ card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.xl, padding: spacing.lg, gap: spacing.md }, top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, actions: { flexDirection: "row", gap: spacing.lg, alignItems: "center" }, text: { fontSize: 16, lineHeight: 24 }, creator: { color: colors.textTertiary } });
