import { Logo } from "@/components/logo";

import { BrandBlockProps } from "./types";

/**
 * Renders the brand block with logo, title, and optional subtitle.
 * @param props - Module props.
 * @returns React element.
 */
export function BrandBlock(props: BrandBlockProps) {
  return <Logo {...props} />;
}
