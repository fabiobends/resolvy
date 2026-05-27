import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSignupMutation } from "./use-signup-mutation";
import { SignupFormData, signupSchema } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and signup mutation into form props.
 * @returns Props for the FormModule component.
 */
export function useFormModule(): FormModuleProps {
  const form = useForm<SignupFormData>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

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
