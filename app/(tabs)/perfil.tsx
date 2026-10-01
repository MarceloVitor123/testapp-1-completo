import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import { Profile } from "../../models/Profile";
import { deleteProfile, loadProfile } from "../../services/ProfileService";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [carregando, setCarregando] = useState(true);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function carregarPerfil() {
        setCarregando(true);

        const data = await loadProfile();

        setProfile(data);
        setCarregando(false);
      }

      carregarPerfil();
    }, [])
  );

  const escolherFoto = async () => {
    if (!profile) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      const foto = resultado.assets[0].uri;

      const novoProfile = {
        ...profile,
        photo: foto,
      };

      setProfile(novoProfile);

      await AsyncStorage.setItem(
        "@alfatech/profile",
        JSON.stringify(novoProfile)
      );
    }
  };

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>CARREGANDO PERFIL...</Text>
      </View>
    );
  }

  if (!profile) {
    router.replace("/criarPerfil");
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.title}>MEU PERFIL</Text>
        <Text style={styles.subtitle}>
          ACOMPANHE SUA JORNADA NO ALFATECH
        </Text>
      </View>

      {/* AVATAR */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarBorder}>
          <Image
            source={
              profile.photo
                ? { uri: profile.photo }
                : require("../../assets/icons/user.png")
            }
            style={styles.avatar}
          />
        </View>

        <Pressable
          onPress={escolherFoto}
          style={styles.fotoButton}
        >
          <Text style={styles.camera}>📷</Text>
        </Pressable>
      </View>

      {/* NOME */}
      <Text style={styles.name}>{profile.name}</Text>

      {/* NÍVEL */}
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>
          🏆 NÍVEL {profile.level}
        </Text>

        <View style={styles.levelBarBackground}>
          <View
            style={[
              styles.levelBar,
              {
                width: `${Math.min(
                  (profile.xp % 100),
                  100
                )}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.xpText}>
          ⭐ {profile.xp} XP
        </Text>
      </View>

      {/* ESTATÍSTICAS */}
      <Text style={styles.sectionTitle}>SEUS DADOS</Text>

      <View style={styles.statsGrid}>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={styles.statValue}>{profile.xp}</Text>
          <Text style={styles.statLabel}>XP TOTAL</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🎯</Text>
          <Text style={styles.statValue}>
            {profile.accuracy.toFixed(1)}%
          </Text>
          <Text style={styles.statLabel}>PRECISÃO</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🌎</Text>
          <Text style={styles.statValue}>
            {profile.currentWorld}
          </Text>
          <Text style={styles.statLabel}>MUNDO ATUAL</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📚</Text>
          <Text style={styles.statValue}>
            {profile.completedLessons}
          </Text>
          <Text style={styles.statLabel}>ATIVIDADES</Text>
        </View>

      </View>

      {/* TEMPO DE ESTUDO */}
      <View style={styles.studyCard}>
        <View>
          <Text style={styles.studyTitle}>
            ⏱ TEMPO DE ESTUDO
          </Text>

          <Text style={styles.studyValue}>
            {profile.studyTime}s
          </Text>
        </View>

        <Text style={styles.studyEmoji}>📖</Text>
      </View>

      {/* BOTÃO EXCLUIR */}
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          deleteProfile();
          console.log("profile deletado");
          router.push("/criarPerfil");
        }}
      >
        <Text style={styles.deleteText}>
          🗑️ DELETAR PERFIL
        </Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B4B4B",
  },

  loadingText: {
    color: "white",
    marginTop: 15,
    fontSize: 14,
    fontWeight: "bold",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#4B4B4B",
    paddingTop: 45,
    paddingBottom: 60,
  },

  /* CABEÇALHO */

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 1,
  },

  subtitle: {
    color: "#CFCFCF",
    fontSize: 11,
    marginTop: 5,
    letterSpacing: 1,
  },

  /* AVATAR */

  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },

  avatarBorder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    padding: 5,
    backgroundColor: "#8D8D8D",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },

  fotoButton: {
    position: "absolute",
    right: -3,
    bottom: 3,

    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: "#6F6F6F",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 3,
    borderColor: "#4B4B4B",

    elevation: 5,
  },

  camera: {
    fontSize: 22,
  },

  /* NOME */

  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
  },

  /* NÍVEL */

  levelContainer: {
    width: "88%",
    backgroundColor: "#666666",
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  levelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  levelBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#484848",
    borderRadius: 10,
    overflow: "hidden",
  },

  levelBar: {
    height: "100%",
    backgroundColor: "#BFBFBF",
    borderRadius: 10,
  },

  xpText: {
    color: "#DADADA",
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
  },

  /* ESTATÍSTICAS */

  sectionTitle: {
    alignSelf: "flex-start",
    marginLeft: "7%",
    marginBottom: 12,

    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  statsGrid: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    backgroundColor: "#666666",

    borderRadius: 18,
    padding: 18,
    marginBottom: 12,

    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  statIcon: {
    fontSize: 25,
    marginBottom: 8,
  },

  statValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },

  statLabel: {
    color: "#D0D0D0",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 4,
  },

  /* TEMPO */

  studyCard: {
    width: "88%",
    backgroundColor: "#666666",

    borderRadius: 18,
    padding: 20,
    marginTop: 10,
    marginBottom: 25,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 4,
  },

  studyTitle: {
    color: "#D0D0D0",
    fontSize: 13,
    fontWeight: "bold",
  },

  studyValue: {
    color: "white",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },

  studyEmoji: {
    fontSize: 42,
  },

  /* DELETAR */

  deleteButton: {
    width: "88%",
    paddingVertical: 15,

    borderRadius: 14,

    backgroundColor: "#595959",

    borderWidth: 1,
    borderColor: "#777777",

    alignItems: "center",
  },

  deleteText: {
    color: "#E5A0A0",
    fontSize: 14,
    fontWeight: "bold",
  },

});