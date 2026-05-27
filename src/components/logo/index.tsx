import { ThemedView } from "@/components/themed-view";
import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";

import { styles } from "./styles";
import { LogoProps } from "./types";

function getIconSize(size: LogoProps["size"]) {
  switch (size) {
    case "small":
      return "medium";
    case "medium":
      return "large";
    case "large":
    default:
      return "extraLarge";
  }
}

/**
 * Renders a brand logo with optional title and subtitle.
 * @param props - Component props.
 * @returns React element.
 */
export function Logo(props: LogoProps) {
  const { size = "large", title, subtitle, testID } = props;

  return (
    <ThemedView style={styles[size].container} testID={testID}>
      <ThemedIcon
        name="cube-outline"
        themeColor="primary"
        size={getIconSize(size)}
      />
      {title && (
        <ThemedText type="title" themeColor="onSurface">
          {title}
        </ThemedText>
      )}
      {subtitle && (
        <ThemedText type="body" themeColor="onSurfaceDim">
          {subtitle}
        </ThemedText>
      )}
    </ThemedView>
  );
}
