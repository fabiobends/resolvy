import { useTranslation } from "react-i18next";

import { LogoModuleProps } from "./types";

/**
 * Provides static branding props for the logo module.
 * @returns Logo module props with title and subtitle.
 */
export function useLogoModule(): LogoModuleProps {
  const { t } = useTranslation();
  return { title: t("login.title"), subtitle: t("login.subtitle") };
}
