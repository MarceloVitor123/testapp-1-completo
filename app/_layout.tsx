import { Stack } from "expo-router";
import { WorldProvider } from "../context/WorldContext";
import{ StreakProvider } from "../context/StreakContext";

export default function RootLayout() {
  return (
  <StreakProvider>
    <WorldProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="fases" />
        <Stack.Screen name="perfil" />
      </Stack>
    </WorldProvider>
  </StreakProvider>
  );
}