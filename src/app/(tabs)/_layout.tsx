import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { TabIcon, type TabIconName } from "@/components/TabIcon";
import { colors, radius, spacing, typography } from "@/theme";

const tabs: { name: string; title: string; icon: TabIconName }[] = [
  { name: "index", title: "Home", icon: "home-outline" },
  { name: "notes", title: "Notes", icon: "document-text-outline" },
  { name: "daily-us", title: "Daily Us", icon: "heart-outline" },
  { name: "memories", title: "Memories", icon: "images-outline" },
  { name: "affection", title: "Affection", icon: "gift-outline" },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarStyle: styles.bar,
        tabBarBackground: () => <View style={styles.background} />,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => <TabIcon name={tab.icon} focused={focused} />,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: Platform.OS === "ios" ? spacing.sm : spacing.md,
    height: 72,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === "ios" ? spacing.xs : spacing.sm,
    borderTopWidth: 0,
    borderRadius: radius.xl,
    backgroundColor: colors.tabBar,
    elevation: 0,
    shadowColor: colors.text,
    shadowOpacity: 0.09,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
  },
  background: { ...StyleSheet.absoluteFillObject, borderRadius: radius.xl, backgroundColor: colors.tabBar, borderWidth: 1, borderColor: colors.border },
  label: { ...typography.tab, marginTop: 1, marginBottom: 1 },
  item: { paddingTop: 0 },
});
