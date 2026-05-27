import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRequestPasswordResetMutation } from "./use-request-password-reset-mutation";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and password reset mutation into form props.
 * @returns Props for the FormModule component.
 */
export function useFormModule(): FormModuleProps {
  const form = useForm<ForgotPasswordFormData>({
    mode: "onBlur",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetMutation = useRequestPasswordResetMutation();

  const onSubmit = form.handleSubmit((data) => {
    resetMutation.mutate(data);
  });

  return {
    emailField: {
      control: form.control,
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      keyboardType: "email-address",
      autoCapitalize: "none",
      successText: resetMutation.isSuccess
        ? "Reset link sent. Check your email inbox."
        : undefined,
    },
    submitButton: {
      title: "Send reset link",
      onPress: onSubmit,
      loading: resetMutation.isPending,
    },
    error: resetMutation.error?.message,
    infoBanner:
      "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.",
  };
}
