---
name: form
description: Form UX conventions for Resolvy. Use when building keyboard-aware forms with focus chaining, validation, and error handling.
---

# Form UX Skill

## Screen Structure

Wrap the screen in `SafeAreaView edges={["bottom"]}` and place `KeyboardScrollView` (our wrapper) and `KeyboardToolbarView` (our wrapper) as siblings:

```tsx
<SafeAreaView style={styles.safeArea} edges={["bottom"]}>
  <KeyboardScrollView
    contentContainerStyle={styles.scrollContent}
    themeColor="surface"
  >
    <FormModule {...formProps} />
  </KeyboardScrollView>
  <KeyboardToolbarView onDonePress={formProps.submitButton.onPress} />
</SafeAreaView>
```

> `KeyboardScrollView` is a project wrapper around `KeyboardAwareScrollView`. `KeyboardToolbarView` is a wrapper around `KeyboardToolbar`. Do not import `react-native-keyboard-controller` directly in features — use the components.

## Module Pattern

A form module has three layers:

1. **Screen hook** (`useLoginScreen`) — creates the `useForm` instance and passes it to the form module hook.
2. **Form module hook** (`useFormModule`) — composes `react-hook-form` + mutations/API calls into `FormModuleProps`.
3. **Form module component** (`FormModule`) — receives props, wires `Controller`, refs, and focus chaining.

### Screen Hook

```tsx
export function useLoginScreen(): LoginScreenProps {
  const form = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const formProps = useFormModule(form);
  // ... other modules

  return { formProps /* ... */ };
}
```

### Form Module Hook

```tsx
export function useFormModule(
  form: UseFormReturn<LoginFormData>,
): FormModuleProps {
  const mutation = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    emailField: {
      control: form.control,
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    passwordField: {
      control: form.control,
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      secureTextEntry: true,
    },
    submitButton: {
      title: "Log in",
      onPress: onSubmit,
      loading: mutation.isPending,
    },
    error: mutation.error?.message,
  };
}
```

### Form Module Component

Use `Controller` from `react-hook-form` inside the component. Keep focus logic here:

```tsx
export function FormModule(props: FormModuleProps) {
  const { emailField, passwordField, submitButton, error = "" } = props;
  const passwordRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Controller
        control={emailField.control}
        name={emailField.name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedTextField
            label={emailField.label}
            variantColor="primary"
            placeholder={emailField.placeholder}
            keyboardType={emailField.keyboardType}
            autoCapitalize={emailField.autoCapitalize}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorText={fieldState.error?.message}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        )}
      />

      <Controller
        control={passwordField.control}
        name={passwordField.name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedTextField
            ref={passwordRef}
            label={passwordField.label}
            variantColor="primary"
            placeholder={passwordField.placeholder}
            secureTextEntry={passwordField.secureTextEntry}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorText={fieldState.error?.message || error}
            returnKeyType="done"
            onSubmitEditing={submitButton.onPress}
          />
        )}
      />

      <ThemedButton
        title={submitButton.title}
        variantColor="primary"
        loading={submitButton.loading}
        onPress={submitButton.onPress}
      />
    </View>
  );
}
```

## Focus Chaining

1. Wrap `ThemedTextField` with `forwardRef<TextInput, ThemedTextFieldProps>`.
2. In the form module component, create refs: `const passwordRef = useRef<TextInput>(null)`.
3. First field: `returnKeyType="next"`, `onSubmitEditing={() => nextRef.current?.focus()}`.
4. Last field: `returnKeyType="done"`, `onSubmitEditing={submitHandler}`.
5. Pass `ref={passwordRef}` to the target field.

> `KeyboardToolbarView` handles prev/next/done via the keyboard accessory bar, but always implement `returnKeyType` + `onSubmitEditing` focus chaining in the component — the toolbar alone does not move focus.

## Component Boundaries

- Focus logic is a **UX concern** — keep it in the component, not the hook.
- Form hooks handle validation, submission, loading state, and mutation errors.
- Form components handle refs, `returnKeyType`, `onSubmitEditing`, and `Controller` wiring.
- Field metadata (labels, placeholders, keyboard types) lives in the hook, not hard-coded in the component.

## Validation

- Define a zod schema in `features/<feature>/schema.ts`.
- Use `react-hook-form` with `zodResolver`.
- Trigger validation `mode: "onBlur"` to avoid aggressive inline errors.
- Show errors via the `errorText` prop on `ThemedTextField`.
- When `errorText` is present, `ThemedTextField` automatically switches label and border to the `error` theme color.

## Inline Server Errors

Server/mutation errors must be shown via the relevant input field's `errorText` prop, not as a separate text node below the form. Merge with field errors in the component:

```tsx
errorText={fieldState.error?.message || error}
```

Field validation error takes precedence over the server error.

## Helper Text

`ThemedTextField` supports `helperText` and `errorText` mutually exclusively; `errorText` takes precedence when both are provided.
