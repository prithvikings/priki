import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PrikiText, ScreenContainer, SecondaryButton } from "@/components";
import { colors, radius, spacing } from "@/theme";
import { useNotes } from "@/features/notes/NotesProvider";
import { NoteLetter } from "@/features/notes/components/NoteLetter";
import { formatSchedule, formatNoteDate } from "@/features/notes/dateUtils";

export default function NoteDetailScreen() {
  const {id}=useLocalSearchParams<{id:string}>();
  const router=useRouter();
  const {notes,markOpened,toggleHeart,cancelScheduled}=useNotes();
  const note=notes.find(item=>item.id===id);

  if(!note) return <ScreenContainer contentStyle={styles.content}><PrikiText variant="h2">This note isn't here.</PrikiText><SecondaryButton title="Back to Love Notes" onPress={()=>router.back()}/></ScreenContainer>;

  const received=note.senderId==="partner";
  const editable=note.senderId==="you";
  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" onPress={()=>router.back()} style={styles.iconButton}><Ionicons name="chevron-back" size={23} color={colors.text}/></Pressable>
        <PrikiText variant="title">A note for you</PrikiText>
        <View style={styles.iconButton}/>
      </View>
      <View style={styles.intro}>
        <PrikiText variant="display" style={styles.introTitle}>{received?"Someone thought of you.":"A note from you."}</PrikiText>
        <PrikiText variant="caption">{received?"A little piece of them, delivered to you.":`For ${note.recipientName}`}</PrikiText>
      </View>
      {note.status === "delivered" ? <Pressable accessibilityRole="button" onPress={() => markOpened(note.id)}><PrikiText variant="caption" style={styles.openState}>Mark this letter as opened</PrikiText></Pressable> : null}
      <NoteLetter note={note}/>
      {note.status==="scheduled"&&note.scheduledFor ? <View style={styles.scheduledBox}><Ionicons name="calendar-outline" size={18} color={colors.accent}/><PrikiText variant="caption" style={styles.scheduledText}>Scheduled for {formatSchedule(note.scheduledFor)}</PrikiText></View>:null}
      {note.updatedAt?<PrikiText variant="caption" style={styles.edited}>Edited · {formatNoteDate(note.updatedAt)}</PrikiText>:null}
      <View style={styles.actions}>
        {received?<Pressable accessibilityRole="button" onPress={()=>{markOpened(note.id);toggleHeart(note.id);}} style={({pressed})=>[styles.heartButton,note.isHearted&&styles.hearted,pressed&&styles.pressed]}><Ionicons name={note.isHearted?"heart":"heart-outline"} size={21} color={colors.accent}/><PrikiText variant="button" style={styles.heartText}>{note.isHearted?"Heart added":"Send a heart"}</PrikiText></Pressable>:null}
        {editable?<SecondaryButton title={note.status==="scheduled"?"Edit scheduled note":"Edit note"} onPress={()=>router.push({pathname:"/(tabs)/notes/compose",params:{id:note.id}})}/>:null}
        {note.status==="scheduled"?<SecondaryButton title="Cancel schedule" onPress={()=>{cancelScheduled(note.id);router.back();}}/>:null}
        {received&&note.status==="delivered"?<PrikiText variant="caption" style={styles.openState}>Opening this letter marks it as opened.</PrikiText>:null}
      </View>
    </ScreenContainer>
  );
}
const styles=StyleSheet.create({
 content:{paddingTop:spacing.md,paddingBottom:145,gap:spacing.lg},
 topBar:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
 iconButton:{width:40,height:40,justifyContent:"center"},
 intro:{gap:spacing.xs},
 introTitle:{fontSize:29,lineHeight:37},
 scheduledBox:{flexDirection:"row",alignItems:"center",gap:spacing.sm,padding:spacing.md,borderRadius:radius.md,backgroundColor:colors.surfaceMuted},
 scheduledText:{color:colors.accent,flex:1},
 edited:{color:colors.accent,fontStyle:"italic"},
 actions:{gap:spacing.md},
 heartButton:{minHeight:52,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:spacing.sm,borderRadius:radius.lg,backgroundColor:"#FCEDEF",borderWidth:1,borderColor:colors.border},
 hearted:{backgroundColor:"#F7DDE3",borderColor:colors.primary},
 heartText:{color:colors.accent},
 openState:{textAlign:"center"},
 pressed:{opacity:0.82},
});
