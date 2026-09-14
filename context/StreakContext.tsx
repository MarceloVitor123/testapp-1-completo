import React, {
  createContext,
  useContext,
  useState,
} from "react";

type StreakData = {
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string | null;
  studyDays: string[];
};

type StreakContextType = {
  streak: StreakData;
  registerStudy: () => void;
};

const StreakContext = createContext<StreakContextType | undefined>(
  undefined
);

export function StreakProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastStudyDate: null,
    studyDays: [],
  });

  const registerStudy = () => {
  const today = new Date().toISOString().split("T")[0];

  setStreak((prev) => {
    // Já estudou hoje
    if (prev.lastStudyDate === today) {
      console.log("🔥 Já estudou hoje!");
      return prev;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    // Se estudou ontem, continua a ofensiva
    const newStreak =
      prev.lastStudyDate === yesterdayString
        ? prev.currentStreak + 1
        : 1;

    const newBestStreak = Math.max(
      prev.bestStreak,
      newStreak
    );

    console.log("🔥 Novo dia de estudo!");

    return {
      ...prev,
      currentStreak: newStreak,
      bestStreak: newBestStreak,
      lastStudyDate: today,
      studyDays: prev.studyDays.includes(today)
        ? prev.studyDays
        : [...prev.studyDays, today],
    };
  });
};

  return (
    <StreakContext.Provider
      value={{
        streak,
        registerStudy,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);

  if (!context) {
    throw new Error("useStreak must be used within StreakProvider");
  }

  return context;
}