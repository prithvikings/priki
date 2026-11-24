import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  AppHeader,
  Avatar,
  PrikiText,
  PrimaryButton,
  ScreenContainer,
  SectionHeader,
  SurfaceCard,
} from "@/components";
import { homeMockData, type AffectionKind, type MoodTone } from "@/data/mockData";
import { useDailyUs } from "@/features/daily-us/DailyUsProvider";
import { useMemories } from "@/features/memories/MemoriesProvider";
import { MemoryArtwork } from "@/features/memories/components/MemoryArtwork";
import { colors, radius, shadows, spacing } from "@/theme";

const moodColors: Record<MoodTone, string> = {
  happy: "#E8B76F",
  calm: "#9AAE9B",
  tired: "#A99AB8",
  loved: colors.primary,
};

const affectionItems: { kind: AffectionKind; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { kind: "Hug", icon: "heart-circle-outline", label: "Hug" },
  { kind: "Kiss", icon: "heart-outline", label: "Kiss" },
  { kind: "Thinking of You", icon: "paper-plane-outline", label: "Thinking of you" },
];

function daysUntil(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const target = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86_400_000));
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ProfileMood({ profile }: { profile: (typeof homeMockData.couple.profiles)[number] }) {
  return (
    <View style={styles.profile}>
      <View style={[styles.avatarRing, { borderColor: moodColors[profile.mood.tone] }]}>
        <Avatar uri={profile.avatarUri} initials={profile.initials} size={76} accessibilityLabel={profile.name} />
      </View>
      <PrikiText variant="title" style={styles.profileName}>{profile.name}</PrikiText>
      <View style={[styles.moodPill, { backgroundColor: `${moodColors[profile.mood.tone]}24` }]}>
        <View style={[styles.moodDot, { backgroundColor: moodColors[profile.mood.tone] }]} />
        <PrikiText variant="caption" style={styles.moodLabel}>{profile.mood.label}</PrikiText>
      </View>
    </View>
  );
}

function ActionTile({
  icon,
  title,
  onPress,
  accent = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  accent?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.actionTile, accent && styles.actionTileAccent, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={25} color={colors.accent} />
      <PrikiText variant="caption" style={styles.actionLabel}>{title}</PrikiText>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { currentEntry } = useDailyUs();
  const { memories } = useMemories();
  const latestMemory = [...memories].sort((a, b) => b.memoryDate.localeCompare(a.memoryDate) || b.createdAt.localeCompare(a.createdAt))[0];
  const [sentAffections, setSentAffections] = useState<AffectionKind[]>([]);
  const [hugCount, setHugCount] = useState(0);
  const days = useMemo(() => daysUntil(homeMockData.meeting.date), []);

  const sendAffection = (kind: AffectionKind) => {
    setSentAffections((current) => [...current, kind]);
    if (kind === "Hug") setHugCount((count) => count + 1);
  };

  const navigateTo = (route: "/(tabs)/notes" | "/(tabs)/daily-us" | "/(tabs)/memories" | "/(tabs)/affection") => {
    router.navigate(route);
  };

  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader onProfilePress={() => Alert.alert("Your profile", "Profile and settings will be available in a future phase.")} />

      <View style={styles.greeting}>
        <PrikiText variant="display">A little closer,</PrikiText>
        <PrikiText variant="display" style={styles.greetingSecond}>even from miles away.</PrikiText>
        <PrikiText variant="caption" style={styles.greetingCaption}>A little closer, every day.</PrikiText>
      </View>

      <View style={styles.coupleRow}>
        {homeMockData.couple.profiles.map((profile) => <ProfileMood key={profile.id} profile={profile} />)}
        <View style={styles.coupleHeart}>
          <Ionicons name="heart" size={17} color={colors.accent} />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Until we meet, ${days} days remaining`}
        onPress={() => Alert.alert("Until We Meet", `Your next meeting is ${formatDate(homeMockData.meeting.date)}.`)}
        style={({ pressed }) => [styles.countdown, pressed && styles.pressed]}
      >
        <View style={styles.countdownCopy}>
          <View style={styles.countdownIcon}><Ionicons name="calendar-outline" size={23} color={colors.accent} /></View>
          <View style={styles.countdownText}>
            <PrikiText variant="caption" style={styles.countdownLabel}>{homeMockData.meeting.label}</PrikiText>
            <View style={styles.daysRow}>
              <PrikiText variant="h1" style={styles.daysValue}>{days} days</PrikiText>
              <Ionicons name="chevron-forward" size={20} color={colors.accent} />
            </View>
            <PrikiText variant="caption">{formatDate(homeMockData.meeting.date)}</PrikiText>
          </View>
        </View>
        <View style={styles.countdownDecoration}>
          <Ionicons name="moon-outline" size={21} color="#D58D9B" />
          <View style={styles.decorationLine} />
          <Ionicons name="sparkles-outline" size={17} color="#D58D9B" />
        </View>
      </Pressable>

      <SurfaceCard style={styles.questionCard}>
        <View style={styles.sectionEyebrow}>
          <Ionicons name="chatbubble-ellipses-outline" size={19} color={colors.accent} />
          <PrikiText variant="title" style={styles.eyebrowText}>Today&apos;s Daily Us</PrikiText>
        </View>
        <PrikiText variant="h3" style={styles.question}>{currentEntry.question.text}</PrikiText>
        <View style={styles.answerStatusRow}>
          <View style={styles.answerStatus}>
            <Ionicons name={currentEntry.currentUserSubmitted ? "checkmark-circle" : "ellipse-outline"} size={17} color={currentEntry.currentUserSubmitted ? colors.success : colors.textSecondary} />
            <PrikiText variant="caption">{currentEntry.currentUserSubmitted ? "You answered" : "You have not answered"}</PrikiText>
          </View>
          <View style={styles.answerStatus}>
            <Ionicons name="time-outline" size={17} color={colors.textSecondary} />
            <PrikiText variant="caption">{currentEntry.partnerSubmitted ? "They answered" : "Waiting for them"}</PrikiText>
          </View>
        </View>
        <PrimaryButton title="Open today's question" onPress={() => navigateTo("/(tabs)/daily-us")} style={styles.questionButton} />
      </SurfaceCard>

      <View style={styles.quickSection}>
        <SectionHeader title="Little things, right now" />
        <View style={styles.quickGrid}>
          <ActionTile icon="mail-outline" title="Love Notes" onPress={() => navigateTo("/(tabs)/notes")} />
          <ActionTile icon="heart-outline" title={hugCount > 0 ? `Send a Hug · ${hugCount}` : "Send a Hug"} onPress={() => sendAffection("Hug")} accent />
          <ActionTile icon="gift-outline" title={`Our Jar · ${homeMockData.loveJar.reasonCount}`} onPress={() => navigateTo("/(tabs)/affection")} />
        </View>
        {hugCount > 0 ? <PrikiText variant="caption" style={styles.inlineFeedback}>A little hug added to your local activity.</PrikiText> : null}
      </View>

      <SurfaceCard style={styles.memoryCard} padded={false}>
        <View style={styles.memoryHeader}>
          <SectionHeader title="Recent Memory" actionLabel="View all" onActionPress={() => navigateTo("/(tabs)/memories")} />
        </View>
        <Pressable onPress={() => latestMemory ? router.push({ pathname: "/(tabs)/memories/[id]", params: { id: latestMemory.id } }) : navigateTo("/(tabs)/memories")} style={({ pressed }) => [styles.memoryContent, pressed && styles.pressed]}>
          <MemoryArtwork imageRef={latestMemory?.imageRef ?? null} style={styles.memoryImage} />
          <View style={styles.memoryCopy}>
            <PrikiText variant="title">{latestMemory?.title ?? "Your first memory"}</PrikiText>
            <PrikiText variant="caption" style={styles.memoryCaption}>{latestMemory?.description || "A little moment, waiting to be remembered."}</PrikiText>
            <PrikiText variant="caption" style={styles.memoryDate}>{latestMemory ? formatDate(latestMemory.memoryDate) : "Add a memory together"}</PrikiText>
          </View>
        </Pressable>
      </SurfaceCard>

      <View style={styles.affectionSection}>
        <SectionHeader title="A little affection" />
        <View style={styles.affectionRow}>
          {affectionItems.map((item) => {
            const selected = sentAffections[sentAffections.length - 1] === item.kind;
            return (
              <Pressable
                key={item.kind}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => sendAffection(item.kind)}
                style={({ pressed }) => [styles.affectionButton, selected && styles.affectionSelected, pressed && styles.pressed]}
              >
                <Ionicons name={item.icon} size={22} color={selected ? colors.accent : colors.textSecondary} />
                <PrikiText variant="caption" style={[styles.affectionLabel, selected && styles.affectionLabelSelected]}>{item.label}</PrikiText>
              </Pressable>
            );
          })}
        </View>
        {sentAffections.length > 0 ? (
          <PrikiText variant="caption" style={styles.inlineFeedback}>
            {sentAffections[sentAffections.length - 1] === "Thinking of You"
              ? "Thinking of you — saved as a local preview."
              : `Your ${sentAffections[sentAffections.length - 1].toLowerCase()} is shown as a local preview.`}
          </PrikiText>
        ) : null}
      </View>
      <PrikiText variant="caption" style={styles.footer}>MADE FOR TWO, ALWAYS.</PrikiText>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.md, paddingBottom: 132, gap: spacing.xl },
  greeting: { gap: 0, marginTop: spacing.xs },
  greetingSecond: { color: colors.accent, fontSize: 29 },
  greetingCaption: { marginTop: spacing.sm, fontSize: 14 },
  coupleRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing["5xl"], position: "relative", paddingVertical: spacing.sm },
  profile: { alignItems: "center", minWidth: 112, gap: spacing.xs },
  avatarRing: { padding: 4, borderWidth: 2, borderRadius: radius.pill, backgroundColor: colors.surface },
  profileName: { marginTop: spacing.xxs },
  moodPill: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 4 },
  moodDot: { width: 6, height: 6, borderRadius: radius.pill },
  moodLabel: { color: colors.text, fontSize: 11, lineHeight: 15 },
  coupleHeart: { position: "absolute", top: 4, left: "50%", marginLeft: -9, backgroundColor: colors.background, padding: 2 },
  countdown: { minHeight: 132, borderRadius: radius.xl, padding: spacing.xl, backgroundColor: "#FBEAE8", borderWidth: 1, borderColor: colors.border, flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", ...shadows.card },
  countdownCopy: { flexDirection: "row", alignItems: "center", gap: spacing.md, flex: 1 },
  countdownIcon: { width: 46, height: 46, borderRadius: radius.pill, backgroundColor: "#F8DAD9", alignItems: "center", justifyContent: "center" },
  countdownText: { gap: spacing.xxs, flexShrink: 1 },
  countdownLabel: { color: colors.textSecondary },
  daysRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  daysValue: { fontSize: 28, lineHeight: 34 },
  countdownDecoration: { alignItems: "center", justifyContent: "center", width: 55, height: 70, borderRadius: radius.lg, backgroundColor: "#F7DFDF", transform: [{ rotate: "8deg" }], gap: spacing.xs },
  decorationLine: { width: 28, height: 1, backgroundColor: "#E6B9BE" },
  questionCard: { gap: spacing.md },
  sectionEyebrow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  eyebrowText: { color: colors.accent },
  question: { fontSize: 17, lineHeight: 25 },
  answerStatusRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  answerStatus: { flexDirection: "row", alignItems: "center", gap: 6 },
  questionButton: { marginTop: spacing.xs },
  quickSection: { gap: spacing.sm },
  quickGrid: { flexDirection: "row", gap: spacing.sm },
  actionTile: { flex: 1, minHeight: 100, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xs, gap: spacing.sm, ...shadows.card },
  actionTileAccent: { backgroundColor: "#FCEDEF" },
  actionLabel: { color: colors.text, textAlign: "center", fontSize: 11, lineHeight: 16 },
  memoryCard: { overflow: "hidden" },
  memoryHeader: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  memoryContent: { flexDirection: "row", paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md, alignItems: "center" },
  memoryImage: { width: 116, height: 116, borderRadius: radius.md, backgroundColor: colors.surfaceMuted },
  memoryCopy: { flex: 1, gap: spacing.xs },
  memoryCaption: { fontSize: 12, lineHeight: 17 },
  affectionSection: { gap: spacing.sm },
  affectionRow: { flexDirection: "row", gap: spacing.sm },
  affectionButton: { flex: 1, minHeight: 68, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, paddingHorizontal: 4 },
  affectionSelected: { backgroundColor: "#FBE8EB", borderColor: colors.primary },
  affectionLabel: { color: colors.textSecondary, fontSize: 10, lineHeight: 14 },
  affectionLabelSelected: { color: colors.accent, fontWeight: "600" },
  inlineFeedback: { color: colors.accent, marginTop: spacing.xs },
  footer: { textAlign: "center", letterSpacing: 1.1, fontSize: 10, marginTop: spacing.xs },
  memoryDate: { color: colors.accent, fontWeight: "600" },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
