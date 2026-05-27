import { useFormModule } from "./modules/form/use-module";
import { useBrandBlockModule } from "./modules/brand-block/use-module";
import { SignupScreenProps } from "./types";

/**
 * Composes all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useSignupScreen(): SignupScreenProps {
  const brandBlockProps = useBrandBlockModule();
  const formProps = useFormModule();

  return { brandBlockProps, formProps };
}
