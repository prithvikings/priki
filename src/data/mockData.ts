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
