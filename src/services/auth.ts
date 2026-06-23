import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import type { TFunction } from "i18next";

/**
 * Authenticated user surfaced to the app. Rich shape: social sign-in populates
 * displayName/photoURL/providerId for free, so we commit the richer shape once
 * instead of a breaking change later. email is nullable (Firebase returns null
 * until verified/social).
 */
export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string; // "password" | "google.com" | "apple.com"
}

/** Credentials submitted during login. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Credentials submitted during signup. */
export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/** Email submitted during a password reset request. */
export interface ResetPasswordRequest {
  email: string;
}

type AuthStateCallback = (user: AuthUser | null) => void;

/**
 * Web OAuth client ID for Google Sign-In.
 */
const googleWebClientId: string =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "";

/**
 * Configures native Google Sign-In. MUST run once at boot (root-layout
 * useEffect) before any Google tap, else the first tap throws DEVELOPER_ERROR.
 * webClientId is the web OAuth client ID (not the Android one).
 */
export function configureGoogleSignIn(): void {
  GoogleSignin.configure({ webClientId: googleWebClientId });
}

/** Signs in with email/password and returns the normalized user. */
export async function login({
  email,
  password,
}: LoginCredentials): Promise<AuthUser> {
  const cred = await auth().signInWithEmailAndPassword(email, password);
  return toAuthUser(cred.user);
}

/** Creates a user with email/password, sets the display name, and returns it. */
export async function signup({
  firstName,
  lastName,
  email,
  password,
}: SignupCredentials): Promise<AuthUser> {
  const cred = await auth().createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName: `${firstName} ${lastName}` });
  return toAuthUser(cred.user);
}

/** Sends a password reset email. */
export async function requestPasswordReset({
  email,
}: ResetPasswordRequest): Promise<void> {
  await auth().sendPasswordResetEmail(email);
}

/** Signs out the current user. */
export async function signOut(): Promise<void> {
  await auth().signOut();
}

/** Returns the currently authenticated user, if any. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const user = auth().currentUser;
  return user ? toAuthUser(user) : null;
}

/**
 * Subscribes to auth state changes. Single source of truth: its first emit
 * restores the persisted user (Firebase AUTH_PERSISTENCE.LOCAL default) and
 * drives AuthProvider.isReady, so no getCurrentUser-on-mount is needed.
 * @param callback - Called whenever auth state changes.
 * @returns Unsubscribe function.
 */
export function subscribeToAuthState(callback: AuthStateCallback): () => void {
  return auth().onAuthStateChanged((user) =>
    callback(user ? toAuthUser(user) : null),
  );
}

/** Signs in with Google via the native provider. */
export async function signInWithGoogle(): Promise<AuthUser> {
  await GoogleSignin.signIn();
  const { idToken } = await GoogleSignin.getTokens();
  const credential = auth.GoogleAuthProvider.credential(idToken);
  const cred = await auth().signInWithCredential(credential);
  return toAuthUser(cred.user);
}

/**
 * Signs in with Apple via the native provider (iOS-only). Uses
 * @invertase/react-native-apple-authentication, which generates and returns the
 * nonce itself, so there's no manual generateNonce/SHA-256. Apple returns
 * fullName/email only on the FIRST sign-in ever, so they're persisted to the
 * Firebase profile before reload (subsequent sign-ins get null).
 */
export async function signInWithApple(): Promise<AuthUser> {
  // Dynamic import: the Apple lib is iOS-only; avoids loading it on Android.
  const { appleAuth } =
    await import("@invertase/react-native-apple-authentication");
  const response = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  if (!response.identityToken || !response.nonce) {
    throw new Error("Apple Sign-In failed — no identity token returned");
  }

  const credential = auth.AppleAuthProvider.credential(
    response.identityToken,
    response.nonce,
  );
  const cred = await auth().signInWithCredential(credential);

  const displayName = [
    response.fullName?.givenName,
    response.fullName?.familyName,
  ]
    .filter(Boolean)
    .join(" ");
  if (!cred.user.displayName && displayName) {
    await cred.user.updateProfile({ displayName });
  }
  if (!cred.user.email && response.email) {
    await cred.user.updateEmail(response.email);
  }
  await cred.user.reload();

  return toAuthUser(cred.user);
}

/** Shape of a Firebase/native auth error. */
interface FirebaseError {
  code?: string;
  message?: string;
}

/** Maps a Firebase error code to an i18n key for auth error messages. */
const AUTH_ERROR_KEYS = {
  "auth/invalid-email": "auth.errors.invalidEmail",
  "auth/invalid-credential": "auth.errors.invalidCredential",
  "auth/user-disabled": "auth.errors.userDisabled",
  "auth/user-not-found": "auth.errors.userNotFound",
  "auth/wrong-password": "auth.errors.wrongPassword",
  "auth/email-already-in-use": "auth.errors.emailAlreadyInUse",
  "auth/operation-not-allowed": "auth.errors.operationNotAllowed",
  "auth/weak-password": "auth.errors.weakPassword",
  "auth/network-request-failed": "auth.errors.network",
  "auth/too-many-requests": "auth.errors.tooManyRequests",
  "auth/popup-closed-by-user": "auth.errors.cancelled",
  "auth/cancelled-popup-request": "auth.errors.cancelled",
} as const;

type FirebaseAuthCode = keyof typeof AUTH_ERROR_KEYS;

/** Narrows a runtime error-code string to a known Firebase auth code. */
function isFirebaseAuthCode(code: string): code is FirebaseAuthCode {
  return code in AUTH_ERROR_KEYS;
}

/** Maps a Firebase/native auth error to a translated message via the given t. */
export function mapAuthError(error: unknown, t: TFunction): string {
  const firebaseError = error as FirebaseError | null | undefined;
  const code = firebaseError?.code;
  if (code && isFirebaseAuthCode(code)) {
    return t(AUTH_ERROR_KEYS[code]);
  }
  return firebaseError?.message ?? t("auth.errors.unknown");
}

/** Normalizes a Firebase user into the app's AuthUser shape. */
function toAuthUser(user: FirebaseAuthTypes.User): AuthUser {
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    providerId: user.providerData[0]?.providerId ?? "password",
  };
}
