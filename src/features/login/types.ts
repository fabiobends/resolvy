import { FormModuleProps } from "./modules/form/types";
import { LogoModuleProps } from "./modules/logo/types";
import { SocialModuleProps } from "./modules/social/types";

/** Props passed from the login screen hook to the screen component. */
export interface LoginScreenProps {
  logoProps: LogoModuleProps;
  formProps: FormModuleProps;
  socialProps: SocialModuleProps;
}
