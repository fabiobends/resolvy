/** Represents an authenticated user. */
export interface AuthUser {
  id: string;
  email: string;
}

/** Credentials submitted during login. */
export interface LoginCredentials {
  email: string;
  password: string;
}

type AuthStateCallback = (user: AuthUser | null) => void;

const subscribers = new Set<AuthStateCallback>();
let currentUser: AuthUser | null = null;

function notifySubscribers() {
  subscribers.forEach((cb) => cb(currentUser));
}

/** Stub login service. Replace with real auth provider when ready. */
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === "error@example.com") {
        reject(new Error("Invalid credentials"));
        return;
      }
      const user = { id: "stub-user-id", email: credentials.email };
      currentUser = user;
      notifySubscribers();
      resolve(user);
    }, 1500);
  });
}

/** Signs out the current user. */
export async function signOut(): Promise<void> {
  currentUser = null;
  notifySubscribers();
}

/** Returns the currently authenticated user, if any. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  return currentUser;
}

/**
 * Subscribes to auth state changes.
 * @param callback - Called whenever auth state changes.
 * @returns Unsubscribe function.
 */
export function subscribeToAuthState(callback: AuthStateCallback): () => void {
  subscribers.add(callback);
  callback(currentUser);
  return () => {
    subscribers.delete(callback);
  };
}
