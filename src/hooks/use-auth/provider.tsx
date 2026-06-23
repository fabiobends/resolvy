import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { AuthUser, signOut, subscribeToAuthState } from "@/services/auth";

import { AuthContext } from "./context";

/** Props for the AuthProvider component. */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides auth state by subscribing to Firebase's onAuthStateChanged stream.
 * The first emit restores the persisted user (Firebase AUTH_PERSISTENCE.LOCAL
 * default = automatic keep-me-logged-in) and flips isReady, so there is no
 * separate getCurrentUser-on-mount call. State updates reactively via the
 * subscription; login is performed directly through the auth service.
 * @param props - Provider props.
 * @returns React element.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = subscribeToAuthState((nextUser) => {
      if (!mounted) return;
      setUser(nextUser);
      setIsReady(true);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

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
