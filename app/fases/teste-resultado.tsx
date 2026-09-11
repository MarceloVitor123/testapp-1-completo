import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useWorld } from "../../context/WorldContext";
import { updatePhaseProgress } from "../../services/ProfileService";
import { Profile } from "@/models/Profile";
import ResultCard from "../../components/ResultCard";

export default function TesteResultadoScreen() {
  const router = useRouter();

  const {
    currentWorld,
    totalXp,
    totalTimeSeconds,
    accuracy,
    resetWorld,
  } = useWorld();

  const accuracyPercent = Math.round(accuracy * 100);

  function formatTime(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;

    return `${s}s`;
  }

  async function handleContinue() {
    if (currentWorld !== null) {
      await updatePhaseProgress(
        `fase${currentWorld}` as keyof Profile["phases"],
        {
          xp: totalXp,
          accuracy: accuracyPercent,
          time: totalTimeSeconds,
          completed: true,
        }
      );
    }

    resetWorld();
    router.push("/trilha");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* Logo */}

      <Image
        source={require("../../assets/images/TALKPUP.png")}
        style={styles.logo}
      />

      {/* Título */}

      <Text style={styles.title}>
        Prática Completa!
      </Text>

      {/* Linha Superior */}

      <View style={styles.row}>

        <ResultCard
          title="XP TOTAL"
          value={totalXp}
          icon="flash"
          color="#1B8FFF"
        />

        <ResultCard
          title="INCRÍVEL"
          value={`${accuracyPercent}%`}
          icon="target"
          color="#16D6C5"
        />

      </View>

      {/* Tempo */}

      <ResultCard
        title="TEMPO"
        value={formatTime(totalTimeSeconds)}
        icon="time"
        color="#22C7F2"
      />

      {/* Botão */}

      <Pressable
        style={styles.button}
        onPress={handleContinue}
      >
        <Ionicons
          name="play"
          size={42}
          color="#fff"
        />
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
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#18C5F2",
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "92%",
    height: 70,
    borderRadius: 35,
    backgroundColor: "#18C8D8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

});