import { useFormModule } from "./modules/form/use-module";
import { useLoginLinksModule } from "./modules/login-links/use-module";
import { useBrandBlockModule } from "./modules/brand-block/use-module";
import { useSocialModule } from "./modules/social/use-module";
import { LoginScreenProps } from "./types";

/**
 * Composes all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useLoginScreen(): LoginScreenProps {
  const brandBlockProps = useBrandBlockModule();
  const formProps = useFormModule();
  const linksProps = useLoginLinksModule();
  const socialProps = useSocialModule();

  return { brandBlockProps, formProps, linksProps, socialProps };
}
