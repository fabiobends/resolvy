import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import { LoginFormData, loginSchema } from "../../schema";

/** Shared state used by multiple login modules. */
export interface UseSharedProps {
  form: UseFormReturn<LoginFormData>;
}

/**
 * Creates shared state for login modules.
 * @returns Shared state with react-hook-form instance.
 */
export function useShared(): UseSharedProps {
  const form = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return { form };
}
