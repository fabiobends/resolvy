import { useRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { useRouter } from "expo-router";

import { ThemedButton } from "@/components/themed-button";
import { ThemedLink } from "@/components/themed-link";
import { ThemedTextField } from "@/components/themed-text-field";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";
import { FormModuleProps } from "./types";

/** Renders name, email, password fields, submit button, and back link. */
export function FormModule(props: FormModuleProps) {
  const {
    firstNameField,
    lastNameField,
    emailField,
    passwordField,
    submitButton,
    error = "",
  } = props;

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const router = useRouter();

  return (
    <ThemedView themeColor="surface" style={styles.container}>
      <Controller
        control={firstNameField.control}
        name={firstNameField.name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedTextField
            label={firstNameField.label}
            variantColor="primary"
            placeholder={firstNameField.placeholder}
            autoCapitalize={firstNameField.autoCapitalize}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorText={fieldState.error?.message}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
          />
        )}
      />

      <Controller
        control={lastNameField.control}
        name={lastNameField.name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedTextField
            ref={lastNameRef}
            label={lastNameField.label}
            variantColor="primary"
            placeholder={lastNameField.placeholder}
            autoCapitalize={lastNameField.autoCapitalize}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorText={fieldState.error?.message}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        )}
      />

      <Controller
        control={emailField.control}
        name={emailField.name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedTextField
            ref={emailRef}
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

      <ThemedView themeColor="surface" style={styles.linksRow}>
        <ThemedLink
          title="Already have an account? Log in"
          color="primary"
          onPress={() => router.back()}
        />
      </ThemedView>
    </ThemedView>
  );
}
