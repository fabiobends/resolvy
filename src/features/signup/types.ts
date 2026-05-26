import { FormModuleProps } from "./modules/form/types";
import { LogoModuleProps } from "./modules/logo/types";

/** Props passed from the signup screen hook to the screen component. */
export interface SignupScreenProps {
  logoProps: LogoModuleProps;
  formProps: FormModuleProps;
}
