import { useMutation } from "@tanstack/react-query";
import { Platform } from "react-native";

import { signInWithApple, signInWithGoogle } from "@/services/auth";

import { SocialModuleProps } from "./types";

/**
 * Orchestrates social sign-in via TanStack mutations. Apple Sign-In is
 * iOS-only, so isAppleAvailable hides the Apple button on Android.
 * @returns Social module props with press handlers and loading state.
 */
export function useSocialModule(): SocialModuleProps {
  const googleMutation = useMutation({ mutationFn: signInWithGoogle });
  const appleMutation = useMutation({ mutationFn: signInWithApple });

  return {
    onGooglePress: () => googleMutation.mutate(),
    onApplePress: () => appleMutation.mutate(),
    googleLoading: googleMutation.isPending,
    appleLoading: appleMutation.isPending,
    isAppleAvailable: Platform.OS === "ios",
  };
}
