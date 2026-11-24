import { Pressable, StyleSheet, View } from "react-native";
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
import { homeMockData, type MoodTone } from "@/data/mockData";
import { useDatesProfile } from "@/features/dates-profile/DatesProfileProvider";
import { formatDateKey, getMeetingCountdown } from "@/features/dates-profile/dateUtils";
import { useDailyUs } from "@/features/daily-us/DailyUsProvider";
import { useMemories } from "@/features/memories/MemoriesProvider";
import { useAffection } from "@/features/affection/AffectionProvider";
import { MemoryArtwork } from "@/features/memories/components/MemoryArtwork";
import { colors, radius, shadows, spacing } from "@/theme";

const moodColors: Record<MoodTone, string> = {
  happy: "#E8B76F",
  calm: "#9AAE9B",
  tired: "#A99AB8",
  loved: colors.primary,
};

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
  const { reasons } = useAffection();
  const { profile, meeting, settings, dates } = useDatesProfile();
  const latestMemory = [...memories].sort((a, b) => b.memoryDate.localeCompare(a.memoryDate) || b.createdAt.localeCompare(a.createdAt))[0];
  const countdown = meeting ? getMeetingCountdown(meeting.date, new Date(), settings.timezone) : null;
  const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: settings.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const nextDate = dates.filter((item) => item.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date))[0];



  const navigateTo = (route: "/(tabs)/notes" | "/(tabs)/daily-us" | "/(tabs)/memories" | "/(tabs)/affection") => {
    router.navigate(route);
  };

  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader onProfilePress={() => router.push("/(tabs)/profile")} />

      <View style={styles.greeting}>
        <PrikiText variant="display">A little closer,</PrikiText>
        <PrikiText variant="display" style={styles.greetingSecond}>even from miles away.</PrikiText>
        <PrikiText variant="caption" style={styles.greetingCaption}>A little closer, every day.</PrikiText>
      </View>

      <View style={styles.coupleRow}>
        {homeMockData.couple.profiles.map((mockProfile) => <ProfileMood key={mockProfile.id} profile={{ ...mockProfile, name: profile.partners.find((partner) => partner.id === mockProfile.id)?.name ?? mockProfile.name }} />)}
        <View style={styles.coupleHeart}>
          <Ionicons name="heart" size={17} color={colors.accent} />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/(tabs)/dates")}
        style={({ pressed }) => [styles.countdown, pressed && styles.pressed]}
      >
        <View style={styles.countdownCopy}>
          <View style={styles.countdownIcon}><Ionicons name="calendar-outline" size={23} color={colors.accent} /></View>
          <View style={styles.countdownText}>
            <PrikiText variant="caption" style={styles.countdownLabel}>{meeting?.title ?? "Our next hello"}</PrikiText>
            <View style={styles.daysRow}>
              <PrikiText variant="h1" style={styles.daysValue}>{meeting ? countdown?.state === "past" ? "Time to plan" : countdown?.state === "today" ? "Today" : String(countdown?.days) + " days" : "Not planned yet"}</PrikiText>
              <Ionicons name="chevron-forward" size={20} color={colors.accent} />
            </View>
            <PrikiText variant="caption">{meeting ? formatDateKey(meeting.date, settings.dateFormat) : "Tap to plan your next meeting"}</PrikiText>
            {meeting?.location ? <PrikiText variant="caption">{meeting.location}</PrikiText> : null}
          </View>
        </View>
        <View style={styles.countdownDecoration}>
          <Ionicons name="moon-outline" size={21} color="#D58D9B" />
          <View style={styles.decorationLine} />
          <Ionicons name="sparkles-outline" size={17} color="#D58D9B" />
        </View>
      </Pressable>
      {nextDate ? <Pressable onPress={() => router.push("/(tabs)/dates")} style={styles.nextDatePreview}><Ionicons name="heart-outline" size={16} color={colors.accent}/><PrikiText variant="caption" style={styles.nextDateText}>Coming up · {nextDate.title} · {formatDateKey(nextDate.date, settings.dateFormat)}</PrikiText></Pressable> : null}

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
          <ActionTile icon="heart-outline" title="Little Affections" onPress={() => navigateTo("/(tabs)/affection")} accent />
          <ActionTile icon="gift-outline" title={`Reasons · ${reasons.length}`} onPress={() => router.push("/(tabs)/affection/jar")} />
        </View>
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
  footer: { textAlign: "center", letterSpacing: 1.1, fontSize: 10, marginTop: spacing.xs },
  memoryDate: { color: colors.accent, fontWeight: "600" },
  nextDatePreview: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.sm },
  nextDateText: { color: colors.accent, fontWeight: "600" },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});
