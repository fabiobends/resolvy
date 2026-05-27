import { ThemedLink } from "@/components/themed-link";
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";
import { LoginLinksRowProps } from "./types";

/** Renders forgot password and create account links in a row. */
export function LoginLinksRow({
  onForgotPasswordPress,
  onCreateAccountPress,
}: LoginLinksRowProps) {
  const { t } = useTranslation();
  return (
    <ThemedView themeColor="surface" style={styles.linksRow}>
      <ThemedLink
        title={t("login.forgotPassword")}
        color="primary"
        onPress={onForgotPasswordPress}
      />
      <ThemedLink
        title={t("login.createAccount")}
        color="primary"
        onPress={onCreateAccountPress}
      />
    </ThemedView>
  );
}
