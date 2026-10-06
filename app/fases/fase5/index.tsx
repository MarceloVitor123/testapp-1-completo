
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useWorld } from "../../../context/WorldContext";

export default function IndexScreen() {
  const router = useRouter();
  const { setCurrentWorld, resetWorld, setWorldStartTime } = useWorld();

  const [audioPlaying, setAudioPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  // ÁUDIOS
  const audioIntro = require("../../../components/audios/intro 5.mp3");
  const audioTopico1 = require("../../../components/audios/1 da intro 5.mp3");
  const audioTopico2 = require("../../../components/audios/2 da intro 5.mp3");
  const audioTopico3 = require("../../../components/audios/3 da intro 5.mp3");
  const audioTopico4 = require("../../../components/audios/4 da intro 5.mp3");

  // FUNÇÃO PARA TOCAR ÁUDIO
  const playAudio = async (audioFile: any) => {
    if (!audioFile) return;
    if (audioPlaying) return;

    try {
      setAudioPlaying(true);

      const { sound } = await Audio.Sound.createAsync(audioFile);

      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setAudioPlaying(false);
          sound.unloadAsync();
          soundRef.current = null;
        }
      });

      await sound.playAsync();
    } catch (error) {
      console.log("Erro ao reproduzir áudio:", error);
      setAudioPlaying(false);
    }
  };

  // COMEÇAR A FASE
  const handleStart = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setAudioPlaying(false);
    }

    resetWorld();
    setCurrentWorld(1);
    setWorldStartTime(Date.now());

    router.push("/fases/fase5/atividade1");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BOTÃO X */}
      <View style={styles.botaoX}>
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 60,
            left: 100,
          }}
        >
          <Text
            style={{
              color: "#080808",
              fontSize: 40,
              fontWeight: "600",
              position: "absolute",
              top: -76,
              left: -82,
            }}
          >
            x
          </Text>
        </Pressable>
      </View>

      {/* TALKPUP */}
      <View>
        <Image
          source={require("../../../assets/images/TALKPUP.png")}
          style={{
            width: 400,
            height: 300,
            marginBottom: 0,
          }}
        />
      </View>

      {/* ÁUDIO DA INTRODUÇÃO */}
      <View style={styles.audioIntroContainer}>
        <Pressable onPress={() => playAudio(audioIntro)}>
          <Text style={styles.audioIcon0}>🔊</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>ATIVIDADE 5</Text>

      <Text style={styles.subtitulo2}>
        NÚMEROS DE 0 A 9
      </Text>

      <View style={{ width: "100%" }}>

        {/* INTRODUÇÃO */}
        <View style={styles.bloco}>
          <Text style={styles.subtitulo1}>
            OS NÚMEROS FAZEM PARTE DO NOSSO DIA A DIA.
            {"\n"}
            ELES PODEM SER ESCRITOS COMO ALGARISMOS E TAMBÉM
            PODEM SER REPRESENTADOS POR SEUS NOMES.
          </Text>
        </View>

        {/* TÓPICO 1 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico1)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>
              1. CONHECENDO OS NÚMEROS
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              OS NÚMEROS DE 0 A 9 SÃO:
            </Text>

            {"\n\n"}

            <Text style={styles.numeros}>
              0   1   2   3   4
            </Text>

            <Text style={styles.numeros}>
              5   6   7   8   9
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              CADA NÚMERO POSSUI UM NOME.
            </Text>
          </View>
        </View>

        {/* TÓPICO 2 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico2)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>
              2. NÚMEROS POR EXTENSO
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              VEJA COMO ESCREVEMOS CADA NÚMERO POR EXTENSO:
            </Text>

            {"\n\n"}

            <View style={styles.listaNumeros}>

              <Text style={styles.itemNumero}>
                0 → ZERO
              </Text>

              <Text style={styles.itemNumero}>
                1 → UM
              </Text>

              <Text style={styles.itemNumero}>
                2 → DOIS
              </Text>

              <Text style={styles.itemNumero}>
                3 → TRÊS
              </Text>

              <Text style={styles.itemNumero}>
                4 → QUATRO
              </Text>

              <Text style={styles.itemNumero}>
                5 → CINCO
              </Text>

              <Text style={styles.itemNumero}>
                6 → SEIS
              </Text>

              <Text style={styles.itemNumero}>
                7 → SETE
              </Text>

              <Text style={styles.itemNumero}>
                8 → OITO
              </Text>

              <Text style={styles.itemNumero}>
                9 → NOVE
              </Text>

            </View>
          </View>
        </View>

        {/* TÓPICO 3 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico3)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>
              3. NÚMERO E SEU NOME
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              UM NÚMERO PODE APARECER ESCRITO COMO ALGARISMO
              OU COMO SEU NOME POR EXTENSO.
            </Text>

            {"\n\n"}

            <Text style={styles.exemplo}>
              3 = TRÊS
            </Text>

            {"\n"}

            <Text style={styles.exemplo}>
              7 = SETE
            </Text>

            {"\n"}

            <Text style={styles.exemplo}>
              9 = NOVE
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              NAS PRÓXIMAS ATIVIDADES, VOCÊ VAI PRECISAR
              IDENTIFICAR O NÚMERO E RECONHECER SEU NOME.
            </Text>
          </View>
        </View>

        {/* TÓPICO 4 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico4)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>
              4. VAMOS PRATICAR!
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              AGORA É A SUA VEZ!
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              LEIA COM ATENÇÃO AS QUESTÕES E IDENTIFIQUE
              O NÚMERO OU O NOME CORRETO.
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              VAMOS COMEÇAR!
            </Text>
          </View>
        </View>

      </View>

      {/* BOTÃO COMEÇAR */}
      <Pressable
        onPress={handleStart}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          COMEÇAR
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5B5B5B",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  title: {
    color: "#35c0f7",
    fontSize: 34,
    fontWeight: "700",
    top: -44,
  },

  subtitulo2: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgb(250, 252, 244)",
    top: -40,
  },

  bloco: {
    width: "100%",
    marginBottom: 35,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0ec0ec",
  },

  subtitulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgb(250, 252, 244)",
  },

  subtitulo1: {
    color: "#35c0f7",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },

  numeros: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#35c0f7",
    textAlign: "center",
    marginBottom: 10,
  },

  listaNumeros: {
    alignItems: "center",
  },

  itemNumero: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(250, 252, 244)",
    marginBottom: 12,
  },

  exemplo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#35c0f7",
    textAlign: "center",
    marginBottom: 8,
  },

  topico: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 35,
  },

  textoTopico: {
    flex: 1,
  },

  audioIntroContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  audioIcon0: {
    fontSize: 25,
    left: -110,
    top: 35,
  },

  audioIcon: {
    fontSize: 25,
    marginRight: 8,
  },

  button: {
    backgroundColor: "#1CC5D3",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 24,
    marginTop: 10,
  },

  buttonText: {
    color: "#0c0c0c",
    fontSize: 18,
    fontWeight: "600",
  },

  botaoX: {
    backgroundColor: "#fffdfdee",
    paddingHorizontal: 28,
    paddingVertical: 16,
    position: "absolute",
    top: 60,
    left: 100,
    borderRadius: 24,
  },
});

