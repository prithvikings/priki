import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

export type TabIconName = "home-outline" | "document-text-outline" | "heart-outline" | "images-outline" | "gift-outline";

type Props = { name: TabIconName; focused: boolean };

export function TabIcon({ name, focused }: Props) {
  return (
    <View style={[styles.iconWrap, focused && styles.active]}>
      <Ionicons name={name} size={20} color={focused ? colors.accent : colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: { width: 38, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  active: { backgroundColor: colors.surfaceMuted },
});
