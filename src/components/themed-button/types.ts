import { PressableProps } from "react-native";

export type ColorVariant = "primary" | "secondary" | "success" | "warning";

export type ThemedButtonProps = PressableProps & {
  title: string;
  color: ColorVariant;
  loading?: boolean;
  disabled?: boolean;
};
