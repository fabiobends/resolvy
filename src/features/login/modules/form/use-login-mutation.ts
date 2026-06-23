import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth";

/** TanStack Query mutation for email/password login. */
export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  });
}
