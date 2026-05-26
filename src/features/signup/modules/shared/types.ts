import { UseFormReturn } from "react-hook-form";
import { SignupFormData } from "../../schema";

/** Shared state used by multiple signup modules. */
export interface UseSharedProps {
  form: UseFormReturn<SignupFormData>;
}
