import { useContext } from "react";

import { FeatureFlagsContext } from "./context";

/**
 * Returns current feature flags and setter.
 * @returns Feature flags state.
 */
export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}
