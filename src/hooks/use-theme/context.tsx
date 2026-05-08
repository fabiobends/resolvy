import { createContext, useContext } from "react";

/** User-selected theme preference. */
export type ThemePreference = "light" | "dark" | "system";

/** Value provided by the ThemeContext. */
export interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  activeTheme: "light" | "dark";
}

/** React context for theme state and controls. */
export const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  activeTheme: "light",
});

/**
 * Returns the current theme context value.
 * @returns Theme context containing preference, setter, and active theme.
 */
export function useThemeContext() {
  return useContext(ThemeContext);
}
