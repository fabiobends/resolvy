import { useFormModule } from "./modules/form/use-module";
import { useLoginLinksModule } from "./modules/login-links/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { useSocialModule } from "./modules/social/use-module";
import { LoginScreenProps } from "./types";

/**
 * Composes all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useLoginScreen(): LoginScreenProps {
  const logoProps = useLogoModule();
  const formProps = useFormModule();
  const linksProps = useLoginLinksModule();
  const socialProps = useSocialModule();

  return { logoProps, formProps, linksProps, socialProps };
}
