import { i18n } from "@/localization";
import { z } from "zod";

/** Validation schema for the login form. */
export const loginSchema = z.object({
  email: z.email(i18n.t("validation.email")),
  password: z
    .string()
    .min(1, i18n.t("validation.passwordRequired"))
    .min(6, i18n.t("validation.passwordMinLength")),
});

/** Inferred form data type from the login schema. */
export type LoginFormData = z.infer<typeof loginSchema>;
