import type { PropsWithChildren } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { colors, radius, spacing, shadows } from "@/theme";

type Props = PropsWithChildren<{ style?: ViewStyle; padded?: boolean }>;

export function SurfaceCard({ children, style, padded = true }: Props) {
  return <View style={[styles.card, padded && styles.padded, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.xl, ...shadows.card },
  padded: { padding: spacing.xl },
});
