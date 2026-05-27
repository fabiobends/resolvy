import { LoginLinksRowProps } from "./types";

/**
 * Provides link press handlers for the login links module.
 * @returns Props for the LoginLinksRow component.
 */
export function useLoginLinksModule(): LoginLinksRowProps {
  return {
    onForgotPasswordPress: () => {
      console.log("Forgot password");
    },
    onCreateAccountPress: () => {
      console.log("Create account");
    },
  };
}
