import { Ionicons } from "@expo/vector-icons";

import { ThemeColor } from "@/constants/theme";

/** Props for the ThemedIcon component. */
export type ThemedIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  themeColor: ThemeColor;
  size: "small" | "medium" | "large";
  testID?: string;
};
