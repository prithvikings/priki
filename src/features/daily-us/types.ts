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

export type DailyReaction = {
  id: string;
  fromPartnerId: "you" | "partner";
  toPartnerId: "you" | "partner";
  kind: "heart";
  createdAt: string;
};

export type PartnerSubmissionStatus = {
  currentUser: "waiting" | "submitted";
  partner: "waiting" | "submitted";
  bothSubmitted: boolean;
};

export type DailyQuestionEntry = {
  dateKey: string;
  question: DailyQuestion;
  currentUserAnswer: DailyAnswer | null;
  partnerAnswer: DailyAnswer | null;
  reactions: DailyReaction[];
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
  submissionStatus: PartnerSubmissionStatus;
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
