import { useRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";

import { ThemedButton } from "@/components/themed-button";
import { ThemedTextField } from "@/components/themed-text-field";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";
import { FormModuleProps } from "./types";

/** Renders email/password fields and submit button. */
export function FormModule(props: FormModuleProps) {
  const { emailField, passwordField, submitButton, error = "" } = props;
  const passwordRef = useRef<TextInput>(null);

  return (
    <ThemedView themeColor="surface" style={styles.container}>
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
            errorText={fieldState.error?.message || error || undefined}
            hasFieldError={!!fieldState.error?.message}
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
    </ThemedView>
  );
}
