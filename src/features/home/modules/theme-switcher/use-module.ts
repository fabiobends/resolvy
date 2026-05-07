import { useCallback } from "react";

import { useThemeContext } from "@/hooks/use-theme/context";

import { ThemeSwitcherProps } from "./types";

/**
 * Provides props for the theme switcher module.
 * @returns Props for the theme switcher component.
 */
export function useThemeSwitcherModule(): ThemeSwitcherProps {
  const { activeTheme, setTheme } = useThemeContext();

  const onToggle = useCallback(() => {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  }, [activeTheme, setTheme]);

  return { activeTheme, onToggle };
}
