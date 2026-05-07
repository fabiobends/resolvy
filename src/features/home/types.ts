import { ThemeSwitcherProps } from "./modules/theme-switcher/types";
import { WelcomeProps } from "./modules/welcome/types";

/** Props passed from the home screen hook to the screen component. */
export interface HomeScreenProps {
  themeSwitcherProps: ThemeSwitcherProps;
  welcomeProps: WelcomeProps;
}
