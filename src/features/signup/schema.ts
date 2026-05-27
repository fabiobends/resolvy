import i18n from "@/localization/i18n";
import { z } from "zod";

/** Validation schema for the signup form. */
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, i18n.t("validation.firstNameRequired"))
    .min(2, i18n.t("validation.firstNameMinLength")),
  lastName: z
    .string()
    .min(1, i18n.t("validation.lastNameRequired"))
    .min(2, i18n.t("validation.lastNameMinLength")),
  email: z.email(i18n.t("validation.email")),
  password: z
    .string()
    .min(1, i18n.t("validation.passwordRequired"))
    .min(6, i18n.t("validation.passwordMinLength")),
});

/** Inferred form data type from the signup schema. */
export type SignupFormData = z.infer<typeof signupSchema>;
