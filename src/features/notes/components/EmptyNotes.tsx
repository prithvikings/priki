import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PrikiText } from "@/components/PrikiText";
import { colors, spacing } from "@/theme";

export function EmptyNotes({ title, description, onCompose }: { title: string; description: string; onCompose?: () => void }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}><Ionicons name="mail-open-outline" size={29} color={colors.accent} /></View>
      <PrikiText variant="h3">{title}</PrikiText>
      <PrikiText variant="caption" style={styles.description}>{description}</PrikiText>
      {onCompose ? <PrimaryButton title="Write a note" onPress={onCompose} style={styles.button} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", padding: spacing["3xl"], gap: spacing.md },
  icon: { width: 66, height: 66, borderRadius: 33, backgroundColor: colors.surfaceMuted, alignItems: "center", justifyContent: "center" },
  description: { textAlign: "center", maxWidth: 250 },
  button: { alignSelf: "stretch", marginTop: spacing.sm },
});
