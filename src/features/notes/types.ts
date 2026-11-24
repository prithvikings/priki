export type NoteStatus = "draft" | "scheduled" | "sent" | "delivered" | "opened";
export type NoteFilter = "all" | "received" | "sent" | "favorites";

export type LoveNote = {
  id: string;
  title: string;
  body: string;
  senderId: "you" | "partner";
  recipientId: "you" | "partner";
  senderName: string;
  recipientName: string;
  status: NoteStatus;
  createdAt: string;
  scheduledFor: string | null;
  updatedAt: string | null;
  isFavorite: boolean;
  isHearted: boolean;
  photoUri: string | null;
};

export type NoteDraftInput = {
  title: string;
  body: string;
  scheduledFor?: string | null;
  photoUri?: string | null;
};
