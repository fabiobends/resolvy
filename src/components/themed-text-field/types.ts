import { TextInputProps } from "react-native";

export type ColorVariant = "primary" | "secondary" | "success" | "warning";

export type ThemedTextFieldProps = TextInputProps & {
  label: string;
  color: ColorVariant;
  disabled?: boolean;
};
