import { useRouter, type Href } from "expo-router"
import { useMemo, useState } from "react"
import { useWorld } from "@/context/WorldContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { Audio } from "expo-av"

type Blank = {
  before: string; //frases antes do espaço
  after?: string; //frases depois do espaço
}

type FillBlanksProps = {
  title: string;        // "Complete as frases abaixo:"
  blanks: Blank[];
  nextRoute: string;
  progress?: number;
}

export default function DigiteActivity({
  title,
  blanks,
  nextRoute,
  progress = 0,
}: FillBlanksProps) {
  const router = useRouter();
  const { addActivityResult } = useWorld();
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<"completo" | null>(null);
  const [answers, setAnswers] = useState<string[]>(Array(blanks.length).fill(""))
  const verifyDisabled = answers.some((a) => a.trim().length === 0);
  const handleChange = (index: number, text: string) => {
  const newAnswers = [...answers];
  newAnswers[index] = text;
  setAnswers(newAnswers);
}
  
  const handleVerify = () => {
    if (verifyDisabled) return
      
      setFeedback("completo")
  }

  const handleNext = () => {
  const endTime = Date.now();
  const timeSpentMs = endTime - startTime;

  const timeSeconds = Math.max(
    1,
    Math.floor(timeSpentMs / 1000)
  );

  addActivityResult({
    id: Date.now().toString(),
    xp: 4,
    timeSeconds,
    correct: 1,
    total: 1,
  });

  const href =
    `${nextRoute}?xp=4&accuracy=100&timeSpent=${timeSpentMs}` as Href;

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

    {/* Barra superior */}
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
            { width: `${progress * 100}%` }
          ]}
        />
      </View>
    </View>
<Text style={styles.question}>
  {title}
</Text>

    {/* Conteúdo da atividade */}
    <View style={styles.content}>

      {/* Título */}
      <Text style={styles.question}>
        {title}
      </Text>

      {/* Frases com os campos para escrever */}
      <View style={styles.blanksContainer}>
        {blanks.map((blank, index) => (
          <View
            key={index}
            style={styles.linha}
          >
            <Text style={styles.texto}>
              {blank.before}
            </Text>

            <TextInput
              value={answers[index]}
              onChangeText={(text) =>
                handleChange(index, text)
              }
              style={styles.inputInline}
            />

            {blank.after && (
              <Text style={styles.texto}>
                {blank.after}
              </Text>
            )}
          </View>
        ))}
      </View>

      {/* Mensagem depois de verificar */}
      {feedback === "completo" && (
        <Text style={styles.correctMessage}>
          Resposta registrada!
        </Text>
      )}

      {/* Botão verificar */}
      {feedback === null && (
        <Pressable
          onPress={handleVerify}
          disabled={verifyDisabled}
          style={({ pressed }) => [
            styles.verifyButton,
            verifyDisabled &&
              styles.verifyButtonDisabled,
            pressed &&
              !verifyDisabled &&
              styles.verifyButtonPressed,
          ]}
        >
          <Text style={styles.verifyText}>
            VERIFICAR
          </Text>
        </Pressable>
      )}

      {/* Botão próximo */}
      {feedback !== null && (
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [
            styles.nextButton,
            pressed && styles.nextButtonPressed,
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

  blanksContainer: {
  width: "100%",
  paddingHorizontal: 20,
},

linha: {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 18,
},

texto: {
  color: "#FFFFFF",
  fontSize: 19,
},

inputInline: {
  width: 100,
  height: 38,
  borderBottomWidth: 2,
  borderBottomColor: "#FFFFFF",
  color: "#FFFFFF",
  fontSize: 19,
  paddingHorizontal: 5,
  marginHorizontal: 5,
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
