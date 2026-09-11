import React, { createContext, useContext, useState, ReactNode } from "react";

type ActivityResult = {
  id: string;
  xp: number;
  timeSeconds: number;
  correct: number;
  total: number;
};

type WorldContextType = {
  totalXp: number;
  totalTimeSeconds: number;
  totalCorrect: number;
  totalQuestions: number;
  accuracy: number;

  currentWorld: number | null;
  worldStartTime: number | null;

  addActivityResult: (result: ActivityResult) => void;
  setCurrentWorld: (world: number | null) => void;
  setWorldStartTime: (time: number | null) => void;
  resetWorld: () => void;
};

const WorldContext = createContext<WorldContextType | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<ActivityResult[]>([]);
  const [currentWorld, setCurrentWorld] = useState<number | null>(null);
  const [worldStartTime, setWorldStartTime] = useState<number | null>(null);

  const totalXp = results.reduce((sum, r) => sum + r.xp, 0);
  const totalTimeSeconds = results.reduce((sum, r) => sum + r.timeSeconds, 0);
  const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);

  const accuracy = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;

  function addActivityResult(result: ActivityResult) {
    setResults((prev) => [...prev, result]);
  }

  function resetWorld() {
  setResults([]);
  setWorldStartTime(null);
}

  const value: WorldContextType = {
    totalXp,
    totalTimeSeconds,
    totalCorrect,
    totalQuestions,
    accuracy,
    currentWorld,
    worldStartTime,
    addActivityResult,
    setCurrentWorld,
    setWorldStartTime,
    resetWorld,
  };

  return (
    <WorldContext.Provider value={value}>
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error("useWorld must be used within WorldProvider");
  return ctx;
}