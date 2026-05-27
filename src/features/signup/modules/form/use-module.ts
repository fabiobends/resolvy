import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useSignupMutation } from "./use-signup-mutation";
import { SignupFormData, signupSchema } from "../../schema";
import { FormModuleProps } from "./types";

/**
 * Composes react-hook-form state and signup mutation into form props.
 * @returns Props for the FormModule component.
 */
export function useFormModule(): FormModuleProps {
  const { t } = useTranslation();

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
      label: t("common.firstName"),
      placeholder: t("placeholders.firstName"),
      autoCapitalize: "words",
    },
    lastNameField: {
      control: form.control,
      name: "lastName",
      label: t("common.lastName"),
      placeholder: t("placeholders.lastName"),
      autoCapitalize: "words",
    },
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
      title: t("signup.submit"),
      onPress: onSubmit,
      loading: signupMutation.isPending,
    },
    error: signupMutation.error?.message,
  };
}
