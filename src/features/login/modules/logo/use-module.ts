import { LogoModuleProps } from "./types";

/**
 * Provides static branding props for the logo module.
 * @returns Logo module props with title and subtitle.
 */
export function useLogoModule(): LogoModuleProps {
  return { title: "Resolvy", subtitle: "Resolve what matters" };
}
