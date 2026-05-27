import { useFormModule } from "./modules/form/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { ForgotPasswordScreenProps } from "./types";

/**
 * Composes all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useForgotPasswordScreen(): ForgotPasswordScreenProps {
  const logoProps = useLogoModule();
  const formProps = useFormModule();

  return { logoProps, formProps };
}
