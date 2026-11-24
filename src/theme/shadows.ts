import type { ViewStyle } from "react-native";
import { colors } from "./colors";

export const shadows = {
  card: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.045,
    shadowRadius: 12,
    elevation: 2,
  },
  floating: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
} satisfies Record<string, ViewStyle>;
