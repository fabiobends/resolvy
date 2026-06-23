import { useMutation } from "@tanstack/react-query";

import { requestPasswordReset } from "@/services/auth";

/** TanStack Query mutation for password reset request. */
export function useRequestPasswordResetMutation() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}
