import { Colors } from "@/constants/theme";

import { useThemeContext } from "./context";

/**
 * Returns active theme color palette based on user preference or device color scheme.
 * @returns Color palette object for current theme.
 */
export function useTheme() {
  const { activeTheme } = useThemeContext();

  return Colors[activeTheme];
}
