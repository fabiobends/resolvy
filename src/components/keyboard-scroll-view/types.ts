import { KeyboardAwareScrollViewProps } from "react-native-keyboard-controller";

import { ThemeColor } from "@/constants/theme";

/** Props for KeyboardScrollView. */
export type KeyboardScrollViewProps = KeyboardAwareScrollViewProps & {
  /** Background theme color for the inner scroll content container. */
  themeColor?: ThemeColor;
};
