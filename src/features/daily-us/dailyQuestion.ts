import { questionBank } from "./questionBank";
import type { DailyQuestion } from "./types";

export const SHARED_COUPLE_TIMEZONE = "Asia/Kolkata";
export const DEMO_COUPLE_ID = "priki-demo-couple";

export function getCoupleDateKey(now: Date = new Date(), timeZone = SHARED_COUPLE_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

/** Stable for a couple + couple-local calendar day. Never depends on device timezone or mount count. */
export function getDailyQuestion(dateKey: string, coupleId = DEMO_COUPLE_ID): DailyQuestion {
  const index = hash(`${coupleId}:${dateKey}`) % questionBank.length;
  const question = questionBank[index];
  return { id: question.id, category: question.category, text: question.text };
}

export function shiftDateKey(dateKey: string, amount: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + amount, 12));
  return [
    shifted.getUTCFullYear(),
    String(shifted.getUTCMonth() + 1).padStart(2, "0"),
    String(shifted.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function localMidnightAsUtc(dateKey: string, timeZone: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const targetUtc = Date.UTC(year, month - 1, day, 0, 0, 0);
  let guess = targetUtc;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(guess));
    const read = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);
    const representedUtc = Date.UTC(read("year"), read("month") - 1, read("day"), read("hour"), read("minute"), read("second"));
    guess = targetUtc - (representedUtc - guess);
  }
  return new Date(guess);
}

export function getNextResetAt(now: Date = new Date(), timeZone = SHARED_COUPLE_TIMEZONE) {
  const today = getCoupleDateKey(now, timeZone);
  return localMidnightAsUtc(shiftDateKey(today, 1), timeZone);
}

export function formatCoupleDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function getDeadlineLabel(now: Date = new Date(), timeZone = SHARED_COUPLE_TIMEZONE) {
  const remaining = Math.max(0, getNextResetAt(now, timeZone).getTime() - now.getTime());
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  return hours > 0 ? `Resets in ${hours}h ${minutes}m` : `Resets in ${minutes}m`;
}
