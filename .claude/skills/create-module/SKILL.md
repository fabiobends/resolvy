---
name: create-module
description: Generate a new module inside a feature following Resolvy conventions. Use when adding business logic, UI, and tests for a new feature section.
---

1. Create the module folder under `src/features/<feature>/modules/<module>/`

2. Required files:
   - `index.tsx` — pure UI component with typed props (named export)
   - `use-module.ts` — hook containing business logic
   - `types.ts` — `interface <Module>Props { ... }`
   - `styles.ts` — `StyleSheet.create({ ... })`
   - `constants.ts` — local magic values, config, enums (when needed)
   - `use-module.test.ts` — unit tests for the hook\n - `stories.tsx` — Storybook stories (flat name, not `Something.stories.tsx`)
   - `index.test.tsx` — unit tests for the component

3. The hook:
   - Returns a typed props object matching the component's interface
   - Accepts shared state via function arguments (injected by the screen hook)
   - Is independently testable — no implicit dependencies
   - **Must be agnostic** — never import or reference other modules. If two modules need to interact, the screen hook composes shared state and injects slices via arguments.
   - Use `useRef` for values that change frequently but only matter on action (e.g., text input values used only on submit) to avoid unnecessary re-renders.

4. The component:
   - Receives all data via props (no internal state or effects)
   - Use `FontSizes` / `LineHeights` for text dimensions, `Spacing` for padding/margin/borderRadius/gap, `Sizes` for width/height, and resolved colors from `useTheme()`.
   - Use `<ThemedText type="..." themeColor="...">` for all text rendering — never apply `fontSize` or `fontWeight` via `style`.

5. No barrel files, no default exports, no hard-coded numeric values.

6. **Never** combine token values with arithmetic (`sizes.small / 2`, `spacing.large * 2`, etc.). Choose the closest existing token from the correct scale instead.

---

## Naming conventions

| Kind             | Convention           | Example              |
| ---------------- | -------------------- | -------------------- | --- | ------- | ------------- | ------------- |
| Module file      | `index.tsx`          | `index.tsx`          |
| Hook file        | `use-module.ts`      | `use-module.ts`      |
| Style file       | `styles.ts`          | `styles.ts`          |
| Type file        | `types.ts`           | `types.ts`           |
| Constants file   | `constants.ts`       | `constants.ts`       |
| Test file (UI)   | `index.test.tsx`     | `index.test.tsx`     |
| Test file (hook) | `use-module.test.ts` | `use-module.test.ts` | \n  | Stories | `stories.tsx` | `stories.tsx` |

---

## Example

**src/features/home/modules/header/types.ts**

```ts
/** Props for the Header module component. */
export interface HeaderProps {
  title: string;
  onSettingsPress: () => void;
}
```

**src/features/home/modules/header/use-module.ts**

```ts
import { HeaderProps } from "./types";

/**
 * Returns header props for the home screen.
 * @returns Header title and settings callback.
 */
export function useHeaderModule(): HeaderProps {
  const handleSettingsPress = () => {
    // navigation or action
  };

  return {
    title: "Resolvy",
    onSettingsPress,
  };
}
```

**src/features/home/modules/header/styles.ts**

```ts
import { StyleSheet } from "react-native";

import { Spacing, FontSizes, LineHeights } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.medium,
    gap: Spacing.small,
  },
  title: {
    fontSize: FontSizes.large,
    lineHeight: LineHeights.large,
  },
});
```

**src/features/home/modules/header/index.tsx**

```tsx
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

import { styles } from "./styles";
import { HeaderProps } from "./types";

/**
 * Renders the header section with title and settings action.
 * @param props - Component props.
 * @returns React element.
 */
export function Header(props: HeaderProps) {
  const { title, onSettingsPress } = props;

  return (
    <View style={styles.container}>
      <ThemedText type="title" themeColor="onSurface">
        {title}
      </ThemedText>
      <Pressable onPress={onSettingsPress}>
        <ThemedText type="body" themeColor="primary">
          Settings
        </ThemedText>
      </Pressable>
    </View>
  );
}
```

**src/features/home/modules/header/index.test.tsx**

```tsx
import { render } from "@testing-library/react-native";

import { Header } from "./index";

describe("Header", () => {
  it("renders title", () => {
    const { getByText } = render(
      <Header title="Home" onSettingsPress={() => {}} />,
    );
    expect(getByText("Home")).toBeTruthy();
  });
});
```

**src/features/home/modules/header/use-module.test.ts**

```ts
import { renderHook } from "@testing-library/react-native";

import { useHeaderModule } from "./use-module";

describe("useHeaderModule", () => {
  it("returns title and callback", () => {
    const { result } = renderHook(() => useHeaderModule());
    expect(result.current.title).toBe("Resolvy");
    expect(typeof result.current.onSettingsPress).toBe("function");
  });
});
```
