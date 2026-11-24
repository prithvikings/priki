import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { initialLoveNotes } from "./mockNotes";
import type { LoveNote, NoteDraftInput } from "./types";

type NotesContextValue = {
  notes: LoveNote[];
  createNote: (input: NoteDraftInput, mode: "draft" | "sent" | "scheduled") => string;
  updateNote: (id: string, input: NoteDraftInput, mode?: "draft" | "scheduled" | "sent") => void;
  cancelScheduled: (id: string) => void;
  markOpened: (id: string) => void;
  toggleHeart: (id: string) => void;
  toggleFavorite: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

function makeId() {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function NotesProvider({ children }: PropsWithChildren) {
  const [notes, setNotes] = useState<LoveNote[]>(initialLoveNotes);

  const createNote = useCallback((input: NoteDraftInput, mode: "draft" | "sent" | "scheduled") => {
    const id = makeId();
    const next: LoveNote = {
      id,
      title: input.title.trim(),
      body: input.body.trim(),
      senderId: "you",
      recipientId: "partner",
      senderName: "Alex",
      recipientName: "Sam",
      status: mode,
      createdAt: new Date().toISOString(),
      scheduledFor: mode === "scheduled" ? input.scheduledFor ?? null : null,
      updatedAt: null,
      isFavorite: false,
      isHearted: false,
      photoUri: input.photoUri ?? null,
    };
    setNotes((current) => [next, ...current]);
    return id;
  }, []);

  const updateNote = useCallback((id: string, input: NoteDraftInput, mode?: "draft" | "scheduled" | "sent") => {
    setNotes((current) => current.map((note) => note.id !== id ? note : {
      ...note,
      title: input.title.trim(),
      body: input.body.trim(),
      status: mode ?? note.status,
      scheduledFor: (mode ?? note.status) === "scheduled" ? input.scheduledFor ?? note.scheduledFor : null,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const cancelScheduled = useCallback((id: string) => {
    setNotes((current) => current.map((note) => note.id === id && note.status === "scheduled"
      ? { ...note, status: "draft", scheduledFor: null, updatedAt: new Date().toISOString() }
      : note));
  }, []);

  const markOpened = useCallback((id: string) => {
    setNotes((current) => current.map((note) => note.id === id && note.senderId === "partner" && note.status === "delivered"
      ? { ...note, status: "opened" }
      : note));
  }, []);

  const toggleHeart = useCallback((id: string) => {
    setNotes((current) => current.map((note) => note.id === id ? { ...note, isHearted: !note.isHearted } : note));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setNotes((current) => current.map((note) => note.id === id ? { ...note, isFavorite: !note.isFavorite } : note));
  }, []);

  const value = useMemo(() => ({
    notes, createNote, updateNote, cancelScheduled, markOpened, toggleHeart, toggleFavorite,
  }), [notes, createNote, updateNote, cancelScheduled, markOpened, toggleHeart, toggleFavorite]);

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
}
