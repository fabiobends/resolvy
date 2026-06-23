import { ThemedIconButton } from "@/components/themed-icon-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import { SocialModuleProps } from "./types";

/** Renders divider and vendor-agnostic social login buttons. */
export function SocialModule(props: SocialModuleProps) {
  const {
    onGooglePress,
    onApplePress,
    googleLoading,
    appleLoading,
    isAppleAvailable,
  } = props;
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.dividerRow}>
        <ThemedText type="bodySmall" themeColor="onSurfaceDim">
          {t("login.socialDivider")}
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
        {isAppleAvailable && (
          <ThemedIconButton
            name="logo-apple"
            backgroundThemeColor="surfaceBright"
            foregroundThemeColor="onSurface"
            size="medium"
            onPress={onApplePress}
            loading={appleLoading}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}
