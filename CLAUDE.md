# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Resolvy is a React Native cross-platform app (iOS, Android, Web) built with **Expo SDK 55** and **Expo Router**. It uses file-based routing and supports light/dark themes with platform-specific component implementations.

## Common Commands

| Command                 | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `bun start`             | Start the Expo development server                           |
| `bun run ios`           | Start the iOS simulator                                     |
| `bun run android`       | Start the Android emulator                                  |
| `bun run web`           | Start the web development server                            |
| `bun run lint`          | Run ESLint via `expo lint`                                  |
| `bun run reset-project` | Reset to a blank project (moves starter code to `/example`) |

> **Note:** This project uses **Bun** as the package manager (`bun.lock` is present). Use `bun` instead of `npm` for installing dependencies.

## Architecture

### File-Based Routing

Routes are defined by files under `src/app/` using **Expo Router** conventions:

- `src/app/_layout.tsx` — Root layout that wraps all screens
- `src/app/index.tsx` — Home screen (`/` route)
- `src/app/explore.tsx` — Explore screen (`/explore` route)

### Platform-Specific Files

The project uses platform extensions for native vs. web implementations. Metro and the bundler resolve these automatically:

- `*.web.tsx` — Web-only implementation
- `*.tsx` — Native-only implementation (used when no platform extension matches)

Examples in the codebase:

- `src/components/app-tabs.tsx` / `app-tabs.web.tsx`
- `src/components/animated-icon.tsx` / `animated-icon.web.tsx`
- `src/hooks/use-color-scheme.ts` / `use-color-scheme.web.ts`

### Theming System

A custom theme system lives in `src/constants/theme.ts`:

- `Colors.light` / `Colors.dark` — Color palettes for each mode
- `Fonts` — Platform-specific font stacks (with web CSS variable fallbacks)
- `Spacing` — Design-token spacing scale
- `ThemeColor` — Union type of semantic color keys

The `useTheme()` hook (`src/hooks/use-theme.ts`) returns the active color palette based on the system color scheme.

Components consume the theme via:

- `ThemedText` — Text with `type` variants and `themeColor` prop
- `ThemedView` — View with `type` prop mapping to semantic background colors

### Tabs Navigation

Two different tab implementations:

- **Native**: `expo-router/unstable-native-tabs` in `src/components/app-tabs.tsx`
- **Web**: Custom `expo-router/ui` (`Tabs`, `TabList`, `TabTrigger`) in `src/components/app-tabs.web.tsx`

### Path Aliases

TypeScript path mapping in `tsconfig.json`:

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Important Configuration

- `app.json` enables two experiments: `typedRoutes: true` and `reactCompiler: true`
- The scheme is set to `"resolvy"` for deep linking
- Web output is **static** (`web.output: "static"`)
- `src/global.css` defines CSS font variables used on web
- VS Code settings auto-fix and organize imports on save

## Dependencies of Note

- `react-native-reanimated` + `react-native-worklets` — Animations (splash overlay, icon entrance)
- `expo-image` — Cross-platform image component
- `expo-symbols` — Platform-adaptive icons (`SymbolView`)

## Project Structure

```
src/
  app/               # Expo Router screens
  components/        # Reusable UI components (+ platform variants)
    ui/              # Lower-level UI primitives
  constants/         # Theme, design tokens
  hooks/             # Custom React hooks (+ platform variants)
assets/
  images/             # Static image assets
```
