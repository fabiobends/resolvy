---
name: component
description: Generate a new shared component in src/components/ following Resolvy conventions. Use when creating a reusable UI component.
---

## Rules

1. Create the component inside a **self-contained folder** (`src/components/<name>/`) with:
   - `index.tsx` — main component file (named export only)
   - `types.ts` — props interfaces
   - `styles.ts` — `StyleSheet.create(...)` or style objects (when non-trivial)
   - `constants.ts` — local magic values, config, enums (when needed)
   - `index.test.tsx` — unit tests with `@testing-library/react-native`

- `stories.tsx` — Storybook stories (flat name, not `Something.stories.tsx`)

2. Use theme tokens from `@/constants/theme`:
   - `Spacing` for padding, margin, gap, borderRadius
   - `Sizes` for width, height
   - `FontSizes` / `LineHeights` for text dimensions
   - Resolve colors via `useTheme()` hook

3. Use `<ThemedText type="..." themeColor="...">` for all text rendering — never apply `fontSize` or `fontWeight` via inline `style`.

4. Use `<ThemedView color="...">` for themed container surfaces.

5. No barrel files (the `index.tsx` is the component itself, not a re-export), no default exports, no hard-coded hex or numeric values.

6. **Never** combine token values with arithmetic (`sizes.small / 2`, `spacing.large * 2`, etc.). Choose the closest existing token from the correct scale instead.

---

## File structure

```
src/components/<name>/
  index.tsx      — Component JSX (named export)
  types.ts       — Props interface
  styles.ts      — StyleSheet.create(...)
  constants.ts   — Local constants, enums, config
  index.test.tsx — Unit tests
  stories.tsx    — Storybook stories
```

---

## Example

**src/components/avatar/types.ts**

```ts
import { ImageProps } from "react-native";

import { ThemeColor } from "@/constants/theme";

/** Props for the Avatar component. */
export type AvatarProps = ImageProps & {
  size: "small" | "medium" | "large";
  borderColor?: ThemeColor;
};
```

**src/components/avatar/styles.ts**

```ts
import { StyleSheet } from "react-native";

import { Sizes, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  small: {
    width: Sizes.small,
    height: Sizes.small,
  },
  medium: {
    width: Sizes.medium,
    height: Sizes.medium,
  },
  large: {
    width: Sizes.large,
    height: Sizes.large,
  },
  border: {
    borderWidth: Spacing.tiny,
  },
});
```

**src/components/avatar/index.tsx**

```tsx
import { Image } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { AvatarProps } from "./types";

/**
 * Renders an avatar image with theme-aware border color.
 * @param props - Component props.
 * @returns React element.
 */
export function Avatar(props: AvatarProps) {
  const { size, borderColor, style, ...rest } = props;
  const theme = useTheme();

  return (
    <Image
      style={[
        styles[size],
        borderColor && { borderColor: theme[borderColor] },
        styles.border,
        style,
      ]}
      {...rest}
    />
  );
}
```

**src/components/avatar/index.test.tsx**

```tsx
import { render } from "@testing-library/react-native";

import { Avatar } from "./index";

describe("Avatar", () => {
  it("renders with given size", () => {
    const { getByTestId } = render(
      <Avatar
        testID="avatar"
        size="medium"
        source={{ uri: "https://example.com/avatar.png" }}
      />,
    );
    expect(getByTestId("avatar")).toBeTruthy();
  });
});
```

---

## Imports

- Use `@/` path alias for all project imports.
- Group imports: (1) React/RN, (2) third-party, (3) project `@/`, (4) relative.
- Never use barrel/index re-exports.
- Types are **not** re-exported from `index.tsx`. Import them directly from `types.ts` when needed by consumers:

  ```ts
  // Good
  import { AvatarProps } from "@/components/avatar/types";

  // Avoid
  import { AvatarProps } from "@/components/avatar";
  ```
