
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
        <View style={styles.bloco}>
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

        {/* TÓPICO 2 */}
        <View style={styles.bloco}>
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

        {/* TÓPICO 3 */}
        <View style={styles.bloco}>
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

        {/* TÓPICO 4 */}
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
            LEIA COM ATENÇÃO AS QUESTÕES E IDENTIFIQUE
            O NÚMERO OU O NOME CORRETO.
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

