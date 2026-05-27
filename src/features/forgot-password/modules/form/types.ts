import { Control } from "react-hook-form";

import { ForgotPasswordFormData } from "../../schema";

/** Props for the FormModule component. */
export interface FormModuleProps {
  emailField: {
    control: Control<ForgotPasswordFormData>;
    name: "email";
    label: string;
    placeholder: string;
    keyboardType: "email-address";
    autoCapitalize: "none";
    successText?: string;
  };
  submitButton: {
    title: string;
    onPress: () => void;
    loading: boolean;
  };
  error?: string;
  infoBanner: string;
}
