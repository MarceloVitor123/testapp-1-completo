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
  const audioIntro = require("../../../components/audios/intro_4.mp3");
  const audioTopico1 = require("../../../components/audios/1 da intro 4.mp3");
  const audioTopico2 = require("../../../components/audios/2 da intro 4.mp3");
  const audioTopico3 = require("../../../components/audios/3 da intro 4.mp3");
  const audioTopico4 = require("../../../components/audios/4 da intro 4.mp3");
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
    setCurrentWorld(4);
    setWorldStartTime(Date.now());

    router.push("/fases/fase4/atividade1");
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

      <Text style={styles.title}>ATIVIDADE 4</Text>

      <Text style={styles.subtitulo2}>INTERPRETAÇÃO DE TEXTO</Text>

      <View style={{ width: "100%" }}>
        {/* INTRODUÇÃO */}
        <View style={styles.bloco}>
          <Text style={styles.subtitulo1}>
            LER É MAIS DO QUE RECONHECER AS PALAVRAS.
            {"\n"}
            QUANDO LEMOS UM TEXTO, PODEMOS ENTENDER O QUE ELE ESTÁ DIZENDO E
            ENCONTRAR INFORMAÇÕES IMPORTANTES.
          </Text>
        </View>

        {/* TÓPICO 1 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico1)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>1. LENDO UM TEXTO</Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              QUANDO LEMOS UM TEXTO, DEVEMOS PRESTAR ATENÇÃO NAS PALAVRAS E NAS
              INFORMAÇÕES QUE APARECEM NELE.
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              LEIA COM CALMA E TENTE ENTENDER O QUE O TEXTO QUER DIZER.
            </Text>
          </View>
        </View>

        {/* TÓPICO 2 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico2)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>2. ENCONTRANDO INFORMAÇÕES</Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              UM TEXTO PODE TRAZER INFORMAÇÕES SOBRE PESSOAS, LUGARES, OBJETOS E
              ACONTECIMENTOS.
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              PARA ENTENDER O TEXTO, PODEMOS PROCURAR RESPOSTAS PARA PERGUNTAS
              COMO:
            </Text>

            {"\n\n"}

            <Text style={styles.exemplo}>QUEM?</Text>

            <Text style={styles.exemplo}>ONDE?</Text>

            <Text style={styles.exemplo}>O QUE ACONTECEU?</Text>
          </View>
        </View>

        {/* TÓPICO 3 */}
        <View style={styles.topico}>
          <Pressable onPress={() => playAudio(audioTopico3)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>

          <View style={styles.textoTopico}>
            <Text style={styles.titulo}>3. ENTENDENDO O QUE FOI LIDO</Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              DEPOIS DE LER UM TEXTO, É IMPORTANTE PENSAR SOBRE O QUE VOCÊ
              ACABOU DE LER.
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              A RESPOSTA PARA UMA PERGUNTA PODE ESTAR ESCRITA DIRETAMENTE NO
              TEXTO.
            </Text>

            {"\n\n"}

            <Text style={styles.subtitulo}>
              POR ISSO, LEIA O TEXTO COM ATENÇÃO ANTES DE ESCOLHER UMA RESPOSTA.
            </Text>
          </View>
        </View>

        {/* TÓPICO 4 */}
        <View style={styles.bloco}>
            <Pressable onPress={() => playAudio(audioTopico4)}>
            <Text style={styles.audioIcon}>🔊</Text>
          </Pressable>
          <Text style={styles.titulo}>4. VAMOS PRATICAR!</Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            AGORA VOCÊ VAI LER PEQUENOS TEXTOS E RESPONDER A PERGUNTAS SOBRE
            ELES.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            LEIA COM ATENÇÃO E PROCURE NO TEXTO AS INFORMAÇÕES NECESSÁRIAS PARA
            RESPONDER.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            LEIA, PENSE E ESCOLHA A RESPOSTA CORRETA.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>VAMOS COMEÇAR!</Text>
        </View>
      </View>

      {/* BOTÃO COMEÇAR */}
      <Pressable onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
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

  exemplo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#35c0f7",
    textAlign: "center",
    marginBottom: 12,
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
