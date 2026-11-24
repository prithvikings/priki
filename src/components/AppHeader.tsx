import { Pressable, StyleSheet, View } from "react-native";
import { colors, spacing } from "@/theme";
import { Avatar } from "./Avatar";
import { PrikiText } from "./PrikiText";

type Props = { title?: string; eyebrow?: string; onProfilePress?: () => void };

export function AppHeader({ title = "priki", eyebrow = "A LITTLE CLOSER, EVERY DAY.", onProfilePress }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <PrikiText variant="overline" style={styles.eyebrow}>{eyebrow}</PrikiText>
        <PrikiText variant="h2" style={styles.title}>{title}</PrikiText>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Open profile and settings" onPress={onProfilePress} hitSlop={8}>
        <Avatar initials="A" size={44} accessibilityLabel="Your profile" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing["2xl"] },
  copy: { gap: spacing.xs },
  eyebrow: { color: colors.accent },
  title: { textTransform: "lowercase" },
});
