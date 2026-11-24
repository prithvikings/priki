import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { PrikiText } from "./PrikiText";

type Props = { title: string; onPress?: () => void; disabled?: boolean; style?: ViewStyle };

export function SecondaryButton({ title, onPress, disabled = false, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled && styles.pressed, style]}
    >
      <PrikiText variant="button" style={styles.label}>{title}</PrikiText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 50, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl },
  label: { color: colors.accent },
  disabled: { opacity: 0.52 },
  pressed: { backgroundColor: colors.surfaceMuted },
});
