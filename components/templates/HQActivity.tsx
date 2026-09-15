import { Audio } from "expo-av";
import { useRouter, type Href } from "expo-router";
import React, { useMemo, useState } from "react";
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

  // Texto principal da atividade
  question: string;

  // Texto secundário da atividade
  subQuestion: string;

  // Imagem do personagem
  characterImage?: any;

  // Imagem opcional para a questão
  questionImage?: any;

  // Audio principal da atividade
  audio?: any;

  // Audio secundário da atividade
  subAudio?: any;

  // Alternativas
  options?: Option[];

  // Resposta correta
  correctAnswer: string;

  // Rotas
  nextRoute: string;
  wrongRoute: string;

  // Campo de escrita
  placeholder?: string;

  // Progresso de 0 a 1
  progress?: number;

  // Mostrar botão de áudio
  showAudio?: boolean;
};

export default function QuizActivity({
  mode,
  question,
  subQuestion,
  characterImage,
  questionImage,
  audio,
  subAudio,

  options = [],
  correctAnswer,
  nextRoute,
  wrongRoute,
  placeholder = "Digite sua resposta",
  progress = 0,
  showAudio = true,
}: QuizActivityProps) {
  const router = useRouter();
  const { addActivityResult } = useWorld();

  const [startTime] = useState(Date.now());

  const [selected, setSelected] = useState<string | null>(null);

  const [typedAnswer, setTypedAnswer] = useState("");

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | null
  >(null);

  const [isCorrect, setIsCorrect] = useState(false);

  const verifyDisabled = useMemo(() => {
    if (mode === "writing") {
      return typedAnswer.trim().length === 0;
    }

    return !selected;
  }, [mode, selected, typedAnswer]);

  // =========================
  // VERIFICAR RESPOSTA
  // =========================

  const handleVerify = () => {
    const answer =
      mode === "writing"
        ? typedAnswer.trim().toLowerCase()
        : selected?.toLowerCase();

    if (!answer) return;

    const correct =
      answer === correctAnswer.toLowerCase();

    setIsCorrect(correct);

    setFeedback(
      correct ? "correct" : "wrong"
    );
  };
// =========================
// TOCAR ÁUDIO
// =========================
  const playAudio = async (audioFile: any) => {
  if (!audioFile) return;

  const { sound } = await Audio.Sound.createAsync(audioFile);

  await sound.playAsync();

  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync();
    }
  });
};

  // =========================
  // PRÓXIMA QUESTÃO
  // =========================

  const handleNext = () => {
    const endTime = Date.now();

    const timeSpentMs =
      endTime - startTime;

    const timeSeconds =
      Math.floor(timeSpentMs / 1000);

    const xp = isCorrect ? 4 : 0;

    const accuracy =
      isCorrect ? 100 : 0;

    if (xp > 0) {
      addActivityResult({
        id: Date.now().toString(),
        xp,
        timeSeconds,
        correct: 1,
        total: 1,
      });
    }

    const route =
      isCorrect
        ? nextRoute
        : wrongRoute;

    const href =
      `${route}?xp=${xp}&accuracy=${accuracy}&timeSpent=${timeSpentMs}` as Href;

    router.push(href);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ================================= */}
      {/* TOPO */}
      {/* ================================= */}

      <View style={styles.topBar}>

        {/* X */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
        >
          <Text style={styles.closeIcon}>
            ×
          </Text>
        </Pressable>

        {/* Barra de progresso */}
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

      {/* ================================= */}
      {/* CONTEÚDO */}
      {/* ================================= */}

      <View style={styles.content}>

        {/* ================================= */}
        {/* PERSONAGEM + BALÃO */}
        {/* ================================= */}

        <View style={styles.characterArea}>

          {/* Personagem */}
          {characterImage && (
            <View style={styles.characterContainer}>
              <Image
                source={characterImage}
                style={styles.characterImage}
              />
            </View>
          )}

          {/* Balão */}
          <View style={styles.speechBubble}>

            <Text style={styles.speechText}>
              {question}
            </Text>

            {/* Áudio */}
            {showAudio && (
              <Pressable
                style={styles.audioButton}
                onPress={() => playAudio(audio)}
              >
                <Text style={styles.audioIcon}>
                  🔊
                </Text>
              </Pressable>
            )}

          </View>

        </View>

        {/* ================================= */}
        {/* PERGUNTA */}
        {/* ================================= */}

        <Text style={styles.questionText}>
          {subQuestion}
        </Text>

        {/* ================================= */}
        {/* IMAGEM DA QUESTÃO */}
        {/* ================================= */}

        {mode === "image" &&
          questionImage && (
            <Image
              source={questionImage}
              style={styles.questionImage}
            />
          )}

        {/* ================================= */}
        {/* ALTERNATIVAS */}
        {/* ================================= */}

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

          <View style={styles.optionsContainer}>

            {options.map((item) => {

              const isSelected =
                selected === item.value;

              const isCorrectOption =
                feedback !== null &&
                item.value === correctAnswer;

              const isWrongOption =
                feedback !== null &&
                isSelected &&
                item.value !== correctAnswer;

              return (
                <Pressable
                  key={item.value}
                  onPress={() => {

                    if (
                      feedback === null
                    ) {
                      setSelected(
                        item.value
                      );
                    }

                  }}
                  style={({ pressed }) => [

                    styles.optionButton,

                    isSelected &&
                      styles.optionSelected,

                    isCorrectOption &&
                      styles.optionCorrect,

                    isWrongOption &&
                      styles.optionWrong,

                    pressed &&
                      feedback === null &&
                      styles.optionPressed,

                  ]}
                >

                  {item.image ? (

                    <Image
                      source={item.image}
                      style={styles.optionImage}
                    />

                  ) : (

                    <Text
                      style={[
                        styles.optionText,

                        isSelected &&
                          styles.optionTextSelected,

                        isCorrectOption &&
                          styles.optionTextCorrect,

                        isWrongOption &&
                          styles.optionTextWrong,
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

        {/* ================================= */}
        {/* FEEDBACK */}
        {/* ================================= */}

        {feedback === "correct" && (
          <Text
            style={styles.correctMessage}
          >
            Resposta correta!
          </Text>
        )}

        {feedback === "wrong" && (
          <Text
            style={styles.wrongMessage}
          >
            Resposta errada.
          </Text>
        )}

        {/* ================================= */}
        {/* VERIFICAR */}
        {/* ================================= */}

        <Pressable
          onPress={handleVerify}
          disabled={
            verifyDisabled ||
            feedback !== null
          }
          style={({ pressed }) => [

            styles.verifyButton,

            verifyDisabled &&
              styles.verifyButtonDisabled,

            pressed &&
              !verifyDisabled &&
              feedback === null &&
              styles.verifyButtonPressed,

          ]}
        >

          <Text style={styles.verifyText}>
            VERIFICAR
          </Text>

        </Pressable>

        {/* ================================= */}
        {/* PRÓXIMO */}
        {/* ================================= */}

        {feedback !== null && (

          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [

              styles.nextButton,

              pressed &&
                styles.nextButtonPressed,

            ]}
          >

            <Text style={styles.nextText}>
              PRÓXIMO
            </Text>

          </Pressable>

        )}

      </View>

    </SafeAreaView>
  );
}


// ======================================================
// ESTILOS
// ======================================================

const styles = StyleSheet.create({

  // --------------------------------------
  // TELA
  // --------------------------------------

  container: {
    flex: 1,
    backgroundColor: "#5B5B5B",
  },

  // --------------------------------------
  // TOPO
  // --------------------------------------

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 4,
  },

  closeIcon: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 30,
    marginRight: 8,
    marginTop: -2,
  },

  progressBar: {
    flex: 1,
    height: 9,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#1CC5D3",
  },

  // --------------------------------------
  // CONTEÚDO
  // --------------------------------------

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  // --------------------------------------
  // PERSONAGEM + BALÃO
  // --------------------------------------

  characterArea: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 145,
  },

  characterContainer: {
    width: 115,
    height: 115,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#1B6FA8",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  characterImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  // --------------------------------------
  // BALÃO
  // --------------------------------------

  speechBubble: {
    flex: 1,
    minHeight: 125,
    marginLeft: 10,
    backgroundColor: "#FFFFFF",

    borderRadius: 25,

    paddingHorizontal: 18,
    paddingVertical: 14,

    justifyContent: "center",

    // pequena sombra
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  speechText: {
    color: "#111111",
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
  },

  audioButton: {
    position: "absolute",
    left: -18,
    top: "50%",
    marginTop: -18,

    width: 36,
    height: 36,

    justifyContent: "center",
    alignItems: "center",
  },

  audioIcon: {
    fontSize: 25,
  },

  // --------------------------------------
  // PERGUNTA
  // --------------------------------------

  questionText: {
    width: "100%",

    color: "#FFFFFF",

    fontSize: 18,
    lineHeight: 23,

    textAlign: "left",

    marginBottom: 20,
  },

  // --------------------------------------
  // IMAGEM DA QUESTÃO
  // --------------------------------------

  questionImage: {
    width: 220,
    height: 150,
    resizeMode: "contain",
    marginBottom: 15,
  },

  // --------------------------------------
  // ALTERNATIVAS
  // --------------------------------------

  optionsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 14,
  },

  optionButton: {
    width: 120,
    height: 40,

    backgroundColor: "#D9D9D9",

    borderRadius: 8,

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
    fontSize: 19,
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
    width: 38,
    height: 38,
    resizeMode: "contain",
  },

  // --------------------------------------
  // INPUT
  // --------------------------------------

  input: {
    width: "82%",
    height: 50,

    borderRadius: 10,

    backgroundColor: "#D9D9D9",

    paddingHorizontal: 16,

    color: "#111111",

    fontSize: 20,

    marginBottom: 15,
  },

  // --------------------------------------
  // FEEDBACK
  // --------------------------------------

  correctMessage: {
    marginTop: 12,

    color: "#7CDB8A",

    fontSize: 17,

    fontWeight: "600",
  },

  wrongMessage: {
    marginTop: 12,

    color: "#F28B82",

    fontSize: 17,

    fontWeight: "600",
  },

  // --------------------------------------
  // VERIFICAR
  // --------------------------------------

  verifyButton: {
    marginTop: 20,

    width: 210,
    height: 42,

    borderRadius: 22,

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

    fontSize: 20,

    fontWeight: "500",
  },

  // --------------------------------------
  // PRÓXIMO
  // --------------------------------------

  nextButton: {
    marginTop: 10,

    width: 210,
    height: 42,

    borderRadius: 22,

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

    fontSize: 20,

    fontWeight: "500",
  },

});