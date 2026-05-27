import { FormModuleProps } from "./modules/form/types";
import { LoginLinksRowProps } from "./modules/login-links/types";
import { BrandBlockProps } from "./modules/brand-block/types";
import { SocialModuleProps } from "./modules/social/types";

/** Props passed from the login screen hook to the screen component. */
export interface LoginScreenProps {
  brandBlockProps: BrandBlockProps;
  formProps: FormModuleProps;
  linksProps: LoginLinksRowProps;
  socialProps: SocialModuleProps;
}
