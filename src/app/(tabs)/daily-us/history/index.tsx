import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PrikiText, ScreenContainer, SecondaryButton } from "@/components";
import { colors, spacing } from "@/theme";
import { useDailyUs } from "@/features/daily-us/DailyUsProvider";
import { HistoryRow } from "@/features/daily-us/components/HistoryRow";

export default function DailyUsHistoryScreen() {
  const router=useRouter();
  const {history}=useDailyUs();
  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" onPress={()=>router.back()} style={styles.back}><Ionicons name="chevron-back" size={22} color={colors.text}/></Pressable>
        <PrikiText variant="title">Your Daily Us history</PrikiText>
        <View style={styles.back}/>
      </View>
      <View style={styles.intro}><PrikiText variant="display">Little moments, kept.</PrikiText><PrikiText variant="caption">Previous questions stay here, just as you left them.</PrikiText></View>
      <SecondaryButton title="Back to today's question" onPress={()=>router.navigate("/(tabs)/daily-us")}/>
      <View style={styles.list}>{history.map(item=><HistoryRow key={item.dateKey} item={item} onPress={()=>router.push({pathname:"/(tabs)/daily-us/history/[date]",params:{date:item.dateKey}})}/>)}</View>
    </ScreenContainer>
  );
}
const styles=StyleSheet.create({
 content:{paddingTop:spacing.md,paddingBottom:145,gap:spacing.lg},
 topBar:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
 back:{width:40,height:40,justifyContent:"center"},
 intro:{gap:spacing.xs},
 list:{gap:spacing.md},
});
