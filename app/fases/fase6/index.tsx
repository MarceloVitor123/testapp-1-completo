import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState, useRef } from "react";
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
  const [audioPlaying, setAudioPlaying] = useState(false)
  const soundRef = useRef<Audio.Sound | null>(null)
  const audioIntro = require("@/components/audios/Fase_6.mp3")
  const audioNumber = require("@/components/audios/Fase_6_1.mp3")
  const audioNumber2 = require("@/components/audios/Fase_6_2.mp3")
  const audioNumber3 = require("@/components/audios/Fase_6_3.mp3")
  const audioNumber4 = require("@/components/audios/Fase_6_4.mp3")

  const playAudio = async (audioFile: any) => {
      if (!audioFile) return;
      if (audioPlaying) return;
      
      try {
          setAudioPlaying(true);
          const { sound } = await Audio.Sound.createAsync(audioFile);
  
          soundRef.current = sound
  
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
              setAudioPlaying(false);
              sound.unloadAsync();
              soundRef.current = null
            }
          });
  
            await sound.playAsync();
          } catch (error) {
            console.log("Erro ao reproduzir áudio:", error);
            setAudioPlaying(false);
          }
    }

  const handleStart = async () => {
    if(soundRef.current){
      await soundRef.current.stopAsync()
      await soundRef.current.unloadAsync()
      soundRef.current = null
      setAudioPlaying(false)
     }

    resetWorld();
    setCurrentWorld(6);
    setWorldStartTime(Date.now());
    router.push("/fases/fase6/atividade1");
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

      
      <Text style={styles.title}>ATIVIDADE 6</Text>

      <Text style={styles.subtitulo2}>
        DEZENAS E CENTENAS
      </Text>

      <View style={{ width: "100%" }}>

        {/* INTRODUÇÃO */}
        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center"}}>
          <Pressable onPress={() => playAudio(audioIntro)}>
            <Text style={styles.audioIcon0}>🔊</Text>
          </Pressable>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.subtitulo1}>
            OS NÚMEROS PODEM SER FORMADOS POR
            UNIDADES, DEZENAS E CENTENAS.
            {"\n"}
            VAMOS APRENDER COMO IDENTIFICAR CADA UMA DELAS.
          </Text>
        </View>

        {/* TÓPICO 1 */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
          <Pressable onPress={() => playAudio(audioNumber)}>
            <Text style={styles.audioIcon1}>🔊</Text>
          </Pressable>
      
        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            1. O QUE É UMA DEZENA?
          </Text>
          {"\n\n"}
          <Text style={styles.subtitulo}>
            UMA DEZENA É FORMADA POR 10 UNIDADES.
          </Text>
          {"\n\n"}
          <Text style={styles.exemplo}>
            10 = 1 DEZENA
          </Text>
          {"\n"}
          <Text style={styles.exemplo}>
            20 = 2 DEZENAS
          </Text>
          {"\n"}
          <Text style={styles.exemplo}>
            30 = 3 DEZENAS
          </Text>
          {"\n\n"}

            <Text style={styles.subtitulo}>
            ENTÃO, QUANDO TEMOS 10 UNIDADES,
            TEMOS 1 DEZENA.
            </Text>
          </View>
        </View>

        {/* TÓPICO 2 */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
          <Pressable onPress={() => playAudio(audioNumber2)}>
            <Text style={styles.audioIcon2}>🔊</Text>
          </Pressable>

        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            2. O QUE É UMA CENTENA?
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            UMA CENTENA É FORMADA POR 100 UNIDADES.
          </Text>

          {"\n\n"}

          <Text style={styles.exemplo}>
            100 = 1 CENTENA
          </Text>

          {"\n"}

          <Text style={styles.exemplo}>
            200 = 2 CENTENAS
          </Text>

          {"\n"}

          <Text style={styles.exemplo}>
            300 = 3 CENTENAS
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            ENTÃO, QUANDO TEMOS 100 UNIDADES,
            TEMOS 1 CENTENA.
          </Text>
        </View>
        </View>

        {/* TÓPICO 3 */}
      <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
        <Pressable onPress={() => playAudio(audioNumber3)}>
          <Text style={styles.audioIcon3}>🔊</Text>
        </Pressable>

        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            3. DEZENAS E CENTENAS
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            UM NÚMERO PODE TER UNIDADES, DEZENAS
            E CENTENAS AO MESMO TEMPO.
          </Text>

          {"\n\n"}

          <Text style={styles.exemplo}>
            125
          </Text>

          {"\n"}

          <Text style={styles.subtitulo}>
            1 CENTENA
            {"\n"}
            2 DEZENAS
            {"\n"}
            5 UNIDADES
          </Text>

          {"\n\n"}

          <Text style={styles.exemplo}>
            125 = 100 + 20 + 5
          </Text>
        </View>
      </View>

        {/* TÓPICO 4 */}
        <View style={{ flexDirection:"row", alignItems: "flex-start", width: "100%"}}>
          <Pressable onPress={() => playAudio(audioNumber4)}>
            <Text style={styles.audioIcon4}>🔊</Text>
          </Pressable>
        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            4. VAMOS PRATICAR!
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            AGORA É A SUA VEZ!
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            NAS PRÓXIMAS ATIVIDADES, VOCÊ VAI
            IDENTIFICAR DEZENAS E CENTENAS
            E APRENDER A DECOMPOR OS NÚMEROS.
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
        onPress={handleStart} style={styles.button}>
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
    marginBottom: 8,
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

  audioIcon0: {
    fontSize: 25,
    left: -488,
    top: 32,
  },

  audioIcon1: {
    fontSize: 25,
    marginRight: 8,
  },

  audioIcon2: {
    fontSize: 25,
    marginRight: 8,
  },

  audioIcon3: {
    fontSize: 25,
    marginRight: 8,
  },

  audioIcon4: {
    fontSize: 25,
    marginRight: 8,
  },
});
