import { TextInputProps } from "react-native";

import { VariantColor } from "@/constants/theme";

/** Props for the ThemedTextField component. */
export type ThemedTextFieldProps = TextInputProps & {
  label: string;
  variantColor: VariantColor;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
};
