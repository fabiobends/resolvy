import { useTranslation } from "react-i18next";

import { BrandBlockProps } from "./types";

/**
 * Returns branding props for the forgot-password screen header.
 * @returns Brand block props with title.
 */
export function useBrandBlockModule(): BrandBlockProps {
  const { t } = useTranslation();
  return { title: t("forgotPassword.title") };
}
