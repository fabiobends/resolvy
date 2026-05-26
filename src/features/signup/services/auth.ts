import { AuthUser, login } from "@/features/login/services/auth";

/** Credentials submitted during signup. */
export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/** Stub signup service. Replace with real auth provider when ready. */
export async function signup(
  credentials: SignupCredentials,
): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === "error@example.com") {
        reject(new Error("An account with this email already exists"));
        return;
      }
      login({ email: credentials.email, password: credentials.password })
        .then(resolve)
        .catch(reject);
    }, 1500);
  });
}
