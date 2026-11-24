import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, shadows, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import type { DailyQuestion } from "../types";

export function DailyQuestionCard({ question, dateLabel }: { question: DailyQuestion; dateLabel: string }) {
  return (
    <View style={styles.card}>
      <View style={styles.topLine}>
        <View style={styles.category}><Ionicons name="sparkles-outline" size={14} color={colors.accent}/><PrikiText variant="caption" style={styles.categoryText}>{question.category}</PrikiText></View>
        <PrikiText variant="caption" style={styles.date}>{dateLabel}</PrikiText>
      </View>
      <PrikiText variant="overline" style={styles.eyebrow}>TODAY'S LITTLE MOMENT</PrikiText>
      <PrikiText variant="display" style={styles.question}>{question.text}</PrikiText>
      <View style={styles.bottomLine}><Ionicons name="heart-outline" size={15} color={colors.accent}/><PrikiText variant="caption">One question. Two perspectives. A little more understanding.</PrikiText></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.xl, borderRadius: radius.xl, backgroundColor: "#FBEAE8", borderWidth: 1, borderColor: colors.border, gap: spacing.lg, ...shadows.card },
  topLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: spacing.sm },
  category: { flexDirection: "row", alignItems: "center", gap: spacing.xs, backgroundColor: "#F7DDE1", borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  categoryText: { color: colors.accent, fontWeight: "600", fontSize: 11 },
  date: { fontSize: 11 },
  eyebrow: { color: colors.accent },
  question: { fontSize: 27, lineHeight: 36 },
  bottomLine: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
});
