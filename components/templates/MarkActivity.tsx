import { Audio } from "expo-av";
import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorld } from "../../context/WorldContext";

type Option = {
  label: string;
  value: string;
};

type MarkActivityProps = {
  question: string;
  options: Option[];
  correctAnswers: string[];
  nextRoute: string;
  wrongRoute: string;
  progress?: number;
  audio?: any
};

export default function MarkActivity({
  question,
  options,
  correctAnswers,
  nextRoute,
  wrongRoute,
  audio,
  progress = 0,
}: MarkActivityProps) {
  const router = useRouter();
  const { addActivityResult } = useWorld();
  const [startTime] = useState(Date.now());
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const verifyDisabled = useMemo(() => selected.length === 0, [selected]);

  const toggleOption = (value: string) => {
    if (feedback !== null) return;

    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleVerify = () => {
    const normalizedSelected = [...selected].sort().join(",");
    const normalizedCorrect = [...correctAnswers].sort().join(",");

    const correct = normalizedSelected === normalizedCorrect;
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

  const [audioPlaying, setAudioPlaying] = useState(false);

const playAudio = async (audioFile: any) => {
  if (!audioFile) return;           // sem áudio, não faz nada
  if (audioPlaying) return;         // já tá tocando, ignora clique duplo

  try {
    setAudioPlaying(true);
    const { sound } = await Audio.Sound.createAsync(audioFile); // carrega o arquivo
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setAudioPlaying(false);
        sound.unloadAsync();        // libera da memória quando termina
      }
    });
    await sound.playAsync();        // toca
  } catch (error) {
    console.log("Erro ao reproduzir áudio:", error);
    setAudioPlaying(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.closeIcon}>×</Text>
        </Pressable>

        <Pressable onPress={() => playAudio(audio)}>
      <Text style={styles.audioIcon}>🔊</Text>
      </Pressable>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>{question}</Text>

        <View style={styles.grid}>
          {options.map((item) => {
            const isSelected = selected.includes(item.value);

            return (
              <Pressable
                key={item.value}
                onPress={() => toggleOption(item.value)}
                style={({ pressed }) => [
                  styles.optionButton,
                  isSelected && styles.optionSelected,
                  pressed && styles.optionPressed,
                ]}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            );
          })}
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
  optionText: {
    color: "#111111",
    fontSize: 28,
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
  },

  audioIcon: {
    fontSize: 25,
  },

  audioposition: {
    marginTop: 14,
    width: 21,
    height: 41,
  },
});