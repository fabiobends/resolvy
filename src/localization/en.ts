type DeepMutableString<T> = T extends object
  ? { -readonly [K in keyof T]: DeepMutableString<T[K]> }
  : T extends string
    ? string
    : T;

export type Translations = DeepMutableString<typeof en>;

export const en = {
  common: {
    email: "Email",
    password: "Password",
    firstName: "First name",
    lastName: "Last name",
  },
  placeholders: {
    email: "Enter your email",
    password: "Enter your password",
    firstName: "Enter your first name",
    lastName: "Enter your last name",
  },
  accessibility: {
    closeDrawer: "Close drawer",
    openDevMenu: "Open dev menu",
    switchToLightMode: "Switch to light mode",
    switchToDarkMode: "Switch to dark mode",
  },
  login: {
    title: "Resolvy",
    subtitle: "Resolve what matters",
    submit: "Log in",
    forgotPassword: "Forgot password?",
    createAccount: "Create account",
    socialDivider: "or continue with",
  },
  signup: {
    title: "Resolvy",
    submit: "Sign Up",
  },
  forgotPassword: {
    title: "Resolvy",
    submit: "Send reset link",
    success: "Reset link sent. Check your email inbox.",
    infoBanner:
      "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.",
  },
  home: {
    welcomeTitle: "Welcome",
    welcomeSubtitle: "Resolvy",
    themeLabel: "Theme: {{theme}}",
  },
  devMenu: {
    title: "Dev Menu",
    storybook: "Storybook",
    theme: "Theme",
    language: "Language",
    languageEnglish: "English",
    languagePortuguese: "Portuguese",
  },
  validation: {
    email: "Enter a valid email address",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 6 characters",
    firstNameRequired: "First name is required",
    firstNameMinLength: "First name must be at least 2 characters",
    lastNameRequired: "Last name is required",
    lastNameMinLength: "Last name must be at least 2 characters",
  },
} as const;
