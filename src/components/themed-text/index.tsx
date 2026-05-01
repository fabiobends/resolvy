import { Text } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { textStyles } from "./styles";
import { ThemedTextProps } from "./types";

export { type TextType, type ThemedTextProps } from "./types";

/**
 * Renders text with theme colors and typography.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedText(props: ThemedTextProps) {
  const { type, themeColor, ...rest } = props;
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor] }, textStyles[type], rest.style]}
      {...rest}
    />
  );
}
