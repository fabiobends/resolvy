import { useFormModule } from "./modules/form/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { useShared } from "./modules/shared";
import { SignupScreenProps } from "./types";

/**
 * Composes react-hook-form and all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useSignupScreen(): SignupScreenProps {
  const shared = useShared();

  const logoProps = useLogoModule();
  const formProps = useFormModule(shared);

  return { logoProps, formProps };
}
