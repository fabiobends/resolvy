import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { WelcomeProps } from "./types";

/**
 * Provides content props for the welcome module.
 * @returns Props for the welcome component.
 */
export function useWelcomeModule(): WelcomeProps {
  const { t } = useTranslation();
  return useMemo(
    () => ({
      title: t("home.welcomeTitle"),
      subtitle: t("home.welcomeSubtitle"),
    }),
    [t],
  );
}
