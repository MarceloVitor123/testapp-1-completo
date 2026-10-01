import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  },
    {
	id: 6,
	rota: "/fases/fase5",
	lado: "left",
  requiredXP: 100,
  },
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
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View style={styles.xpCard}>
          <Text style={styles.xpIcon}>⭐</Text>

          <View>
            <Text style={styles.xpLabel}>SEU XP</Text>
            <Text style={styles.xpValue}>{xp} XP</Text>
          </View>
        </View>
      </View>

      {/* TRILHA */}
      <View style={styles.trilha}>
        {fases.map((fase, index) => {
          const desbloqueada = xp >= fase.requiredXP;

          return (
            <View key={fase.id} style={styles.faseWrapper}>
              <Pressable
                onPress={() => {
                  if (desbloqueada) {
                    router.push(fase.rota);
                  }
                }}
                disabled={!desbloqueada}
                style={[
                  styles.botao,

                  fase.lado === "left" && styles.left,
                  fase.lado === "center" && styles.center,
                  fase.lado === "right" && styles.right,

                  desbloqueada && styles.botaoAtivo,
                ]}
              >
                <View style={styles.faseContainer}>

                  {/* SOMBRA */}
                  <View
                    style={[
                      styles.sombra,
                      !desbloqueada && styles.sombraBloqueada,
                    ]}
                  />

                  {/* IMAGEM */}
                  <Image
                    source={require("../../assets/images/btnfase.png")}
                    style={[
                      styles.imagem,
                      !desbloqueada && styles.imagemBloqueada,
                    ]}
                  />

                  {/* NÚMERO */}
                  <Text
                    style={[
                      styles.numero,
                      !desbloqueada && styles.numeroBloqueado,
                    ]}
                  >
                    {fase.id}
                  </Text>

                  {/* CADEADO */}
                  {!desbloqueada && (
                    <View style={styles.bloqueio}>
                      <Image
                        source={require("../../assets/icons/cadeado.png")}
                        style={styles.imagem2}
                      />
                    </View>
                  )}
                </View>
              </Pressable>

              {/* INFORMAÇÃO DA FASE */}
              <View
                style={[
                  styles.infoFase,

                  fase.lado === "left" && styles.infoLeft,
                  fase.lado === "center" && styles.infoCenter,
                  fase.lado === "right" && styles.infoRight,
                ]}
              >
                <Text
                  style={[
                    styles.nomeFase,
                    !desbloqueada && styles.textoBloqueado,
                  ]}
                >
                  FASE {fase.id}
                </Text>

                {desbloqueada ? (
                  <Text style={styles.status}>
                    ✓ DISPONÍVEL
                  </Text>
                ) : (
                  <Text style={styles.statusBloqueado}>
                    🔒 {fase.requiredXP} XP NECESSÁRIOS
                  </Text>
                )}
              </View>

             
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B4B4B",
  },

  content: {
    paddingTop: 45,
    paddingBottom: 130,
  },

  /* HEADER */

  header: {
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 35,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  subtitulo: {
    color: "#C9C9C9",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.8,
    textAlign: "center",
    marginTop: 6,
  },

  xpCard: {
    marginTop: 20,

    width: "75%",
    minHeight: 65,

    backgroundColor: "#666666",
    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 12,

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  xpIcon: {
    fontSize: 27,
  },

  xpLabel: {
    color: "#CFCFCF",
    fontSize: 10,
    fontWeight: "bold",
  },

  xpValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },

  /* TRILHA */

  trilha: {
    width: "100%",
    alignItems: "center",
  },

  faseWrapper: {
    width: "100%",
    minHeight: 225,
    position: "relative",
  },

  botao: {
    position: "absolute",
    zIndex: 2,
  },

  left: {
    left: 45,
  },

  center: {
    alignSelf: "center",
  },

  right: {
    right: 45,
  },

  botaoAtivo: {
    transform: [{ scale: 1 }],
  },

  faseContainer: {
    position: "relative",
    width: 160,
    height: 160,
  },

  /* SOMBRA DO BOTÃO */

  sombra: {
    position: "absolute",

    width: 150,
    height: 150,

    top: 9,
    left: 5,

    borderRadius: 75,

    backgroundColor: "rgba(0,0,0,0.25)",
  },

  sombraBloqueada: {
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  /* IMAGEM */

  imagem: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  imagemBloqueada: {
    opacity: 0.55,
  },

  /* NÚMERO */

  numero: {
    position: "absolute",

    top: 50,
    left: 0,
    right: 0,

    textAlign: "center",

    fontSize: 30,
    fontWeight: "900",

    color: "#FFFFFF",
  },

  numeroBloqueado: {
    color: "#A5A5A5",
  },

  /* BLOQUEIO */

  bloqueio: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(60,60,60,0.45)",

    borderRadius: 80,
  },

  imagem2: {
    width: 65,
    height: 65,
    resizeMode: "contain",

    opacity: 0.9,
  },

  /* TEXTO DA FASE */

  infoFase: {
    position: "absolute",
    top: 160,

    width: 180,

    alignItems: "center",
  },

  infoLeft: {
    left: 35,
  },

  infoCenter: {
    alignSelf: "center",
  },

  infoRight: {
    right: 35,
  },

  nomeFase: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  status: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 3,
  },

  statusBloqueado: {
    color: "#9B9B9B",
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 3,
  },

  textoBloqueado: {
    color: "#8E8E8E",
  },

  /* CONECTORES */

  conector: {
    position: "absolute",

    width: 5,
    height: 70,

    backgroundColor: "#3D3D3D",

    borderRadius: 5,

    zIndex: 0,
  },

  conectorAtivo: {
    backgroundColor: "#888888",
  },

  conectorLeft: {
    left: 120,
    top: 155,

    transform: [{ rotate: "-30deg" }],
  },

  conectorCenter: {
    left: "50%",
    top: 155,

    transform: [{ translateX: -2.5 }],
  },

  conectorRight: {
    right: 120,
    top: 155,

    transform: [{ rotate: "30deg" }],
  },
});