
import { loadProfile } from "../services/ProfileService";

import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  async function enter() {
    const profile = await loadProfile();

    router.replace("/trilha");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Decoração superior */}
        <View style={styles.decorCircle} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/Gemini.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Texto */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>VAMOS COMEÇAR?</Text>

          <Text style={styles.subtitle}>
            APRENDA, PRATIQUE E AVANCE{"\n"}
            NO SEU PRÓPRIO CAMINHO.
          </Text>
        </View>

        {/* Botão */}
        <Pressable
          onPress={enter}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Image
            source={require("../assets/images/btnfase.png")}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>

        {/* Indicador */}
        <View style={styles.bottomArea}>
          <View style={styles.line} />

          <Text style={styles.bottomText}>
            SUA JORNADA COMEÇA AQUI
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5d5d5d",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    overflow: "hidden",
  },

  decorCircle: {
    position: "absolute",
    width: 430,
    height: 430,
    borderRadius: 215,
    backgroundColor: "#5d5d5d",
    top: -250,
    right: -170,
  },

  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    width: 360,
    height: 190,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#17324D",
    letterSpacing: 1,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4087ce",
    textAlign: "center",
    lineHeight: 23,
    letterSpacing: 0.5,
  },

  button: {
    width: 210,
    height: 150,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#5d5d5d",
    borderRadius: 28,

    elevation: 7,

    shadowColor: "#17324D",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },

  buttonPressed: {
    transform: [{ scale: 0.95 }],
    elevation: 2,
  },

  buttonImage: {
    width: 180,
    height: 130,
  },

  bottomArea: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },

  line: {
    width: 55,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#4A90C2",
    marginBottom: 10,
  },

  bottomText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8A99A8",
    letterSpacing: 1.5,
  },
});

