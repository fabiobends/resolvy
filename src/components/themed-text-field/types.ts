import { TextInputProps } from "react-native";

import { VariantColor } from "@/types/colors";

export type ThemedTextFieldProps = TextInputProps & {
  label: string;
  color: VariantColor;
  disabled?: boolean;
};
