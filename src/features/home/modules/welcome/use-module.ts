import { useMemo } from "react";

import { WelcomeProps } from "./types";

/**
 * Provides content props for the welcome module.
 * @returns Props for the welcome component.
 */
export function useWelcomeModule(): WelcomeProps {
  return useMemo(
    () => ({
      title: "Welcome",
      subtitle: "Resolvy",
    }),
    [],
  );
}
