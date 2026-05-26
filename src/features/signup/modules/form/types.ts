import { Control } from "react-hook-form";

import { SignupFormData } from "../../schema";

/** Props for the FormModule component. */
export interface FormModuleProps {
  firstNameField: {
    control: Control<SignupFormData>;
    name: "firstName";
    label: string;
    placeholder: string;
    autoCapitalize: "words";
  };
  lastNameField: {
    control: Control<SignupFormData>;
    name: "lastName";
    label: string;
    placeholder: string;
    autoCapitalize: "words";
  };
  emailField: {
    control: Control<SignupFormData>;
    name: "email";
    label: string;
    placeholder: string;
    keyboardType: "email-address";
    autoCapitalize: "none";
  };
  passwordField: {
    control: Control<SignupFormData>;
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
