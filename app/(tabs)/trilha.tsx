import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

/* ------------------------------------------------------------------ */
/* DADOS                                                               */
/* ------------------------------------------------------------------ */

type Fase = {
  id: number;
  rota: Href;
  requiredXP: number;
};

const fases: Fase[] = [
  { id: 1, rota: "/fases/fase1", requiredXP: 0 },
  { id: 2, rota: "/fases/fase2", requiredXP: 20 },
  { id: 3, rota: "/fases/fase3", requiredXP: 40 },
  { id: 4, rota: "/fases/fase4", requiredXP: 60 },
  { id: 5, rota: "/fases/fase5", requiredXP: 80 },
  // TODO: trocar para "/fases/fase6" quando a fase 6 existir
  { id: 6, rota: "/fases/fase5", requiredXP: 100 },
];

/* ------------------------------------------------------------------ */
/* CONFIGURAÇÃO VISUAL (ajuste aqui)                                   */
/* ------------------------------------------------------------------ */

const COLORS = {
  fundo: "#4B4B4B",
  card: "#5C5C5C",
  acento: "#8B5CF6", // cor de destaque (fase atual, banner, barra)
  acentoEscuro: "#6D3FE0",
  sucesso: "#4ADE80",
  pontoAtivo: "#B8B8B8",
  pontoInativo: "#6A6A6A",
  textoClaro: "#FFFFFF",
  textoSuave: "#CFCFCF",
};

const NODE_SIZE = 130; // tamanho do botão da fase
const STEP_Y = 150; // distância vertical entre fases
const AMPLITUDE = 80; // quanto a trilha balança para os lados
const TOP_PAD = 70; // espaço acima da 1ª fase (balão "COMEÇAR")
const CENTER_RATIO = 0.43; // centro visual do círculo dentro da imagem
const DOT_SIZE = 8;
const DOT_GAP = 17;

const ESCALA = NODE_SIZE / 160; // as medidas originais eram para 160px

/* ------------------------------------------------------------------ */
/* GEOMETRIA DA TRILHA                                                 */
/* ------------------------------------------------------------------ */

type Ponto = { cx: number; cy: number; top: number };

function posicao(index: number, largura: number): Ponto {
  // onda suave: centro → direita → direita → centro → esquerda → esquerda...
  const cx = largura / 2 + Math.sin((index * Math.PI) / 3) * AMPLITUDE;
  const top = TOP_PAD + index * STEP_Y;
  return { cx, top, cy: top + NODE_SIZE * CENTER_RATIO };
}

/* ------------------------------------------------------------------ */
/* COMPONENTES                                                         */
/* ------------------------------------------------------------------ */

/** Linha pontilhada ligando duas fases */
function Conector({
  de,
  para,
  ativo,
}: {
  de: Ponto;
  para: Ponto;
  ativo: boolean;
}) {
  const dx = para.cx - de.cx;
  const dy = para.cy - de.cy;
  const distancia = Math.hypot(dx, dy);
  const ux = dx / distancia;
  const uy = dy / distancia;

  const margem = NODE_SIZE * 0.44;
  const util = distancia - margem * 2;
  if (util <= 0) return null;

  const qtd = Math.floor(util / DOT_GAP) + 1;
  const inicio = margem + (util - (qtd - 1) * DOT_GAP) / 2;

  return (
    <>
      {Array.from({ length: qtd }).map((_, i) => {
        const d = inicio + i * DOT_GAP;
        return (
          <View
            key={i}
            style={[
              styles.ponto,
              ativo && styles.pontoAtivo,
              {
                left: de.cx + ux * d - DOT_SIZE / 2,
                top: de.cy + uy * d - DOT_SIZE / 2,
              },
            ]}
          />
        );
      })}
    </>
  );
}

/** Balão "COMEÇAR" que flutua acima da fase atual */
function BalaoComecar() {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, {
          toValue: -6,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [y]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.balaoWrapper, { transform: [{ translateY: y }] }]}
    >
      <View style={styles.balao}>
        <Text style={styles.balaoTexto}>COMEÇAR</Text>
      </View>
      <View style={styles.balaoSeta} />
    </Animated.View>
  );
}

/** Anel que pulsa ao redor da fase atual */
function AnelPulsante() {
  const pulso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulso, {
        toValue: 1,
        duration: 1600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [pulso]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.anel,
        {
          opacity: pulso.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 0],
          }),
          transform: [
            {
              scale: pulso.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1.3],
              }),
            },
          ],
        },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* TELA                                                                */
/* ------------------------------------------------------------------ */

export default function Mundo() {
  const [xp, setXp] = useState(0);
  const { width } = useWindowDimensions();

  // recarrega o XP sempre que a tela volta ao foco (ex.: ao sair de uma fase)
  useFocusEffect(
    useCallback(() => {
      carregarXP();
    }, [])
  );

  async function carregarXP() {
    try {
      const dados = await AsyncStorage.getItem("@alfatech/profile");

      if (dados) {
        const profile = JSON.parse(dados);
        setXp(profile.xp ?? 0);
      }
    } catch (error) {
      console.log("Erro ao carregar XP:", error);
    }
  }

  const posicoes = fases.map((_, i) => posicao(i, width));

  // última fase desbloqueada = fase atual
  const indiceAtual = fases.reduce(
    (acc, fase, i) => (xp >= fase.requiredXP ? i : acc),
    0
  );

  // progresso até a próxima fase
  const proxima = fases[indiceAtual + 1];
  const base = fases[indiceAtual].requiredXP;
  const progresso = proxima
    ? Math.min(1, Math.max(0, (xp - base) / (proxima.requiredXP - base)))
    : 1;

  const alturaTrilha = TOP_PAD + fases.length * STEP_Y;

  return (
    <View style={styles.container}>
      {/* CABEÇALHO FIXO */}
      <View style={styles.header}>
        <View style={styles.xpBloco}>
          <Text style={styles.xpIcon}>⭐</Text>
          <Text style={styles.xpValue}>{xp}</Text>
        </View>

        <View style={styles.progressoBloco}>
          <Text style={styles.progressoTexto}>
            {proxima
              ? `Faltam ${proxima.requiredXP - xp} XP para a fase ${proxima.id}`
              : "Você desbloqueou todas as fases!"}
          </Text>
          <View style={styles.barra}>
            <View
              style={[styles.barraPreenchida, { width: `${progresso * 100}%` }]}
            />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* BANNER DA UNIDADE */}
        

        {/* TRILHA */}
        <View style={[styles.trilha, { height: alturaTrilha }]}>
          {/* conectores (atrás dos botões) */}
          {fases.slice(0, -1).map((fase, i) => (
            <Conector
              key={`c-${fase.id}`}
              de={posicoes[i]}
              para={posicoes[i + 1]}
              ativo={xp >= fases[i + 1].requiredXP}
            />
          ))}

          {/* fases */}
          {fases.map((fase, index) => {
            const desbloqueada = xp >= fase.requiredXP;
            const atual = index === indiceAtual;
            const concluida = index < indiceAtual;
            const p = posicoes[index];

            return (
              <View
                key={fase.id}
                style={[
                  styles.faseWrapper,
                  { left: p.cx - NODE_SIZE / 2, top: p.top },
                ]}
              >
                {atual && <BalaoComecar />}

                <Pressable
                  disabled={!desbloqueada}
                  onPress={() => router.push(fase.rota)}
                  style={({ pressed }) => [
                    styles.botao,
                    pressed && desbloqueada && styles.botaoPressionado,
                  ]}
                >
                  {/* ANEL PULSANTE */}
                  {atual && <AnelPulsante />}

                  {/* SOMBRA */}
                  <View
                    style={[
                      styles.sombra,
                      !desbloqueada && styles.sombraBloqueada,
                    ]}
                  />

                  {/* IMAGEM DO BOTÃO */}
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
                        style={styles.imagemCadeado}
                      />
                    </View>
                  )}

                  {/* SELO DE CONCLUÍDA */}
                  {concluida && (
                    <View style={styles.selo}>
                      <Text style={styles.seloTexto}>✓</Text>
                    </View>
                  )}
                </Pressable>

                {/* XP NECESSÁRIO (fases bloqueadas) */}
                {!desbloqueada && (
                  <View style={styles.pilula}>
                    <Text style={styles.pilulaTexto}>
                      {fase.requiredXP} XP
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* ESTILOS                                                             */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fundo,
  },

  content: {
    paddingTop: 16,
    paddingBottom: 130,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingTop: 45,
    paddingBottom: 14,
    paddingHorizontal: 20,
    backgroundColor: COLORS.fundo,
    borderBottomWidth: 2,
    borderBottomColor: "#3D3D3D",
    zIndex: 10,
  },

  xpBloco: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.card,
  },

  xpIcon: {
    fontSize: 20,
  },

  xpValue: {
    color: COLORS.textoClaro,
    fontSize: 20,
    fontWeight: "900",
  },

  progressoBloco: {
    flex: 1,
    gap: 6,
  },

  progressoTexto: {
    color: COLORS.textoSuave,
    fontSize: 11,
    fontWeight: "600",
  },

  barra: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3D3D3D",
    overflow: "hidden",
  },

  barraPreenchida: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.acento,
  },

  /* BANNER */

  banner: {
    marginHorizontal: 20,
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: COLORS.acento,
    borderBottomWidth: 5,
    borderBottomColor: COLORS.acentoEscuro,
  },

  bannerUnidade: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
  },

  bannerTitulo: {
    color: COLORS.textoClaro,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 2,
  },

  /* TRILHA */

  trilha: {
    width: "100%",
    position: "relative",
  },

  ponto: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: COLORS.pontoInativo,
    zIndex: 0,
  },

  pontoAtivo: {
    backgroundColor: COLORS.pontoAtivo,
  },

  faseWrapper: {
    position: "absolute",
    width: NODE_SIZE,
    height: NODE_SIZE,
    zIndex: 2,
  },

  botao: {
    width: NODE_SIZE,
    height: NODE_SIZE,
  },

  botaoPressionado: {
    transform: [{ translateY: 4 }],
  },

  /* ANEL DA FASE ATUAL */

  anel: {
    position: "absolute",
    top: NODE_SIZE * 0.06,
    left: NODE_SIZE * 0.06,
    width: NODE_SIZE * 0.88,
    height: NODE_SIZE * 0.88,
    borderRadius: NODE_SIZE,
    borderWidth: 4,
    borderColor: COLORS.acento,
  },

  /* SOMBRA DO BOTÃO */

  sombra: {
    position: "absolute",
    width: 150 * ESCALA,
    height: 150 * ESCALA,
    top: 9 * ESCALA,
    left: 5 * ESCALA,
    borderRadius: 75 * ESCALA,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  sombraBloqueada: {
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  /* IMAGEM */

  imagem: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    resizeMode: "contain",
  },

  imagemBloqueada: {
    opacity: 0.55,
  },

  /* NÚMERO */

  numero: {
    position: "absolute",
    top: 50 * ESCALA,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 30 * ESCALA + 2,
    fontWeight: "900",
    color: COLORS.textoClaro,
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
    borderRadius: NODE_SIZE / 2,
  },

  imagemCadeado: {
    width: 65 * ESCALA,
    height: 65 * ESCALA,
    resizeMode: "contain",
    opacity: 0.9,
  },

  /* SELO DE CONCLUÍDA */

  selo: {
    position: "absolute",
    right: 4,
    top: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.sucesso,
    borderWidth: 3,
    borderColor: COLORS.fundo,
    alignItems: "center",
    justifyContent: "center",
  },

  seloTexto: {
    color: "#14532D",
    fontSize: 14,
    fontWeight: "900",
    marginTop: -1,
  },

  /* XP NECESSÁRIO */

  pilula: {
    position: "absolute",
    bottom: 6,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "#3D3D3D",
  },

  pilulaTexto: {
    color: "#BDBDBD",
    fontSize: 11,
    fontWeight: "800",
  },

  /* BALÃO "COMEÇAR" */

  balaoWrapper: {
    position: "absolute",
    top: -46,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 5,
  },

  balao: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: COLORS.textoClaro,
  },

  balaoTexto: {
    color: COLORS.acentoEscuro,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  balaoSeta: {
    width: 12,
    height: 12,
    marginTop: -6,
    backgroundColor: COLORS.textoClaro,
    transform: [{ rotate: "45deg" }],
  },
});