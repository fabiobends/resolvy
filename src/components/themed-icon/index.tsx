import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { ThemedIconProps } from "./types";

const sizeMap = {
  small: styles.small.width,
  medium: styles.medium.width,
  large: styles.large.width,
  extraLarge: styles.extraLarge.width,
} as const;

/**
 * Renders a theme-aware Ionicons icon.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedIcon(props: ThemedIconProps) {
  const { name, themeColor, size, testID } = props;
  const theme = useTheme();

  return (
    <Ionicons
      name={name}
      size={sizeMap[size]}
      color={theme[themeColor]}
      testID={testID}
    />
  );
}
