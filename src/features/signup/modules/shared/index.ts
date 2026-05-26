import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignupFormData, signupSchema } from "../../schema";
import { UseSharedProps } from "./types";

/**
 * Creates shared state for signup modules.
 * @returns Shared state with react-hook-form instance.
 */
export function useShared(): UseSharedProps {
  const form = useForm<SignupFormData>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  return { form };
}
