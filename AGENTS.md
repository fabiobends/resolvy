# Resolvy Agent Notes

Minimal React Native app with Expo SDK ~55, Expo Router, and a custom semantic token theme.

## Package Manager

Use **Bun** everywhere. Do not use `npm` or `npx`.

## Verification Order

Before finishing work, run in this order:

1. `bun format:check` — fails fast on Prettier drift
2. `bun lint:check` — ESLint (expo lint)
3. `bun type:check` — TypeScript (`tsc --noEmit`)
4. `bun test` — Jest via `jest-expo`

Husky + lint-staged auto-runs prettier and eslint on commit. Do NOT pass `--no-verify`.

## Path Aliases

- `@/` points to `src/`
- `@/assets/*` points to `assets/`
- `@/storybook/*` points to `.storybook/`

Use relative paths only for same-folder or adjacent siblings.

## Architecture

### Routing

File-based via Expo Router under `src/app/`. Group routes use parentheses: `(main)/`, `(auth)/`.

### Features

Each screen lives in `src/features/<name>/` with a thin `screen.tsx` entry and a `modules/` folder for sub-sections. Example:

```
features/login/
  screen.tsx
  use-screen.ts
  modules/
    form/
    social/
```

### Shared Components

Each gets a self-contained folder under `src/components/<name>/`:

- `index.tsx` (named export only), `types.ts`, `styles.ts`, `constants.ts`, `index.test.tsx`
- Prefer `@/components/themed-*` over raw React Native primitives.

No barrel files. Import types from `types.ts` directly.

## Theme System

- Tokens in `src/constants/theme.ts`: `Colors` (semantic light/dark), `Spacing`, `Sizes`, `FontSizes`, `LineHeights`
- Active theme via `useTheme()` hook — reads `useColorScheme()`, falls back to dark when `unspecified`
- Components resolve colors through `useTheme()`, never hardcode hex values
- Do not combine tokens with arithmetic; pick the closest existing token instead

## Testing

- Global mocks live in `jest.setup.ts` only. No `__mocks__` directories.
- Place tests next to source (`index.test.tsx`, `use-thing.test.ts`).
- `jest.setup.ts` already mocks Ionicons, SafeAreaContext, KeyboardController, and Reanimated.
- When using QueryClient in tests, create it **inside** the wrapper component with `gcTime: 0` to avoid stale data between tests.

## Skills

Available under `.opencode/skills/` (also mirrored in `.claude/skills/`). Use for:

- `commit` — conventional commits, split by concern, no `--no-verify`
- `component` — new shared component in `src/components/`
- `feature` — new screen/feature with modules
- `hook` — custom React hook in `src/hooks/`
- `module` — new module inside a feature
- `form` — keyboard-aware forms with validation
- `agent-hook` — automation hook (settings.json), not React hooks

Skill `commit` format: `type(scope): description`, all lowercase except proper names, max 50 chars. Body is bullet list (capitalize first word, rest lowercase) with no extra blank lines.
