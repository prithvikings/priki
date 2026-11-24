import { Text, type TextProps } from "react-native";
import { typography } from "@/theme";

type Variant = keyof typeof typography;
type Props = TextProps & { variant?: Variant };

export function PrikiText({ variant = "body", style, ...props }: Props) {
  return <Text {...props} style={[typography[variant], style]} />;
}
