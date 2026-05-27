import { FormModuleProps } from "./modules/form/types";
import { BrandBlockProps } from "./modules/brand-block/types";

/** Props passed from the forgot-password screen hook to the screen component. */
export interface ForgotPasswordScreenProps {
  brandBlockProps: BrandBlockProps;
  formProps: FormModuleProps;
}
