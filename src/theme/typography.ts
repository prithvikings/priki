import { Platform, type TextStyle } from "react-native";
import { colors } from "./colors";

const roundedFamily = Platform.select({
  ios: "Avenir Next",
  android: "sans-serif",
  default: "sans-serif",
});

const serifFamily = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
});

const base: TextStyle = {
  color: colors.text,
  fontFamily: roundedFamily,
};

export const typography = {
  display: { ...base, fontFamily: serifFamily, fontSize: 34, lineHeight: 42, letterSpacing: -0.8 },
  h1: { ...base, fontSize: 28, lineHeight: 36, fontWeight: "700", letterSpacing: -0.6 },
  h2: { ...base, fontSize: 22, lineHeight: 29, fontWeight: "700", letterSpacing: -0.35 },
  h3: { ...base, fontSize: 18, lineHeight: 25, fontWeight: "600" },
  title: { ...base, fontSize: 16, lineHeight: 23, fontWeight: "600" },
  body: { ...base, fontSize: 15, lineHeight: 23, fontWeight: "400" },
  bodyMedium: { ...base, fontSize: 15, lineHeight: 22, fontWeight: "500" },
  caption: { ...base, fontSize: 13, lineHeight: 19, fontWeight: "400", color: colors.textSecondary },
  overline: { ...base, fontSize: 11, lineHeight: 16, fontWeight: "700", letterSpacing: 1.1, color: colors.textSecondary, textTransform: "uppercase" },
  button: { ...base, fontSize: 15, lineHeight: 20, fontWeight: "600" },
  tab: { ...base, fontSize: 10, lineHeight: 14, fontWeight: "600" },
} satisfies Record<string, TextStyle>;
