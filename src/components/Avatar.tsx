import { Image, StyleSheet, View, type ImageSourcePropType, type ViewStyle } from "react-native";
import { colors, radius, typography } from "@/theme";
import { PrikiText } from "./PrikiText";

type Props = {
  uri?: string | null;
  source?: ImageSourcePropType;
  initials: string;
  size?: number;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function Avatar({ uri, source, initials, size = 44, style, accessibilityLabel }: Props) {
  const imageSource = source ?? (uri ? { uri } : undefined);
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? initials}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      {imageSource ? (
        <Image source={imageSource} resizeMode="cover" style={StyleSheet.absoluteFill} />
      ) : (
        <PrikiText style={[typography.title, { fontSize: size * 0.34, lineHeight: size * 0.42, color: colors.accent }]}>{initials.slice(0, 2).toUpperCase()}</PrikiText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { overflow: "hidden", backgroundColor: colors.surfaceMuted, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
});
