import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { mockCouple } from "@/data/mockData";
import { initialMemories } from "./mockMemories";
import type { CoupleMemory, MemoryDraftInput } from "./types";

type MemoriesContextValue = {
  memories: CoupleMemory[];
  createMemory: (input: MemoryDraftInput) => string;
  updateMemory: (id: string, input: MemoryDraftInput) => void;
  deleteMemory: (id: string) => void;
  getMemory: (id: string) => CoupleMemory | undefined;
};

const MemoriesContext = createContext<MemoriesContextValue | null>(null);
const makeId = () => `memory-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function MemoriesProvider({ children }: PropsWithChildren) {
  const [memories, setMemories] = useState(initialMemories);

  const createMemory = useCallback((input: MemoryDraftInput) => {
    const id = makeId();
    const next: CoupleMemory = {
      id, title: input.title.trim(), description: input.description.trim(), memoryDate: input.memoryDate,
      creator: { id: mockCouple.currentUser.id, name: mockCouple.currentUser.name, initials: mockCouple.currentUser.initials, avatarUri: mockCouple.currentUser.avatarUri },
      imageRef: input.imageRef, createdAt: new Date().toISOString(), updatedAt: null,
    };
    setMemories(current => [next, ...current]);
    return id;
  }, []);

  const updateMemory = useCallback((id: string, input: MemoryDraftInput) => {
    setMemories(current => current.map(memory => memory.id !== id || memory.creator.id !== mockCouple.currentUser.id ? memory : {
      ...memory, title: input.title.trim(), description: input.description.trim(), memoryDate: input.memoryDate, imageRef: input.imageRef, updatedAt: new Date().toISOString(),
    }));
  }, []);

  const deleteMemory = useCallback((id: string) => {
    setMemories(current => current.filter(memory => memory.id !== id || memory.creator.id !== mockCouple.currentUser.id));
  }, []);

  const getMemory = useCallback((id: string) => memories.find(memory => memory.id === id), [memories]);
  const value = useMemo(() => ({ memories, createMemory, updateMemory, deleteMemory, getMemory }), [memories, createMemory, updateMemory, deleteMemory, getMemory]);
  return <MemoriesContext.Provider value={value}>{children}</MemoriesContext.Provider>;
}

export function useMemories() {
  const context = useContext(MemoriesContext);
  if (!context) throw new Error("useMemories must be used within MemoriesProvider");
  return context;
}
