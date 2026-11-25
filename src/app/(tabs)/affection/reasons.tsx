import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { AppHeader, PrikiText, PrimaryButton, ScreenContainer } from "@/components";
import { mockCouple } from "@/data/mockData";
import { ReasonCard } from "@/features/affection/components/ReasonCard";
import { useAffection } from "@/features/affection/AffectionProvider";
import { colors, spacing } from "@/theme";
export default function ReasonsListScreen(){const router=useRouter();const {reasons,toggleFavorite,deleteReason}=useAffection();return <ScreenContainer contentStyle={styles.content}><AppHeader title="All our reasons"/><PrimaryButton title="＋  Add a reason" onPress={()=>router.push("/(tabs)/affection/add-reason")}/>{reasons.length?reasons.map(reason=><ReasonCard key={reason.id} reason={reason} onPress={()=>router.push({pathname:"/(tabs)/affection/reason/[id]",params:{id:reason.id}})} onFavorite={()=>toggleFavorite(reason.id)} onDelete={reason.creator.id===mockCouple.currentUser.id?()=>Alert.alert("Delete this reason?","It will be removed from your jar.",[{text:"Cancel",style:"cancel"},{text:"Delete",style:"destructive",onPress:()=>deleteReason(reason.id)}]):undefined}/>):<View style={styles.empty}><PrikiText variant="title">Your jar is waiting</PrikiText><PrikiText variant="caption" style={styles.muted}>Add the first little reason you love each other.</PrikiText></View>}</ScreenContainer>}
const styles=StyleSheet.create({content:{paddingTop:spacing.md,paddingBottom:130,gap:spacing.md},empty:{padding:spacing["2xl"],alignItems:"center",gap:spacing.sm},muted:{color:colors.textSecondary}});
