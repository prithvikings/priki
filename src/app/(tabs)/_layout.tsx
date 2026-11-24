import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarLabelStyle: styles.label,
      tabBarItemStyle: styles.item,
      tabBarStyle: [styles.bar, { height: 76 + insets.bottom, paddingBottom: Math.max(insets.bottom, spacing.sm) }],
      tabBarBackground: () => <View style={styles.background} />,
      sceneStyle: { backgroundColor: colors.background },
    }}>
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
      <Tabs.Screen name="dates" options={{ tabBarButton: () => null, tabBarItemStyle: styles.hiddenItem }} />
      <Tabs.Screen name="milestones" options={{ tabBarButton: () => null, tabBarItemStyle: styles.hiddenItem }} />
      <Tabs.Screen name="milestone" options={{ tabBarButton: () => null, tabBarItemStyle: styles.hiddenItem }} />
      <Tabs.Screen name="profile" options={{ tabBarButton: () => null, tabBarItemStyle: styles.hiddenItem }} />
      <Tabs.Screen name="settings" options={{ tabBarButton: () => null, tabBarItemStyle: styles.hiddenItem }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 76,
    marginHorizontal: spacing.lg,
    marginBottom: 0,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderTopWidth: 0,
    borderRadius: radius.xl,
    backgroundColor: colors.tabBar,
    elevation: 0,
    shadowColor: colors.text,
    shadowOpacity: 0.09,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
  },
  background: { ...StyleSheet.absoluteFill, borderRadius: radius.xl, backgroundColor: colors.tabBar, borderWidth: 1, borderColor: colors.border },
  label: { ...typography.tab, marginTop: 1, marginBottom: 1 },
  item: { paddingTop: 0, flex: 1, minWidth: 0 },
  hiddenItem: { display: "none" },
});
