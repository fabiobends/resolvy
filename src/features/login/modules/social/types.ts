/** Props for the SocialModule component. */
export interface SocialModuleProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  googleLoading?: boolean;
  appleLoading?: boolean;
  /** Whether Apple Sign-In is available. Hides the Apple button when false (Apple Sign-In is iOS-only). */
  isAppleAvailable: boolean;
}
