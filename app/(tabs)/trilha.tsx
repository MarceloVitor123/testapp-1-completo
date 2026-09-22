import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Fase = {
  id: number;
  rota: Href;
  lado: "left" | "center" | "right";
  requiredXP: number;
};



const fases: Fase[] = [
  {
    id: 1,
    rota: "/fases/fase1",
    lado: "center",
    requiredXP: 0,
  },

  {
    id: 2,
    rota: "/fases/fase2",
    lado: "left",
    requiredXP: 20,
  },

  {
    id: 3,
    rota: "/fases/fase3",
    lado: "center",
    requiredXP: 40,
  },

  {
    id: 4,
    rota: "/fases/fase4",
    lado: "right",
    requiredXP: 60,
  },
  {
	id: 5,
	rota: "/fases/fase5",
	lado: "center",
  requiredXP: 80,
  }
];

export default function Mundo() {
  const [xp, setXp] = useState(0);

useEffect(() => {
  carregarXP();
}, []);

async function carregarXP() {
  try {
    const dados = await AsyncStorage.getItem("@alfatech/profile");

    if (dados) {
      const profile = JSON.parse(dados);
      setXp(profile.xp);
    }
  } catch (error) {
    console.log("Erro ao carregar XP:", error);
  }
}


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {fases.map((fase) => {
  const desbloqueada = xp >= fase.requiredXP;

  return (
    <Pressable
      key={fase.id}
      onPress={() => {
        if (desbloqueada) {
          router.push(fase.rota);
        }
      }}
      style={[
        styles.botao,
        fase.lado === "left" && { alignSelf: "flex-start" },
        fase.lado === "center" && { alignSelf: "center" },
        fase.lado === "right" && { alignSelf: "flex-end" },
      ]}
    >
      <View style={styles.faseContainer}>
        <Image
          source={require("../../assets/images/btnfase.png")}
          style={[
            styles.imagem,
            !desbloqueada && styles.imagemBloqueada,
          ]}
        />

        <Text
          style={[
            styles.numero,
            !desbloqueada && styles.numeroBloqueado,
          ]}
        >
          {fase.id}
        </Text>

        {!desbloqueada && (
          <View style={styles.bloqueio}>
            <Image
          source={require("../../assets/icons/cadeado.png")}
          style={[
            styles.imagem2,
            !desbloqueada && styles.imagemBloqueada,
          ]}
        />
          </View>
        )}
      </View>
    </Pressable>
  );
})}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5B5B5B",
  },

  content: {
    padding: 80,
    gap: 0,
  },

  botao: {},

  imagem: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  imagem2: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  imagemBloqueada: {
  opacity: 1,
},
  faseContainer: {
    position: "relative",
},

numero: {
    position: "absolute",

    top: 50,
    left: 0,
    right: 0,

    textAlign: "center",

    fontSize: 30,
    fontWeight: "bold",

    color: "#FFFFFF",
},
numeroBloqueado: {
  color: "#afafaf",
},
bloqueio: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "rgba(80, 80, 80, 0.7)",
  borderRadius: 80,
},

cadeado: {
  fontSize: 35,
},

});