import { PressableProps } from "react-native";

import { VariantColor } from "@/constants/theme";

/** Props for the ThemedLink component. */
export type ThemedLinkProps = PressableProps & {
  title: string;
  color: VariantColor;
  disabled?: boolean;
};
