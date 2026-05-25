import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import {
  AuthUser,
  getCurrentUser,
  signOut,
  subscribeToAuthState,
} from "@/features/login/services/auth";

import { AuthContext } from "./context";

/** Props for the AuthProvider component. */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides auth state and handles subscription to auth changes.
 * Login is performed directly through the auth service, not via this context.
 * State updates reactively via the subscription.
 * @param props - Provider props.
 * @returns React element.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    getCurrentUser().then((initialUser) => {
      if (!mounted) return;
      setUser(initialUser);
      setIsReady(true);
    });

    const unsubscribe = subscribeToAuthState((nextUser) => {
      if (!mounted) return;
      setUser(nextUser);
      if (!isReady) setIsReady(true);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [isReady]);

  const logout = useCallback(async () => {
    await signOut();
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      isAuthenticated: user !== null,
      user,
      logout,
    }),
    [isReady, user, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
