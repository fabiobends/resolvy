import { ActivityIndicator, Pressable } from "react-native";

import { ThemedView } from "@/components/themed-view";

import { ThemedText } from "@/components/themed-text";
import { onColorMap } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { ThemedButtonProps } from "./types";

/**
 * Renders a themed button with loading and disabled states.
 * variantColor selects a semantic action variant (primary, secondary, success, warning, error).
 * This is different from themeColor which is any palette token (primary, onPrimary, surface, etc.).
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedButton(props: ThemedButtonProps) {
  const { title, variantColor, loading, disabled, style, ...rest } = props;
  const theme = useTheme();
  const isInactive = loading || disabled;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isInactive}
      style={(state) => [
        styles.button,
        { backgroundColor: theme[variantColor] },
        isInactive && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ThemedView style={styles.indicatorWrapper}>
          <ActivityIndicator
            color={theme[onColorMap[variantColor]]}
            size="small"
          />
        </ThemedView>
      ) : (
        <ThemedText type="body" themeColor={onColorMap[variantColor]}>
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}
