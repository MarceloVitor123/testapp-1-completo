import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useWorld } from "../../../context/WorldContext";
import { Audio } from "expo-av"

export default function IndexScreen() {
  const router = useRouter();
  const { setCurrentWorld, resetWorld, setWorldStartTime } = useWorld();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioIntro = require("@/components/audios/intro_silabas.mp3");
  const audioSilabas1 = require("@/components/audios/o_que_sao_silabas.mp3");
  const audioConsoantes = require("@/components/audios/exemplo_silabas.mp3");
  const audioPraticar = require("@/components/audios/topico_praticar2.mp3");
  const playAudio = async (audioFile: any) => {
    if (!audioFile) return;
    if (audioPlaying) return;
  
    try {
      setAudioPlaying(true);
      const { sound } = await Audio.Sound.createAsync(audioFile);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setAudioPlaying(false);
          sound.unloadAsync();
        }
      });
      await sound.playAsync();
    } catch (error) {
      console.log("Erro ao reproduzir áudio:", error);
      setAudioPlaying(false);
    }
  };

  const handleStart = () => {
    resetWorld();
    setCurrentWorld(2);
    setWorldStartTime(Date.now());
    router.push("/fases/fase2/atividade1");
  };

  return (
    <ScrollView style={styles.container}
     contentContainerStyle={styles.content}
     showsVerticalScrollIndicator={false}>
      <View style={styles.botaoX}>
        <Pressable
          onPress={() => router.back()}
          style={{ position: "absolute", top: 60, left: 100 }}
        >
          <Text
            style={{
              color: "#080101",
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
      <View>
        <Image
          source={require("../../../assets/images/TALKPUP.png")}
          style={{ width: 400, height: 300, marginBottom: 0 }}
        ></Image>
      </View>
      
     {/* Atividade 2 sílabas */} 
      <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center"}}>
        <Pressable onPress={() => playAudio(audioIntro)}>
          <Text style={styles.audioIcon0}>🔊</Text>
        </Pressable>
      </View>
      <Text style={styles.tituloMain}>ATIVIDADE 2</Text>
      {"\n\n"}
      <Text style={styles.tituloMain}>SÍLABAS</Text>
      {"\n\n"}
      <Text style={styles.subtitle}>SÍLABAS</Text>
      <Text style={styles.subtitle}></Text>

      <Text>
        {/* Tópico 1 */}
        <Text style={styles.titulo}>1. O QUE SÃO SÍLABAS?</Text>
        {"\n\n"}
        <text style={styles.subtitle}>
          TODAS AS PALAVRAS SÃO FORMADAS POR PARTES MENORES CHAMADAS SÍLABAS.
        </text>
        {"\n\n"}
        <text style={styles.subtitle}>
          AS SÍLABAS SÃO GRUPOS DE LETRAS QUE PRONUNCIAMOS JUNTOS EM UMA
          PALAVRA.
        </text>
        {"\n\n"}
        {/* Tópico 2 */}
        <Text style={styles.titulo}>2. EXEMPLOS DE SÍLABAS</Text>
        {"\n\n"}
        CADA PALAVRA PODE TER UMA OU MAIS SÍLABAS.
        {"\n\n"}
        POR EXEMPLO: A PALAVRA CASA PODE SER DIVIDIDA EM CA E SA.
        {"\n"}A PALAVRA BOLA PODE SER DIVIDIDA EM BO E LA.
        {"\n"}
        JÁ A PALAVRA PÉ POSSUI APENAS UMA SÍLABA.
        {"\n\n"}
        {/* Tópico 3 */}
        <Text style={styles.titulo}>3. VAMOS PRATICAR!</Text>
        {"\n\n"}
        APRENDER A IDENTIFICAR E SEPARAR AS SÍLABAS É UM PASSO IMPORTANTE PARA
        COMEÇAR A LER E ESCREVER.
        {"\n\n"}
        AGORA É A SUA VEZ DE PRATICAR! 🚀
      </Text>

  <Pressable onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
      </Pressable>
    </ScrollView>
  )
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
    paddingVertical: 15,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 15,
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 90,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#1CC5D3",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 24,
  },
  buttonText: {
    color: "#111",
    fontSize: 24,
    fontWeight: "bold",
  },
  botaoX: {
    backgroundColor: "#757575",
    paddingHorizontal: 28,
    paddingVertical: 16,
    position: "absolute",
    top: 60,
    left: 100,
    borderRadius: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0ec0ec",
  },
});