import { useCallback } from "react";

import { SocialModuleProps } from "./types";

/**
 * Provides stub handlers for social login buttons.
 * @returns Social module props with press handlers.
 */
export function useSocialModule(): SocialModuleProps {
  const onGooglePress = useCallback(() => {}, []);

  const onApplePress = useCallback(() => {}, []);

  return { onGooglePress, onApplePress };
}
