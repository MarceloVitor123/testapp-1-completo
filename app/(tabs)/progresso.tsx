
import { ScrollView ,View, Text, StyleSheet } from "react-native";
import { useStreak} from "../../context/StreakContext";


const formatarData = (data: string | null) => {
  if (!data) return "Nenhum registro";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

export default function Progresso() {
  const { streak } = useStreak();

  

  var time = formatarData(streak.lastStudyDate)

  return (
    <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>SEU PROGRESSO</Text>

      <View style={styles.streakCard}>
        <Text style={styles.fire}>🔥</Text>
        <Text style={styles.streakNumber}>
          {streak.currentStreak}
        </Text>
        <Text style={styles.streakLabel}>DIAS DE OFENSIVA</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏆</Text>
          <Text style={styles.statNumber}>
            {streak.bestStreak}
          </Text>
          <Text style={styles.statLabel}>MAIOR OFENSIVA</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📅</Text>
          <Text style={styles.statNumber}>
            {streak.studyDays.length}
          </Text>
          <Text style={styles.statLabel}>DIAS ESTUDADOS</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ÚLTIMO ESTUDO </Text>
        <Text style={styles.infoDate}>{time}</Text>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5d5d5d",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 100,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ff7c11",
    marginBottom: 25,
  },

  streakCard: {
    backgroundColor: "#737373",
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  fire: {
    fontSize: 42,
    marginBottom: 5,
  },

  streakNumber: {
    fontSize: 64,
    fontWeight: "900",
    color: "#FF7A00",
  },

  streakLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#010203",
    marginTop: -5,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#737373",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  statIcon: {
    fontSize: 26,
    marginBottom: 8,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#202633",
  },

  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#101319",
    marginTop: 3,
  },

  infoCard: {
    backgroundColor: "#737373",
    borderRadius: 20,
    padding: 20,
    marginTop: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff7c11",
    marginBottom: 6,
  },

  infoDate: {
    fontSize: 20,
    fontWeight: "800",
    color: "#080a0f",
  },
  content: {
    padding: 0,
    gap: 0,
  },
});
