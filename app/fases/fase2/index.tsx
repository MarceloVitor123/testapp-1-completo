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
  const audioIntro = require("@/components/audios/intro_vogais_consoantes.mp3");
  const audioVogais = require("@/components/audios/topico_vogais.mp3");
  const audioConsoantes = require("@/components/audios/topico_consoantes.mp3");
  const audioPraticar = require("@/components/audios/topico_praticar.mp3");
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
      <Text style={styles.titulo}>ATIVIDADE 2</Text>
<<<<<<< HEAD
      <Text style={styles.subtitulo}>SÍLABAS</Text>
=======
      {"\n\n"}
      <Text style={styles.titulo2}>SÍLABAS</Text>
>>>>>>> 87ef260c069f7a220be28fabb3686ac2b8f31abc
      <Text style={styles.subtitle}></Text>
      
  {/* Introdução */}
  <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
    <Pressable onPress={() => playAudio(audioIntro)}
      style={{ marginTop: 66 }}>
        <Text style={styles.audioIcon}>🔊</Text>
      </Pressable>
        <Text style={{ flex: 1 }}></Text>
        <Text style={styles.titulo}></Text>

  </View>
  {/* Tópico 1 */}
  <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
    <Pressable onPress={() => playAudio(audioVogais)}>
      <Text style={styles.audioIcon}>🔊</Text>
    </Pressable>
  <Text style={{ flex: 1}}>
  <Text style={styles.titulo}>1. O QUE SÃO AS SÍLABAS?</Text>
  {"\n\n"}
<Text style={styles.subtitulo}>
  TODAS AS PALAVRAS SÃO FORMADAS POR PARTES MENORES CHAMADAS SÍLABAS.</Text>
  {"\n\n"}
<Text style={styles.subtitulo}>
  AS SÍLABAS SÃO GRUPOS DE LETRAS QUE PRONUNCIAMOS JUNTOS EM UMA PALAVRA.</Text>
  {"\n\n"}
  </Text>
  </View>

  {/* Tópico 2 */}
  <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
  <Pressable onPress={() => playAudio(audioConsoantes)}>
  <Text style={styles.audioIcon}>🔊</Text>
  </Pressable>
  <Text style={{ flex: 1}}>
  <Text style={styles.titulo}>2. EXEMPLOS DE SÍLABAS</Text>
  {"\n\n"}
<Text style={styles.subtitulo}>
  CADA PALAVRA PODE TER UMA OU MAIS SÍLABAS.</Text>
  {"\n\n"}
<Text style={styles.subtitulo}>
POR EXEMPLO:
  {"\n\n"}
  2.1- A PALAVRA CASA PODE SER DIVIDIDA EM CA E SA.
  {"\n"}
  2.2- A PALAVRA BOLA PODE SER DIVIDIDA EM BO E LA.
  {"\n"}
  2.3- JÁ A PALAVRA PÉ POSSUI APENAS UMA SÍLABA.
</Text>
  {"\n\n"}
  </Text>
  </View>

  {/* Tópico 3 */}
  <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
  <Pressable onPress={() => playAudio(audioPraticar)}>
    <Text style={styles.audioIcon}>🔊</Text>
  </Pressable>
  <Text style={{ flex: 1}}>
  <Text style={styles.titulo}>3. VAMOS PRATICAR!</Text>
  {"\n\n"}
<Text style={styles.subtitulo}>
  APRENDER A IDENTIFICAR E SEPARAR AS SÍLABAS É UM PASSO IMPORTANTE PARA COMEÇAR A LER E ESCREVER.
  {"\n\n"}
  AGORA É A SUA VEZ DE PRATICAR!</Text>
  </Text>
  </View>

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
    paddingVertical: 40,
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
  titulo2: { 
  fontSize: 26, 
  fontWeight: "bold",
  color: "#fefffa",
  },
  subtitulo: {
  fontWeight: "bold",
  fontSize: 18,
  color: "rgb(250, 252, 244)"
  },
  audioIcon: {
    fontSize: 25,
    marginRight: 8,
  },
});