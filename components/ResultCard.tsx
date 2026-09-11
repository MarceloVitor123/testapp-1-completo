import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type IconType = "flash" | "target" | "time";

interface ResultCardProps {
  title: string;
  value: string | number;
  color: string;
  icon: IconType;
}

export default function ResultCard({
  title,
  value,
  color,
  icon,
}: ResultCardProps) {

  function renderIcon() {
    switch (icon) {

      case "flash":
        return (
          <Ionicons
            name="flash"
            size={38}
            color="#FFD233"
          />
        );

      case "target":
        return (
          <MaterialCommunityIcons
            name="target"
            size={38}
            color="#FF4B4B"
          />
        );

      case "time":
        return (
          <Ionicons
            name="time"
            size={38}
            color="#D7F3FF"
          />
        );
    }
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: color },
      ]}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.content}>

        {renderIcon()}

        <Text style={styles.value}>
          {value}
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    width: 145,
    borderRadius: 22,
    padding: 14,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#303030",
    marginBottom: 10,
  },

  content: {
    backgroundColor: "#505050",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 12,
  },

  value: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

});