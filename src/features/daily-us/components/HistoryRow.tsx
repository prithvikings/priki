import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import { formatCoupleDate } from "../dailyQuestion";
import type { DailyHistoryItem } from "../types";

export function HistoryRow({ item, onPress }: { item: DailyHistoryItem; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({pressed})=>[styles.row,pressed&&styles.pressed]}>
      <View style={styles.dateBox}><PrikiText variant="caption" style={styles.day}>{item.dateKey.slice(8,10)}</PrikiText><PrikiText variant="overline" style={styles.month}>{new Date(`${item.dateKey}T12:00:00Z`).toLocaleDateString("en-IN",{month:"short",timeZone:"UTC"})}</PrikiText></View>
      <View style={styles.copy}>
        <PrikiText variant="caption" style={styles.category}>{item.question.category}</PrikiText>
        <PrikiText variant="title" numberOfLines={2}>{item.question.text}</PrikiText>
        <PrikiText variant="caption" numberOfLines={1}>{item.bothSubmitted ? `You: ${item.currentUserPreview} · Them: ${item.partnerPreview}` : item.skipped ? "A question you chose to revisit another time" : "One answer is still waiting"}</PrikiText>
      </View>
      <View style={styles.status}><Ionicons name={item.bothSubmitted?"checkmark-circle":"chevron-forward"} size={19} color={item.bothSubmitted?colors.success:colors.textSecondary}/></View>
    </Pressable>
  );
}

const styles=StyleSheet.create({
 row:{flexDirection:"row",alignItems:"center",gap:spacing.md,padding:spacing.md,borderRadius:radius.lg,borderWidth:1,borderColor:colors.border,backgroundColor:colors.surface},
 dateBox:{width:48,height:52,borderRadius:radius.md,backgroundColor:colors.surfaceMuted,alignItems:"center",justifyContent:"center"},
 day:{fontSize:18,fontWeight:"700",color:colors.accent,lineHeight:22},
 month:{fontSize:9,color:colors.accent},
 copy:{flex:1,gap:3},
 category:{color:colors.accent,fontSize:10},
 status:{width:22,alignItems:"center"},
 pressed:{opacity:0.82},
});
