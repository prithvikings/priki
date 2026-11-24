import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, PrikiText } from "@/components";
import { colors, radius, spacing } from "@/theme";

type Props = {
  name: string;
  initials: string;
  answer: string;
  isCurrentUser: boolean;
  reacted?: boolean;
  onReact?: () => void;
  partnerReacted?: boolean;
};

export function AnswerCard({ name, initials, answer, isCurrentUser, reacted = false, onReact, partnerReacted = false }: Props) {
  return (
    <View style={[styles.card, isCurrentUser ? styles.mine : styles.partner]}>
      <View style={styles.header}>
        <Avatar initials={initials} size={38} accessibilityLabel={name}/>
        <View style={styles.nameWrap}><PrikiText variant="title">{name}</PrikiText><PrikiText variant="caption">{isCurrentUser ? "Your answer" : "Their answer"}</PrikiText></View>
        {partnerReacted ? <View style={styles.reactionNote}><Ionicons name="heart" size={13} color={colors.accent}/><PrikiText variant="caption" style={styles.reactionText}>They loved this</PrikiText></View> : null}
      </View>
      <PrikiText variant="body" style={styles.answer}>{answer}</PrikiText>
      {!isCurrentUser && onReact ? (
        <View style={styles.footer}><View style={styles.spacer}/><View accessibilityLabel={reacted ? "You reacted with a heart" : "No heart reaction"}><Ionicons name={reacted ? "heart" : "heart-outline"} size={15} color={colors.accent}/></View><PrikiText variant="caption" style={styles.reactionText}>{reacted ? "A heart from you" : "Send a little heart"}</PrikiText><View style={styles.spacer}/></View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md },
  mine: { backgroundColor: colors.surface, borderColor: colors.border },
  partner: { backgroundColor: "#FCEFF0", borderColor: "#EFD6DA" },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  nameWrap: { flex: 1, gap: 1 },
  answer: { lineHeight: 25 },
  reactionNote: { flexDirection: "row", alignItems: "center", gap: 4 },
  reactionText: { color: colors.accent, fontSize: 11 },
  footer: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  spacer: { flex: 1 },
});
