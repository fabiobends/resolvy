import { ThemedView } from "@/components/themed-view";
import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";

import { styles } from "./styles";
import { LogoModuleProps } from "./types";

/** Renders the brand logo and tagline. */
export function LogoModule(props: LogoModuleProps) {
  const { title, subtitle } = props;

  return (
    <ThemedView style={styles.container}>
      <ThemedIcon name="cube-outline" themeColor="primary" size="large" />
      <ThemedText type="title" themeColor="onSurface">
        {title}
      </ThemedText>
      <ThemedText type="body" themeColor="onSurfaceDim">
        {subtitle}
      </ThemedText>
    </ThemedView>
  );
}
