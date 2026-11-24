import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { mockCouple } from "@/data/mockData";
import { useDatesProfile } from "@/features/dates-profile/DatesProfileProvider";
import { DEMO_COUPLE_ID, getCoupleDateKey, getDailyQuestion } from "./dailyQuestion";
import { createMockHistory } from "./mockHistory";
import type { DailyAnswer, DailyEntryView, DailyHistoryItem, DailyQuestionEntry, DailyReaction } from "./types";

type DailyUsContextValue = {
  now: Date;
  currentEntry: DailyEntryView;
  history: DailyHistoryItem[];
  getHistoricalEntry: (dateKey: string) => DailyEntryView | null;
  submitAnswer: (text: string) => void;
  skipToday: () => void;
  revisitToday: () => void;
  togglePartnerAnswerReaction: () => void;
  simulatePartnerSubmission: () => void;
};

function createEntry(dateKey: string): DailyQuestionEntry {
  return {
    dateKey,
    question: getDailyQuestion(dateKey, DEMO_COUPLE_ID),
    currentUserAnswer: null,
    partnerAnswer: null,
    reactions: [],
    skipped: false,
  };
}

function toView(entry: DailyQuestionEntry): DailyEntryView {
  const bothSubmitted = Boolean(entry.currentUserAnswer && entry.partnerAnswer);
  return {
    dateKey: entry.dateKey,
    question: entry.question,
    currentUserAnswer: entry.currentUserAnswer?.text ?? null,
    partnerAnswer: bothSubmitted ? entry.partnerAnswer?.text ?? null : null,
    currentUserSubmitted: Boolean(entry.currentUserAnswer),
    partnerSubmitted: Boolean(entry.partnerAnswer),
    bothSubmitted,
    submissionStatus: {
      currentUser: entry.currentUserAnswer ? "submitted" : "waiting",
      partner: entry.partnerAnswer ? "submitted" : "waiting",
      bothSubmitted,
    },
    currentUserReactedToPartner: bothSubmitted && entry.reactions.some((reaction) => reaction.fromPartnerId === "you" && reaction.toPartnerId === "partner" && reaction.kind === "heart"),
    partnerReactedToCurrentUser: bothSubmitted && entry.reactions.some((reaction) => reaction.fromPartnerId === "partner" && reaction.toPartnerId === "you" && reaction.kind === "heart"),
    skipped: entry.skipped,
  };
}

export function DailyUsProvider({ children }: PropsWithChildren) {
  const { settings } = useDatesProfile();
  const [now, setNow] = useState(() => new Date());
  const [entries, setEntries] = useState<Record<string, DailyQuestionEntry>>(() => {
    const todayKey = getCoupleDateKey(new Date(), settings.timezone);
    return { ...createMockHistory(todayKey), [todayKey]: createEntry(todayKey) };
  });

  const todayKey = getCoupleDateKey(now, settings.timezone);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setEntries((current) => current[todayKey] ? current : { ...current, [todayKey]: createEntry(todayKey) });
  }, [todayKey]);

  const currentEntry = useMemo(() => toView(entries[todayKey] ?? createEntry(todayKey)), [entries, todayKey]);

  const submitAnswer = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setEntries((current) => {
      const entry = current[todayKey] ?? createEntry(todayKey);
      const answer: DailyAnswer = {
        partnerId: "you",
        partnerName: mockCouple.currentUser.name,
        text: trimmed,
        submittedAt: new Date().toISOString(),
      };
      return { ...current, [todayKey]: { ...entry, currentUserAnswer: answer, skipped: false } };
    });
  }, [todayKey]);

  const skipToday = useCallback(() => {
    setEntries((current) => {
      const entry = current[todayKey] ?? createEntry(todayKey);
      return { ...current, [todayKey]: { ...entry, skipped: true } };
    });
  }, [todayKey]);

  const revisitToday = useCallback(() => {
    setEntries((current) => {
      const entry = current[todayKey] ?? createEntry(todayKey);
      return { ...current, [todayKey]: { ...entry, skipped: false } };
    });
  }, [todayKey]);

  const togglePartnerAnswerReaction = useCallback(() => {
    setEntries((current) => {
      const entry = current[todayKey] ?? createEntry(todayKey);
      if (!entry.currentUserAnswer || !entry.partnerAnswer) return current;
      const existing = entry.reactions.some((reaction) => reaction.fromPartnerId === "you" && reaction.toPartnerId === "partner" && reaction.kind === "heart");
      const reactions = existing
        ? entry.reactions.filter((reaction) => !(reaction.fromPartnerId === "you" && reaction.toPartnerId === "partner" && reaction.kind === "heart"))
        : [...entry.reactions, { id: `reaction-${Date.now()}`, fromPartnerId: "you", toPartnerId: "partner", kind: "heart", createdAt: new Date().toISOString() } satisfies DailyReaction];
      return { ...current, [todayKey]: { ...entry, reactions } };
    });
  }, [todayKey]);

  const simulatePartnerSubmission = useCallback(() => {
    setEntries((current) => {
      const entry = current[todayKey] ?? createEntry(todayKey);
      if (!entry.currentUserAnswer || entry.partnerAnswer) return current;
      const answer: DailyAnswer = {
        partnerId: "partner",
        partnerName: mockCouple.partner.name,
        text: "I feel closest to you in the small, everyday moments — when we share the unfiltered version of our day and make space for each other.",
        submittedAt: new Date().toISOString(),
      };
      return {
        ...current,
        [todayKey]: {
          ...entry,
          partnerAnswer: answer,
          reactions: [...entry.reactions, { id: `reaction-${Date.now()}`, fromPartnerId: "partner", toPartnerId: "you", kind: "heart", createdAt: new Date().toISOString() }],
        },
      };
    });
  }, [todayKey]);

  const getHistoricalEntry = useCallback((dateKey: string) => {
    if (dateKey === todayKey) return null;
    const entry = entries[dateKey];
    return entry ? toView(entry) : null;
  }, [entries, todayKey]);

  const history = useMemo(() => Object.values(entries)
    .filter((entry) => entry.dateKey !== todayKey)
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey))
    .map((entry) => {
      const view = toView(entry);
      return {
        dateKey: entry.dateKey,
        question: entry.question,
        bothSubmitted: view.bothSubmitted,
        currentUserPreview: view.bothSubmitted ? entry.currentUserAnswer?.text.slice(0, 88) ?? null : null,
        partnerPreview: view.bothSubmitted ? entry.partnerAnswer?.text.slice(0, 88) ?? null : null,
        skipped: entry.skipped,
      };
    }), [entries, todayKey]);

  const value = useMemo(() => ({
    now,
    currentEntry,
    history,
    getHistoricalEntry,
    submitAnswer,
    skipToday,
    revisitToday,
    togglePartnerAnswerReaction,
    simulatePartnerSubmission,
  }), [now, currentEntry, history, getHistoricalEntry, submitAnswer, skipToday, revisitToday, togglePartnerAnswerReaction, simulatePartnerSubmission]);

  return <DailyUsContext.Provider value={value}>{children}</DailyUsContext.Provider>;
}

const DailyUsContext = createContext<DailyUsContextValue | null>(null);

export function useDailyUs() {
  const context = useContext(DailyUsContext);
  if (!context) throw new Error("useDailyUs must be used within DailyUsProvider");
  return context;
}
