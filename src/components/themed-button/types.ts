import { PressableProps } from "react-native";

import { VariantColor } from "@/types/colors";

export type ThemedButtonProps = PressableProps & {
  title: string;
  color: VariantColor;
  loading?: boolean;
  disabled?: boolean;
};
