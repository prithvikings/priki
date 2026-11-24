export function formatMemoryDate(value: string, includeYear = true) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", ...(includeYear ? { year: "numeric" as const } : {}) });
}

export function getMonthLabel(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function isValidMemoryDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day || year < 1900) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() <= today.getTime();
}
