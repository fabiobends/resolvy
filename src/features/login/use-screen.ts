import { useShared } from "./modules/shared";
import { useFormModule } from "./modules/form/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { useSocialModule } from "./modules/social/use-module";
import { LoginScreenProps } from "./types";

/**
 * Composes react-hook-form and all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useLoginScreen(): LoginScreenProps {
  const shared = useShared();

  const logoProps = useLogoModule();
  const formProps = useFormModule(shared);
  const socialProps = useSocialModule();

  return { logoProps, formProps, socialProps };
}
