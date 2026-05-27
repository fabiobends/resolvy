import { ViewProps } from "react-native";

/** Props for the Logo component. */
export interface LogoProps extends Pick<ViewProps, "testID"> {
  /** Visual size of the icon and spacing. */
  size?: "small" | "medium" | "large" | "extraLarge";
  /** Brand title text rendered below the icon. */
  title?: string;
  /** Optional subtitle text rendered below the title. */
  subtitle?: string;
}
