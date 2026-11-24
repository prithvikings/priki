export const colors = {
  background: "#FFF8F3",
  surface: "#FFFCFA",
  surfaceMuted: "#FDF1EE",
  primary: "#E8899B",
  primaryPressed: "#D9788D",
  accent: "#C95F78",
  text: "#38242B",
  textSecondary: "#8A7777",
  textTertiary: "#AD9A99",
  border: "#F2DDD9",
  borderStrong: "#EBCDC8",
  white: "#FFFFFF",
  success: "#6D927C",
  tabBar: "#FFFCFA",
  overlay: "rgba(56, 36, 43, 0.08)",
} as const;

export type ColorToken = keyof typeof colors;
