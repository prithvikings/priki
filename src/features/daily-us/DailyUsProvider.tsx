import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { mockCouple } from "@/data/mockData";
import { DEMO_COUPLE_ID, getCoupleDateKey, getDailyQuestion, SHARED_COUPLE_TIMEZONE } from "./dailyQuestion";
import { createMockHistory } from "./mockHistory";
import type { DailyAnswer, DailyEntryView, DailyHistoryItem, DailyQuestionEntry } from "./types";

type DailyUsContextValue = {
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
    currentUserReactedToPartner: false,
    partnerReactedToCurrentUser: false,
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
    currentUserReactedToPartner: bothSubmitted && entry.currentUserReactedToPartner,
    partnerReactedToCurrentUser: bothSubmitted && entry.partnerReactedToCurrentUser,
    skipped: entry.skipped,
  };
}

export function DailyUsProvider({ children }: PropsWithChildren) {
  const [now, setNow] = useState(() => new Date());
  const [entries, setEntries] = useState<Record<string, DailyQuestionEntry>>(() => {
    const todayKey = getCoupleDateKey(new Date(), SHARED_COUPLE_TIMEZONE);
    return { ...createMockHistory(todayKey), [todayKey]: createEntry(todayKey) };
  });

  const todayKey = getCoupleDateKey(now, SHARED_COUPLE_TIMEZONE);

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
      return { ...current, [todayKey]: { ...entry, currentUserReactedToPartner: !entry.currentUserReactedToPartner } };
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
          partnerReactedToCurrentUser: true,
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
    currentEntry,
    history,
    getHistoricalEntry,
    submitAnswer,
    skipToday,
    revisitToday,
    togglePartnerAnswerReaction,
    simulatePartnerSubmission,
  }), [currentEntry, history, getHistoricalEntry, submitAnswer, skipToday, revisitToday, togglePartnerAnswerReaction, simulatePartnerSubmission]);

  return <DailyUsContext.Provider value={value}>{children}</DailyUsContext.Provider>;
}

const DailyUsContext = createContext<DailyUsContextValue | null>(null);

export function useDailyUs() {
  const context = useContext(DailyUsContext);
  if (!context) throw new Error("useDailyUs must be used within DailyUsProvider");
  return context;
}
