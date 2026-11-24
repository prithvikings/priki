import { useState } from "react";
import { Alert, Animated, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, PrikiText, PrimaryButton, ScreenContainer, SectionHeader, SurfaceCard } from "@/components";
import { useAffection } from "@/features/affection/AffectionProvider";
import { colors, radius, spacing } from "@/theme";
const timeLabel = (value: string) => new Date(value).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
export default function AffectionScreen() {
  const router = useRouter();
  const { activities, reasons, sendAffection, simulatePartnerAffection } = useAffection();
  const [feedback, setFeedback] = useState("");
  const [pulse] = useState(new Animated.Value(1));
  const send = (type: "hug" | "kiss") => {
    sendAffection(type); setFeedback(type === "hug" ? "A little hug is on its way." : "A little kiss is on its way.");
    Animated.sequence([Animated.timing(pulse, { toValue: 1.08, duration: 160, useNativeDriver: true }), Animated.spring(pulse, { toValue: 1, useNativeDriver: true })]).start();
  };
  return <ScreenContainer contentStyle={styles.content}>
    <AppHeader title="Little Affections" eyebrow="A LITTLE EXTRA LOVE" />
    <View style={styles.intro}><PrikiText variant="display">Little ways to say</PrikiText><PrikiText variant="display" style={styles.accent}>I’m thinking of you.</PrikiText><PrikiText variant="caption" style={styles.sub}>Small gestures, even from miles away.</PrikiText></View>
    <SurfaceCard style={styles.sendCard}>
      <PrikiText variant="title">Send a little affection</PrikiText><PrikiText variant="caption" style={styles.muted}>Choose a tiny reminder that they’re on your mind.</PrikiText>
      <View style={styles.sendRow}>
        <Animated.View style={{ flex: 1, transform: [{ scale: pulse }] }}><Pressable onPress={() => send("hug")} style={styles.affectionButton}><Ionicons name="heart-circle-outline" size={34} color={colors.accent}/><PrikiText variant="title">Virtual Hug</PrikiText><PrikiText variant="caption" style={styles.muted}>Wrap them in a hug</PrikiText></Pressable></Animated.View>
        <Pressable onPress={() => send("kiss")} style={styles.affectionButton}><Ionicons name="heart-outline" size={34} color={colors.accent}/><PrikiText variant="title">Virtual Kiss</PrikiText><PrikiText variant="caption" style={styles.muted}>A kiss, from here</PrikiText></Pressable>
      </View>
      {feedback ? <PrikiText variant="caption" style={styles.feedback}>{feedback}</PrikiText> : null}
      <Pressable onPress={() => Alert.alert("Send a mock affection", "Choose what Sam sends you.", [{ text: "Cancel", style: "cancel" }, { text: "Virtual hug", onPress: () => simulatePartnerAffection("hug") }, { text: "Virtual kiss", onPress: () => simulatePartnerAffection("kiss") }])} style={styles.simulate}><Ionicons name="swap-horizontal-outline" size={16} color={colors.accent}/><PrikiText variant="caption" style={styles.simulateText}>Simulate receiving affection</PrikiText></Pressable>
    </SurfaceCard>
    <SurfaceCard style={styles.jarCard}>
      <View style={styles.jarIcon}><Ionicons name="heart-half-outline" size={38} color={colors.accent}/></View>
      <PrikiText variant="h2">Reasons I Love You</PrikiText><PrikiText variant="caption" style={styles.muted}>A little jar filled with all the reasons, big and small.</PrikiText>
      <PrikiText variant="display" style={styles.count}>{reasons.length}</PrikiText><PrikiText variant="caption" style={styles.muted}>reasons tucked inside</PrikiText>
      <PrimaryButton title="Open our jar" onPress={() => router.push("/(tabs)/affection/jar")} style={styles.jarAction}/>
    </SurfaceCard>
    <View style={styles.activitySection}><SectionHeader title="Recent little moments" actionLabel="View all" onActionPress={() => router.push("/(tabs)/affection/activity")}/>
      {activities.slice(0, 3).map(item => <View key={item.id} style={styles.activity}><View style={styles.activityIcon}><Ionicons name={item.type === "hug" ? "heart-circle-outline" : "heart-outline"} size={20} color={colors.accent}/></View><View style={{ flex: 1 }}><PrikiText variant="title" style={styles.activityTitle}>{item.sender.id === "you" ? "You sent" : "Sam sent"} a little {item.type}</PrikiText><PrikiText variant="caption" style={styles.muted}>{timeLabel(item.createdAt)} · {item.status === "read" ? "Seen" : "Received"}</PrikiText></View></View>)}
    </View>
  </ScreenContainer>;
}
const styles=StyleSheet.create({content:{paddingTop:spacing.md,paddingBottom:140,gap:spacing.xl},intro:{gap:2},accent:{color:colors.accent},sub:{color:colors.textSecondary,marginTop:spacing.sm},sendCard:{gap:spacing.md},muted:{color:colors.textSecondary},sendRow:{flexDirection:"row",gap:spacing.sm},affectionButton:{minHeight:128,borderRadius:radius.lg,backgroundColor:colors.surfaceMuted,alignItems:"center",justifyContent:"center",gap:spacing.xs,padding:spacing.sm},feedback:{color:colors.accent,textAlign:"center",fontWeight:"600"},simulate:{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:spacing.xs,paddingTop:spacing.xs},simulateText:{color:colors.accent},jarCard:{alignItems:"center",gap:spacing.sm,paddingVertical:spacing.xl},jarIcon:{width:78,height:78,borderRadius:39,backgroundColor:colors.surfaceMuted,alignItems:"center",justifyContent:"center",marginBottom:spacing.xs},count:{fontSize:38,color:colors.accent,marginTop:spacing.sm},jarAction:{width:"100%",marginTop:spacing.md},activitySection:{gap:spacing.md},activity:{flexDirection:"row",alignItems:"center",gap:spacing.md,paddingVertical:spacing.sm,borderBottomWidth:1,borderBottomColor:colors.border},activityIcon:{width:42,height:42,borderRadius:21,backgroundColor:colors.surfaceMuted,alignItems:"center",justifyContent:"center"},activityTitle:{fontSize:14}});
