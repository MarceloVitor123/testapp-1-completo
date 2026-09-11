import { View, Text, StyleSheet } from "react-native";

export default function Progresso() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Progresso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  texto: {
    fontSize: 24,
    fontWeight: "bold",
  },
});