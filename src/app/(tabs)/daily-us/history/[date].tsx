import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PrikiText, ScreenContainer, SurfaceCard, SecondaryButton } from "@/components";
import { colors, spacing } from "@/theme";
import { mockCouple } from "@/data/mockData";
import { useDailyUs } from "@/features/daily-us/DailyUsProvider";
import { DailyQuestionCard } from "@/features/daily-us/components/DailyQuestionCard";
import { AnswerCard } from "@/features/daily-us/components/AnswerCard";
import { formatCoupleDate } from "@/features/daily-us/dailyQuestion";

export default function DailyUsHistoryDetailScreen() {
  const {date}=useLocalSearchParams<{date:string}>();
  const router=useRouter();
  const {getHistoricalEntry}=useDailyUs();
  const entry=getHistoricalEntry(date);
  if(!entry) return <ScreenContainer contentStyle={styles.content}><PrikiText variant="h2">This moment isn't in your history.</PrikiText></ScreenContainer>;
  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.topBar}><Pressable accessibilityRole="button" onPress={()=>router.back()} style={styles.back}><Ionicons name="chevron-back" size={22} color={colors.text}/></Pressable><PrikiText variant="title">A moment from before</PrikiText><View style={styles.back}/></View>
      <DailyQuestionCard question={entry.question} dateLabel={formatCoupleDate(entry.dateKey)}/>
      <SecondaryButton title="Return to today's question" onPress={()=>router.navigate("/(tabs)/daily-us")}/>
      {entry.bothSubmitted ? (
        <View style={styles.answers}>
          <PrikiText variant="h3">Your two perspectives</PrikiText>
          <AnswerCard name={mockCouple.currentUser.name} initials={mockCouple.currentUser.initials} answer={entry.currentUserAnswer??""} isCurrentUser partnerReacted={entry.partnerReactedToCurrentUser}/>
          <AnswerCard name={mockCouple.partner.name} initials={mockCouple.partner.initials} answer={entry.partnerAnswer??""} isCurrentUser={false} reacted={entry.currentUserReactedToPartner}/>
        </View>
      ) : (
        <SurfaceCard style={styles.empty}><Ionicons name="leaf-outline" size={23} color={colors.accent}/><PrikiText variant="title">{entry.skipped?"A question left for another time":"This question wasn't answered by both of you"}</PrikiText><PrikiText variant="caption" style={styles.note}>Every day doesn't need an answer. This moment stays here without a score or a streak.</PrikiText></SurfaceCard>
      )}
    </ScreenContainer>
  );
}
const styles=StyleSheet.create({
 content:{paddingTop:spacing.md,paddingBottom:145,gap:spacing.lg},
 topBar:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
 back:{width:40,height:40,justifyContent:"center"},
 answers:{gap:spacing.md},
 empty:{alignItems:"center",gap:spacing.md},
 note:{textAlign:"center"},
});
