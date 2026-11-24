import type { QuestionCategory } from "./questionBank";

export type DailyQuestion = {
  id: string;
  category: QuestionCategory;
  text: string;
};

export type DailyAnswer = {
  partnerId: "you" | "partner";
  partnerName: string;
  text: string;
  submittedAt: string;
};

export type DailyQuestionEntry = {
  dateKey: string;
  question: DailyQuestion;
  currentUserAnswer: DailyAnswer | null;
  partnerAnswer: DailyAnswer | null;
  currentUserReactedToPartner: boolean;
  partnerReactedToCurrentUser: boolean;
  skipped: boolean;
};

export type DailyEntryView = {
  dateKey: string;
  question: DailyQuestion;
  currentUserAnswer: string | null;
  partnerAnswer: string | null;
  currentUserSubmitted: boolean;
  partnerSubmitted: boolean;
  bothSubmitted: boolean;
  currentUserReactedToPartner: boolean;
  partnerReactedToCurrentUser: boolean;
  skipped: boolean;
};

export type DailyHistoryItem = {
  dateKey: string;
  question: DailyQuestion;
  bothSubmitted: boolean;
  currentUserPreview: string | null;
  partnerPreview: string | null;
  skipped: boolean;
};
