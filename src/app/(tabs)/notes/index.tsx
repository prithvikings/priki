import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, PrikiText, ScreenContainer, SurfaceCard } from "@/components";
import { colors, radius, spacing } from "@/theme";
import { useNotes } from "@/features/notes/NotesProvider";
import { NoteCard } from "@/features/notes/components/NoteCard";
import { NotesFilter } from "@/features/notes/components/NotesFilter";
import { EmptyNotes } from "@/features/notes/components/EmptyNotes";
import type { NoteFilter } from "@/features/notes/types";

export default function NotesInboxScreen() {
  const router = useRouter();
  const { notes, toggleFavorite } = useNotes();
  const [filter, setFilter] = useState<NoteFilter>("all");
  const filteredNotes = useMemo(() => notes.filter((note) => {
    if (filter === "received") return note.recipientId === "you" && note.status !== "draft" && note.status !== "scheduled";
    if (filter === "sent") return note.senderId === "you" && note.status !== "draft" && note.status !== "scheduled";
    if (filter === "favorites") return note.isFavorite;
    return true;
  }).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [notes, filter]);
  const empty = {
    all: ["Nothing here yet", "Your little letters will find a home here."],
    received: ["No notes received", "When your partner sends a note, it will appear here."],
    sent: ["No notes sent yet", "Write the first little letter and send it their way."],
    favorites: ["No favorites yet", "Save the notes you want to keep close."],
  }[filter];

  return (
    <ScreenContainer contentStyle={styles.content}>
      <AppHeader title="" eyebrow="" />
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <PrikiText variant="display" style={styles.title}>Love Notes</PrikiText>
          <PrikiText variant="body" style={styles.subtitle}>Little words, kept close.</PrikiText>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push("/(tabs)/notes/compose")} style={({pressed}) => [styles.compose,pressed&&styles.pressed]}>
          <Ionicons name="pencil-outline" size={18} color={colors.white}/>
          <PrikiText variant="button" style={styles.composeText}>Compose</PrikiText>
        </Pressable>
      </View>
      <NotesFilter value={filter} onChange={setFilter}/>
      <View style={styles.meta}>
        <PrikiText variant="caption">{filteredNotes.length} {filteredNotes.length===1?"note":"notes"}</PrikiText>
        <View style={styles.private}><Ionicons name="lock-closed-outline" size={12} color={colors.textSecondary}/><PrikiText variant="caption">Just between you two</PrikiText></View>
      </View>
      <View style={styles.list}>
        {filteredNotes.length ? filteredNotes.map(note=>(
          <NoteCard key={note.id} note={note}
            onPress={()=>router.push({pathname:"/(tabs)/notes/[id]",params:{id:note.id}})}
            onFavorite={()=>toggleFavorite(note.id)}
          />
        )) : <SurfaceCard><EmptyNotes title={empty[0]} description={empty[1]} onCompose={filter==="all"||filter==="sent"?()=>router.push("/(tabs)/notes/compose"):undefined}/></SurfaceCard>}
      </View>
    </ScreenContainer>
  );
}
const styles=StyleSheet.create({
 content:{paddingTop:spacing.md,paddingBottom:140,gap:spacing.lg},
 heading:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:spacing.md},
 headingText:{flex:1,gap:spacing.xs},
 title:{fontSize:31,lineHeight:38},
 subtitle:{color:colors.textSecondary},
 compose:{minHeight:46,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:spacing.xs,paddingHorizontal:spacing.md,backgroundColor:colors.primary,borderRadius:radius.lg},
 composeText:{color:colors.white,fontSize:13},
 meta:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
 private:{flexDirection:"row",alignItems:"center",gap:4},
 list:{gap:spacing.md},
 pressed:{opacity:0.84},
});
