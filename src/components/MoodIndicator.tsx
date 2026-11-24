import { StyleSheet, View, type ViewStyle } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { PrikiText } from "./PrikiText";

type MoodTone = "calm" | "happy" | "quiet" | "loved";
type Props = { label: string; tone?: MoodTone; style?: ViewStyle };

const tones: Record<MoodTone, { background: string; dot: string }> = {
  calm: { background: "#EDF2EB", dot: "#78947A" },
  happy: { background: "#F9EEDB", dot: "#C58C46" },
  quiet: { background: "#F0EAF2", dot: "#9C83A5" },
  loved: { background: "#F9E7EB", dot: colors.accent },
};

export function MoodIndicator({ label, tone = "calm", style }: Props) {
  const palette = tones[tone];
  return (
    <View style={[styles.pill, { backgroundColor: palette.background }, style]}>
      <View style={[styles.dot, { backgroundColor: palette.dot }]} />
      <PrikiText variant="caption" style={styles.label}>{label}</PrikiText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill, gap: spacing.xs },
  dot: { width: 6, height: 6, borderRadius: radius.pill },
  label: { color: colors.text, fontSize: 12, lineHeight: 16 },
});
