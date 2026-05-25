import { PressableProps } from "react-native";

import { VariantColor } from "@/constants/theme";

/** Props for the ThemedButton component. */
export type ThemedButtonProps = PressableProps & {
  title: string;
  variantColor: VariantColor;
  loading?: boolean;
  disabled?: boolean;
};
