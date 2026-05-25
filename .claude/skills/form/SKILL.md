---
name: form
description: Form UX conventions for Resolvy. Use when building keyboard-aware forms with focus chaining, validation, and error handling.
---

# Form UX Skill

## Keyboard Handling

Use `react-native-keyboard-controller` for all keyboard-aware forms.

1. Wrap the app in `KeyboardProvider` at the root layout.
2. Use `KeyboardAwareScrollView` instead of `KeyboardAvoidingView` + `ScrollView`.
3. Set `bottomOffset` to `Spacing.large` (or similar) to keep inputs visible.
4. Set `keyboardShouldPersistTaps="handled"` so tapping buttons while the keyboard is open works.
5. Wrap screen in `SafeAreaView edges={["bottom"]}` — only bottom inset, let scroll view handle top.
6. `ThemedView` sits inside `SafeAreaView` with `flex: 1`.
7. `KeyboardToolbar` sits inside `SafeAreaView` but outside `ThemedView`, at the same flex level:

```tsx
<SafeAreaView style={styles.safeArea} edges={["bottom"]}>
  <ThemedView themeColor="surface" style={styles.container}>
    <KeyboardAwareScrollView ...>
      ...
    </KeyboardAwareScrollView>
  </ThemedView>
  <KeyboardToolbar>
    <KeyboardToolbar.Prev />
    <KeyboardToolbar.Next />
    <KeyboardToolbar.Done onPress={formProps.submitButton.onPress} />
  </KeyboardToolbar>
</SafeAreaView>
```

> `KeyboardToolbar.Done onPress` should wire to `formModule.submitButton.onPress` from the form module — the module already handles loading/disabled guards.

## Focus Chaining

Use `forwardRef` on text inputs and chain focus with refs.

1. Wrap `ThemedTextField` with `forwardRef<TextInput, ThemedTextFieldProps>`.
2. In form modules, create refs: `const passwordRef = useRef<TextInput>(null)`.
3. First field: `returnKeyType="next"`, `onSubmitEditing={() => nextRef.current?.focus()}`.
4. Last field: `returnKeyType="done"`, `onSubmitEditing={submitHandler}`.
5. Pass `ref={passwordRef}` to the target field.

> `KeyboardToolbar` handles prev/next/done via the keyboard accessory bar, but always implement `returnKeyType` + `onSubmitEditing` focus chaining as well — the toolbar alone does not move focus.

## Component Boundaries

- Focus logic is a **UX concern** — keep it in the component, not the hook.
- Form hooks handle validation, submission, and state.
- Form components handle refs, returnKeyType, and onSubmitEditing.

## Validation

- Use `react-hook-form` with `zodResolver`.
- Trigger validation `mode: "onBlur"` to avoid aggressive inline errors.
- Show errors via the `errorText` prop on `ThemedTextField`.
- When `errorText` is present, `ThemedTextField` automatically switches label and border to the `error` theme color.

## Inline Server Errors

Server/mutation errors must be shown via the relevant input field's `errorText` prop, not as a separate text node below the form. When both field validation error and server error may exist, field error takes precedence.

## Bottom Text

`ThemedTextField` supports `helperText` and `errorText` mutually exclusively; `errorText` takes precedence when both are provided.
