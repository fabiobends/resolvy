import { AuthContextValue, useAuthContext } from "./context";

/**
 * Returns the current auth state.
 * @throws When used outside of an AuthProvider.
 * @returns Auth context value with isReady, isAuthenticated, user, and logout.
 */
export function useAuth(): AuthContextValue {
  const context = useAuthContext();

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
