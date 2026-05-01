import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";
import { WelcomeProps } from "./types";

/**
 * Renders the welcome card with title and subtitle.
 * @param props - Component props.
 * @returns React element.
 */
export function Welcome(props: WelcomeProps) {
  const { title, subtitle } = props;

  return (
    <ThemedView color="surfaceDim" style={styles.card}>
      <ThemedText type="title" themeColor="onSurface" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="bodySmall" themeColor="onSurfaceDim">
        {subtitle}
      </ThemedText>
    </ThemedView>
  );
}
