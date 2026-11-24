export type AffectionType = "hug" | "kiss";
export type AffectionPersonId = "you" | "partner";
export type AffectionPerson = { id: AffectionPersonId; name: string; initials: string };
export type AffectionActivity = {
  id: string; type: AffectionType; sender: AffectionPerson; recipient: AffectionPerson;
  createdAt: string; status: "received" | "read";
};
export type LoveReason = {
  id: string; text: string; creator: AffectionPerson; createdAt: string; isFavorite: boolean;
};
