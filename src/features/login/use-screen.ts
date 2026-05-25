import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useFormModule } from "./modules/form/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { useSocialModule } from "./modules/social/use-module";
import { LoginFormData, loginSchema } from "./schema";
import { LoginScreenProps } from "./types";

/**
 * Composes react-hook-form and all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useLoginScreen(): LoginScreenProps {
  const form = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const logoProps = useLogoModule();
  const formProps = useFormModule(form);
  const socialProps = useSocialModule();

  return { logoProps, formProps, socialProps };
}
