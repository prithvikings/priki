import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { initialAffections, initialReasons, partner, you } from "./mockAffection";
import type { AffectionActivity, AffectionType, LoveReason } from "./types";
type ContextValue = {
  activities: AffectionActivity[]; reasons: LoveReason[];
  sendAffection: (type: AffectionType) => void; simulatePartnerAffection: (type: AffectionType) => void;
  addReason: (text: string) => string; toggleFavorite: (id: string) => void; deleteReason: (id: string) => void;
  getReason: (id: string) => LoveReason | undefined; pickReason: () => LoveReason | undefined; pickedReason: LoveReason | null;
};
const Context = createContext<ContextValue | null>(null);
const id = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
export function AffectionProvider({ children }: PropsWithChildren) {
  const [activities, setActivities] = useState(initialAffections);
  const [reasons, setReasons] = useState(initialReasons);
  const [pickedReason, setPickedReason] = useState<LoveReason | null>(null);
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);
  const sendAffection = useCallback((type: AffectionType) => {
    setActivities(current => [{ id: id("affection"), type, sender: you, recipient: partner, createdAt: new Date().toISOString(), status: "received" }, ...current]);
  }, []);
  const simulatePartnerAffection = useCallback((type: AffectionType) => {
    setActivities(current => [{ id: id("affection"), type, sender: partner, recipient: you, createdAt: new Date().toISOString(), status: "received" }, ...current]);
  }, []);
  const addReason = useCallback((text: string) => {
    const next: LoveReason = { id: id("reason"), text: text.trim(), creator: you, createdAt: new Date().toISOString(), isFavorite: false };
    setReasons(current => [next, ...current]); return next.id;
  }, []);
  const toggleFavorite = useCallback((reasonId: string) => setReasons(current => current.map(reason => reason.id === reasonId ? { ...reason, isFavorite: !reason.isFavorite } : reason)), []);
  const deleteReason = useCallback((reasonId: string) => {
    setReasons(current => current.filter(reason => reason.id !== reasonId || reason.creator.id !== you.id));
    setPickedReason(current => current?.id === reasonId ? null : current);
  }, []);
  const getReason = useCallback((reasonId: string) => reasons.find(reason => reason.id === reasonId), [reasons]);
  const pickReason = useCallback(() => {
    if (!reasons.length) { setPickedReason(null); return undefined; }
    const choices = reasons.length > 1 ? reasons.filter(reason => reason.id !== lastPickedId) : reasons;
    const selected = choices[Math.floor(Math.random() * choices.length)];
    setLastPickedId(selected.id); setPickedReason(selected); return selected;
  }, [reasons, lastPickedId]);
  const value = useMemo(() => ({ activities, reasons, sendAffection, simulatePartnerAffection, addReason, toggleFavorite, deleteReason, getReason, pickReason, pickedReason }), [activities, reasons, sendAffection, simulatePartnerAffection, addReason, toggleFavorite, deleteReason, getReason, pickReason, pickedReason]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useAffection() { const value = useContext(Context); if (!value) throw new Error("useAffection must be used within AffectionProvider"); return value; }
