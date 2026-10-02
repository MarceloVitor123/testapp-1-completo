import { Tabs } from "expo-router";
import { Image, View } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#C8C8C8",

        tabBarStyle: {
          position: "absolute",

          left: 20,
          right: 20,
          bottom: 18,

          height: 72,

          borderRadius: 25,

          backgroundColor: "#666666",

          borderTopWidth: 0,

          elevation: 12,

          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 12,
          shadowOffset: {
            width: 0,
            height: 5,
          },

          paddingTop: 6,
          paddingBottom: 6,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          marginBottom: 3,
        },

        tabBarItemStyle: {
          borderRadius: 20,
          marginHorizontal: 5,
        },
      }}
    >

      {/* TRILHA */}
      <Tabs.Screen
        name="trilha"
        options={{
          title: "TRILHA",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 45,
                height: 35,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: focused
                  ? "#7D7D7D"
                  : "transparent",
              }}
            >
              <Image
                source={require("../../assets/icons/home.png")}
                style={{
                  width: 27,
                  height: 27,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.65,
                }}
              />
            </View>
          ),
        }}
      />

      {/* PROGRESSO */}
      <Tabs.Screen
        name="progresso"
        options={{
          title: "PROGRESSO",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 45,
                height: 35,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: focused
                  ? "#7D7D7D"
                  : "transparent",
              }}
            >
              <Image
                source={require("../../assets/icons/fire.png")}
                style={{
                  width: 29,
                  height: 29,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.65,
                }}
              />
            </View>
          ),
        }}
      />

      {/* PERFIL */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "PERFIL",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 45,
                height: 35,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: focused
                  ? "#7D7D7D"
                  : "transparent",
              }}
            >
              <Image
                source={require("../../assets/icons/user.png")}
                style={{
                  width: 27,
                  height: 27,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.65,
                }}
              />
            </View>
          ),
        }}
      />
      {/* alfabeto */}
      <Tabs.Screen
        name="alfabeto/alfabeto"
        options={{
          title: "DICIONÁRIO",

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 45,
                height: 35,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: focused
                  ? "#7D7D7D"
                  : "transparent",
              }}
            >
              <Image
                source={require("../../assets/icons/letraa.png")}
                style={{
                  width: 27,
                  height: 27,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.65,
                }}
              />
            </View>
          ),
        }}
      />

    </Tabs>
  );
}