import { useWelcomeModule } from "./modules/welcome/use-module";
import { HomeScreenProps } from "./types";

/**
 * Composes props for all home screen modules.
 * @returns Flat object mapping to child component props.
 */
export function useHomeScreen(): HomeScreenProps {
  const welcomeProps = useWelcomeModule();
  return { welcomeProps };
}
