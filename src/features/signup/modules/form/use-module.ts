import { UseSharedProps } from "../shared/types";
import { FormModuleProps } from "./types";
import { useSignupMutation } from "./use-signup-mutation";

/**
 * Composes react-hook-form state and signup mutation into form props.
 * @param shared - Shared state from useShared.
 * @returns Props for the FormModule component.
 */
export function useFormModule(
  shared: Partial<UseSharedProps>,
): FormModuleProps {
  const signupMutation = useSignupMutation();

  const onSubmit = shared.form!.handleSubmit((data) => {
    signupMutation.mutate(data);
  });

  return {
    firstNameField: {
      control: shared.form!.control,
      name: "firstName",
      label: "First name",
      placeholder: "Enter your first name",
      autoCapitalize: "words",
    },
    lastNameField: {
      control: shared.form!.control,
      name: "lastName",
      label: "Last name",
      placeholder: "Enter your last name",
      autoCapitalize: "words",
    },
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
      title: "Sign Up",
      onPress: onSubmit,
      loading: signupMutation.isPending,
    },
    error: signupMutation.error?.message,
  };
}
