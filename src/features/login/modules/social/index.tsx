import { ThemedIconButton } from "@/components/themed-icon-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";
import { SocialModuleProps } from "./types";

/** Renders divider and vendor-agnostic social login buttons. */
export function SocialModule(props: SocialModuleProps) {
  const { onGooglePress, onApplePress, googleLoading, appleLoading } = props;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.dividerRow}>
        <ThemedText type="bodySmall" themeColor="onSurfaceDim">
          or continue with
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttonsRow}>
        <ThemedIconButton
          name="logo-google"
          backgroundThemeColor="surfaceBright"
          foregroundThemeColor="onSurface"
          size="medium"
          onPress={onGooglePress}
          loading={googleLoading}
        />
        <ThemedIconButton
          name="logo-apple"
          backgroundThemeColor="surfaceBright"
          foregroundThemeColor="onSurface"
          size="medium"
          onPress={onApplePress}
          loading={appleLoading}
        />
      </ThemedView>
    </ThemedView>
  );
}
