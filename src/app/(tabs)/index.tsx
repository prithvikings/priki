import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  AppHeader,
  Avatar,
  MoodIndicator,
  PrikiText,
  PrimaryButton,
  ScreenContainer,
  SectionHeader,
  SurfaceCard,
} from "@/components";
import { homeMockData, type AffectionKind, type MoodTone } from "@/data/mockData";
import { colors, radius, shadows, spacing } from "@/theme";

const sunsetImage = require("@/../assets/images/splash-icon.png");

const tabRoutes = {
  notes: "/(tabs)/notes",
  daily: "/(tabs)/daily-us",
  memories: "/(tabs)/memories",
  affection: "/(tabs)/affection",
} as const;

function daysUntil(dateString: string) {
  const now = new Date();
  const target = new Date(`${dateString}T12:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const meetingDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.max(0, Math.ceil((meetingDay.getTime() - today.getTime()) / 86_400_000));
}

function formatDate(dateString: string) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MoodRing({ tone, children }: { tone: MoodTone; children: React.ReactNode }) {
  const ringColor = tone === "happy" ? "#E9B56D" : tone === "loved" ? colors.primary : "#A9B99E";
  return (
    <View style={[styles.moodRing, { borderColor: ringColor }]}>
      {children}
    </View>
  );
}

function ProfileMood({
  profile,
}: {
  profile: (typeof homeMockData.couple.profiles)[number];
}) {
  return (
    <View style={styles.profileItem}>
      <MoodRing tone={profile.mood.tone}>
        <Avatar
          uri={profile.avatarUri}
          initials={profile.initials}
          size={76}
          accessibilityLabel={`${profile.name}'s profile photo`}
        />
      </MoodRing>
      <PrikiText variant="title" style={styles.profileName}>{profile.name}</PrikiText>
      <MoodIndicator label={profile.mood.label} tone={profile.mood.tone} />
      <PrikiText variant="caption" style={styles.moodNote} numberOfLines={2}>
        {profile.mood.note}
      </PrikiText>
    </View>
  );
}

function MiniAction({
  icon,
  label,
  onPress,
  selected = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.quickAction, selected && styles.quickActionSelected, pressed && styles.pressed]}
    >
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={22} color={colors.accent} />
      </View>
      <PrikiText variant="caption" style={styles.quickLabel}>{label}</PrikiText>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [lastAffection, setLastAffection] = useState<AffectionKind | null>(null);
  const [hugCount, setHugCount] = useState(0);
  const countdown = useMemo(() => daysUntil(homeMockData.meeting.date), []);

  const sendAffection = (kind: AffectionKind) => {
    setLastAffection(kind);
    if (kind === "Hug") setHugCount((count) => count + 1);
  };

  const contentWidth = Math.min(width - spacing.lg * 2, 560);

  return (
    <ScreenContainer contentStyle={styles.screenContent}>
      <AppHeader
        title="Priki ♡"
        eyebrow="A LITTLE CLOSER, EVERY DAY."
        onProfilePress={() => Alert.alert("Your space", "Profile and settings will be available in a later update.")}
      />

      <View style={styles.greeting}>
        <View style={styles.greetingText}>
          <PrikiText variant="display" style={styles.greetingTitle}>Hey there.</PrikiText>
          <PrikiText variant="body" style={styles.greetingSubtitle}>
            A little closer, even from miles away.
          </PrikiText>
        </View>
        <View style={styles.heartMark}>
          <Ionicons name="heart-outline" size={28} color={colors.primary} />
        </View>
      </View>

      <SurfaceCard style={styles.coupleCard}>
        <ProfileMood profile={homeMockData.couple.profiles[0]} />
        <View style={styles.betweenProfiles}>
          <Ionicons name="heart" size={17} color={colors.primary} />
          <View style={styles.connectionLine} />
        </View>
        <ProfileMood profile={homeMockData.couple.profiles[1]} />
      </SurfaceCard>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${countdown} days until we meet, ${formatDate(homeMockData.meeting.date)}`}
        onPress={() => Alert.alert(homeMockData.meeting.label, `Your next hello is on ${formatDate(homeMockData.meeting.date)}.`)}
        style={({ pressed }) => [styles.countdownCard, { width: contentWidth }, pressed && styles.pressed]}
      >
        <View style={styles.countdownCopy}>
          <View style={styles.countdownLabelRow}>
            <View style={styles.countdownIcon}>
              <Ionicons name="calendar-outline" size={21} color={colors.accent} />
            </View>
            <PrikiText variant="caption" style={styles.countdownLabel}>{homeMockData.meeting.label}</PrikiText>
          </View>
          <View style={styles.countdownNumberRow}>
            <PrikiText variant="h1" style={styles.countdownNumber}>{countdown}</PrikiText>
            <PrikiText variant="title" style={styles.daysLabel}>days</PrikiText>
            <Ionicons name="chevron-forward" size={19} color={colors.accent} />
          </View>
          <PrikiText variant="caption" style={styles.meetingDate}>
            {formatDate(homeMockData.meeting.date)} · {homeMockData.meeting.caption}
          </PrikiText>
        </View>
        <View style={styles.countdownArt}>
          <Image source={sunsetImage} style={styles.sunsetPhoto} resizeMode="cover" />
          <View style={styles.sunsetTint} />
        </View>
      </Pressable>

      <SurfaceCard style={styles.questionCard}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.questionTitleGroup}>
            <View style={styles.smallIconBadge}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.accent} />
            </View>
            <PrikiText variant="h3">Today’s Daily Us</PrikiText>
          </View>
          <PrikiText variant="caption" style={styles.statusCaption}>Today</PrikiText>
        </View>
        <PrikiText variant="body" style={styles.questionPrompt}>
          {homeMockData.dailyQuestion.prompt}
        </PrikiText>
        <View style={styles.answerStatusRow}>
          <View style={styles.answerStatus}>
            <Ionicons
              name={homeMockData.dailyQuestion.currentUserAnswered ? "checkmark-circle" : "ellipse-outline"}
              size={17}
              color={homeMockData.dailyQuestion.currentUserAnswered ? colors.success : colors.textTertiary}
            />
            <PrikiText variant="caption">You {homeMockData.dailyQuestion.currentUserAnswered ? "answered" : "haven’t answered"}</PrikiText>
          </View>
          <View style={styles.answerStatus}>
            <Ionicons
              name={homeMockData.dailyQuestion.partnerAnswered ? "checkmark-circle" : "time-outline"}
              size={17}
              color={homeMockData.dailyQuestion.partnerAnswered ? colors.success : colors.primary}
            />
            <PrikiText variant="caption">Them {homeMockData.dailyQuestion.partnerAnswered ? "answered" : "still thinking"}</PrikiText>
          </View>
        </View>
        <PrimaryButton
          title={homeMockData.dailyQuestion.currentUserAnswered ? "View today’s question" : "Answer Now"}
          onPress={() => router.push(tabRoutes.daily)}
          style={styles.answerButton}
        />
      </SurfaceCard>

      <View style={styles.quickLinks}>
        <MiniAction icon="mail-open-outline" label="Love Notes" onPress={() => router.push(tabRoutes.notes)} />
        <MiniAction icon="heart-outline" label="Send a Hug" onPress={() => sendAffection("Hug")} selected={lastAffection === "Hug"} />
        <MiniAction icon="reader-outline" label="Our Jar" onPress={() => router.push(tabRoutes.affection)} />
      </View>

      {lastAffection ? (
        <View style={styles.feedback} accessibilityLiveRegion="polite">
          <Ionicons name="heart" size={15} color={colors.accent} />
          <PrikiText variant="caption" style={styles.feedbackText}>
            {lastAffection === "Hug" ? `A little hug is ready to send · ${hugCount} this session` : `You chose: ${lastAffection}`}
          </PrikiText>
        </View>
      ) : null}

      <SurfaceCard style={styles.memoryCard}>
        <SectionHeader
          title="Recent Memory"
          actionLabel="View All  ›"
          onActionPress={() => router.push(tabRoutes.memories)}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(tabRoutes.memories)}
          style={({ pressed }) => [styles.memoryContent, pressed && styles.pressed]}
        >
          <View style={styles.memoryImageWrap}>
            {homeMockData.recentMemory.imageUri ? (
              <Image source={{ uri: homeMockData.recentMemory.imageUri }} style={styles.memoryImage} resizeMode="cover" />
            ) : (
              <Image source={sunsetImage} style={styles.memoryImage} resizeMode="cover" />
            )}
          </View>
          <View style={styles.memoryCopy}>
            <PrikiText variant="title" numberOfLines={2}>{homeMockData.recentMemory.title}</PrikiText>
            <PrikiText variant="caption" style={styles.memoryDate}>{formatDate(homeMockData.recentMemory.date)}</PrikiText>
            <PrikiText variant="caption" numberOfLines={2}>{homeMockData.recentMemory.caption}</PrikiText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>
      </SurfaceCard>

      <View style={styles.affectionSection}>
        <SectionHeader title="A little affection" />
        <View style={styles.affectionActions}>
          <MiniAction icon="hand-left-outline" label="Hug" onPress={() => sendAffection("Hug")} selected={lastAffection === "Hug"} />
          <MiniAction icon="heart-outline" label="Kiss" onPress={() => sendAffection("Kiss")} selected={lastAffection === "Kiss"} />
          <MiniAction icon="paper-plane-outline" label="Thinking of You" onPress={() => sendAffection("Thinking of You")} selected={lastAffection === "Thinking of You"} />
        </View>
        {lastAffection ? (
          <PrikiText variant="caption" style={styles.affectionFeedback}>
            {lastAffection === "Thinking of You" ? "A little thought, held close." : `Your ${lastAffection.toLowerCase()} is noted for this session.`}
          </PrikiText>
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: spacing.lg,
    paddingBottom: 128,
    gap: spacing.xl,
  },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  greetingText: { flex: 1, gap: spacing.xs },
  greetingTitle: { fontSize: 32, lineHeight: 40 },
  greetingSubtitle: { color: colors.textSecondary, maxWidth: 280 },
  heartMark: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  coupleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  profileItem: { flex: 1, alignItems: "center", gap: spacing.xs },
  moodRing: {
    borderWidth: 3,
    borderRadius: radius.pill,
    padding: 3,
    backgroundColor: colors.surface,
  },
  profileName: { marginTop: spacing.xs },
  moodNote: { textAlign: "center", maxWidth: 125, minHeight: 34 },
  betweenProfiles: { width: 28, alignItems: "center", justifyContent: "center", gap: 3 },
  connectionLine: { height: 1, width: 24, backgroundColor: colors.borderStrong },
  countdownCard: {
    alignSelf: "center",
    minHeight: 150,
    borderRadius: radius.xl,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "#F7E2E2",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  countdownCopy: { padding: spacing.xl, zIndex: 2, maxWidth: "88%", gap: spacing.xs },
  countdownLabelRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  countdownIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,252,250,0.82)",
    alignItems: "center",
    justifyContent: "center",
  },
  countdownLabel: { color: colors.textSecondary },
  countdownNumberRow: { flexDirection: "row", alignItems: "baseline", gap: spacing.sm },
  countdownNumber: { color: colors.text, fontSize: 40, lineHeight: 46 },
  daysLabel: { color: colors.textSecondary },
  meetingDate: { maxWidth: 235 },
  countdownArt: { ...StyleSheet.absoluteFillObject, left: "52%", opacity: 0.78 },
  sunsetPhoto: { width: "100%", height: "100%" },
  sunsetTint: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255,238,232,0.22)" },
  questionCard: { gap: spacing.md },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  questionTitleGroup: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  smallIconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  statusCaption: { color: colors.accent },
  questionPrompt: { fontSize: 17, lineHeight: 25, fontWeight: "500" },
  answerStatusRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg },
  answerStatus: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  answerButton: { marginTop: spacing.xs },
  quickLinks: { flexDirection: "row", gap: spacing.sm },
  quickAction: {
    flex: 1,
    minWidth: 0,
    minHeight: 94,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  quickActionSelected: { backgroundColor: colors.surfaceMuted, borderColor: colors.primary },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted,
  },
  quickLabel: { color: colors.text, fontSize: 11, lineHeight: 15, textAlign: "center" },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
  feedbackText: { color: colors.accent },
  memoryCard: { gap: spacing.md },
  memoryContent: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  memoryImageWrap: {
    width: 104,
    height: 104,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surfaceMuted,
  },
  memoryImage: { width: "100%", height: "100%" },
  memoryCopy: { flex: 1, gap: spacing.xs },
  memoryDate: { color: colors.accent },
  affectionSection: { gap: spacing.sm },
  affectionActions: { flexDirection: "row", gap: spacing.sm },
  affectionFeedback: { textAlign: "center", color: colors.accent },
});
