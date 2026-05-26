import { useRouter } from "expo-router";

import { ThemedLink } from "@/components/themed-link";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";

/** Renders forgot password and create account links in a row. */
export function LoginLinksRow() {
  const router = useRouter();

  return (
    <ThemedView themeColor="surface" style={styles.linksRow}>
      <ThemedLink
        title="Forgot password?"
        color="primary"
        onPress={() => console.log("Forgot password")}
      />
      <ThemedLink
        title="Create account"
        color="primary"
        onPress={() => router.push("/signup")}
      />
    </ThemedView>
  );
}
