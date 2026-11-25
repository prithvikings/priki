import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/theme";
import { Avatar } from "./Avatar";
import { useRouter } from "expo-router";
import { PrikiText } from "./PrikiText";

type Props = { title?: string; eyebrow?: string; onProfilePress?: () => void };

export function AppHeader({ title, eyebrow = "A LITTLE CLOSER, EVERY DAY.", onProfilePress }: Props) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      {eyebrow || title ? <View style={styles.copy}>
        {eyebrow ? <PrikiText variant="overline" style={styles.eyebrow}>{eyebrow}</PrikiText> : null}
        {title ? <PrikiText variant="h2" style={styles.title}>{title}</PrikiText> : null}
      </View> : null}
      <View style={styles.actions}>
        <View accessibilityLabel="Notifications" style={styles.notification}>
          <Ionicons name="notifications-outline" size={23} color={colors.text} />
          <View style={styles.notificationDot} />
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Open profile and settings" onPress={onProfilePress ?? (() => router.push("/(tabs)/profile"))} hitSlop={8}>
          <Avatar initials="A" size={42} accessibilityLabel="Your profile" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  copy: { gap: spacing.xs },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  notification: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
  notificationDot: { position: "absolute", top: 4, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.background },
  eyebrow: { color: colors.accent },
  title: {},
});
