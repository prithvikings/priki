import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, shadows, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import { formatNoteDate } from "../dateUtils";
import type { LoveNote } from "../types";

type Props = {
  note: LoveNote;
  onPress: () => void;
  onFavorite: () => void;
};

export function NoteCard({ note, onPress, onFavorite }: Props) {
  const received = note.senderId === "partner";
  const unopened = received && note.status === "delivered";
  const statusLabel = note.status === "scheduled" ? "Scheduled" : note.status === "draft" ? "Draft" : note.status === "opened" ? "Opened" : note.status === "delivered" ? "New" : "Sent";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, unopened && styles.unopened, note.status === "draft" && styles.draft, pressed && styles.pressed]}
    >
      <View style={styles.envelope}>
        <Ionicons name={unopened ? "mail" : "mail-open-outline"} size={23} color={unopened ? colors.accent : colors.textSecondary} />
        {unopened ? <View style={styles.unreadDot} /> : null}
      </View>
      <View style={styles.copy}>
        <View style={styles.topLine}>
          <PrikiText variant="caption" style={styles.person}>{received ? `From ${note.senderName}` : note.status === "draft" ? "Your draft" : note.status === "scheduled" ? `To ${note.recipientName}` : `To ${note.recipientName}`}</PrikiText>
          <PrikiText variant="caption" style={styles.date}>{note.status === "scheduled" && note.scheduledFor ? formatNoteDate(note.scheduledFor) : formatNoteDate(note.createdAt)}</PrikiText>
        </View>
        <PrikiText variant="title" numberOfLines={1}>{note.title || note.body.split("\n")[0] || "Untitled note"}</PrikiText>
        <PrikiText variant="caption" numberOfLines={2} style={styles.preview}>{note.body}</PrikiText>
        <View style={styles.bottomLine}>
          <View style={[styles.statusPill, unopened && styles.newPill]}>
            <PrikiText variant="caption" style={[styles.statusText, unopened && styles.newText]}>{statusLabel}</PrikiText>
          </View>
          {note.updatedAt ? <PrikiText variant="caption" style={styles.edited}>Edited</PrikiText> : null}
          {note.isHearted ? <Ionicons name="heart" size={15} color={colors.accent} /> : null}
        </View>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={note.isFavorite ? "Remove from favorites" : "Add to favorites"} hitSlop={8} onPress={onFavorite} style={styles.favorite}>
        <Ionicons name={note.isFavorite ? "heart" : "heart-outline"} size={20} color={note.isFavorite ? colors.accent : colors.textSecondary} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.xl, padding: spacing.md, gap: spacing.md, ...shadows.card },
  unopened: { backgroundColor: "#FCEDEF", borderColor: "#EFCBD2" },
  draft: { backgroundColor: "#FBF7F2" },
  envelope: { width: 44, height: 44, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surfaceMuted, position: "relative" },
  unreadDot: { position: "absolute", width: 8, height: 8, borderRadius: 4, top: 7, right: 7, backgroundColor: colors.primary },
  copy: { flex: 1, gap: 4, minWidth: 0 },
  topLine: { flexDirection: "row", justifyContent: "space-between", gap: spacing.xs },
  person: { color: colors.accent, fontSize: 11, flexShrink: 1 },
  date: { fontSize: 10 },
  preview: { lineHeight: 17 },
  bottomLine: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.xs },
  statusPill: { borderRadius: radius.pill, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  newPill: { backgroundColor: "#F7DDE3" },
  statusText: { fontSize: 10, lineHeight: 14 },
  newText: { color: colors.accent, fontWeight: "600" },
  edited: { fontSize: 10, fontStyle: "italic" },
  favorite: { padding: spacing.xs },
  pressed: { opacity: 0.82 },
});
