import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable
} from "react-native";

import { Profile } from "../../models/Profile";
import { deleteProfile, loadProfile } from "../../services/ProfileService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ProfileScreen() {

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


  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function carregarPerfil() {
        const data = await loadProfile();
        setProfile(data);
      }

      carregarPerfil();
    }, [])
  );

  if (!profile) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#78caf5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Image
  source={
    profile.photo
      ? { uri: profile.photo }
      : require("../../assets/icons/user.png")
  }
  style={styles.avatar}
/>
      <View style={{ position: "absolute", top: 150, right: 100 }}>
      <Pressable onPress={escolherFoto} style={styles.fotoButton}>
        <Text style={styles.textocamera}>📷</Text>
      </Pressable>
      </View>

      <Text style={styles.name}>{profile.name}</Text>

      <View style={styles.card}>
        <Text style={styles.info}>⭐ XP: {profile.xp}</Text>

        <Text style={styles.info}>
          🏆 Nível: {profile.level}
        </Text>

        <Text style={styles.info}>
          🌎 Mundo Atual: {profile.currentWorld}
        </Text>

        <Text style={styles.info}>
          🎯 Precisão: {profile.accuracy.toFixed(1)}%
        </Text>

        <Text style={styles.info}>
          ⏱ Tempo estudado: {profile.studyTime}s
        </Text>
        <View>
        <Pressable
          onPress={() => {
           deleteProfile();
          console.log("profile deletado");
          router.push("/criarPerfil");
          }}
        >
          <Text style={styles.delete}>
           deletar perfil
          </Text>
        </Pressable>
         
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5d5d5d",
  },

  container: {
    flex: 1,
    backgroundColor: "#5d5d5d",
    alignItems: "center",
    paddingTop: 70,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
  },

  card: { 
    width: "90%",
    backgroundColor: "#737373",
    borderRadius: 15,
    padding: 20,
  },

  info: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
  },
   delete: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "500",
    backgroundColor: "#c55e5e",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
  },
  fotoButton: {
    backgroundColor: "#a1a2a2",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 100,
    marginBottom: 10,
  },
  textocamera: {
    color: "white",
    fontSize: 30,
    marginBottom: 15,
  },
});