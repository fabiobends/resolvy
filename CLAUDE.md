## Project Overview

Resolvy is a minimal React Native app built with **Expo SDK** and **Expo Router**. It uses a custom theme system with light/dark palettes and a single welcome screen.

## Commands

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun start`        | Start the Expo development server               |
| `bun ios`          | Build and run the native iOS app via Xcode      |
| `bun android`      | Build and run the native Android app via Gradle |
| `bun ios:dev`      | Start the iOS simulator via Expo dev server     |
| `bun android:dev`  | Start the Android emulator via Expo dev server  |
| `bun web`          | Start the web development server                |
| `bun lint`         | Run ESLint with auto-fix via `expo lint --fix`  |
| `bun lint:check`   | Run ESLint without auto-fix                     |
| `bun type:check`   | Run TypeScript type checking (`tsc --noEmit`)   |
| `bun format`       | Format all files with Prettier                  |
| `bun format:check` | Check formatting without writing                |
| `bun test`         | Run Jest test suite                             |

> Use **Bun** for all package management.

## Folder Structure

```
src/
  app/               # Expo Router screens
  components/        # Reusable UI components
  constants/         # Theme, design tokens
  features/          # Features and modules
  hooks/             # Custom React hooks
assets/
  images/            # Static image assets
```

## Documentation

- `docs/code-guidelines.md` — conventions for comments, style, naming, imports, testing, folder structure.
- `docs/theme.md` — theme tokens, color scheme behavior, `useTheme` hook.

## Conventions

- Use skills for commits, components, modules, features, forms
- **hook** skill = React hook (code). **agent-hook** skill = Claude Code automation hook (settings.json)
- Fan out agents for parallel work
