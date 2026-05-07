/** Semantic action colors used across components (buttons, links, icons, fields). */
export type VariantColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

/** Ordered list of variant color keys for controls and iteration. */
export const variantColorKeys: VariantColor[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];

/** Contrast colors for content placed on variant-colored surfaces. */
export type OnVariantColor =
  | "onPrimary"
  | "onSecondary"
  | "onSuccess"
  | "onWarning"
  | "onError";
