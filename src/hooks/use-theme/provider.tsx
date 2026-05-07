import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { ThemeContext, ThemePreference } from "./context";

const STORAGE_KEY = "@resolvy/theme";

function resolveActiveTheme(
  preference: ThemePreference,
  system: "light" | "dark" | "unspecified" | null,
): "light" | "dark" {
  if (preference !== "system") return preference;
  return system === "dark" ? "dark" : "light";
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemePreference>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === "light" || value === "dark") {
        setThemeState(value);
      }
    });
  }, []);

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next);
    if (next === "system") {
      AsyncStorage.removeItem(STORAGE_KEY);
    } else {
      AsyncStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const activeTheme = resolveActiveTheme(theme, systemScheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
