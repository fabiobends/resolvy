import { ViewProps } from "react-native";

import { ThemeColor } from "@/constants/theme";

export type ThemedViewProps = ViewProps & {
  themeColor?: ThemeColor;
};
