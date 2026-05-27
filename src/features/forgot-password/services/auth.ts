/** Email submitted during password reset request. */
export interface ResetPasswordRequest {
  email: string;
}

/** Stub password reset service. Replace with real provider when ready. */
export async function requestPasswordReset(
  request: ResetPasswordRequest,
): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (request.email === "error@example.com") {
        reject(new Error("No account found with this email"));
        return;
      }
      resolve();
    }, 1500);
  });
}
