import React from "react";
import { Stack } from "expo-router";

export default function Fase1Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#5B5B5B",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="atividade1" />
      <Stack.Screen name="atividade2" />
      <Stack.Screen name="atividade3" />
      <Stack.Screen name="atividade4" />
      <Stack.Screen name="atividade5" />
    </Stack>
  );
}