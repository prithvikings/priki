import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { isValidFutureDate, formatSchedule } from "../dateUtils";
import type { NoteDraftInput } from "../types";

const MAX_LENGTH = 1200;

type Props = {
  initialTitle?: string;
  initialBody?: string;
  initialSchedule?: string | null;
  initialPhotoUri?: string | null;
  submitLabel: string;
  onSubmit: (input: NoteDraftInput) => void;
  onSaveDraft: (input: NoteDraftInput) => void;
  onCancel: () => void;
  onSchedule: (input: NoteDraftInput) => void;
};

function localDateTimeValue(date: Date) {
  const pad = (number: number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function NoteComposer({
  initialTitle = "",
  initialBody = "",
  initialSchedule = null,
  initialPhotoUri = null,
  submitLabel,
  onSubmit,
  onSaveDraft,
  onCancel,
  onSchedule,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [photoUri, setPhotoUri] = useState<string | null>(initialPhotoUri);
  const [showScheduler, setShowScheduler] = useState(Boolean(initialSchedule));
  const [scheduleValue, setScheduleValue] = useState(() => (initialSchedule ? localDateTimeValue(new Date(initialSchedule)) : localDateTimeValue(new Date(Date.now() + 86_400_000))));
  const [error, setError] = useState("");

  const getInput = (): NoteDraftInput => ({ title, body, photoUri, scheduledFor: null });

  const validate = () => {
    if (!body.trim()) {
      setError("Write a little something before saving your note.");
      return false;
    }
    if (body.length > MAX_LENGTH) {
      setError("Your note is longer than the allowed limit.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSchedule = () => {
    if (!body.trim()) {
      setError("Write a message before scheduling your note.");
      return;
    }
    const selected = new Date(scheduleValue);
    if (Number.isNaN(selected.getTime()) || !isValidFutureDate(selected.toISOString())) {
      setError("Choose a future date and time.");
      return;
    }
    onSchedule({ ...getInput(), scheduledFor: selected.toISOString() });
  };

  return (
    <View style={styles.form}>
      <View style={styles.envelopeTop}>
        <Ionicons name="mail-outline" size={22} color={colors.accent} />
        <PrikiText variant="caption" style={styles.envelopeText}>A letter, just for Sam</PrikiText>
      </View>
      <View style={styles.field}>
        <PrikiText variant="caption" style={styles.label}>TITLE (OPTIONAL)</PrikiText>
        <TextInput value={title} onChangeText={setTitle} placeholder="Give your note a title" placeholderTextColor={colors.textTertiary} style={styles.titleInput} maxLength={80} returnKeyType="next" />
      </View>
      <View style={styles.field}>
        <View style={styles.bodyHeading}>
          <PrikiText variant="caption" style={styles.label}>YOUR MESSAGE</PrikiText>
          <PrikiText variant="caption" style={styles.counter}>{body.length}/{MAX_LENGTH}</PrikiText>
        </View>
        <TextInput
          value={body}
          onChangeText={(value) => { setBody(value.slice(0, MAX_LENGTH)); if (error) setError(""); }}
          placeholder="Write from the heart..."
          placeholderTextColor={colors.textTertiary}
          style={styles.bodyInput}
          multiline
          textAlignVertical="top"
          maxLength={MAX_LENGTH}
        />
      </View>
      <Pressable onPress={() => setPhotoUri(photoUri ? null : "local-photo-placeholder")} style={styles.attachment}>
        <Ionicons name={photoUri ? "image" : "image-outline"} size={20} color={colors.accent} />
        <View style={styles.attachmentCopy}>
          <PrikiText variant="title" style={styles.attachmentTitle}>{photoUri ? "Photo placeholder attached" : "Add a little photo"}</PrikiText>
          <PrikiText variant="caption">Visual preview only · uploads aren&apos;t enabled</PrikiText>
        </View>
        <Ionicons name={photoUri ? "close-circle" : "add-circle-outline"} size={20} color={colors.textSecondary} />
      </Pressable>
      {showScheduler ? (
        <View style={styles.scheduler}>
          <View style={styles.schedulerHeading}>
            <PrikiText variant="title">Schedule this note</PrikiText>
            <Pressable onPress={() => setShowScheduler(false)}><PrikiText variant="caption" style={styles.removeSchedule}>Remove</PrikiText></Pressable>
          </View>
          <View style={styles.dateTimeRow}>
            <TextInput value={scheduleValue.slice(0,10)} onChangeText={(value) => setScheduleValue(`${value}T${scheduleValue.slice(11,16)}`)} placeholder="YYYY-MM-DD" style={[styles.dateInput, styles.dateField]} autoCapitalize="none" />
            <TextInput value={scheduleValue.slice(11,16)} onChangeText={(value) => setScheduleValue(`${scheduleValue.slice(0,10)}T${value}`)} placeholder="HH:mm" style={[styles.dateInput, styles.timeField]} autoCapitalize="none" />
          </View>
          <PrikiText variant="caption">Use your device&apos;s local date and time. The selected time must be in the future.</PrikiText>
          {scheduleValue && !Number.isNaN(new Date(scheduleValue).getTime()) ? <PrikiText variant="caption" style={styles.scheduledPreview}>Planned for {formatSchedule(new Date(scheduleValue).toISOString())}</PrikiText> : null}
          <SecondaryButton title="Confirm schedule" onPress={handleSchedule} />
        </View>
      ) : (
        <SecondaryButton title="Schedule for later" onPress={() => { setShowScheduler(true); setError(""); }} />
      )}
      {error ? <PrikiText variant="caption" style={styles.error}>{error}</PrikiText> : null}
      <View style={styles.buttonRow}>
        <SecondaryButton title="Cancel" onPress={onCancel} style={styles.halfButton} />
        <SecondaryButton title="Save draft" onPress={() => { if (validate()) onSaveDraft(getInput()); }} style={styles.halfButton} />
      </View>
      <PrimaryButton title={submitLabel} onPress={() => { if (validate()) onSubmit(getInput()); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  envelopeTop: { flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.surfaceMuted },
  envelopeText: { color: colors.accent },
  field: { gap: spacing.sm },
  label: { color: colors.textSecondary, letterSpacing: 0.8, fontSize: 11, fontWeight: "700" },
  titleInput: { minHeight: 52, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: spacing.md, color: colors.text, fontSize: 16 },
  bodyHeading: { flexDirection: "row", justifyContent: "space-between" },
  counter: { fontVariant: ["tabular-nums"] },
  bodyInput: { minHeight: 210, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, color: colors.text, fontSize: 15, lineHeight: 24 },
  attachment: { flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: 1, borderColor: colors.border, borderStyle: "dashed", borderRadius: radius.lg, padding: spacing.md, backgroundColor: colors.surface },
  attachmentCopy: { flex: 1, gap: 2 },
  attachmentTitle: { fontSize: 14 },
  scheduler: { padding: spacing.md, gap: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceMuted },
  schedulerHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  removeSchedule: { color: colors.accent },
  dateTimeRow: { flexDirection: "row", gap: spacing.sm },
  dateField: { flex: 1 },
  timeField: { width: 100 },
  dateInput: { minHeight: 48, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, color: colors.text },
  scheduledPreview: { color: colors.accent, fontWeight: "600" },
  error: { color: colors.accent, fontWeight: "600" },
  buttonRow: { flexDirection: "row", gap: spacing.sm },
  halfButton: { flex: 1 },
});
