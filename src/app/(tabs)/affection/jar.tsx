import { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader, PrikiText, PrimaryButton, ScreenContainer, SecondaryButton, SurfaceCard } from "@/components";
import { useAffection } from "@/features/affection/AffectionProvider";
import { colors, spacing } from "@/theme";
export default function LoveJarScreen() {
 const router=useRouter(); const { reasons, pickReason, pickedReason }=useAffection(); const opacity=useRef(new Animated.Value(1)).current;
 const reveal=()=>{opacity.setValue(0);pickReason();Animated.timing(opacity,{toValue:1,duration:350,useNativeDriver:true}).start();};
 return <ScreenContainer contentStyle={styles.content}><AppHeader title="Reasons I Love You" eyebrow="OUR LITTLE KEEPSAKE"/>
 <View style={styles.jar}><Ionicons name="heart-half-outline" size={44} color={colors.accent}/><PrikiText variant="caption" style={styles.jarLabel}>{reasons.length} little reasons, kept close</PrikiText></View>
 <PrikiText variant="h2" style={styles.center}>A reminder, whenever you need one.</PrikiText><PrikiText variant="caption" style={styles.sub}>Pick a reason from your shared jar. There’s no order, just a little love.</PrikiText>
 {pickedReason?<Animated.View style={{opacity}}><SurfaceCard style={styles.reveal}><Ionicons name="heart" size={20} color={colors.accent}/><PrikiText variant="h2" style={styles.reason}>{pickedReason.text}</PrikiText><PrikiText variant="caption" style={styles.by}>A reason from {pickedReason.creator.name}</PrikiText></SurfaceCard></Animated.View>:<SurfaceCard style={styles.reveal}><PrikiText variant="body">Your jar is waiting for its first reason.</PrikiText></SurfaceCard>}
 <PrimaryButton title="Pick another reason" onPress={reveal} disabled={reasons.length===0}/><SecondaryButton title="Browse all reasons" onPress={()=>router.push("/(tabs)/affection/reasons")}/><SecondaryButton title="Add a reason" onPress={()=>router.push("/(tabs)/affection/add-reason")}/>
 </ScreenContainer>;
}
const styles=StyleSheet.create({content:{paddingTop:spacing.md,paddingBottom:130,gap:spacing.lg},jar:{height:170,borderRadius:28,backgroundColor:"#F8E5E2",alignItems:"center",justifyContent:"center",gap:spacing.sm,borderWidth:1,borderColor:colors.border},jarLabel:{color:colors.accent},center:{textAlign:"center"},sub:{color:colors.textSecondary,textAlign:"center",lineHeight:21},reveal:{minHeight:160,alignItems:"center",justifyContent:"center",gap:spacing.md,padding:spacing.xl},reason:{textAlign:"center",lineHeight:30},by:{color:colors.textTertiary}});
