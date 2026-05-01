# Theme System

Resolvy uses a custom semantic token-based theme built on top of React Native's `useColorScheme`. All design tokens live in `src/constants/theme.ts` and are consumed through the `useTheme` hook.

## Color Tokens

Colors are organized as semantic pairs (e.g. `surface` / `onSurface`) so components always know which foreground color to use on a given background.

The full token set is defined in `src/constants/theme.ts` under the `Colors` object, which exposes a `light` and a `dark` palette.

## Spacing, Sizing & Typography

Tokens use a shared size key scale:

```
tiny → extraSmall → small → medium → large → extraLarge → huge
```

- **Spacing** — margin / padding values
- **Sizes** — component dimensions
- **FontSizes** — text sizes
- **LineHeights** — matching line heights

See `src/constants/theme.ts` for the exact token values.

## Active Theme

The `useTheme` hook (`src/hooks/use-theme/index.ts`) reads the device color scheme via React Native's `useColorScheme()`. It returns three possible values:

- `"light"`
- `"dark"`
- `"unspecified"` — the user's system theme has not been resolved yet

When the scheme is `"unspecified"`, the hook falls back to the **dark** palette. Otherwise it uses `scheme` palette. Components such as `ThemedText` consume the active palette through this hook.
