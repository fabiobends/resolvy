import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { mapAuthError } from "@/services/auth";

import { useRequestPasswordResetMutation } from "./use-request-password-reset-mutation";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and password reset mutation into form props.
 * @returns Props for the FormModule component.
 */
export function useFormModule(): FormModuleProps {
  const { t } = useTranslation();

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
      label: t("common.email"),
      placeholder: t("placeholders.email"),
      keyboardType: "email-address",
      autoCapitalize: "none",
      successText: resetMutation.isSuccess
        ? t("forgotPassword.success")
        : undefined,
    },
    submitButton: {
      title: t("forgotPassword.submit"),
      onPress: onSubmit,
      loading: resetMutation.isPending,
    },
    error: resetMutation.error
      ? mapAuthError(resetMutation.error, t)
      : undefined,
    infoBanner: t("forgotPassword.infoBanner"),
  };
}
