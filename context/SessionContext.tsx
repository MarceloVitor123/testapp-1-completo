import React, { createContext, useContext, useState } from "react";

type SessionContextType = {
  startTime: number | null;
  setStartTime: (value: number | null) => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [startTime, setStartTime] = useState<number | null>(null);

  return (
    <SessionContext.Provider value={{ startTime, setStartTime }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
}