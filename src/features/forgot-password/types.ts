import { FormModuleProps } from "./modules/form/types";
import { LogoModuleProps } from "./modules/logo/types";

/** Props passed from the forgot-password screen hook to the screen component. */
export interface ForgotPasswordScreenProps {
  logoProps: LogoModuleProps;
  formProps: FormModuleProps;
}
