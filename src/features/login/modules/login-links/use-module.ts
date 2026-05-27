import { useRouter } from "expo-router";

import { LoginLinksRowProps } from "./types";

/**
 * Provides link press handlers for the login links module.
 * @returns Props for the LoginLinksRow component.
 */
export function useLoginLinksModule(): LoginLinksRowProps {
  const router = useRouter();

  return {
    onForgotPasswordPress: () => {
      router.push("/forgot-password");
    },
    onCreateAccountPress: () => {
      router.push("/signup");
    },
  };
}
