import { FormModuleProps } from "./modules/form/types";
import { BrandBlockProps } from "./modules/brand-block/types";

/** Props passed from the signup screen hook to the screen component. */
export interface SignupScreenProps {
  brandBlockProps: BrandBlockProps;
  formProps: FormModuleProps;
}
