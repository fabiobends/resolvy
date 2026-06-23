import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/hooks/use-auth";

/**
 * Layout for the unauthenticated route group. Gates on auth readiness and
 * state: stays blank (splash) until the first auth-state emit, then bounces
 * authenticated users to the protected area. Unauthenticated users see the
 * login/signup/forgot-password stack.
 * @returns React element.
 */
export default function AuthLayout() {
  const { isReady, isAuthenticated } = useAuth();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(main)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
