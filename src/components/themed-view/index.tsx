import { View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { ThemedViewProps } from "./types";

/**
 * Renders view with theme background color.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedView(props: ThemedViewProps) {
  const { themeColor, style, ...rest } = props;
  const theme = useTheme();

  return (
    <View
      style={[themeColor && { backgroundColor: theme[themeColor] }, style]}
      {...rest}
    />
  );
}
