/** Ordered list of semantic color token keys used in the theme. */
export const themeColorKeys = [
  "primary",
  "onPrimary",
  "secondary",
  "onSecondary",
  "surface",
  "onSurface",
  "success",
  "onSuccess",
  "warning",
  "onWarning",
  "error",
  "onError",
  "surfaceBright",
  "onSurfaceBright",
  "surfaceDim",
  "onSurfaceDim",
  "overlay",
] as const;

export type ThemeColor = (typeof themeColorKeys)[number];

const lightColors = {
  primary: "#4F46E5",
  onPrimary: "#FAFAFA",
  secondary: "#D97706",
  onSecondary: "#1C1C1A",
  surface: "#FEFDFB",
  onSurface: "#1C1C1A",
  success: "#16A34A",
  onSuccess: "#FAFAFA",
  warning: "#CA8A04",
  onWarning: "#1C1C1A",
  error: "#DC2626",
  onError: "#FAFAFA",
  surfaceBright: "#FFFEFD",
  onSurfaceBright: "#1C1C1A",
  surfaceDim: "#E8E6E1",
  onSurfaceDim: "#3D3D3A",
  overlay: "rgba(28, 28, 26, 0.4)",
} as const satisfies Record<ThemeColor, string>;

const darkColors = {
  primary: "#818CF8",
  onPrimary: "#1E1B4B",
  secondary: "#FBBF24",
  onSecondary: "#451A03",
  surface: "#1E1E1E",
  onSurface: "#E5E5E5",
  success: "#4ADE80",
  onSuccess: "#064E3B",
  warning: "#FDE047",
  onWarning: "#422006",
  error: "#F87171",
  onError: "#450A0A",
  surfaceBright: "#2C2C2C",
  onSurfaceBright: "#E5E5E5",
  surfaceDim: "#141414",
  onSurfaceDim: "#A1A1A1",
  overlay: "rgba(0, 0, 0, 0.5)",
} as const satisfies Record<ThemeColor, string>;

/** Light and dark color palettes keyed by semantic token. */
export const Colors = {
  light: lightColors,
  dark: darkColors,
};

type SizeKey =
  | "tiny"
  | "extraSmall"
  | "small"
  | "medium"
  | "large"
  | "extraLarge"
  | "huge";

function createSpacing(tiny: number, extraSmall: number) {
  const m = extraSmall / tiny;
  const values = [tiny, extraSmall];
  for (let i = 2; i < 7; i++) {
    values.push(Math.round(values[i - 1] * m));
  }
  return {
    tiny: values[0],
    extraSmall: values[1],
    small: values[2],
    medium: values[3],
    large: values[4],
    extraLarge: values[5],
    huge: values[6],
  } as const satisfies Record<SizeKey, number>;
}

function createSizes(tiny: number, extraSmall: number) {
  const values = [tiny, extraSmall];
  for (let i = 2; i < 7; i++) {
    values.push(values[i - 2] + values[i - 1]);
  }
  return {
    tiny: values[0],
    extraSmall: values[1],
    small: values[2],
    medium: values[3],
    large: values[4],
    extraLarge: values[5],
    huge: values[6],
  } as const satisfies Record<SizeKey, number>;
}

/** Multiplicative spacing scale for margins and paddings. */
export const Spacing = createSpacing(2, 4);

/** Fibonacci-like sizing scale for component dimensions. */
export const Sizes = createSizes(8, 12);

/** Typography size scale mapped to semantic size keys. */
export const FontSizes = {
  tiny: 10,
  extraSmall: 12,
  small: 14,
  medium: 16,
  large: 20,
  extraLarge: 24,
  huge: 32,
} as const satisfies Record<SizeKey, number>;

/** Line height scale paired with each font size token. */
export const LineHeights = {
  tiny: 14,
  extraSmall: 16,
  small: 20,
  medium: 24,
  large: 28,
  extraLarge: 32,
  huge: 40,
} as const satisfies Record<SizeKey, number>;
