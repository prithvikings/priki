import { useMemo } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PrikiText, ScreenContainer } from "@/components";
import { colors, spacing } from "@/theme";
import { NoteComposer } from "@/features/notes/components/NoteComposer";
import { useNotes } from "@/features/notes/NotesProvider";

export default function ComposeNoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{id?:string}>();
  const {notes,createNote,updateNote,cancelScheduled} = useNotes();
  const editingNote = useMemo(()=>notes.find(note=>note.id===params.id),[notes,params.id]);
  const finish = (message:string)=>Alert.alert("Love Notes",message,[{text:"Done",onPress:()=>router.back()}]);
  const saveDraft = (input:Parameters<typeof createNote>[0])=>{if(editingNote) updateNote(editingNote.id,input,"draft"); else createNote(input,"draft"); finish("Your note has been saved as a draft.");};
  const send = (input:Parameters<typeof createNote>[0])=>{if(editingNote) updateNote(editingNote.id,input,"sent"); else createNote(input,"sent"); finish("Your note is marked as sent in this local preview.");};
  const schedule = (input:Parameters<typeof createNote>[0])=>{if(editingNote) updateNote(editingNote.id,input,"scheduled"); else createNote(input,"scheduled"); finish("Your note is scheduled in this local preview. Background delivery is not enabled.");};

  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" onPress={()=>router.back()} style={styles.back}><Ionicons name="chevron-back" size={22} color={colors.text}/></Pressable>
        <PrikiText variant="title">{editingNote?"Edit your note":"Write a Love Note"}</PrikiText>
        <View style={styles.back}/>
      </View>
      <View style={styles.intro}>
        <PrikiText variant="display">{editingNote?"A few words, refined.":"A little letter."}</PrikiText>
        <PrikiText variant="caption">Take your time. The thoughtful things deserve a moment.</PrikiText>
      </View>
      <NoteComposer
        initialTitle={editingNote?.title}
        initialBody={editingNote?.body}
        initialSchedule={editingNote?.scheduledFor}
        initialPhotoUri={editingNote?.photoUri}
        submitLabel={editingNote?"Save changes":"Send now"}
        onSubmit={send}
        onSaveDraft={saveDraft}
        onSchedule={schedule}
        onCancel={()=>router.back()}
      />
      {editingNote?.status==="scheduled" ? <Pressable onPress={()=>{cancelScheduled(editingNote.id);router.back();}} style={styles.cancelSchedule}><PrikiText variant="caption" style={styles.cancelText}>Cancel scheduled note</PrikiText></Pressable>:null}
    </ScreenContainer>
  );
}
const styles=StyleSheet.create({
 content:{paddingTop:spacing.md,paddingBottom:150,gap:spacing.lg},
 topBar:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
 back:{width:40,height:40,justifyContent:"center"},
 intro:{gap:spacing.xs},
 cancelSchedule:{alignItems:"center",padding:spacing.md},
 cancelText:{color:colors.accent,fontWeight:"600"},
});
