import { mockCouple } from "@/data/mockData";
import type { CoupleMemory } from "./types";

const you = { id: mockCouple.currentUser.id, name: mockCouple.currentUser.name, initials: mockCouple.currentUser.initials, avatarUri: mockCouple.currentUser.avatarUri };
const partner = { id: mockCouple.partner.id, name: mockCouple.partner.name, initials: mockCouple.partner.initials, avatarUri: mockCouple.partner.avatarUri };

export const initialMemories: CoupleMemory[] = [
  { id: "memory-first-meeting", title: "The day we first met", description: "A little nervous, a lot of smiling, and somehow everything felt easy. The beginning of our favourite story.", memoryDate: "2024-02-14", creator: you, imageRef: "mock-sunset", createdAt: "2024-02-14T18:30:00.000Z", updatedAt: null },
  { id: "memory-first-date", title: "Our favourite little date", description: "An unhurried afternoon, too much dessert, and the kind of conversation that makes time disappear.", memoryDate: "2025-06-08", creator: partner, imageRef: "mock-cafe", createdAt: "2025-06-09T08:00:00.000Z", updatedAt: null },
  { id: "memory-video-call", title: "A sunset, shared from miles away", description: "We watched the sky change colours on a video call. It still felt like we were sitting side by side.", memoryDate: "2026-10-28", creator: you, imageRef: "mock-sunset", createdAt: "2026-10-28T19:10:00.000Z", updatedAt: null },
  { id: "memory-everyday", title: "The ordinary good-morning", description: "A sleepy voice note, a tiny update about the day, and a reminder that distance doesn't get every little moment.", memoryDate: "2026-11-12", creator: partner, imageRef: null, createdAt: "2026-11-12T06:45:00.000Z", updatedAt: null },
];
