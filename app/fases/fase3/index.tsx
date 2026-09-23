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
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "600",
              position: "absolute",
              top: -55,
              left: -76,
            }}
          >
            x
          </Text>
        </Pressable>
      </View>
      <View>
        <Image
          source={require("../../../assets/images/TALKPUP.png")}
          style={{ width: 400, height: 200, marginBottom: 0 }}
        ></Image>
      </View>
      <Text style={styles.title}>ATIVIDADE 2</Text>
      <Text style={styles.subtitle}>VOGAIS E CONSOANTES</Text>
      <Text style={styles.subtitle}></Text>
      <Text style={styles.subtitle}>
        Todas as palavras são formadas por partes menores chamadas sílabas. 
        As sílabas são grupos de letras que pronunciamos juntos em uma palavra. 
        Cada palavra pode ter uma ou mais sílabas. 
        Por exemplo: a palavra CASA pode ser dividida em CA e SA. 
        A palavra BOLA pode ser dividida em BO e LA. 
        Já a palavra PÉ possui apenas uma sílaba. 
        Aprender a identificar e separar as sílabas é um passo importante para começar a ler e escrever. 
        Agora é a sua vez de praticar! 🚀

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
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: "600",
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
});
