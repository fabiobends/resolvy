import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "./use-login-mutation";
import { LoginFormData, loginSchema } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and login mutation into form props.
 * @returns Props for the FormModule component.
 */
export function useFormModule(): FormModuleProps {
  const form = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data);
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
      loading: loginMutation.isPending,
    },
    error: loginMutation.error?.message,
  };
}
