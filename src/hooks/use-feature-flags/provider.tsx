import { ReactNode, useCallback, useState } from "react";

import { FeatureFlagsContext } from "./context";

const defaultFlags: Record<string, boolean> = {
  storybook: true,
};

/** Props for the FeatureFlagsProvider component. */
interface FeatureFlagsProviderProps {
  children: ReactNode;
}

/**
 * Manages feature flags state and exposes setter via context.
 * @param props - Provider props.
 * @returns React element.
 */
export function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  const [flags, setFlags] = useState<Record<string, boolean>>(defaultFlags);

  const setFlag = useCallback((key: string, value: boolean) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{ flags, setFlag }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}
