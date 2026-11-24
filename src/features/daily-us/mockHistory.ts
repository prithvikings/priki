import { mockCouple } from "@/data/mockData";
import { getDailyQuestion, shiftDateKey } from "./dailyQuestion";
import type { DailyQuestionEntry, DailyReaction } from "./types";

export function createMockHistory(todayKey: string): Record<string, DailyQuestionEntry> {
  const entries: Record<string, DailyQuestionEntry> = {};
  const examples = [
    {
      you: "That quiet evening when we stayed on the call long after we ran out of things to say. It felt easy.",
      partner: "The first time we laughed so much that neither of us could finish a sentence.",
    },
    {
      you: "You remembered a tiny detail I mentioned weeks earlier. It made me feel seen.",
      partner: "When you stayed up with me even though you had an early morning.",
    },
    {
      you: "A slow Sunday, homemade breakfast, and absolutely no plans.",
      partner: "A little home with plants, books, and a kitchen where we cook together.",
    },
    {
      you: "Your patience when I need a little extra time to find the right words.",
      partner: "The way we keep choosing to understand each other, even from far away.",
    },
  ];

  examples.forEach((answers, index) => {
    const dateKey = shiftDateKey(todayKey, -(index + 1));
    const reactions: DailyReaction[] = [];
    if (index % 2 === 0) reactions.push({ id: `history-${dateKey}-you-heart`, fromPartnerId: "you", toPartnerId: "partner", kind: "heart", createdAt: new Date(`${dateKey}T14:00:00.000Z`).toISOString() });
    if (index % 2 === 1) reactions.push({ id: `history-${dateKey}-partner-heart`, fromPartnerId: "partner", toPartnerId: "you", kind: "heart", createdAt: new Date(`${dateKey}T14:10:00.000Z`).toISOString() });
    entries[dateKey] = {
      dateKey,
      question: getDailyQuestion(dateKey),
      currentUserAnswer: {
        partnerId: "you",
        partnerName: mockCouple.currentUser.name,
        text: answers.you,
        submittedAt: new Date(`${dateKey}T12:00:00.000Z`).toISOString(),
      },
      partnerAnswer: {
        partnerId: "partner",
        partnerName: mockCouple.partner.name,
        text: answers.partner,
        submittedAt: new Date(`${dateKey}T13:00:00.000Z`).toISOString(),
      },
      reactions,
      skipped: false,
    };
  });

  const skippedDate = shiftDateKey(todayKey, -5);
  entries[skippedDate] = {
    dateKey: skippedDate,
    question: getDailyQuestion(skippedDate),
    currentUserAnswer: null,
    partnerAnswer: null,
    reactions: [],
    skipped: true,
  };

  return entries;
}
