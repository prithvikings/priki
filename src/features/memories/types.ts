export type MemoryCreatorId = "you" | "partner";

export type MemoryCreator = {
  id: MemoryCreatorId;
  name: string;
  initials: string;
  avatarUri: string | null;
};

export type CoupleMemory = {
  id: string;
  title: string;
  description: string;
  memoryDate: string;
  creator: MemoryCreator;
  imageRef: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type MemoryDraftInput = {
  title: string;
  description: string;
  memoryDate: string;
  imageRef: string | null;
};
