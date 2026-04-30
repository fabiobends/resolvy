import { StyleSheet, Text, type TextProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { ThemeColor, FontSizes, LineHeights } from "@/constants/theme";

export type TextType =
  | "caption"
  | "label"
  | "bodySmall"
  | "body"
  | "subtitle"
  | "title"
  | "display";

export type ThemedTextProps = TextProps & {
  type: TextType;
  themeColor: ThemeColor;
};

export function ThemedText({
  style,
  type,
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor] }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  caption: {
    fontSize: FontSizes.tiny,
    lineHeight: LineHeights.tiny,
    fontWeight: 400,
  },
  label: {
    fontSize: FontSizes.extraSmall,
    lineHeight: LineHeights.extraSmall,
    fontWeight: 500,
  },
  bodySmall: {
    fontSize: FontSizes.small,
    lineHeight: LineHeights.small,
    fontWeight: 400,
  },
  body: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: FontSizes.large,
    lineHeight: LineHeights.large,
    fontWeight: 500,
  },
  title: {
    fontSize: FontSizes.extraLarge,
    lineHeight: LineHeights.extraLarge,
    fontWeight: 600,
  },
  display: {
    fontSize: FontSizes.huge,
    lineHeight: LineHeights.huge,
    fontWeight: 700,
  },
});
