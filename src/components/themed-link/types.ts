import { PressableProps } from "react-native";

import { VariantColor } from "@/types/colors";

/** Props for the ThemedLink component. */
export type ThemedLinkProps = PressableProps & {
  title: string;
  color: VariantColor;
  disabled?: boolean;
};
