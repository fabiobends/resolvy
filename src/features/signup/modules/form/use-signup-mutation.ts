import { useMutation } from "@tanstack/react-query";

import { signup } from "../../services/auth";

/** TanStack Query mutation for signup. */
export function useSignupMutation() {
  return useMutation({
    mutationFn: signup,
  });
}
