export function formatMemoryDate(value: string, includeYear = true) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", ...(includeYear ? { year: "numeric" as const } : {}) });
}

export function getMonthLabel(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function isValidMemoryDate(value: string) {
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && date.getFullYear() >= 1900 && date.getTime() <= Date.now() + 86_400_000;
}
