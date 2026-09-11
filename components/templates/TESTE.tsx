import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorld } from "../../context/WorldContext";

type MatchOption = {
  label: string;
  value: string;
};

type ImageMatchActivityProps = {
  question?: string;
  targetImage: any;
  options?: MatchOption[];
  correctAnswer: string;
  nextRoute: string;
  wrongRoute: string;
  progress?: number;
};

export default function ImageMatchActivity({
  question = "Selecione o nome do item com a imagem.",
  targetImage,
  options = [
    { label: "LÁPIS", value: "lapis" },
    { label: "MESA", value: "mesa" },
    { label: "CHINELO", value: "chinelo" },
    { label: "BANANA", value: "banana" },
  ],
  correctAnswer = "chinelo",
  nextRoute,
  wrongRoute,
  progress = 0.85,
}: ImageMatchActivityProps) {
  const router = useRouter();
  const { addActivityResult } = useWorld();
  const [startTime] = useState(Date.now());
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const verifyDisabled = useMemo(() => !selected, [selected]);

  const handleVerify = () => {
    if (!selected) return;

    const correct = selected.toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setFeedback(correct ? "correct" : "wrong");
  };

  const handleNext = () => {
    const endTime = Date.now();
    const timeSpentMs = endTime - startTime;

    // Garante pelo menos 1 segundo
    const timeSeconds = Math.max(
      1,
      Math.floor(timeSpentMs / 1000)
    );

    const xp = isCorrect ? 4 : 0;

    // Registra TODAS as questões, inclusive as erradas.
    addActivityResult({
      id: Date.now().toString(),
      xp,
      timeSeconds,
      correct: isCorrect ? 1 : 0,
      total: 1,
    });

    const accuracy = isCorrect ? 100 : 0;
    const route = isCorrect ? nextRoute : wrongRoute;
    const href =
      `${route}?xp=${xp}&accuracy=${accuracy}&timeSpent=${timeSpentMs}` as Href;

    router.push(href);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.closeIcon}>×</Text>
        </Pressable>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{question}</Text>

        <View style={styles.gameArea}>
          <View style={styles.optionsColumn}>
            {options.map((item) => {
              const isSelected = selected === item.value;
              const isCorrectOption =
                feedback !== null &&
                item.value.toLowerCase() === correctAnswer.toLowerCase();
              const isWrongOption =
                feedback !== null &&
                isSelected &&
                item.value.toLowerCase() !== correctAnswer.toLowerCase();

              return (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    if (feedback === null) setSelected(item.value);
                  }}
                  style={({ pressed }) => [
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    isCorrectOption && styles.optionCorrect,
                    isWrongOption && styles.optionWrong,
                    pressed && feedback === null && styles.optionPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                      isCorrectOption && styles.optionTextCorrect,
                      isWrongOption && styles.optionTextWrong,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.imageCard}>
            <Image source={targetImage} style={styles.itemImage} />
          </View>
        </View>

        {feedback === "correct" && (
          <Text style={styles.correctMessage}>Resposta correta!</Text>
        )}

        {feedback === "wrong" && (
          <Text style={styles.wrongMessage}>Resposta errada.</Text>
        )}

        <Pressable
          onPress={handleVerify}
          disabled={verifyDisabled || feedback !== null}
          style={({ pressed }) => [
            styles.verifyButton,
            verifyDisabled && styles.verifyButtonDisabled,
            pressed &&
              !verifyDisabled &&
              feedback === null &&
              styles.verifyButtonPressed,
          ]}
        >
          <Text style={styles.verifyText}>VERIFICAR</Text>
        </Pressable>

        {feedback !== null && (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextButton,
              pressed && styles.nextButtonPressed,
            ]}
          >
            <Text style={styles.nextText}>PRÓXIMO</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5B5B5B",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  closeIcon: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 32,
    marginRight: 12,
    marginTop: -2,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#D9D9D9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1CC5D3",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },
  question: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "left",
    alignSelf: "flex-start",
    maxWidth: 240,
    lineHeight: 28,
    marginBottom: 28,
  },
  gameArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  optionsColumn: {
    gap: 14,
  },
  optionButton: {
    width: 140,
    height: 48,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: "#1CC5D3",
  },
  optionCorrect: {
    backgroundColor: "#7CDB8A",
    borderWidth: 2,
    borderColor: "#2E9E45",
  },
  optionWrong: {
    backgroundColor: "#F28B82",
    borderWidth: 2,
    borderColor: "#D64545",
  },
  optionText: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "500",
  },
  optionTextSelected: {
    fontWeight: "700",
  },
  optionTextCorrect: {
    color: "#0F3D16",
  },
  optionTextWrong: {
    color: "#5A1414",
  },
  imageCard: {
    width: 130,
    height: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  correctMessage: {
    marginTop: 12,
    color: "#7CDB8A",
    fontSize: 18,
    fontWeight: "600",
  },
  wrongMessage: {
    marginTop: 12,
    color: "#F28B82",
    fontSize: 18,
    fontWeight: "600",
  },
  verifyButton: {
    marginTop: 24,
    width: 240,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1CC5D3",
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  verifyButtonDisabled: {
    opacity: 0.45,
  },
  verifyText: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
  },
  nextButton: {
    marginTop: 12,
    width: 240,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  nextText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
  },
});
 