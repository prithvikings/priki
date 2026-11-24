import { useEffect, useState } from "react";
import { Alert, Animated, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, Avatar, PrikiText, ScreenContainer, SecondaryButton, SurfaceCard } from "@/components";
import { colors, radius, spacing } from "@/theme";
import { mockCouple } from "@/data/mockData";
import { useDailyUs } from "@/features/daily-us/DailyUsProvider";
import { AnswerComposer } from "@/features/daily-us/components/AnswerComposer";
import { AnswerCard } from "@/features/daily-us/components/AnswerCard";
import { DailyQuestionCard } from "@/features/daily-us/components/DailyQuestionCard";
import { formatCoupleDate, getDeadlineLabel, SHARED_COUPLE_TIMEZONE } from "@/features/daily-us/dailyQuestion";

export default function DailyUsScreen() {
  const router = useRouter();
  const { currentEntry, submitAnswer, skipToday, revisitToday, togglePartnerAnswerReaction, simulatePartnerSubmission } = useDailyUs();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [revealOpacity] = useState(() => new Animated.Value(0));
  const revealed = currentEntry.bothSubmitted;

  useEffect(() => {
    if (revealed) {
      Animated.timing(revealOpacity, { toValue: 1, duration: 420, useNativeDriver: true }).start();
    } else {
      revealOpacity.setValue(0);
    }
  }, [revealed, revealOpacity]);

  const handleSubmit = (answer: string) => {
    submitAnswer(answer);
    setEditing(false);
    setSaved(true);
  };

  const progressLabel = revealed ? "A little moment shared" : currentEntry.currentUserSubmitted ? "Your answer is in · one more to come" : currentEntry.skipped ? "Whenever you're ready" : "A moment for the two of you";

  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader title="Daily Us" eyebrow="YOUR LITTLE DAILY PAUSE" />
      <View style={styles.intro}>
        <PrikiText variant="display" style={styles.heading}>Daily Us</PrikiText>
        <PrikiText variant="body" style={styles.subtitle}>One little moment to connect, every day.</PrikiText>
      </View>

      <DailyQuestionCard question={currentEntry.question} dateLabel={formatCoupleDate(currentEntry.dateKey)} />

      <View style={styles.progressBlock}>
        <View style={styles.progressHeading}>
          <PrikiText variant="title">Today's little check-in</PrikiText>
          <PrikiText variant="caption">{progressLabel}</PrikiText>
        </View>
        <View style={styles.peopleRow}>
          <View style={styles.personStatus}>
            <Avatar initials={mockCouple.currentUser.initials} size={38} />
            <View style={styles.personCopy}><PrikiText variant="title">{mockCouple.currentUser.name}</PrikiText><PrikiText variant="caption">{currentEntry.currentUserSubmitted ? "Answered" : "Your turn"}</PrikiText></View>
            <Ionicons name={currentEntry.currentUserSubmitted ? "checkmark-circle" : "ellipse-outline"} size={20} color={currentEntry.currentUserSubmitted ? colors.success : colors.textTertiary} />
          </View>
          <View style={styles.personStatus}>
            <Avatar initials={mockCouple.partner.initials} size={38} />
            <View style={styles.personCopy}><PrikiText variant="title">{mockCouple.partner.name}</PrikiText><PrikiText variant="caption">{currentEntry.partnerSubmitted ? "Answered" : "Waiting to answer"}</PrikiText></View>
            <Ionicons name={currentEntry.partnerSubmitted ? "checkmark-circle" : "time-outline"} size={20} color={currentEntry.partnerSubmitted ? colors.success : colors.textTertiary} />
          </View>
        </View>
      </View>

      <View style={styles.deadline}>
        <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
        <PrikiText variant="caption">{getDeadlineLabel()} · Shared couple time · {SHARED_COUPLE_TIMEZONE}</PrikiText>
      </View>

      {currentEntry.skipped && !currentEntry.currentUserSubmitted ? (
        <SurfaceCard style={styles.skippedCard}>
          <View style={styles.skippedIcon}><Ionicons name="leaf-outline" size={22} color={colors.accent}/></View>
          <PrikiText variant="h3">Left for another moment.</PrikiText>
          <PrikiText variant="caption" style={styles.skippedCopy}>No pressure. You can come back to this question whenever it feels right.</PrikiText>
          <SecondaryButton title="Revisit today's question" onPress={revisitToday}/>
        </SurfaceCard>
      ) : null}

      {!currentEntry.bothSubmitted && !currentEntry.skipped ? (
        <View style={styles.answerArea}>
          {currentEntry.currentUserSubmitted && !editing ? (
            <SurfaceCard style={styles.savedCard}>
              <View style={styles.savedHeading}><Ionicons name="checkmark-circle" size={18} color={colors.success}/><PrikiText variant="title">Your answer is saved</PrikiText></View>
              <PrikiText variant="body" style={styles.savedAnswer}>{currentEntry.currentUserAnswer}</PrikiText>
              <SecondaryButton title="Edit your answer" onPress={()=>{setEditing(true);setSaved(false);}}/>
              <View style={styles.waiting}><Ionicons name="hourglass-outline" size={17} color={colors.accent}/><PrikiText variant="caption" style={styles.waitingText}>Your partner's answer stays tucked away until you have both answered.</PrikiText></View>
            </SurfaceCard>
          ) : (
            <View style={styles.composerWrap}>
              {currentEntry.partnerSubmitted ? <PrikiText variant="caption" style={styles.partnerWaiting}>Your partner has answered. Your answer will reveal both together.</PrikiText> : null}
              <AnswerComposer key={editing ? "edit" : "new"} initialValue={editing ? currentEntry.currentUserAnswer ?? "" : ""} submitLabel={editing ? "Save changes" : "Save my answer"} onSubmit={handleSubmit}/>
              {editing ? <SecondaryButton title="Cancel editing" onPress={()=>setEditing(false)}/> : null}
            </View>
          )}
          {!currentEntry.currentUserSubmitted ? <Pressable accessibilityRole="button" onPress={()=>Alert.alert("Skip for now?", "That's completely okay. You can revisit today's question whenever you like.", [{text:"Keep thinking",style:"cancel"},{text:"Skip for now",onPress:skipToday}])} style={styles.skipButton}><PrikiText variant="caption" style={styles.skipText}>Maybe another time</PrikiText></Pressable> : null}
        </View>
      ) : null}

      {currentEntry.bothSubmitted ? (
        <Animated.View style={[styles.revealSection,{opacity:revealOpacity,transform:[{translateY:revealOpacity.interpolate({inputRange:[0,1],outputRange:[12,0]})}]}]}>
          <View style={styles.revealTop}>
            <View style={styles.revealHeading}><Ionicons name="heart" size={18} color={colors.accent}/><PrikiText variant="h3">A little more of each other</PrikiText></View>
            <Pressable accessibilityRole="button" onPress={()=>setEditing(true)}><PrikiText variant="caption" style={styles.editLink}>Edit yours</PrikiText></Pressable>
          </View>
          <PrikiText variant="caption">You both showed up. Here are your two perspectives.</PrikiText>
          {editing ? <View style={styles.editComposer}><AnswerComposer key="revealed-edit" initialValue={currentEntry.currentUserAnswer ?? ""} submitLabel="Save changes" onSubmit={handleSubmit}/><SecondaryButton title="Cancel editing" onPress={()=>setEditing(false)}/></View> : null}
          <AnswerCard name={mockCouple.currentUser.name} initials={mockCouple.currentUser.initials} answer={currentEntry.currentUserAnswer ?? ""} isCurrentUser partnerReacted={currentEntry.partnerReactedToCurrentUser}/>
          <AnswerCard name={mockCouple.partner.name} initials={mockCouple.partner.initials} answer={currentEntry.partnerAnswer ?? ""} isCurrentUser={false} reacted={currentEntry.currentUserReactedToPartner} onReact={togglePartnerAnswerReaction}/>
        </Animated.View>
      ) : null}

      {saved ? <View style={styles.savedToast}><Ionicons name="checkmark-circle" size={16} color={colors.success}/><PrikiText variant="caption" style={styles.savedToastText}>Your answer has been saved for today.</PrikiText></View> : null}

      {__DEV__ && currentEntry.currentUserSubmitted && !currentEntry.partnerSubmitted && !currentEntry.skipped ? (
        <View style={styles.devPanel}>
          <View style={styles.devTitle}><Ionicons name="construct-outline" size={15} color={colors.textSecondary}/><PrikiText variant="overline">DEVELOPMENT PREVIEW</PrikiText></View>
          <PrikiText variant="caption">Simulate the second partner so you can test the private-to-revealed transition.</PrikiText>
          <SecondaryButton title="Simulate partner submission" onPress={simulatePartnerSubmission}/>
        </View>
      ) : null}

      <View style={styles.historyLink}>
        <View style={styles.historyCopy}><PrikiText variant="title">Little moments we've shared</PrikiText><PrikiText variant="caption">Revisit previous questions and answers.</PrikiText></View>
        <Pressable accessibilityRole="button" onPress={()=>router.push("/(tabs)/daily-us/history")} style={styles.historyButton}><PrikiText variant="button" style={styles.historyButtonText}>View history</PrikiText><Ionicons name="chevron-forward" size={17} color={colors.accent}/></Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles=StyleSheet.create({
 content:{paddingTop:spacing.md,paddingBottom:145,gap:spacing.lg},
 intro:{gap:spacing.xs,marginTop:-spacing.sm},
 heading:{fontSize:34},
 subtitle:{color:colors.textSecondary},
 progressBlock:{gap:spacing.md},
 progressHeading:{gap:spacing.xxs},
 peopleRow:{gap:spacing.sm},
 personStatus:{flexDirection:"row",alignItems:"center",gap:spacing.md,padding:spacing.md,borderWidth:1,borderColor:colors.border,borderRadius:radius.lg,backgroundColor:colors.surface},
 personCopy:{flex:1,gap:1},
 deadline:{flexDirection:"row",alignItems:"center",gap:spacing.xs,marginTop:-spacing.sm},
 answerArea:{gap:spacing.sm},
 composerWrap:{gap:spacing.md},
 savedCard:{gap:spacing.md},
 savedHeading:{flexDirection:"row",alignItems:"center",gap:spacing.sm},
 savedAnswer:{lineHeight:25},
 waiting:{flexDirection:"row",alignItems:"flex-start",gap:spacing.sm,paddingTop:spacing.sm,borderTopWidth:1,borderTopColor:colors.border},
 waitingText:{flex:1},
 partnerWaiting:{color:colors.accent},
 skipButton:{alignItems:"center",padding:spacing.sm},
 skipText:{textDecorationLine:"underline"},
 skippedCard:{alignItems:"center",gap:spacing.md},
 skippedIcon:{width:48,height:48,borderRadius:24,backgroundColor:colors.surfaceMuted,alignItems:"center",justifyContent:"center"},
 skippedCopy:{textAlign:"center"},
 revealSection:{gap:spacing.md},
 revealTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:spacing.sm},
 revealHeading:{flexDirection:"row",alignItems:"center",gap:spacing.sm},
 editLink:{color:colors.accent,fontWeight:"600"},
 editComposer:{gap:spacing.sm},
 savedToast:{flexDirection:"row",alignItems:"center",justifyContent:"center",gap:spacing.xs},
 savedToastText:{color:colors.success},
 devPanel:{padding:spacing.md,borderRadius:radius.md,borderWidth:1,borderStyle:"dashed",borderColor:colors.borderStrong,gap:spacing.sm,backgroundColor:colors.surfaceMuted},
 devTitle:{flexDirection:"row",alignItems:"center",gap:spacing.xs},
 historyLink:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:spacing.sm,paddingTop:spacing.md,borderTopWidth:1,borderTopColor:colors.border},
 historyCopy:{flex:1,gap:2},
 historyButton:{flexDirection:"row",alignItems:"center",gap:2},
 historyButtonText:{color:colors.accent,fontSize:13},
});
