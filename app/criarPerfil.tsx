import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { defaultProfile } from "../data/defaultProfile";
import { saveProfile } from "../services/ProfileService";

export default function CriarPerfil() {
  const router = useRouter();

  const [name, setName] = useState("");

  async function criarPerfil() {
    if (name.trim() === "") return;

    const profile = {
      ...defaultProfile,
      name: name.trim(),
    };

    await saveProfile(profile);

    router.replace("/trilha");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Alfatech</Text>

      <Text style={styles.subtitle}>
        Como devemos te chamar?
      </Text>

      <TextInput
        placeholder="Digite seu nome..."
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={criarPerfil}>
        <Text style={styles.buttonText}>Continuar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5d5d5d",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 25,
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#78caf5",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});