import { useLoginMutation } from "./use-login-mutation";
import { LoginFormData } from "../../schema";
import { FormModuleProps } from "./types";
import { UseSharedProps } from "../shared";

/**
 * Composes react-hook-form state and login mutation into form props.
 * @param shared - Shared state from useShared.
 * @returns Props for the FormModule component.
 */
export function useFormModule(
  shared: Partial<UseSharedProps>,
): FormModuleProps {
  const loginMutation = useLoginMutation();

  const onSubmit = shared.form!.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    emailField: {
      control: shared.form!.control,
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    passwordField: {
      control: shared.form!.control,
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      secureTextEntry: true,
    },
    submitButton: {
      title: "Log in",
      onPress: onSubmit,
      loading: loginMutation.isPending,
    },
    error: loginMutation.error?.message,
  };
}
