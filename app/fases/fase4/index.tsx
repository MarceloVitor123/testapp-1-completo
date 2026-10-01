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

  const handleStart = () => {
    resetWorld();
    setCurrentWorld(1);
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

      <Text style={styles.title}>ATIVIDADE 5</Text>

      <Text style={styles.subtitulo2}>
        INTERPRETAÇÃO DE TEXTO
      </Text>

      <View style={{ width: "100%" }}>

        {/* INTRODUÇÃO */}
        <View style={styles.bloco}>
          <Text style={styles.subtitulo1}>
            LER É MAIS DO QUE RECONHECER AS PALAVRAS.
            {"\n"}
            QUANDO LEMOS UM TEXTO, PODEMOS ENTENDER
            O QUE ELE ESTÁ DIZENDO E ENCONTRAR
            INFORMAÇÕES IMPORTANTES.
          </Text>
        </View>

        {/* TÓPICO 1 */}
        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            1. LENDO UM TEXTO
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            QUANDO LEMOS UM TEXTO, DEVEMOS PRESTAR
            ATENÇÃO NAS PALAVRAS E NAS INFORMAÇÕES
            QUE APARECEM NELE.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            LEIA COM CALMA E TENTE ENTENDER
            O QUE O TEXTO QUER DIZER.
          </Text>
        </View>

        {/* TÓPICO 2 */}
        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            2. ENCONTRANDO INFORMAÇÕES
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            UM TEXTO PODE TRAZER INFORMAÇÕES SOBRE
            PESSOAS, LUGARES, OBJETOS E ACONTECIMENTOS.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            PARA ENTENDER O TEXTO, PODEMOS PROCURAR
            RESPOSTAS PARA PERGUNTAS COMO:
          </Text>

          {"\n\n"}

          <Text style={styles.exemplo}>
            QUEM?
          </Text>

          <Text style={styles.exemplo}>
            ONDE?
          </Text>

          <Text style={styles.exemplo}>
            O QUE ACONTECEU?
          </Text>
        </View>

        {/* TÓPICO 3 */}
        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            3. ENTENDENDO O QUE FOI LIDO
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            DEPOIS DE LER UM TEXTO, É IMPORTANTE
            PENSAR SOBRE O QUE VOCÊ ACABOU DE LER.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            A RESPOSTA PARA UMA PERGUNTA PODE ESTAR
            ESCRITA DIRETAMENTE NO TEXTO.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            POR ISSO, LEIA O TEXTO COM ATENÇÃO
            ANTES DE ESCOLHER UMA RESPOSTA.
          </Text>
        </View>

        {/* TÓPICO 4 */}
        <View style={styles.bloco}>
          <Text style={styles.titulo}>
            4. VAMOS PRATICAR!
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            AGORA VOCÊ VAI LER PEQUENOS TEXTOS
            E RESPONDER A PERGUNTAS SOBRE ELES.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            LEIA COM ATENÇÃO E PROCURE NO TEXTO
            AS INFORMAÇÕES NECESSÁRIAS PARA RESPONDER.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            LEIA, PENSE E ESCOLHA A RESPOSTA CORRETA.
          </Text>

          {"\n\n"}

          <Text style={styles.subtitulo}>
            VAMOS COMEÇAR!
          </Text>
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

  exemplo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#35c0f7",
    textAlign: "center",
    marginBottom: 12,
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