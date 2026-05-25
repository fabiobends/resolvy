import { Control } from "react-hook-form";

import { LoginFormData } from "../../schema";

/** Props for the FormModule component. */
export interface FormModuleProps {
  emailField: {
    control: Control<LoginFormData>;
    name: "email";
    label: string;
    placeholder: string;
    keyboardType: "email-address";
    autoCapitalize: "none";
  };
  passwordField: {
    control: Control<LoginFormData>;
    name: "password";
    label: string;
    placeholder: string;
    secureTextEntry: boolean;
  };
  submitButton: {
    title: string;
    onPress: () => void;
    loading: boolean;
  };
  error?: string;
}
