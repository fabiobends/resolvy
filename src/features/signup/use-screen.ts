import { useFormModule } from "./modules/form/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { SignupScreenProps } from "./types";

/**
 * Composes all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useSignupScreen(): SignupScreenProps {
  const logoProps = useLogoModule();
  const formProps = useFormModule();

  return { logoProps, formProps };
}
