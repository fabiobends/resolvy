import { Logo } from "@/components/logo";

import { BrandBlockProps } from "./types";

/**
 * Renders the brand block with logo and title.
 * @param props - Module props.
 * @returns React element.
 */
export function BrandBlock(props: BrandBlockProps) {
  return <Logo {...props} />;
}
