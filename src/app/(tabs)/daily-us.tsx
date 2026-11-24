import { StyleSheet,View } from "react-native";
import { AppHeader,PrikiText,ScreenContainer,SurfaceCard } from "@/components";
import { colors,spacing } from "@/theme";
import { tabPlaceholders } from "@/data/mockData";
export default function DailyUsScreen(){const page=tabPlaceholders.dailyUs;return <ScreenContainer contentStyle={styles.content}><AppHeader title={page.title} eyebrow="YOUR LITTLE DAILY PAUSE"/><View style={styles.intro}><PrikiText variant="h1">{page.title}</PrikiText><PrikiText variant="body" style={styles.subtitle}>{page.subtitle}</PrikiText></View><SurfaceCard style={styles.card}><PrikiText variant="caption" style={styles.cardText}>A shared moment will live here.</PrikiText></SurfaceCard></ScreenContainer>;}
const styles=StyleSheet.create({content:{paddingTop:spacing.xl},intro:{marginTop:spacing["2xl"],marginBottom:spacing.xl,gap:spacing.xs},subtitle:{color:colors.textSecondary},card:{minHeight:116,alignItems:"center",justifyContent:"center"},cardText:{textAlign:"center"}});
