import { Pressable } from "react-native";

import { ThemedText } from "@/components/themed-text";

import { styles } from "./styles";
import { ThemedLinkProps } from "./types";

/**
 * Renders a themed text link.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedLink(props: ThemedLinkProps) {
  const { title, color, disabled, style, ...rest } = props;

  return (
    <Pressable
      accessibilityRole="link"
      disabled={disabled}
      style={(state) => [
        styles.link,
        disabled && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      <ThemedText type="body" themeColor={color}>
        {title}
      </ThemedText>
    </Pressable>
  );
}
