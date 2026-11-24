import type { AffectionActivity, AffectionPerson, LoveReason } from "./types";
export const you: AffectionPerson = { id: "you", name: "Alex", initials: "A" };
export const partner: AffectionPerson = { id: "partner", name: "Sam", initials: "S" };
const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
export const initialAffections: AffectionActivity[] = [
  { id: "affection-seed-1", type: "kiss", sender: partner, recipient: you, createdAt: ago(42), status: "read" },
  { id: "affection-seed-2", type: "hug", sender: you, recipient: partner, createdAt: ago(125), status: "received" },
  { id: "affection-seed-3", type: "hug", sender: partner, recipient: you, createdAt: ago(350), status: "read" },
];
export const initialReasons: LoveReason[] = [
  { id: "reason-1", text: "You make even the most ordinary days feel special.", creator: you, createdAt: ago(800), isFavorite: true },
  { id: "reason-2", text: "You always find a way to make me laugh.", creator: partner, createdAt: ago(1500), isFavorite: false },
  { id: "reason-3", text: "You listen with your whole heart.", creator: you, createdAt: ago(2600), isFavorite: false },
  { id: "reason-4", text: "Distance never changes how safe I feel with you.", creator: partner, createdAt: ago(4000), isFavorite: true },
  { id: "reason-5", text: "You remember the tiny things I tell you.", creator: you, createdAt: ago(6000), isFavorite: false },
  { id: "reason-6", text: "You make our future feel worth looking forward to.", creator: partner, createdAt: ago(9000), isFavorite: false },
];
