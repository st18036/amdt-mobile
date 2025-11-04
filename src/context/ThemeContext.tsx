// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { User } from "firebase/auth";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  hydrateForUser: (user: User | null) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
  hydrateForUser: async () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, _setDarkMode] = useState(false);
  const [uid, setUid] = useState<string | null>(null);

  const setDarkMode = async (value: boolean) => {
    _setDarkMode(value);
    if (uid) {
      const ref = doc(db, "users", uid);
      await setDoc(
        ref,
        { preferences: { darkMode: value } },
        { merge: true }
      );
    }
  };

  const hydrateForUser = async (user: User | null) => {
    if (!user) {
      setUid(null);
      _setDarkMode(false);
      return;
    }
    setUid(user.uid);
    const snap = await getDoc(doc(db, "users", user.uid));
    const pref = snap.exists() ? snap.data()?.preferences : undefined;
    _setDarkMode(Boolean(pref?.darkMode));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, hydrateForUser }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeCtx = () => useContext(ThemeContext);
