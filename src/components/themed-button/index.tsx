import { ActivityIndicator, Pressable } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { VariantColor } from "@/types/colors";

import { styles } from "./styles";
import { ThemedButtonProps } from "./types";

const onColorMap: Record<VariantColor, ThemeColor> = {
  primary: "onPrimary",
  secondary: "onSecondary",
  success: "onSuccess",
  warning: "onWarning",
  error: "onError",
};

/**
 * Renders a themed button with loading and disabled states.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedButton(props: ThemedButtonProps) {
  const { title, color, loading, disabled, style, ...rest } = props;
  const theme = useTheme();
  const isInactive = loading || disabled;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isInactive}
      style={(state) => [
        styles.button,
        { backgroundColor: theme[color] },
        isInactive && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme[onColorMap[color]]} />
      ) : (
        <ThemedText
          type="body"
          themeColor={onColorMap[color]}
          style={styles.title}
        >
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}
