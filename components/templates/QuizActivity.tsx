import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorld } from "../../context/WorldContext";

type QuizMode = "text" | "image" | "writing";

type Option = {
  label?: string;
  value: string;
  image?: any;
};

type QuizActivityProps = {
  mode: QuizMode;
  question: string;
  questionImage?: any;
  options?: Option[];
  correctAnswer: string;
  nextRoute: string;
  wrongRoute: string;
  placeholder?: string;
  progress?: number;
};

export default function QuizActivity({
  mode,
  question,
  questionImage,
  options = [],
  correctAnswer,
  nextRoute,
  wrongRoute,
  placeholder = "digite sua resposta",
  progress = 0,
}: QuizActivityProps) {
  const router = useRouter();
  const { addActivityResult } = useWorld();
  const [startTime] = useState(Date.now());
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const verifyDisabled = useMemo(() => {
    if (mode === "writing") return typedAnswer.trim().length === 0;
    return !selected;
  }, [mode, selected, typedAnswer]);

  const handleVerify = () => {
    const answer =
      mode === "writing"
        ? typedAnswer.trim().toLowerCase()
        : selected;
    if (!answer) return;

    const correct = answer === correctAnswer.toLowerCase();
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


  const renderQuestion = () => {
    if (mode === "image" && questionImage) {
      return <Image source={questionImage} style={styles.questionImage} />;
    }

    return <Text style={styles.question}>{question}</Text>;
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
        {renderQuestion()}

        {mode === "writing" ? (
          <TextInput
            value={typedAnswer}
            onChangeText={setTypedAnswer}
            placeholder={placeholder}
            placeholderTextColor="#777"
            style={styles.input}
            autoCapitalize="none"
          />
        ) : (
          <View style={styles.grid}>
            {options.map((item) => {
              const isSelected = selected === item.value;
              const isCorrectOption = feedback !== null && item.value === correctAnswer;
              const isWrongOption =
                feedback !== null && isSelected && item.value !== correctAnswer;

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
                  {item.image ? (
                    <Image source={item.image} style={styles.optionImage} />
                  ) : (
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
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

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
      pressed && !verifyDisabled && feedback === null && styles.verifyButtonPressed,
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
  container: { flex: 1, backgroundColor: "#5B5B5B" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  closeIcon: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 30,
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
  },
  question: {
    color: "#FFFFFF",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 55,
  },
  questionImage: {
    width: 240,
    height: 180,
    resizeMode: "contain",
    marginBottom: 30,
  },
  grid: {
    width: "100%",
    paddingHorizontal: 26,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 26,
  },
  optionButton: {
    width: 134,
    height: 57,
    backgroundColor: "#D9D9D9",
    borderRadius: 9,
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
    fontSize: 28,
  },
  optionTextSelected: { fontWeight: "600" },
  optionTextCorrect: { color: "#0F3D16" },
  optionTextWrong: { color: "#5A1414" },
  optionImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  input: {
    width: "82%",
    height: 54,
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 16,
    color: "#111111",
    fontSize: 20,
    marginBottom: 24,
  },
  correctMessage: {
    marginTop: 22,
    color: "#7CDB8A",
    fontSize: 18,
    fontWeight: "600",
  },
  wrongMessage: {
    marginTop: 22,
    color: "#F28B82",
    fontSize: 18,
    fontWeight: "600",
  },
  verifyButton: {
    marginTop: 28,
    width: 241,
    height: 41,
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
    fontSize: 22,
    fontWeight: "500",
  },
  nextButton: {
    marginTop: 14,
    width: 241,
    height: 41,
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
    color: "#111111",
    fontSize: 22,
    fontWeight: "500",
  }
});