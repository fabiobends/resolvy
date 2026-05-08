import { createContext } from "react";

/** State shape for feature flags context. */
export interface FeatureFlagsState {
  flags: Record<string, boolean>;
  setFlag: (key: string, value: boolean) => void;
}

/** Context for accessing and updating feature flags. */
export const FeatureFlagsContext = createContext<FeatureFlagsState>({
  flags: {},
  setFlag: () => {},
});
