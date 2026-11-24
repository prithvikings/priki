import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, radius, spacing } from "@/theme";
import { PrikiText } from "@/components/PrikiText";
import { PrimaryButton } from "@/components/PrimaryButton";

const MAX_LENGTH = 800;

type Props = {
  initialValue?: string;
  onSubmit: (answer: string) => void;
  submitLabel: string;
};

export function AnswerComposer({ initialValue = "", onSubmit, submitLabel }: Props) {
  const [answer, setAnswer] = useState(initialValue);
  const [error, setError] = useState("");

  const submit = () => {
    if (!answer.trim()) {
      setError("Add a few words before saving your answer.");
      return;
    }
    onSubmit(answer.trim());
    setError("");
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.heading}>
        <PrikiText variant="title">Your answer</PrikiText>
        <PrikiText variant="caption" style={styles.count}>{answer.length}/{MAX_LENGTH}</PrikiText>
      </View>
      <TextInput
        value={answer}
        onChangeText={(value) => { setAnswer(value.slice(0, MAX_LENGTH)); if (error) setError(""); }}
        placeholder="Write what's on your mind..."
        placeholderTextColor={colors.textTertiary}
        multiline
        textAlignVertical="top"
        maxLength={MAX_LENGTH}
        style={styles.input}
        accessibilityLabel="Your answer to today's question"
      />
      {error ? <PrikiText variant="caption" style={styles.error}>{error}</PrikiText> : null}
      <PrimaryButton title={submitLabel} onPress={submit} />
      <PrikiText variant="caption" style={styles.privacy}>Only you can see your answer until your partner has answered too.</PrikiText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.md },
  heading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  count: { fontVariant: ["tabular-nums"] },
  input: { minHeight: 156, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surface, padding: spacing.lg, color: colors.text, fontSize: 15, lineHeight: 24 },
  error: { color: colors.accent, fontWeight: "600" },
  privacy: { textAlign: "center" },
});
