import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "../models/Profile";

const PROFILE_KEY = "@alfatech/profile";

export async function loadProfile(): Promise<Profile | null> {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);

  } catch (error) {
    console.log("Erro ao carregar perfil:", error);
    return null;
  }
}//tenta pegar o perfil do AsyncStorage. Se não houver dados, retorna o perfil padrão. Em caso de erro, também retorna o perfil padrão.

export async function saveProfile(profile: Profile) {
  try {
    await AsyncStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(profile)
    );

  } catch (error) {
    console.log("Erro ao salvar perfil:", error);
  }
}//tenta salvar o perfil no AsyncStorage. Em caso de erro, loga o erro.

export async function updateProfile(
  data: Partial<Profile>
) {
  try {
    const currentProfile = await loadProfile();

    const updatedProfile = {
      ...currentProfile,
      ...data,
    };

    await AsyncStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(updatedProfile)
    );

  } catch (error) {
    console.log("Erro ao atualizar perfil:", error);
  }
}//aqui ele pega qualquer dado parcial do perfil, mescla com o perfil atual e salva no AsyncStorage. Em caso de erro, ele loga o erro.

export async function deleteProfile() {
  try {
    await AsyncStorage.removeItem(PROFILE_KEY);

  } catch (error) {
    console.log("Erro ao deletar perfil:", error);
  }
}//tenta deletar apenas o perfil do AsyncStorage. Em caso de erro, loga o erro.
export async function updatePhaseProgress(
  phase: keyof Profile["phases"],
  progress: Profile["phases"][keyof Profile["phases"]]
) {
  try {
    const profile = await loadProfile(); //busca o perfil salvo no AsyncStorage

    if (!profile) { // o ! significa não
      console.log("ERRO: perfil não encontrado.");
      return;
    }

    // Atualiza o XP e progresso da fase
    profile.phases[phase] = progress;

    // Recalcula o XP total somando todas as fases
    profile.xp = Object.values(profile.phases).reduce(
      (total, fase) => total + fase.xp,
      0
    );

    // Recalcula o tempo total
    profile.studyTime = Object.values(profile.phases).reduce(
      (total, fase) => total + fase.time,
      0
    );

    // Calcula a precisão média das fases concluídas
    const fasesComProgresso = Object.values(profile.phases)
      .filter((fase) => fase.completed);

    if (fasesComProgresso.length > 0) {
      const somaPrecisao = fasesComProgresso.reduce(
        (total, fase) => total + fase.accuracy,
        0
      );

      profile.accuracy =
        somaPrecisao / fasesComProgresso.length;
    } else {
      profile.accuracy = 0;
    }

    await saveProfile(profile);

    console.log("========== PERFIL ATUALIZADO ==========");
    console.log("XP total:", profile.xp);
    console.log("Precisão:", profile.accuracy);
    console.log("Tempo estudado:", profile.studyTime);

  } catch (error) {
    console.log(
      "Erro ao atualizar progresso da fase:",
      error
    );
  }
}//essa função atualiza o progresso de uma fase específica. Ela recebe o nome da fase, xp, acurácia e tempo. Atualiza o perfil com esses dados e marca a fase como concluída. Em caso de erro, loga o erro.