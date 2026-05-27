import { z } from "zod";

/** Validation schema for the forgot-password form. */
export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

/** Inferred form data type from the forgot-password schema. */
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
