---
name: hook
description: Generate a new custom hook in src/hooks/ following Resolvy conventions. Use when creating reusable React hook logic, either self-contained or backed by a context/provider.
---

## Rules

1. Create the hook inside a **self-contained folder** (`src/hooks/<name>/`).

2. There are two hook shapes. Choose the one that fits:

   **Self-contained hook** — pure logic, no React context needed:
   - `index.ts` — the hook implementation (named export)
   - `index.test.ts` — unit tests with `@testing-library/react-native` (`renderHook`)

   **Provider-based hook** — shared state via React context:
   - `context.tsx` — context definition, types, and optional `useXContext()` internal helper
   - `provider.tsx` — Provider component with state logic
   - `index.ts` — public `useX()` hook that consumes the context
   - `index.test.ts` — unit tests wrapping hook in the Provider

3. Hook naming:
   - Folder name: `use-<name>` (kebab-case)
   - Function name: `use<Name>` (camelCase)
   - Provider name: `<Name>Provider` (PascalCase)
   - Context variable: `<Name>Context` (PascalCase)

4. Self-contained hooks:
   - Must be independently testable — no implicit global dependencies
   - Accept configuration via arguments, not side effects
   - Return a typed object or value; avoid returning raw tuples unless the hook mirrors a built-in like `useState`
   - Use `useRef` for values that change frequently but only matter on action to avoid unnecessary re-renders

5. Provider-based hooks:
   - Export the Provider from `provider.tsx` as a named export
   - Export the context type/interface from `context.tsx`
   - The public hook (`index.ts`) must throw a clear error when used outside the Provider
   - Keep state updates minimal — use `useCallback` for setters to avoid breaking memoized consumers
   - Never export the raw context itself as the public API; always wrap `useContext` in the hook

6. All exported types, interfaces, hook functions, and Provider components must have TSDoc comments:
   - Describe what it is or does
   - Document parameters with `@param`
   - Document return value with `@returns`

7. No barrel files, no default exports, no hard-coded values.

---

## File structure

### Self-contained

```
src/hooks/<name>/
  index.ts      — Hook implementation (named export)
  index.test.ts — Unit tests with renderHook
```

### Provider-based

```
src/hooks/<name>/
  context.tsx   — Context + types + internal helper
  provider.tsx  — Provider component with state
  index.ts      — Public useX() hook
  index.test.ts — Unit tests wrapping Provider
```

---

## Examples

### Self-contained hook

**src/hooks/use-counter/index.ts**

```ts
import { useCallback, useState } from "react";

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
}

/**
 * Manages a simple numeric counter.
 * @param initial - Starting value.
 * @returns Counter state and controls.
 */
export function useCounter(initial = 0): UseCounterReturn {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);

  return { count, increment, decrement };
}
```

**src/hooks/use-counter/index.test.ts**

```ts
import { act, renderHook } from "@testing-library/react-native";

import { useCounter } from "./index";

describe("useCounter", () => {
  it("starts at the given initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("increments", () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});
```

---

### Provider-based hook

**src/hooks/use-settings/context.tsx**

```ts
import { createContext, useContext } from "react";

export interface SettingsState {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
}

export const SettingsContext = createContext<SettingsState>({
  notifications: true,
  setNotifications: () => {},
});

export function useSettingsContext() {
  return useContext(SettingsContext);
}
```

**src/hooks/use-settings/provider.tsx**

```tsx
import { ReactNode, useCallback, useState } from "react";

import { SettingsContext } from "./context";

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [notifications, setNotificationsState] = useState(true);

  const setNotifications = useCallback((value: boolean) => {
    setNotificationsState(value);
  }, []);

  return (
    <SettingsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </SettingsContext.Provider>
  );
}
```

**src/hooks/use-settings/index.ts**

```ts
import { useContext } from "react";

import { SettingsContext } from "./context";

/**
 * Returns current settings and setters.
 * @throws When used outside of a SettingsProvider.
 */
export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
```

**src/hooks/use-settings/index.test.ts**

```ts
import { renderHook } from "@testing-library/react-native";

import { SettingsContext, SettingsState } from "./context";
import { useSettings } from "./index";

function wrapper(state: SettingsState) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <SettingsContext.Provider value={state}>{children}</SettingsContext.Provider>
  );
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
}

describe("useSettings", () => {
  it("returns notifications state", () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: wrapper({ notifications: false, setNotifications: () => {} }),
    });
    expect(result.current.notifications).toBe(false);
  });
});
```

---

## Imports

- Use `@/` path alias for all project imports.
- Group imports: (1) React/RN, (2) third-party, (3) project `@/`, (4) relative.
- Never use barrel/index re-exports.
