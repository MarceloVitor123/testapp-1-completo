import { loadProfile } from "../services/ProfileService";

import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5d5d5d",
  },
});

export default function Index() {
  const router = useRouter();

  async function enter() {
    const profile = await loadProfile();

    if (!profile) {
      router.replace("/criarPerfil");
      return;
    }

    router.replace("/trilha");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Gemini.png")}
        style={{ width: 400, height: 200, marginBottom: 100 }}
      />

      <Pressable onPress={enter}>
        <Image
          source={require("../assets/images/btnfase.png")}
          style={{ width: 250, height: 250 }}
        />
      </Pressable>
    </View>
  );
}