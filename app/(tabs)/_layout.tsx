import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
       tabBarStyle: {
  position: "absolute",

  left: 25,
  right: 25,
  bottom: 0,

  height: 75,

  borderRadius: 10,

  backgroundColor: "#6d6d6d",

  borderTopWidth: 0,

  elevation: 10,

  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 15,
  shadowOffset: {
    width: 0,
    height: 6,
  },
},
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#cfcfcf",
      }}
    >
      <Tabs.Screen
        name="trilha"
        options={{
          title: "fases",
          tabBarIcon: () => (
  <Image
    source={require("../../assets/icons/home.png")}
    style={{
      width: 32,
      height: 32,
      resizeMode: "contain",
    }}
  />
),
        }}
      />

      <Tabs.Screen
        name="progresso"
        options={{
          title: "Progresso",
          tabBarIcon: ({ color, size }) => (
            <Image
    source={require("../../assets/icons/fire.png")}
    style={{
      width: 32,
      height: 32,
      resizeMode: "contain",
    }}
  />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Image
    source={require("../../assets/icons/user.png")}
    style={{
      width: 32,
      height: 32,
      resizeMode: "contain",
    }}
  />
          ),
        }}
      />
    </Tabs>
  );
}