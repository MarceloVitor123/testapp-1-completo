import { useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorld } from "../../context/WorldContext";

type ActionOption = {
  label: string;
  value: string;
};

type ActionImage = {
  source: any;
  correctAction: string;
};

type ActionMatchActivityProps = {
  // Texto mostrado acima das imagens
  question?: string;

  // 10 ações disponíveis
  options: ActionOption[];

  // 5 imagens e a ação correta de cada uma
  images: ActionImage[];

  // Rotas
  nextRoute: string;
  wrongRoute: string;

  // Progresso da atividade
  progress?: number;
};

export default function ActionMatchActivity({
  question = "Clique na ação que se relaciona com a imagem abaixo:",
  options,
  images,
  nextRoute,
  wrongRoute,
  progress = 0,
}: ActionMatchActivityProps) {
  const router = useRouter();
  const { addActivityResult } = useWorld();

  // Mantém o mesmo sistema de tempo do QuizActivity
  const [startTime] = useState(Date.now());

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | null
  >(null);

  const [isCorrect, setIsCorrect] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleImagePress = (index: number) => {
    if (feedback !== null) return;

    setSelectedImageIndex(index);
  };

  const handleActionPress = (action: string) => {
    if (feedback !== null) return;

    setSelectedAction(action);
  };

  const handleVerifyAnswer = () => {
    if (selectedImageIndex === null || !selectedAction) return;

    const image = images[selectedImageIndex];

    if (!image) return;

    const correct = selectedAction === image.correctAction;

    setIsCorrect(correct);
    setFeedback(correct ? "correct" : "wrong");
  };

  const handleNext = () => {
    const endTime = Date.now();

    // Mesmo cálculo de tempo do código original
    const timeSpentMs = endTime - startTime;
    const timeSeconds = Math.floor(timeSpentMs / 1000);

    // Mesmo sistema de pontos:
    // correta = 4 XP
    // errada = 0 XP
    const xp = isCorrect ? 4 : 0;

    // Mesmo sistema de precisão:
    // correta = 100%
    // errada = 0%
    const accuracy = isCorrect ? 100 : 0;

    // Mesmo sistema de registro no WorldContext
    if (xp > 0) {
      addActivityResult({
        id: Date.now().toString(),
        xp,
        timeSeconds,
        correct: 1,
        total: 1,
      });
    }

    const route = isCorrect ? nextRoute : wrongRoute;

    const href =
      `${route}?xp=${xp}&accuracy=${accuracy}&timeSpent=${timeSpentMs}` as Href;

    router.push(href);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOPO */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
        >
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

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.questionText}>{question}</Text>

        {/* AÇÕES */}
        <View style={styles.optionsContainer}>
          {options.map((item) => {
            const isSelected = selectedAction === item.value;

            return (
              <Pressable
                key={item.value}
                onPress={() => handleActionPress(item.value)}
                disabled={feedback !== null}
                style={({ pressed }) => [
                  styles.optionButton,
                  isSelected && styles.optionSelected,
                  pressed &&
                    feedback === null &&
                    styles.optionPressed,
                ]}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* IMAGENS */}
        <View style={styles.imagesContainer}>
          {images.map((item, index) => {
            const isSelected = selectedImageIndex === index;

            return (
              <Pressable
                key={index}
                onPress={() => handleImagePress(index)}
                disabled={feedback !== null}
                style={[
                  styles.imageButton,
                  isSelected && styles.imageSelected,
                ]}
              >
                <Image source={item.source} style={styles.actionImage} />
              </Pressable>
            );
          })}
        </View>

        {/* FEEDBACK */}
        {feedback === "correct" && (
          <Text style={styles.correctMessage}>
            Resposta correta!
          </Text>
        )}

        {feedback === "wrong" && (
          <Text style={styles.wrongMessage}>
            Resposta errada.
          </Text>
        )}

        {/* VERIFICAR */}
        {feedback === null && (
          <Pressable
            onPress={handleVerifyAnswer}
            disabled={
              selectedImageIndex === null ||
              selectedAction === null
            }
            style={({ pressed }) => [
              styles.verifyButton,
              (selectedImageIndex === null ||
                selectedAction === null) &&
                styles.verifyButtonDisabled,
              pressed &&
                selectedImageIndex !== null &&
                selectedAction !== null &&
                styles.verifyButtonPressed,
            ]}
          >
            <Text style={styles.verifyText}>VERIFICAR</Text>
          </Pressable>
        )}

        {/* PRÓXIMO */}
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

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 8,
  },

  questionText: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 23,
    textAlign: "left",
    marginBottom: 12,
  },

  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    rowGap: 14,
    marginBottom: 12,
  },

  optionButton: {
    width: "43%",
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  optionPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  optionSelected: {
    borderWidth: 3,
    borderColor: "#1CC5D3",
  },

  optionText: {
    color: "#111111",
    fontSize: 21,
  },

  imagesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },

  imageButton: {
    width: 125,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },

  imageSelected: {
    borderColor: "#1CC5D3",
    backgroundColor: "rgba(28, 197, 211, 0.15)",
  },

  actionImage: {
    width: 115,
    height: 90,
    resizeMode: "contain",
  },

  correctMessage: {
    marginTop: 4,
    color: "#7CDB8A",
    fontSize: 17,
    fontWeight: "600",
  },

  wrongMessage: {
    marginTop: 4,
    color: "#F28B82",
    fontSize: 17,
    fontWeight: "600",
  },

  verifyButton: {
    marginTop: 8,
    width: 210,
    height: 42,
    borderRadius: 22,
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
    fontSize: 20,
    fontWeight: "500",
  },

  nextButton: {
    marginTop: 8,
    width: 210,
    height: 42,
    borderRadius: 22,
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
    fontSize: 20,
    fontWeight: "500",
  },
});
