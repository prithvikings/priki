import { StyleSheet, View } from "react-native";
import { colors, spacing } from "@/theme";
import { PrikiText } from "./PrikiText";

type Props = { title: string; actionLabel?: string; onActionPress?: () => void };

export function SectionHeader({ title, actionLabel, onActionPress }: Props) {
  return (
    <View style={styles.row}>
      <PrikiText variant="h3">{title}</PrikiText>
      {actionLabel ? (
        <PrikiText accessibilityRole="link" onPress={onActionPress} style={styles.action}>{actionLabel}</PrikiText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md },
  action: { color: colors.accent, fontSize: 13, fontWeight: "600" },
});
