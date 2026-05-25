import { PressableProps } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { ThemeColor } from "@/constants/theme";

/** Props for the ThemedIconButton component. */
export type ThemedIconButtonProps = PressableProps & {
  name: keyof typeof Ionicons.glyphMap;
  backgroundThemeColor?: ThemeColor;
  foregroundThemeColor: ThemeColor;
  size?: "small" | "medium" | "large";
  loading?: boolean;
};
