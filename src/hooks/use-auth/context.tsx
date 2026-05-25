import { createContext, useContext } from "react";

import { AuthUser } from "@/features/login/services/auth";

/** Value provided by the AuthContext. */
export interface AuthContextValue {
  isReady: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  logout: () => Promise<void>;
}

/** React context for auth state. */
export const AuthContext = createContext<AuthContextValue>({
  isReady: false,
  isAuthenticated: false,
  user: null,
  logout: async () => {},
});

/**
 * Returns the current auth context value.
 * @returns Auth context containing readiness, auth state, user, and logout.
 */
export function useAuthContext() {
  return useContext(AuthContext);
}
