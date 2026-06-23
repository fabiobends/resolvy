import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { mapAuthError } from "@/services/auth";

import { useLoginMutation } from "./use-login-mutation";
import { LoginFormData, loginSchema } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and login mutation into form props.
 * @returns Props for the FormModule component.
 */
export function useFormModule(): FormModuleProps {
  const { t } = useTranslation();

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
      label: t("common.email"),
      placeholder: t("placeholders.email"),
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    passwordField: {
      control: form.control,
      name: "password",
      label: t("common.password"),
      placeholder: t("placeholders.password"),
      secureTextEntry: true,
    },
    submitButton: {
      title: t("login.submit"),
      onPress: onSubmit,
      loading: loginMutation.isPending,
    },
    error: loginMutation.error
      ? mapAuthError(loginMutation.error, t)
      : undefined,
  };
}
