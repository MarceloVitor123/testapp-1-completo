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

type QuizMode = "text" | "image" | "writing" | "writingMultiple";

type Option = {
  label?: string;
  value: string;
  image?: any;
};

// Usado nas atividades com várias palavras
type WritingItem = {
  id: string;

  // Exemplo: "J_N_I_O"
  text: string;

  // Exemplo: "JANEIRO"
  answer: string;
};

type QuizActivityProps = {
  mode: QuizMode;

  question: string;

  questionImage?: any;

  options?: Option[];

  // Usado em text, image e writing
  correctAnswer: string;

  nextRoute: string;
  wrongRoute: string;

  placeholder?: string;

  progress?: number;

  // Usado somente no writingMultiple
  writingItems?: WritingItem[];
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
  writingItems = [],
}: QuizActivityProps) {
  const router = useRouter();

  const { addActivityResult } = useWorld();

  // Guarda quando a atividade começou
  const [startTime] = useState(Date.now());

  // Usado nos modos text/image
  const [selected, setSelected] = useState<string | null>(null);

  // Usado no modo writing
  const [typedAnswer, setTypedAnswer] = useState("");

  // Usado no writingMultiple
  //
  // Exemplo:
  // {
  //   "janeiro-1": "A",
  //   "janeiro-2": "E"
  // }
  const [typedAnswers, setTypedAnswers] = useState<Record<string, string>>({});

  // null = ainda não verificou
  // correct = acertou
  // wrong = errou
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Guarda se a atividade inteira está correta
  const [isCorrect, setIsCorrect] = useState(false);

  /*
   * Remove acentos e transforma tudo em minúsculo.
   *
   * Assim:
   * "MARÇO" -> "marco"
   * "Marco" -> "marco"
   *
   * Isso evita problemas na comparação.
   */
  const normalizeAnswer = (value: string) => {
    return value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  /*
   * Verifica se o botão VERIFICAR deve ficar desabilitado.
   */
  const verifyDisabled = useMemo(() => {
    // Atividade de escrever uma resposta
    if (mode === "writing") {
      return typedAnswer.trim().length === 0;
    }

    // Atividade com várias respostas
    if (mode === "writingMultiple") {
      if (writingItems.length === 0) {
        return true;
      }

      /*
       * Verifica se todos os campos foram preenchidos.
       *
       * Cada "_" possui um campo de texto.
       */
      return writingItems.some((item) => {
        const missingCount = (item.text.match(/_/g) || []).length;

        for (let index = 0; index < missingCount; index++) {
          const key = `${item.id}-${index}`;

          if (!typedAnswers[key]?.trim()) {
            return true;
          }
        }

        return false;
      });
    }

    // Text/Image
    return !selected;
  }, [mode, selected, typedAnswer, typedAnswers, writingItems]);

  /*
   * Monta a palavra completa a partir do padrão.
   *
   * Exemplo:
   *
   * pattern:
   * J_N_I_O
   *
   * respostas:
   * A
   * E
   * R
   *
   * resultado:
   * JANEIRO
   */
  const buildWritingAnswer = (item: WritingItem) => {
    let inputIndex = 0;

    let result = "";

    for (const character of item.text) {
      if (character === "_") {
        const key = `${item.id}-${inputIndex}`;

        result += typedAnswers[key] || "";

        inputIndex++;
      } else {
        result += character;
      }
    }

    return result;
  };

  /*
   * Verifica a resposta.
   */
  const handleVerify = () => {
    /*
     * ==========================================
     * VÁRIAS RESPOSTAS
     * ==========================================
     */
    if (mode === "writingMultiple") {
      if (writingItems.length === 0) {
        return;
      }

      const allCorrect = writingItems.every((item) => {
        const userAnswer = buildWritingAnswer(item);

        return normalizeAnswer(userAnswer) === normalizeAnswer(item.answer);
      });

      setIsCorrect(allCorrect);

      setFeedback(allCorrect ? "correct" : "wrong");

      return;
    }

    /*
     * ==========================================
     * UMA RESPOSTA ESCRITA
     * ==========================================
     */
    const answer = mode === "writing" ? typedAnswer.trim() : selected;

    if (!answer) {
      return;
    }

    const correct = normalizeAnswer(answer) === normalizeAnswer(correctAnswer);

    setIsCorrect(correct);

    setFeedback(correct ? "correct" : "wrong");
  };

  /*
   * Vai para a próxima tela.
   */
  const handleNext = () => {
    const endTime = Date.now();

    const timeSpentMs = endTime - startTime;

    // Garante pelo menos 1 segundo
    const timeSeconds = Math.max(1, Math.floor(timeSpentMs / 1000));

    // 4 XP se acertou
    // 0 XP se errou
    const xp = isCorrect ? 4 : 0;

    /*
     * Registra a atividade.
     */
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

  /*
   * Renderiza a pergunta.
   */
  const renderQuestion = () => {
    if (mode === "image" && questionImage) {
      return <Image source={questionImage} style={styles.questionImage} />;
    }

    return <Text style={styles.question}>{question}</Text>;
  };

  /*
   * Renderiza uma atividade de múltiplas respostas.
   * Exemplo:
   * J [A] N [E] I [R] O
   */
  const renderWritingMultiple = () => {
    return (
      <View style={styles.monthsGrid}>
        {writingItems.map((item) => {
          let inputIndex = 0;

          const parts = item.text.split("");

          return (
            <View key={item.id} style={styles.writingItem}>
              <View style={styles.wordContainer}>
                {parts.map((character, index) => {
                  /*
                   * Se for "_", cria um
                   * campo para digitar.
                   */
                  if (character === "_") {
                    const currentIndex = inputIndex;

                    const key = `${item.id}-${currentIndex}`;

                    inputIndex++;

                    const itemIsCorrect =
                      feedback !== null &&
                      normalizeAnswer(buildWritingAnswer(item)) ===
                        normalizeAnswer(item.answer);

                    const itemIsWrong = feedback === "wrong" && !itemIsCorrect;

                    return (
                      <TextInput
                        key={`${item.id}-${index}`}
                        value={typedAnswers[key] || ""}
                        onChangeText={(value) => {
                          /*
                           * Aceita apenas
                           * uma letra.
                           */
                          const letter = value
                            .replace(/[^a-zA-ZÀ-ÿ]/g, "")
                            .slice(-1)
                            .toUpperCase();

                          setTypedAnswers((previous) => ({
                            ...previous,
                            [key]: letter,
                          }));
                        }}
                        maxLength={1}
                        editable={feedback === null}
                        autoCapitalize="characters"
                        style={[
                          styles.letterInput,

                          itemIsCorrect && styles.letterInputCorrect,

                          itemIsWrong && styles.letterInputWrong,
                        ]}
                      />
                    );
                  }

                  /*
                   * Se não for "_",
                   * mostra a letra normal.
                   */
                  return (
                    <Text key={`${item.id}-${index}`} style={styles.wordLetter}>
                      {character}
                    </Text>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.closeIcon}>×</Text>
        </Pressable>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.content}>
        {renderQuestion()}

        {mode === "writing" && (
          <TextInput
            value={typedAnswer}
            onChangeText={setTypedAnswer}
            placeholder={placeholder}
            placeholderTextColor="#777"
            style={styles.input}
            autoCapitalize="none"
          />
        )}

        {mode === "writingMultiple" && renderWritingMultiple()}

        {(mode === "text" || mode === "image") && (
          <View style={styles.grid}>
            {options.map((item) => {
              const isSelected = selected === item.value;

              const isCorrectOption =
                feedback !== null &&
                normalizeAnswer(item.value) === normalizeAnswer(correctAnswer);

              const isWrongOption =
                feedback !== null && isSelected && !isCorrectOption;

              return (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    if (feedback === null) {
                      setSelected(item.value);
                    }
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

        {feedback === null && (
          <Pressable
            onPress={handleVerify}
            disabled={verifyDisabled}
            style={({ pressed }) => [
              styles.verifyButton,

              verifyDisabled && styles.verifyButtonDisabled,

              pressed && !verifyDisabled && styles.verifyButtonPressed,
            ]}
          >
            <Text style={styles.verifyText}>VERIFICAR</Text>
          </Pressable>
        )}

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
    paddingTop: 35,
  },

  question: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 25,
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
    transform: [
      {
        scale: 0.98,
      },
    ],
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

  optionTextSelected: {
    fontWeight: "600",
  },

  optionTextCorrect: {
    color: "#0F3D16",
  },

  optionTextWrong: {
    color: "#5A1414",
  },

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

  monthsGrid: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  writingItem: {
    width: "48%",
    alignItems: "flex-start",
  },

  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 36,
  },

  wordLetter: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  letterInput: {
    width: 22,
    height: 28,
    backgroundColor: "#D9D9D9",
    borderRadius: 3,
    marginHorizontal: 1,
    padding: 0,
    color: "#111111",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },

  letterInputCorrect: {
    backgroundColor: "#7CDB8A",
    borderWidth: 1,
    borderColor: "#2E9E45",
  },

  letterInputWrong: {
    backgroundColor: "#F28B82",
    borderWidth: 1,
    borderColor: "#D64545",
  },

  correctMessage: {
    marginTop: 18,
    color: "#7CDB8A",
    fontSize: 18,
    fontWeight: "600",
  },

  wrongMessage: {
    marginTop: 18,
    color: "#F28B82",
    fontSize: 18,
    fontWeight: "600",
  },

  verifyButton: {
    marginTop: 20,
    width: 241,
    height: 41,
    borderRadius: 21,
    backgroundColor: "#1CC5D3",
    justifyContent: "center",
    alignItems: "center",
  },

  verifyButtonPressed: {
    opacity: 0.85,
    transform: [
      {
        scale: 0.98,
      },
    ],
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
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  nextText: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "500",
  },
});