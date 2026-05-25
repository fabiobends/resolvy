import { z } from "zod";

/** Validation schema for the login form. */
export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

/** Inferred form data type from the login schema. */
export type LoginFormData = z.infer<typeof loginSchema>;
