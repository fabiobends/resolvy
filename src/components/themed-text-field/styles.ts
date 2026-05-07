import { StyleSheet } from "react-native";

import { FontSizes, LineHeights, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    gap: Spacing.tiny,
  },
  label: {
    fontSize: FontSizes.extraSmall,
    lineHeight: LineHeights.extraSmall,
    fontWeight: "500",
  },
  input: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    padding: Spacing.small,
    borderWidth: 1,
    borderRadius: Spacing.extraSmall,
  },
  disabled: {
    opacity: 0.4,
  },
});
