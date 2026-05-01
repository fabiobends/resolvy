import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";

/**
 * Returns active theme color palette based on device color scheme.
 * @returns Color palette object for current theme.
 */
export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === "unspecified" || scheme === "dark" ? "dark" : scheme;

  return Colors[theme];
}
