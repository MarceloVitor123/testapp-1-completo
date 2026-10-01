import { useRouter } from "expo-router";
import React from "react";
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
  // const { setCurrentWorld, resetWorld, setWorldStartTime } = useWorld();

  const handleStart = () => {
    resetWorld();
    setCurrentWorld(3);
    setWorldStartTime(Date.now());
    router.push("/fases/fase3/atividade1");
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

      <Text style={styles.titulo}>ATIVIDADE 3</Text>

      {"\n\n"}

      <Text style={styles.titulo2}>SÍLABAS</Text>

      <Text style={styles.subtitle}></Text>

      <Text>
        {/* Tópico 1 */}
        <Text style={styles.titulo}>1. SÍLABAS</Text>

        {"\n\n"}

        <Text style={styles.subtitulo}>
          NAS FASES 1 E 2, VOCÊ APRENDEU A RECONHECER LETRAS, SONS E SÍLABAS.
          AGORA, NA FASE 3, VAMOS USAR ESSES CONHECIMENTOS PARA DAR UM NOVO
          PASSO:
        </Text>

        {"\n\n"}

        <Text style={styles.subtitulo}>
          COMEÇAR A ESCREVER PALAVRAS.
        </Text>

        {"\n\n"}

        <Text style={styles.subtitulo}>
          NESTA FASE, AS ATIVIDADES FICARÃO UM POUCO MAIS DESAFIADORAS. VOCÊ
          VAI PRATICAR COMPLETANDO PALAVRAS E FRASES E, AOS POUCOS, APRENDERÁ
          A ESCREVER PALAVRAS SOZINHO.
        </Text>

        {"\n\n"}

        {/* Tópico 2 */}
        <Text style={styles.titulo}>2. OBJETIVO DA FASE</Text>

        {"\n\n"}

        <Text style={styles.subtitulo}>
          O OBJETIVO É AUMENTAR O NÍVEL DE DIFICULDADE DE FORMA GRADUAL,
          UTILIZANDO O QUE VOCÊ JÁ APRENDEU PARA DESENVOLVER SUAS HABILIDADES
          DE LEITURA E ESCRITA.
        </Text>

        {"\n\n"}

        <Text style={styles.subtitulo}>
          APRENDER A IDENTIFICAR, SEPARAR E ESCREVER AS SÍLABAS É UM PASSO
          IMPORTANTE PARA COMEÇAR A FORMAR PALAVRAS E FRASES.
        </Text>

        {"\n\n"}

        {/* Tópico 3 */}
        <Text style={styles.titulo}>3. VAMOS PRATICAR!</Text>

        {"\n\n"}

        <Text style={styles.subtitulo }>
          AGORA É A SUA VEZ DE COLOCAR O QUE APRENDEU EM PRÁTICA!
        </Text>
      </Text>

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
    color: "rgb(250, 252, 244)",
  },
});