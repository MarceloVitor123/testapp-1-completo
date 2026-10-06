import { Audio } from "expo-av";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useRef } from "react"

const letras = "0123456789".split("");

export default function NumerosScreen() {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const soundRef = useRef<Audio.Sound | null>(null)

  const tocarLetra = async (letra: string) => {
    if(audioPlaying) return //evita o problema de clique duplo

    try {
      const audiosNumeros: Record<string, any> = {
        "0": require("@/components/audios/0.number.mp3"),
        "1": require("@/components/audios/1.number.mp3"),
        "2": require("@/components/audios/2.number.mp3"),
        "3": require("@/components/audios/3.number.mp3"),
        "4": require("@/components/audios/4.number.mp3"),
        "5": require("@/components/audios/5.number.mp3"),
        "6": require("@/components/audios/6.number.mp3"),
        "7": require("@/components/audios/7.number.mp3"),
        "8": require("@/components/audios/8.number.mp3"),
        "9": require("@/components/audios/9.number.mp3"),
      }

      setAudioPlaying(true)

      const { sound } = await Audio.Sound.createAsync(
        audiosNumeros[letra],
        {
          shouldPlay: true
        }
      );

      soundRef.current = sound

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setAudioPlaying(false)
          sound.unloadAsync()
          soundRef.current = null
        }
      });
    } catch (error) {
      console.log("Erro ao reproduzir áudio:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}
         showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>ALFATECH</Text>

      <Text style={styles.subtitle}>
        CONHEÇA OS NÚMERAIS E PRATIQUE A PRONÚNCIA DE CADA NÚMERO.
      </Text>

      <View style={styles.lista}>
        {letras.map((letra) => (
          <View key={letra} style={styles.letraContainer}>
            <Text style={styles.letra}>{letra}</Text>

            <Pressable
              style={styles.audioButton}
              onPress={() => tocarLetra(letra)}
            >
              <Text style={styles.audioIcon}>🔊</Text>
              <Text style={styles.audioText}>OUVIR</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#4b4b4b",
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1683FF",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  lista: {
    width: "100%",
    gap: 12,
  },

  letraContainer: {
    width: "100%",
    minHeight: 80,
    borderRadius: 16,
    backgroundColor: "#202633",
    borderWidth: 2,
    borderColor: "#666666",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
  },

  letra: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1683FF",
  },

  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    backgroundColor: "#1683FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  audioIcon: {
    fontSize: 20,
  },

  audioText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
  },
});