# Code Guidelines

These conventions keep the codebase consistent and maintainable.

---

## Folder Architecture

### Shared pieces (`src/`)

```
src/
  /components   /hooks   /utils
  /constants    /types   /features
```

### Individual piece (component, hook, feature, etc.)

Every piece with enough surface area lives in its own folder:

```
/piece
  index.(ts|tsx) # Main export
  types.ts # TypeScript types
  constants.ts # Local constants
  styles.ts # StyleSheet or styled definitions
  utils.ts # Helper functions
  piece.test.(ts|tsx) # Tests (next to code)
  /components # Sub-components
  /hooks # Local hooks
    use-thing.ts
    use-thing.test.ts
```

Examples in the codebase:

- `src/components/themed-text/index.tsx`, `styles.ts`, `types.ts`, `themed-text.test.tsx`
- `src/hooks/use-theme/index.ts`, `use-theme.test.ts`

> Never group unrelated components as flat files in `src/components/`.

### Folders without tests

- **`/app`** — Expo Router screens. No tests here.
- **`/constants`** — Theme, design tokens. No tests here.

---

## Comments

- Explain **why**, not what — code shows what, comments show why.
- **TSDoc** is required on all exported functions, classes, and constants:
  - One-line summary at the top.
  - For functions: add `@param` for every parameter and `@returns` for the return value.
  - For constants: a one-line summary is enough; include `@example` if the shape is not obvious.
- Remove all other comments unless they explain non-obvious business logic.

---

## Imports

- **No barrel files.** Import directly from the source file.
- Use **path aliases** (`@/components/...`, `@/constants/...`) for cross-folder imports.
- Use **relative paths** (`./`, `../`) when importing from the same or adjacent folder.

---

## Configuration

- No hardcoded URLs, API keys, or environment-specific values.
- Use environment variables or dedicated config files instead.

---

## Cleanup

- Remove unused imports, exports, components, and dependencies.
- Prefer Themed components (`@/components/themed-*.tsx`) over plain React Native primitives.

---

## Preferences

- Use nullish coalescing (`??`) over logical OR (`||`) for defaults:

  ```ts
  // Good
  const x = a ?? "default";

  // Avoid
  const x = a || "default";
  ```

- Put tests **next to the code**, not in `__tests__` folders.
- Use a **jest setup file** (`jest.setup.ts`) for global mocks instead of `__mocks__` directories.

---

## Testing

- Every exported function, class, and non-trivial logic branch must have unit tests.
- **Dev-tool only code** (lint rules, build scripts, etc.) is exempt from this requirement.
- Place tests next to the code they test: `piece.test.(ts|tsx)`.
- Run `bun run test` after changes and fix all failures before finishing.
