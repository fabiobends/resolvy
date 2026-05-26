import { ActivityIndicator, Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Sizes } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { ThemedIconButtonProps } from "./types";

const iconSizeMap = {
  small: Sizes.small,
  medium: Sizes.medium,
  large: Sizes.large,
} as const;

const containerSizeMap = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
} as const;

/**
 * Renders a pressable icon button with themed background and foreground colors.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedIconButton(props: ThemedIconButtonProps) {
  const {
    name,
    backgroundThemeColor,
    foregroundThemeColor,
    size = "medium",
    loading,
    disabled,
    style,
    ...rest
  } = props;
  const theme = useTheme();
  const isInactive = loading || disabled;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isInactive}
      style={(state) => [
        styles.container,
        backgroundThemeColor && {
          backgroundColor: theme[backgroundThemeColor],
        },
        backgroundThemeColor && containerSizeMap[size],
        isInactive && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={theme[foregroundThemeColor]}
          size={iconSizeMap[size]}
        />
      ) : (
        <Ionicons
          name={name}
          size={iconSizeMap[size]}
          color={theme[foregroundThemeColor]}
        />
      )}
    </Pressable>
  );
}
