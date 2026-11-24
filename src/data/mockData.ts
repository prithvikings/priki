export const mockCouple = {
  currentUser: { id: "you", name: "Alex", initials: "A", avatarUri: null },
  partner: { id: "partner", name: "Sam", initials: "S", avatarUri: null },
  relationship: {
    startDate: "2024-02-14",
    timezone: "Asia/Kolkata",
  },
} as const;

/** Static labels shared by the first pass of tab screens. No feature state is implied. */
export const tabPlaceholders = {
  home: { title: "Home", subtitle: "A little closer, every day." },
  notes: { title: "Notes", subtitle: "A quiet place for your words." },
  dailyUs: { title: "Daily Us", subtitle: "A small moment, just for you two." },
  memories: { title: "Memories", subtitle: "Little moments worth keeping." },
  affection: { title: "Affection", subtitle: "Small ways to feel close." },
} as const;


export type MoodTone = "happy" | "calm" | "tired" | "loved";

export type PartnerProfile = {
  id: "you" | "partner";
  name: string;
  initials: string;
  avatarUri: string | null;
  mood: { label: string; tone: MoodTone; note: string };
};

export type AffectionKind = "Hug" | "Kiss" | "Thinking of You";

export const homeMockData = {
  couple: {
    profiles: [
      {
        id: "you",
        name: "Alex",
        initials: "A",
        avatarUri: null,
        mood: { label: "Happy", tone: "happy", note: "Feeling productive today." },
      },
      {
        id: "partner",
        name: "Sam",
        initials: "S",
        avatarUri: null,
        mood: { label: "Calm", tone: "calm", note: "A quiet, cosy kind of day." },
      },
    ] satisfies PartnerProfile[],
    relationshipStartDate: "2024-02-14",
  },
  meeting: {
    date: "2026-12-17",
    label: "Until We Meet",
    caption: "Counting down to our next hello.",
  },
  latestLoveNote: {
    title: "A Little Reminder",
    preview: "Just a tiny note to say… I’m so lucky to have you.",
    dateLabel: "Today, 8:24 PM",
  },
  loveJar: { reasonCount: 18 },
  recentMemory: {
    title: "That Beautiful Sunset",
    date: "2026-10-28",
    caption: "The sunset we watched together over a video call. Still one of my favourite moments.",
    imageUri: null,
  },
  recentAffection: [
    { id: "affection-1", sender: "you", kind: "Hug" as const, timeLabel: "2 hours ago" },
    { id: "affection-2", sender: "partner", kind: "Kiss" as const, timeLabel: "Today, 10:24 AM" },
  ],
} as const;
