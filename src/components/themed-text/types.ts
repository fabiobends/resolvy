import { TextProps } from "react-native";

import { ThemeColor } from "@/constants/theme";

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
