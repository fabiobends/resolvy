# Theme System

Custom semantic token-based theme built on React Native's `useColorScheme`. Tokens in `src/constants/theme.ts`, consumed via `useTheme` hook.

## Color Tokens

Semantic pairs (`surface` / `onSurface`) ensure components know their foreground color. Full token set in `src/constants/theme.ts` — `Colors` object with `light` and `dark` palettes.

## Spacing, Sizing & Typography

Shared size scale: `tiny → extraSmall → small → medium → large → extraLarge → huge`

- `Spacing` — margin, padding
- `Sizes` — component dimensions
- `FontSizes` — text sizes
- `LineHeights` — matching line heights

Exact values in `src/constants/theme.ts`.

## Active Theme

`useTheme` hook (`src/hooks/use-theme/index.ts`) reads device color scheme via `useColorScheme()`. Returns:

- `"light"` | `"dark"` | `"unspecified"` — system theme not yet resolved

`"unspecified"` falls back to **dark** palette. Components like `ThemedText` consume this hook.
