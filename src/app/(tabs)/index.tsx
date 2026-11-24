import { StyleSheet, View } from "react-native";
import { AppHeader, PrikiText, ScreenContainer, SurfaceCard } from "@/components";
import { colors, spacing } from "@/theme";
import { tabPlaceholders } from "@/data/mockData";

export default function HomeScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader />
      <View style={styles.intro}>
        <PrikiText variant="display">A little closer,{"\n"}every day.</PrikiText>
        <PrikiText variant="body" style={styles.subtitle}>{tabPlaceholders.home.subtitle}</PrikiText>
      </View>
      <SurfaceCard style={styles.placeholderCard}>
        <View style={styles.mark}><View style={styles.markCore} /></View>
        <PrikiText variant="h3" style={styles.cardTitle}>Your shared space</PrikiText>
        <PrikiText variant="caption" style={styles.cardCopy}>A calm place for the little things that make the distance feel smaller.</PrikiText>
      </SurfaceCard>
      <PrikiText variant="caption" style={styles.footer}>MADE FOR TWO, ALWAYS.</PrikiText>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.xl },
  intro: { marginTop: spacing["2xl"], marginBottom: spacing["3xl"], gap: spacing.md },
  subtitle: { color: colors.textSecondary, maxWidth: 270 },
  placeholderCard: { alignItems: "center", paddingVertical: spacing["4xl"], paddingHorizontal: spacing["2xl"] },
  mark: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.surfaceMuted, alignItems: "center", justifyContent: "center", marginBottom: spacing.xl },
  markCore: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, opacity: 0.8 },
  cardTitle: { marginBottom: spacing.xs },
  cardCopy: { textAlign: "center", maxWidth: 240 },
  footer: { textAlign: "center", marginTop: spacing["4xl"], letterSpacing: 1.2, fontSize: 10 },
});
