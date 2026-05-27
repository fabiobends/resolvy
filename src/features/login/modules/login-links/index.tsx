import { ThemedLink } from "@/components/themed-link";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";
import { LoginLinksRowProps } from "./types";

/** Renders forgot password and create account links in a row. */
export function LoginLinksRow({
  onForgotPasswordPress,
  onCreateAccountPress,
}: LoginLinksRowProps) {
  return (
    <ThemedView themeColor="surface" style={styles.linksRow}>
      <ThemedLink
        title="Forgot password?"
        color="primary"
        onPress={onForgotPasswordPress}
      />
      <ThemedLink
        title="Create account"
        color="primary"
        onPress={onCreateAccountPress}
      />
    </ThemedView>
  );
}
