import { Ionicons } from "@expo/vector-icons";

import { OnVariantColor, VariantColor } from "@/types/colors";

/** Allowed icon color tokens. */
export type IconColor = VariantColor | OnVariantColor;

/** Props for the ThemedIcon component. */
export type ThemedIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: IconColor;
  size: "small" | "medium" | "large";
  testID?: string;
};
