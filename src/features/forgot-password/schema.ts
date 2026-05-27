import i18n from "@/localization/i18n";
import { z } from "zod";

/** Validation schema for the forgot-password form. */
export const forgotPasswordSchema = z.object({
  email: z.email(i18n.t("validation.email")),
});

/** Inferred form data type from the forgot-password schema. */
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
