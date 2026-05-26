import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useFormModule } from "./modules/form/use-module";
import { useLogoModule } from "./modules/logo/use-module";
import { SignupFormData, signupSchema } from "./schema";
import { SignupScreenProps } from "./types";

/**
 * Composes react-hook-form and all module hooks into screen props.
 * @returns Flat object mapping to child component props.
 */
export function useSignupScreen(): SignupScreenProps {
  const form = useForm<SignupFormData>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const logoProps = useLogoModule();
  const formProps = useFormModule(form);

  return { logoProps, formProps };
}
