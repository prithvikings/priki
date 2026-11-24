import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { PrikiText } from "@/components/PrikiText";
import { colors, radius } from "@/theme";

export function MemoryArtwork({ imageRef, style }: { imageRef: string | null; style?: ViewStyle }) {
  const cafe = imageRef === "mock-cafe";
  return (
    <View style={[styles.art, cafe ? styles.cafe : styles.sunset, style]}>
      <Ionicons name={imageRef ? (cafe ? "cafe-outline" : "sunny-outline") : "image-outline"} size={30} color={cafe ? "#A77A69" : "#B77B75"} />
      <PrikiText variant="caption" style={styles.caption}>{imageRef ? (cafe ? "A little date" : "A golden moment") : "A moment to remember"}</PrikiText>
    </View>
  );
}
const styles = StyleSheet.create({
  art: { minHeight: 150, borderRadius: radius.lg, alignItems: "center", justifyContent: "center", gap: 7, overflow: "hidden" },
  sunset: { backgroundColor: "#F7E2D8" },
  cafe: { backgroundColor: "#EDE3D8" },
  caption: { color: "#936C68", fontSize: 11 },
});
