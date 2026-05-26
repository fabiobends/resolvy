import { LogoModuleProps } from "./types";

/**
 * Provides static branding props for the logo module.
 * @returns Logo module props with title only.
 */
export function useLogoModule(): LogoModuleProps {
  return { title: "Resolvy" };
}
