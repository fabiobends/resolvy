---
name: feature
description: Generate a new feature/screen following the Resolvy composition pattern. Use when creating a new route with orchestrator hook, modules, and a thin Expo Router entry point.
---

1. Create a **feature folder** under `src/features/<name>/` containing:
   - `screen.tsx` — pure UI screen component (named export)
   - `use-screen.ts` — screen hook (orchestrator)
   - `types.ts` — screen props interfaces
   - `styles.ts` — `StyleSheet.create({ ... })` for screen layout
   - `constants.ts` — local magic values, config, enums (when needed)
   - `modules/` — subfolder for feature modules (see **create-module** skill)
   - `use-screen.test.ts` — integration test for the screen hook (next to the hook)

2. Create a **thin route file** in `src/app/` that imports and renders the screen:

   ```tsx
   // src/app/<route>.tsx
   import { NameScreen } from "@/features/<name>/screen";

   export default function NameRoute() {
     return <NameScreen />;
   }
   ```

3. The **screen component** (`screen.tsx`):
   - Is pure UI — no hooks except the screen hook
   - Spreads props from the screen hook into child module components
   - Uses named export (no default export)
   - Wraps content in `<ThemedView color="surface">` or `<SafeAreaView>` as needed

4. The **screen hook** (`use-screen.ts`):
   - Acts as the orchestrator — **only** composes module hooks and wires shared state
   - Must stay thin: no direct business logic, no `useEffect`, no fetch calls
   - Returns a flat object whose keys map to child module component props

5. **Shared state** — when two or more modules need to share behavior, the screen hook composes the shared state and passes relevant slices to each module via arguments:

   ```ts
   // src/features/home/use-screen.ts
   import { useHeaderModule } from "./modules/header/use-module";
   import { useFooterModule } from "./modules/footer/use-footer-module";

   export function useHomeScreen() {
     const headerProps = useHeaderModule();
     const footerProps = useFooterModule();
     return { headerProps, footerProps };
   }
   ```

   Modules never import or reference each other — the screen hook is the sole coordinator.

6. For each child section, create a **module** folder under `modules/` (see the **create-module** skill):
   - `index.tsx` — component
   - `use-module.ts` — hook with business logic
   - `types.ts` — prop interfaces
   - `styles.ts` — StyleSheet
   - `use-module.test.ts` — unit test for hook
   - `stories.tsx` — Storybook stories (flat name, not `Something.stories.tsx`)
   - `index.test.tsx` — unit test for UI

7. Use `FontSizes` / `LineHeights` for text dimensions, `Spacing` for padding/margin/borderRadius/gap, `Sizes` for width/height, and resolved colors from `useTheme()`. Use `<ThemedText type="..." themeColor="...">` for all text — never apply `fontSize` or `fontWeight` via `style`.

8. No barrel files, no default exports, no hard-coded values.

9. **Never** combine token values with arithmetic (`sizes.small / 2`, `spacing.large * 2`, etc.). Choose the closest existing token from the correct scale instead.

---

## File structure

```
src/features/<name>/
  screen.tsx
  use-screen.ts
  types.ts
  styles.ts
  constants.ts
  use-screen.test.ts
  modules/
    <module>/
      index.tsx
      use-module.ts
      types.ts
      styles.ts
      constants.ts
      index.test.tsx
      use-module.test.ts
      stories.tsx

src/app/
  <route>.tsx   — thin route entry point
```

---

## Example

**src/features/home/types.ts**

```ts
import { HeaderProps } from "./modules/header/types";
import { FooterProps } from "./modules/footer/types";

/** Props passed from the home screen hook to the screen component. */
export interface HomeScreenProps {
  headerProps: HeaderProps;
  footerProps: FooterProps;
}
```

**src/features/home/use-screen.ts**

```ts
import { useHeaderModule } from "./modules/header/use-module";
import { useFooterModule } from "./modules/footer/use-footer-module";
import { HomeScreenProps } from "./types";

/**
 * Composes props for all home screen modules.
 * @returns Flat object mapping to child component props.
 */
export function useHomeScreen(): HomeScreenProps {
  const headerProps = useHeaderModule();
  const footerProps = useFooterModule();
  return { headerProps, footerProps };
}
```

**src/features/home/styles.ts**

```ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
```

**src/features/home/screen.tsx**

```tsx
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";

import { Header } from "./modules/header";
import { Footer } from "./modules/footer";
import { styles } from "./styles";
import { useHomeScreen } from "./use-screen";

/**
 * Renders the home screen composed of header and footer modules.
 * @returns React element.
 */
export function HomeScreen() {
  const { headerProps, footerProps } = useHomeScreen();

  return (
    <ThemedView color="surface" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header {...headerProps} />
        <Footer {...footerProps} />
      </SafeAreaView>
    </ThemedView>
  );
}
```

**src/features/home/use-screen.test.ts**

```ts
import { renderHook } from "@testing-library/react-native";

import { useHomeScreen } from "./use-screen";

describe("useHomeScreen", () => {
  it("composes header and footer props", () => {
    const { result } = renderHook(() => useHomeScreen());
    expect(result.current.headerProps).toBeDefined();
    expect(result.current.footerProps).toBeDefined();
  });
});
```

**src/app/index.tsx**

```tsx
import { HomeScreen } from "@/features/home";

export default function HomeRoute() {
  return <HomeScreen />;
}
```
