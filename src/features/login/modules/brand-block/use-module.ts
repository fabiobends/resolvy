import { useTranslation } from "react-i18next";

import { BrandBlockProps } from "./types";

/**
 * Returns branding props for the login screen header.
 * @returns Brand block props with title and subtitle.
 */
export function useBrandBlockModule(): BrandBlockProps {
  const { t } = useTranslation();
  return {
    title: t("login.title"),
    subtitle: t("login.subtitle"),
  };
}
