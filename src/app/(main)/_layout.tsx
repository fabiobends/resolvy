import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/hooks/use-auth";

/**
 * Protected layout for authenticated routes.
 * Redirects to /login when the user is not authenticated.
 * @returns React element.
 */
export default function AppLayout() {
  const { isReady, isAuthenticated } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
