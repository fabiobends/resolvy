import { StyleSheet } from "react-native";

import { LineHeights, Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.small,
    borderRadius: Spacing.extraSmall,
    minHeight: Spacing.small * 2 + LineHeights.medium,
  },
  disabled: {
    opacity: 0.4,
  },
  indicatorWrapper: {
    height: LineHeights.medium,
    justifyContent: "center",
  },
});
