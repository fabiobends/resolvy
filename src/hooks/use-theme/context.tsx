import { createContext, useContext } from "react";

export type ThemePreference = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  activeTheme: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  activeTheme: "light",
});

export function useThemeContext() {
  return useContext(ThemeContext);
}
