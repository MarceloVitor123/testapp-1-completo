import React, { createContext, useContext, useState } from "react";

type StreakContextType = {
  currentStreak: number;
  bestStreak: number;
};

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  return (
    <StreakContext.Provider
      value={{
        currentStreak,
        bestStreak,
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