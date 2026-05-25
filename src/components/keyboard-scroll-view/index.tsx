import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { Spacing } from "@/constants/theme";

import { useTheme } from "@/hooks/use-theme";
import { Platform } from "react-native";
import { styles } from "./styles";
import { KeyboardScrollViewProps } from "./types";

/**
 * Scroll view that adjusts for the software keyboard.
 * Defaults: flexGrow content, handled taps, large bottom offset.
 * @param props - Component props.
 * @returns React element.
 */
export function KeyboardScrollView(props: KeyboardScrollViewProps) {
  const { children, contentContainerStyle, themeColor, ...rest } = props;
  const theme = useTheme();

  const backgroundStyle = themeColor
    ? { backgroundColor: theme[themeColor] }
    : undefined;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.content,
        backgroundStyle,
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      bottomOffset={
        Spacing.extraLarge + (Platform.OS === "ios" ? Spacing.small : 0)
      }
      {...rest}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
