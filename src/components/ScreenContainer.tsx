import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, layout, spacing } from "@/theme";

type Props = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: ViewStyle;
  padded?: boolean;
}>;

export function ScreenContainer({ children, scroll = true, contentStyle, padded = true }: Props) {
  const content = <View style={[styles.content, padded && styles.padded, contentStyle]}>{children}</View>;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      ) : (
        <View style={styles.fill}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: "center" },
  fill: { flex: 1, alignItems: "center" },
  content: { width: "100%", maxWidth: layout.contentMaxWidth, flex: 1 },
  padded: { paddingHorizontal: layout.screenHorizontal, paddingTop: spacing.lg, paddingBottom: spacing["4xl"] },
});
