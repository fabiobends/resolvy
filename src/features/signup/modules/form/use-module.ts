import { UseFormReturn } from "react-hook-form";

import { useSignupMutation } from "./use-signup-mutation";
import { SignupFormData } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and signup mutation into form props.
 * @param form - The react-hook-form instance for the signup form.
 * @returns Props for the FormModule component.
 */
export function useFormModule(
  form: UseFormReturn<SignupFormData>,
): FormModuleProps {
  const signupMutation = useSignupMutation();

  const onSubmit = form.handleSubmit((data) => {
    signupMutation.mutate(data);
  });

  return {
    firstNameField: {
      control: form.control,
      name: "firstName",
      label: "First name",
      placeholder: "Enter your first name",
      autoCapitalize: "words",
    },
    lastNameField: {
      control: form.control,
      name: "lastName",
      label: "Last name",
      placeholder: "Enter your last name",
      autoCapitalize: "words",
    },
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
      title: "Sign Up",
      onPress: onSubmit,
      loading: signupMutation.isPending,
    },
    error: signupMutation.error?.message,
  };
}
