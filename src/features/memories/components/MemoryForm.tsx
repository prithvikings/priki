import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PrikiText } from "@/components/PrikiText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { colors, radius, spacing } from "@/theme";
import { isValidMemoryDate } from "../dateUtils";
import type { MemoryDraftInput } from "../types";
import { MemoryArtwork } from "./MemoryArtwork";

type Props = { initialValue?: MemoryDraftInput; submitLabel: string; onSave: (input: MemoryDraftInput) => void; onCancel: () => void };
export function MemoryForm({ initialValue, submitLabel, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [description, setDescription] = useState(initialValue?.description ?? "");
  const [memoryDate, setMemoryDate] = useState(initialValue?.memoryDate ?? new Date().toISOString().slice(0, 10));
  const [imageRef, setImageRef] = useState<string | null>(initialValue?.imageRef ?? null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const save = () => {
    if (saving) return;
    if (!title.trim()) { setError("Give this memory a title before saving."); return; }
    if (!isValidMemoryDate(memoryDate)) { setError("Enter a valid date that is not in the future (YYYY-MM-DD)."); return; }
    setSaving(true);
    onSave({ title: title.trim(), description: description.trim(), memoryDate, imageRef });
  };

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <PrikiText variant="caption" style={styles.label}>MEMORY TITLE *</PrikiText>
        <TextInput value={title} onChangeText={value => { setTitle(value); setError(""); setSaving(false); }} maxLength={90} placeholder="A moment we'll want to remember" placeholderTextColor={colors.textTertiary} style={styles.input} />
      </View>
      <View style={styles.field}>
        <PrikiText variant="caption" style={styles.label}>A LITTLE STORY</PrikiText>
        <TextInput value={description} onChangeText={setDescription} multiline maxLength={600} textAlignVertical="top" placeholder="What made this moment special?" placeholderTextColor={colors.textTertiary} style={[styles.input, styles.description]} />
      </View>
      <View style={styles.field}>
        <PrikiText variant="caption" style={styles.label}>WHEN DID IT HAPPEN? *</PrikiText>
        <TextInput value={memoryDate} onChangeText={value => { setMemoryDate(value); setError(""); setSaving(false); }} placeholder="YYYY-MM-DD" autoCapitalize="none" style={styles.input} />
        <PrikiText variant="caption" style={styles.hint}>Use YYYY-MM-DD. Future dates are not saved as past memories.</PrikiText>
      </View>
      <View style={styles.field}>
        <PrikiText variant="caption" style={styles.label}>PHOTO (OPTIONAL)</PrikiText>
        {imageRef ? <MemoryArtwork imageRef={imageRef} style={styles.preview} /> : null}
        <Pressable onPress={() => { setImageRef(current => current ? null : "mock-sunset"); setSaving(false); }} style={styles.photoButton}>
          <Ionicons name={imageRef ? "close-circle-outline" : "image-outline"} size={20} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <PrikiText variant="title" style={styles.photoTitle}>{imageRef ? "Remove mock photo" : "Add a scrapbook photo"}</PrikiText>
            <PrikiText variant="caption" style={styles.hint}>Prototype preview · no upload required</PrikiText>
          </View>
          <Ionicons name={imageRef ? "close" : "add"} size={20} color={colors.textSecondary} />
        </Pressable>
      </View>
      {error ? <PrikiText variant="caption" style={styles.error}>{error}</PrikiText> : null}
      <View style={styles.actions}>
        <SecondaryButton title="Cancel" onPress={onCancel} style={styles.action} />
        <PrimaryButton title={submitLabel} onPress={save} disabled={saving} style={styles.action} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  field: { gap: spacing.sm },
  label: { color: colors.textSecondary, letterSpacing: 0.8, fontSize: 11, fontWeight: "700" },
  input: { minHeight: 52, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: spacing.md, color: colors.text, fontSize: 15 },
  description: { minHeight: 132, paddingTop: spacing.md },
  hint: { color: colors.textTertiary, fontSize: 11 },
  preview: { height: 132 },
  photoButton: { minHeight: 68, borderWidth: 1, borderStyle: "dashed", borderColor: colors.borderStrong, borderRadius: radius.lg, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface },
  photoTitle: { fontSize: 14 },
  error: { color: colors.accent, fontWeight: "600" },
  actions: { flexDirection: "row", gap: spacing.sm },
  action: { flex: 1 },
});
