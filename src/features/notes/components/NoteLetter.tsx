import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, shadows, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import { formatNoteDate } from "../dateUtils";
import type { LoveNote } from "../types";

export function NoteLetter({ note }: { note: LoveNote }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topSeal}><Ionicons name="heart" size={18} color={colors.accent} /></View>
      <View style={styles.paper}>
        <View style={styles.paperHeader}>
          <PrikiText variant="overline" style={styles.overline}>A LETTER FOR YOU</PrikiText>
          <PrikiText variant="caption">From {note.senderName}</PrikiText>
        </View>
        <View style={styles.rule} />
        <PrikiText variant="h2" style={styles.title}>{note.title || "A little note"}</PrikiText>
        <PrikiText variant="body" style={styles.message}>{note.body}</PrikiText>
        {note.photoUri ? (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="image-outline" size={22} color={colors.accent} />
            <PrikiText variant="caption">Photo attachment preview</PrikiText>
          </View>
        ) : null}
        <View style={styles.signature}>
          <PrikiText variant="caption">Sent {formatNoteDate(note.createdAt)}</PrikiText>
          {note.updatedAt ? <PrikiText variant="caption" style={styles.edited}>Edited</PrikiText> : null}
          <PrikiText variant="display" style={styles.signOff}>with love,</PrikiText>
          <PrikiText variant="title">{note.senderName}</PrikiText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingTop: spacing.md },
  topSeal: { alignSelf: "center", zIndex: 1, width: 42, height: 42, borderRadius: 21, marginBottom: -21, alignItems: "center", justifyContent: "center", backgroundColor: "#F8DDE3", borderWidth: 1, borderColor: colors.surface },
  paper: { backgroundColor: "#FFFEFC", borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.xl, paddingTop: spacing["2xl"], ...shadows.card },
  paperHeader: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: spacing.sm },
  overline: { color: colors.accent },
  rule: { height: 1, backgroundColor: colors.border, marginVertical: spacing.lg },
  title: { marginBottom: spacing.lg },
  message: { lineHeight: 27 },
  photoPlaceholder: { minHeight: 82, marginTop: spacing.xl, borderRadius: radius.md, backgroundColor: colors.surfaceMuted, alignItems: "center", justifyContent: "center", gap: spacing.xs },
  signature: { alignItems: "flex-end", marginTop: spacing["3xl"], gap: spacing.xs },
  edited: { color: colors.accent, fontStyle: "italic" },
  signOff: { fontSize: 25, color: colors.accent, marginTop: spacing.sm },
});
