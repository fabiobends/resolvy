## Project Overview

Resolvy is a minimal React Native app built with **Expo SDK** and **Expo Router**. It uses a custom theme system with light/dark palettes and a single welcome screen.

## Commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `bun start`       | Start the Expo development server              |
| `bun run ios`     | Start the iOS simulator                        |
| `bun run android` | Start the Android emulator                     |
| `bun run web`     | Start the web development server               |
| `bun run lint`    | Run ESLint with auto-fix via `expo lint --fix` |

> Use **Bun** for all package management.

## Folder Structure

```
src/
  app/               # Expo Router screens
  components/        # Reusable UI components
  constants/         # Theme, design tokens
  hooks/             # Custom React hooks
assets/
  images/            # Static image assets
```

## Code Style

- Use **Themed** components (`@/components/themed-*.tsx`).
- Use comments sparingly, only business logic.
- **Path aliases** — import from `@/components/...` and `@/constants/...`. Do not use relative paths.
- **No dead code** — remove unused imports, components, and dependencies immediately. Keep the codebase minimal.
