/** Props for the SocialModule component. */
export interface SocialModuleProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  googleLoading?: boolean;
  appleLoading?: boolean;
}
