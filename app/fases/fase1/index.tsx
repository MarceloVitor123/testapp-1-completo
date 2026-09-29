import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useWorld } from "../../../context/WorldContext";

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
  setCurrentWorld(1);
  setWorldStartTime(Date.now());
  router.push("/fases/fase1/atividade1");
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.botaoX}>
        <Pressable onPress={() => router.back()} style={{ position: "absolute", top: 60, left: 100 }}>
          <Text style={{ color: "#080808", fontSize: 40, fontWeight: "600", position: "absolute", top: -76, left: -82 }}>
            x
          </Text>
        </Pressable>
      </View>
      <View>
      <Image source={require("../../../assets/images/TALKPUP.png")} 
     style={{ width: 400, height: 300, marginBottom: 0 }}>
      </Image>
      </View>
      <Text style={styles.title}>ATIVIDADE 1</Text>
      <Text style={styles.subtitulo}>
        VOGAIS E CONSOANTES
      </Text>
    <View style={{ width: "100%" }}>

  {/* Introdução */}
  <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center"}}>
  <Pressable onPress={() => playAudio(audioIntro)}>
    <Text style={styles.audioIcon}>🔊</Text>
  </Pressable>
    <Text style={{ flex: 1 }}></Text>
    <Text style={styles.titulo}></Text>
    {"\n\n"}
    <Text style={styles.subtitulo}>ESSAS LETRAS PODEM SER DIVIDIDAS EM DOIS GRUPOS : 
    VOGAIS E CONSOANTES.</Text>
    </View>
    <View style={{ width: "100%" }}>

  {/* Tópico 1 */}
  <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
    <Pressable onPress={() => playAudio(audioVogais)}>
  <Text style={styles.audioIcon}>🔊</Text>
    </Pressable>
    <Text style={{ flex: 1 }}>
    <Text style={styles.titulo}>1. VOGAIS</Text>
    {"\n\n"}
    <Text style={styles.subtitulo}>AS VOGAIS SÃO AS LETRAS A,E,I,O,U.
    ELAS PODEM SER PRONUNCIADAS SOZINHAS, SEM A AJUDA DE OUTRAS LETRAS. 
    </Text>
  </Text>
  </View>

  {/* Tópico 2 */}
   <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%" }}>
    <Pressable onPress={() => playAudio(audioConsoantes)}>
        <Text style={styles.audioIcon}>🔊</Text>
      </Pressable>
    <Text style={{ flex: 1 }}></Text>
    <Text>
    <Text style={styles.titulo}>2. CONSOANTES</Text>
    {"\n\n"}
    <Text style={styles.subtitulo}>JÁ AS CONSOANTES SÃO TODAS AS OUTRAS LETRAS DO ALABETO, EXCETO AS LETRAS "A,E,I,O,U".
    {"\n"} 
    NA MAIORIA DAS VEZES, ELAS PRECISAM ESTAR JUNTO DE UMA VOGAL PARA FORMAR SILABAS E PALAVRAS.</Text>
    {"\n\n"}
  <Text style={styles.subtitulo}>EXEMPLO:</Text>
  {"\n"}
  {"\n"}
  <Text style={styles.subtitulo}> -NA PALAVRA "COLA", AS VOGAIS SÃO "O" E "A", E AS CONSOANTES SÃO "C" E "L"</Text>
    </Text>
  </View>

  {/* Tópico 3 */}
 <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%" }}>
  <Pressable onPress={() => playAudio(audioPraticar)}>
  <Text style={styles.audioIcon}>🔊</Text>
  </Pressable>
  <Text style={{ flex: 1 }}></Text>
  <Text>
    <Text style={styles.titulo}>3.VAMOS PRATICAR!</Text>
    {"\n\n"}
    <Text style={styles.subtitulo}>APRENDER A IDENTIFICAR VOGAIS E CONSOANTES É 
    UM PASSO IMPORTANTE PARA COMEÇAR A LER E ESCREVER.</Text>
    {"\n\n"}
  <Text style={styles.subtitulo}>AGORA É A SUA VEZ DE PRATICAR!</Text>
  </Text>
  </View>
</View>

  </View>
      <Pressable
        onPress={handleStart}
        style={styles.button}
      >
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
    marginBottom: 12,
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
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
   titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0ec0ec"
  },

  subtitulo: {
  fontWeight: "bold",
  fontSize: 17,
  color: "rgb(250, 252, 244)"
  },

  audioIcon: {
    fontSize: 25,
    marginLeft: 8,
  },
});