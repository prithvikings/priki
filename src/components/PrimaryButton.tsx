import { ActivityIndicator, Pressable, StyleSheet, type ViewStyle } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { PrikiText } from "./PrikiText";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({ title, onPress, disabled = false, loading = false, style }: Props) {
  const unavailable = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: unavailable, busy: loading }}
      disabled={unavailable}
      onPress={onPress}
      style={({ pressed }) => [styles.button, unavailable && styles.disabled, pressed && !unavailable && styles.pressed, style]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <PrikiText variant="button" style={styles.label}>{title}</PrikiText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 52, borderRadius: radius.lg, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl },
  label: { color: colors.white },
  disabled: { opacity: 0.52 },
  pressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.99 }] },
});
