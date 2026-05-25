# Code Guidelines

Conventions for consistent, maintainable code.

---

## Folder Architecture

### Shared (`src/`)

```
src/
  /components   /hooks   /utils
  /constants    /types   /features
```

### Individual piece (component, hook, feature)

Each piece with significant surface area gets its own folder:

```
/piece
  index.(ts|tsx) # Main export
  types.ts # TypeScript types
  constants.ts # Local constants
  styles.ts # StyleSheet or styled definitions
  utils.ts # Helper functions
  index.test.(ts|tsx) # Tests for the main export
  /components # Sub-components
  /hooks # Local hooks
    use-thing.ts
    use-thing.test.ts
```

Examples in the codebase:

- `src/components/themed-text/` — `index.tsx`, `styles.ts`, `types.ts`, `index.test.tsx`
- `src/hooks/use-theme/` — `index.ts`, `index.test.ts`

> Never group unrelated components as flat files in `src/components/`.

### Folders without tests

- **`/app`** — Expo Router screens. No tests here.
- **`/constants`** — Theme, design tokens. No tests here.

---

## Comments

- Explain **why**, not what.
- **TSDoc** on all exported functions, classes, constants:
  - One-line summary.
  - Functions: `@param` for each parameter, `@returns` for return value.
  - Constants: one-line summary; add `@example` if shape is non-obvious.
- Remove all other comments unless explaining non-obvious business logic.

---

## Imports

- No barrel files — import directly from source.
- Path aliases (`@/`) for cross-folder imports.
- Relative paths (`./`, `../`) for same or adjacent folders.

---

## Configuration

- No hardcoded URLs, API keys, or environment values.
- Use environment variables or config files.

---

## Cleanup

- Remove unused imports, exports, components, dependencies.
- Prefer themed components (`@/components/themed-*.tsx`) over React Native primitives.

---

## Preferences

- Use nullish coalescing (`??`) over logical OR (`||`) for defaults:

  ```ts
  // Good
  const x = a ?? "default";

  // Avoid
  const x = a || "default";
  ```

- Tests next to code — not in `__tests__` folders.
- Use `jest.setup.ts` for global mocks — not `__mocks__` directories.

---

## Testing

- Unit tests for all exported functions, classes, non-trivial logic.
- Exempt: dev-tool code (lint rules, build scripts).
- Tests next to code: `index.test.(ts|tsx)` or mirror source name (`use-thing.test.ts`).
- Run `bun test` after changes. Fix all failures before finishing.
