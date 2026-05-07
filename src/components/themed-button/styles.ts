import { StyleSheet } from "react-native";

import { FontSizes, LineHeights, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.small,
    borderRadius: Spacing.extraSmall,
  },
  title: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.4,
  },
});
